import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheFacturesComponent } from './recherche-factures.component';

describe('RechercheFacturesComponent', () => {
  let component: RechercheFacturesComponent;
  let fixture: ComponentFixture<RechercheFacturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercheFacturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheFacturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
