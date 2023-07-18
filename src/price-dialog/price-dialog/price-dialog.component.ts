import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-price-dialog',
  templateUrl: './price-dialog.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./price-dialog.component.css'],
})
export class PriceDialogComponent implements OnInit {
  public selectedTicket: Ticket;
  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: Ticket,
    private readonly cdRef: ChangeDetectorRef
  ) {
    setTimeout(() => {
      this.selectedTicket = data;
      this.cdRef.detectChanges();
    });
  }

  ngOnInit() {}
}
