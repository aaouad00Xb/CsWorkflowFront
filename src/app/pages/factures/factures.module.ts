import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFactureComponent } from './add-facture/add-facture.component';
import { FactureRoutes } from './facture.routing';
import { RouterModule } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MesFacturesComponent } from './mes-factures/mes-factures.component';
import { RechercheFacturesComponent } from './recherche-factures/recherche-factures.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FactureProfilComponent } from './facture-profil/facture-profil.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MyGlobalPipe } from 'src/app/my-global.pipe';



@NgModule({
  declarations: [
    AddFactureComponent,
    MesFacturesComponent,
    RechercheFacturesComponent,
    FactureProfilComponent,
    MyGlobalPipe,

  ],
  imports: [

    CommonModule,
    RouterModule.forChild(FactureRoutes),
    NgxLoadingModule.forRoot({}),
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    PdfViewerModule


  ]
})
export class FacturesModule { }
