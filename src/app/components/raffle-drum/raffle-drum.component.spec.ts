import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleDrumComponent } from './raffle-drum.component';

describe('RaffleDrumComponent', () => {
  let component: RaffleDrumComponent;
  let fixture: ComponentFixture<RaffleDrumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaffleDrumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaffleDrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
