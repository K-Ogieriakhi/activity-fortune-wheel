import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleTicketComponent } from './raffle-ticket.component';

describe('RaffleTicketComponent', () => {
  let component: RaffleTicketComponent;
  let fixture: ComponentFixture<RaffleTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaffleTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaffleTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
