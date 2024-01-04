import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratsSoutraitancesComponent } from './contrats-soutraitances.component';

describe('ContratsSoutraitancesComponent', () => {
  let component: ContratsSoutraitancesComponent;
  let fixture: ComponentFixture<ContratsSoutraitancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratsSoutraitancesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratsSoutraitancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
