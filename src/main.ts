import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { RaffleTicketComponent } from './raffle-ticket/raffle-ticket.component';
import { RaffleDrumComponent } from './raffle-drum/raffle-drum.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, RaffleTicketComponent, RaffleDrumComponent],
  template: `
  <div class="main-content">
    <h1 style="text-align:center">Unternehmungs Glücksrad</h1>
    <app-raffle-drum></app-raffle-drum>
  <div>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
