import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoutraitantComponent } from './soutraitant.component';

describe('SoutraitantComponent', () => {
  let component: SoutraitantComponent;
  let fixture: ComponentFixture<SoutraitantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoutraitantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoutraitantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
