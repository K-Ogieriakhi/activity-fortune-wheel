import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Activities } from 'src/app/models/activity.model';
import { Ticket } from 'src/app/models/ticket.model';
import { PriceDialogComponent } from '../price-dialog/price-dialog.component';
import { Dialog } from '@angular/cdk/dialog';
import { GoogleSheetService } from 'src/app/services/google-sheet.service';
import { MIN_RANDOM_NUMBER, Ticket_Width } from 'src/app/variables/variables';
import { ClientStatus } from 'src/app/models/client.model';
import { findNestedArrayItemIndex, shuffle } from 'src/app/helper/functions';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';
import { cloneDeep } from 'lodash-es';

export const LOAD_DATA_TASK_ID = 'LOAD_DATA';

@Component({
  selector: 'app-raffle-drum',
  templateUrl: './raffle-drum.component.html',
  styleUrls: ['./raffle-drum.component.scss'],
})
export class RaffleDrumComponent implements OnInit {
  @ViewChild('ticketContainer') ticketContainer: ElementRef | undefined;
  activities: Activities[] = [];
  filteredActivities: Activities[] = [];
  tickets: Ticket[] = [];
  availablePriceLevels: Array<'Low' | 'Medium' | 'High'> = [
    'Low',
    'Medium',
    'High',
  ];
  selectedPriceLevels: Array<'Low' | 'Medium' | 'High'> = [
    'Low',
    'Medium',
    'High',
  ];

