import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureProfilComponent } from './facture-profil.component';

describe('FactureProfilComponent', () => {
  let component: FactureProfilComponent;
  let fixture: ComponentFixture<FactureProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
