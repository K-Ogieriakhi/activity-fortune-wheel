import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PriceDialogComponent } from '../price-dialog/price-dialog/price-dialog.component';
import { Activities, Ticket } from '../models/ticket.model';
import { RaffleTicketComponent } from '../raffle-ticket/raffle-ticket.component';

export const Ticket_Width = 250;
export const MIN_RANDOM_NUMBER = 3;
@Component({
  selector: 'app-raffle-drum',
  standalone: true,
  templateUrl: './raffle-drum.component.html',
  styleUrls: ['./raffle-drum.component.css'],
  imports: [
    RaffleTicketComponent,
    CommonModule,
    DialogModule,
    PriceDialogComponent,
  ],
})
export class RaffleDrumComponent implements OnInit {
  @ViewChild('ticketContainer') ticketContainer: ElementRef;
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
  selectedTicket: Ticket;

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    public dialog: Dialog
  ) {}

  ngOnInit() {
    this.initializeActivities();
    this.initializeTickets(3);
  }

  private filterBasedOnPriceLevels() {
    //toDo filter based on selected Pricelevels and reInitialize tickets/activities
    this.filteredActivities = this.activities.filter((activity) =>
      activity.priceLevel.some((activityPriceLevel) =>
        this.selectedPriceLevels.includes(activityPriceLevel)
      )
    );
    console.log(this.activities);
    this.initializeTickets(3);
  }

  private initializeActivities() {
    this.activities = [
      { text: 'Shisha-Bar', tickets: 4, priceLevel: ['Low'] },
      { text: 'Therme', tickets: 2, priceLevel: ['Medium'] },
      { text: 'Billard/Tischkicker/Dart', tickets: 4, priceLevel: ['Low'] },
      { text: 'Lasertag', tickets: 2, priceLevel: ['Low'] },
      { text: 'Kart fahren', tickets: 3, priceLevel: ['Medium'] },
      { text: 'Trinkspielabend', tickets: 4, priceLevel: ['Low'] },
      { text: 'Schwarzlicht Minigolf', tickets: 3, priceLevel: ['Low'] },
      {
        text: 'Bar besuch / Bar hopping / Rooftopbar / Strandbar',
        tickets: 8,
        priceLevel: ['Low', 'Medium'],
      },
      {
        text: 'Städte-Trip (Hamburg, Berlin)',
        tickets: 3,
        priceLevel: ['High'],
      },
      { text: 'Kino', tickets: 2, priceLevel: ['Low'] },
      {
        text: 'Erlebnispark (Movie-Park, etc.)',
        tickets: 1,
        priceLevel: ['High'],
      },
      { text: 'Bowling', tickets: 4, priceLevel: ['Low'] },
      {
        text: '3-Tage kurztrip (Amsterdam/Barcelona)',
        tickets: 2,
        priceLevel: ['High'],
      },
      { text: 'Club besuch', tickets: 4, priceLevel: ['Low', 'Medium'] },
      { text: 'Wandern (K)', tickets: 1, priceLevel: ['Low'] },
      {
        text: 'Essen gehen/ Essens-Tour',
        tickets: 3,
        priceLevel: ['Low', 'Medium'],
      },
      { text: 'Stripclub', tickets: 1, priceLevel: ['Medium'] },
      { text: 'Fußball (~bubble)', tickets: 2, priceLevel: ['Low'] },
      { text: 'Escape Room', tickets: 3, priceLevel: ['Medium'] },
      { text: 'Klettern / Trampolinhalle', tickets: 1, priceLevel: ['Low'] },
      { text: 'Game Night (lokal/remote)', tickets: 1, priceLevel: ['Low'] },
      { text: 'Konzert', tickets: 1, priceLevel: ['Medium'] },
      { text: 'Karaoke', tickets: 1, priceLevel: ['Low'] },
      { text: 'Trampoline Park', tickets: 1, priceLevel: ['Medium'] },
      { text: 'Festivals (lokal)', tickets: 1, priceLevel: ['Low', 'Medium'] },
      { text: 'Paintball', tickets: 1, priceLevel: ['Medium'] },
      { text: 'Arcade-halle', tickets: 1, priceLevel: ['Medium'] },
      { text: 'Drugs', tickets: 1, priceLevel: ['Low', 'Medium'] },
      { text: 'Sport/Schwimmen (See)', tickets: 2, priceLevel: ['Low'] },
      {
        text: 'Cocktail-Creation-Challenge (CCC)',
        tickets: 6,
        priceLevel: ['Medium'],
      },
      {
        text: 'Niete (nichts machen)',
        tickets: 1,
        priceLevel: ['Low', 'Medium'],
      },
    ];
    this.filteredActivities = this.activities;
  }

  private initializeTickets(ticketAmountFactor: number) {
    this.tickets = [];
    const availableTickets = this.filteredActivities.reduce(
      (next, activity) => {
        return next + activity.tickets;
      },
      0
    );
    for (let x = 0; x < ticketAmountFactor; x++) {
      this.filteredActivities.forEach((activity) => {
        for (let i = 0; i < activity.tickets; i++) {
          const ticket: Ticket = {
            text: activity.text,
            priceLevel: activity.priceLevel,
            propability: activity.tickets / availableTickets,
            id: this.tickets.length + 1,
          };
          this.tickets.push(ticket);
        }
      });
    }
    this.tickets = this.shuffle(this.tickets);
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

  /**
   * Shuffles array in place.
   * @param {Array} a items An array containing the items.
   */
  private shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      // swap id's (position)
      x.id = j;
      a[j].id = i;
      // swap positions
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  public spin() {
    this.isSpinning = true;
    if (this.spinAgain) {
      this.tickets = this.shuffle(this.tickets);
    }
    this.reset();
    this.getRandomTicket();
    const ticketContainerWidth = this.ticketContainer.nativeElement.offsetWidth;
    let negative = Math.floor(Math.random() * 1) >= 1 ? -1 : 1;
    let randonOffsetinTicket =
      Math.floor((Math.random() * Ticket_Width) / 2) * negative;

    var newDistance =
      Ticket_Width * this.selectedTicket.id +
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
          data: Object.assign(this.selectedTicket, {}),
        });

    };
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
    return ticket.id;
  }
}
