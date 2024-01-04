import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiviComponent } from './suivi/suivi.component';
import { RouterModule } from '@angular/router';
import { ContratRoutes } from './contrat.routing';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MesContratComponent } from './mes-contrat/mes-contrat.component';


import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgxPrintModule } from "ngx-print";
import { ContratProfilComponent } from './contrat-profil/contrat-profil.component';

@NgModule({
  declarations: [
    SuiviComponent,
    MesContratComponent,
    ContratProfilComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxDatatableModule,
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    NgxPrintModule,
    AutocompleteLibModule,
    RouterModule.forChild(ContratRoutes),

  ]
})
export class ContratsModule { }