  isSpinning: boolean = false;
  spinAgain: boolean = false;
  showResult: boolean = false;
  selectedTicket: Ticket | undefined;

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    public dialog: Dialog,
    private googleSheetsService: GoogleSheetService,
    private ngxLoader: NgxUiLoaderService
  ) {}

  ngOnInit() {
    this.ngxLoader.start(undefined, { maxTime: 4000, minTime: 2500 });
    this.googleSheetsService.clientStatus$.subscribe((status: ClientStatus) => {
      if (status.success && !status.initializing) {
        this.googleSheetsService.getSheetData('activities').then((response) => {
          if (response.result.values) {
            this.proccessSheetData(response.result.values);
          }
          this.ngxLoader.stopAll();
        });
      } else if (status.error) {
        console.error('failed to initialize googleSheets Service Client');
      }
    });

    // Loader doesn't stop sometimes even if maxTime was defined, because of that this temporary fix is used
    setTimeout(() => {
      this.ngxLoader.stopAll();
    }, 4500);
  }

  private proccessSheetData(data: Array<Array<string>>) {
    const ActivityRowStart: number =
      (findNestedArrayItemIndex(data, 'UnternehmungsIdeen')?.row ?? -1) + 1; // Add +1 because the activites are in the next row (under the headline)

    const ActivityNameColumnStart: number = 0;
    const TicketAmountColumnStart: number = 1;
    const TicketPriceLevelColumnStart: number = 2;

    const priceRangesIndex: number =
      findNestedArrayItemIndex(data, 'Preisranges')?.row ?? -1;

    const priceRanges = (
      data[priceRangesIndex][1].replace(' ', '').split(',') as Array<
        'Low' | 'Medium' | 'High'
      >
    ).map((priceRange) => priceRange.trim() as 'Low' | 'Medium' | 'High');

    this.availablePriceLevels = priceRanges;
    this.selectedPriceLevels = cloneDeep(priceRanges);

    for (let row = ActivityRowStart; row < data.length; row++) {
      const activity: Activities = {
        text: data[row][ActivityNameColumnStart],
        tickets: Number.parseInt(data[row][TicketAmountColumnStart] ?? '0'),
        priceLevel: data[row][TicketPriceLevelColumnStart].replace(
          ' ',
          ''
        ).split(',') as Array<'Low' | 'Medium' | 'High'>,
      };
      this.activities.push(activity);
    }
    this.filteredActivities = cloneDeep(this.activities);
    this.initializeTickets(150);
  }

  private filterBasedOnPriceLevels() {
    //toDo filter based on selected Pricelevels and reInitialize tickets/activities
    this.filteredActivities = this.activities.filter((activity) =>
      activity.priceLevel.some((activityPriceLevel) =>
        this.selectedPriceLevels.includes(activityPriceLevel)
      )
    );
    this.initializeTickets(150);
  }

  /**
   * Initialzes Tickets by filtered Activities
   * @param minTicketsInDrum minimum tickets that should be in drum (necessary for spinning animation), probability of Tickets will not be changed
   */
  private initializeTickets(minTicketsInDrum: number) {
    this.tickets = [];
    const availableTickets = this.filteredActivities.reduce(
      (next = 0, activity) => {
        return next + activity.tickets;
      },
      0
    );

    const minTicketFactor = Math.round(minTicketsInDrum / availableTickets);
    const maxFactor = 10;
    for (let x = 0; x < (minTicketFactor % maxFactor) + 1; x++) {
      this.filteredActivities.forEach((activity) => {
        for (let i = 0; i < activity.tickets; i++) {
          const ticket: Ticket = {
            text: activity.text,
            priceLevel: activity.priceLevel,
            propability: activity.tickets / availableTickets,
            position: this.tickets.length + 1,
            ticketsInDrum: activity.tickets,
          };
          this.tickets.push(ticket);
        }
      });
    }
    this.tickets = shuffle(this.tickets);
    this.cdRef.detectChanges();
  }

  private getRandomTicket(): void {
    const randomTicketNumber =
      Math.floor(Math.random() * this.tickets.length) + MIN_RANDOM_NUMBER;
    this.selectedTicket = this.tickets[randomTicketNumber];
  }

  private reset() {
    this.showResult = false;
    document
      .getElementsByClassName('ticket')[0]
      .setAttribute('style', 'margin-left:0px');
  }

  public spin() {
    this.isSpinning = true;
    if (this.spinAgain) {
      this.tickets = shuffle(this.tickets);
    }
    this.reset();
    this.getRandomTicket();
    if (this.selectedTicket) {
      const ticketContainerWidth: number =
        this.ticketContainer?.nativeElement.offsetWidth ?? 0;
      let negative = Math.floor(Math.random() * 1) >= 1 ? -1 : 1;
      let randonOffsetinTicket =
        Math.floor((Math.random() * Ticket_Width) / 2) * negative;

      var newDistance =
        Ticket_Width * this.selectedTicket.position +
        Ticket_Width / 2 -
        ticketContainerWidth / 2 +
        randonOffsetinTicket;

      document
        .getElementsByClassName('ticket')[0]
        .animate([{ marginLeft: 0 }, { marginLeft: `-${newDistance}px` }], {
          duration: 3000,
          iterations: 1,
          fill: 'forwards',
          easing: 'ease-out',
        }).onfinish = (event) => {
        this.isSpinning = false;
        this.spinAgain = true;
        this.showResult = true;
        this.cdRef.detectChanges();

        this.dialog.open<string>(PriceDialogComponent, {
          width: '500px',
          hasBackdrop: true,
          data: Object.assign(this.selectedTicket!, {}) as Ticket,
        });
      };
    }
  }

  public changeSelectedPriceLevel(
    checked: boolean,
    priceLevel: 'Low' | 'Medium' | 'High'
  ) {
    if (checked && !this.selectedPriceLevels.includes(priceLevel)) {
      this.selectedPriceLevels.push(priceLevel);
    } else if (!checked && this.selectedPriceLevels.includes(priceLevel)) {
      const index = this.selectedPriceLevels.findIndex(
        (p1) => p1 === priceLevel
      );
      this.selectedPriceLevels.splice(index, 1);
    }

    this.filterBasedOnPriceLevels();
  }

  public trackByIndex(_index: number, ticket: Ticket) {
    return ticket.position;
  }
}
