import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvoChartComponent } from './evo-chart.component';

describe('EvoChartComponent', () => {
  let component: EvoChartComponent;
  let fixture: ComponentFixture<EvoChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvoChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
