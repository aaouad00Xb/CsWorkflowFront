import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolesComponent } from './poles/poles.component';
import { RouterModule } from '@angular/router';
import { AdministrationRoutes } from './administration.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DivisionsComponent } from './divisions/divisions.component';
import { AffaireComponent } from './affaire/affaire.component';
import { SoutraitantComponent } from './soutraitant/soutraitant.component';
import { ContratsSoutraitancesComponent } from './contrats-soutraitances/contrats-soutraitances.component';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [
    PolesComponent,
    DivisionsComponent,
    AffaireComponent,
    SoutraitantComponent,
    ContratsSoutraitancesComponent,
    UsersComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    RouterModule.forChild(AdministrationRoutes),
  ]
})
export class AdministrationModule { }
