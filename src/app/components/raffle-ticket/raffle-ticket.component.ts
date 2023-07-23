import { Component, Input } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-raffle-ticket',
  templateUrl: './raffle-ticket.component.html',
  styleUrls: ['./raffle-ticket.component.scss'],
})
export class RaffleTicketComponent {
  colors: string[] = ['#af7150', '#69c4bd', '#d2d1bd', '#ffd55d'];
  private _ticket!: Ticket;
  @Input() set ticket(value: Ticket) {
    this._ticket = value;
    if (this._ticket) {
      this.setColorBasedOnPriceLevel();
    }
  }

  get ticket(): Ticket {
    return this._ticket;
  }

  color = this.colors[Math.floor(Math.random() * 4) + 0];

  setColorBasedOnPriceLevel() {
    if (this.ticket.text.includes('Niete')) {
      this.color = '#e13d2d';
    } else if (this.ticket.priceLevel.includes('High')) {
      this.color = this.colors[3];
    } else if (this.ticket.priceLevel.includes('Medium')) {
      this.color = this.colors[2];
    } else if (
      this.ticket.priceLevel.includes('Medium') &&
      this.ticket.priceLevel.includes('Low')
    ) {
      this.color = this.colors[1];
    } else if (this.ticket.priceLevel.includes('Low')) {
      this.color = this.colors[0];
    } else {
      this.color = this.colors[3];
    }
  }

  getBackgroundImageTOC(): string {
    const backgroundImage = `radial-gradient(circle at top left, transparent 17px, ${this.color} 17px), radial-gradient(circle at top right, transparent 17px, ${this.color} 17px), radial-gradient(circle at bottom left, transparent 17px, ${this.color} 17px), radial-gradient(circle at bottom right, transparent 17px, ${this.color} 17px)`;
    return backgroundImage;
  }

  getBackgroundImageTOCBC(): string {
    const backgroundImage = `linear-gradient(45deg, transparent 75%, ${this.color} 75%), linear-gradient(135deg, #f9080800 75%, ${this.color} 75%), linear-gradient(-45deg, #f4030300 75%, ${this.color} 75%), linear-gradient(-135deg, #0000 75%, ${this.color} 75%)`;
    return backgroundImage;
  }
}
