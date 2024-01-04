import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratProfilComponent } from './contrat-profil.component';

describe('ContratProfilComponent', () => {
  let component: ContratProfilComponent;
  let fixture: ComponentFixture<ContratProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
