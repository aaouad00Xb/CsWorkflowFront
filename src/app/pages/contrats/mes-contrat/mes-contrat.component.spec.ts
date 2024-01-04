import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesContratComponent } from './mes-contrat.component';

describe('MesContratComponent', () => {
  let component: MesContratComponent;
  let fixture: ComponentFixture<MesContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesContratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
