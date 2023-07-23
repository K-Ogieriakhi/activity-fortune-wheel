import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-price-dialog',
  templateUrl: './price-dialog.component.html',
  styleUrls: ['./price-dialog.component.scss'],
})
export class PriceDialogComponent {
  public selectedTicket!: Ticket;
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
}
