import { Routes } from "@angular/router";
import { AddFactureComponent } from "./add-facture/add-facture.component";
import { MesFacturesComponent } from "./mes-factures/mes-factures.component";
import { RechercheFacturesComponent } from "./recherche-factures/recherche-factures.component";
import { FactureProfilComponent } from "./facture-profil/facture-profil.component";

export const FactureRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "createsFacture",
        component: AddFactureComponent
      },
      {
        path: "mesFactures",
        component: MesFacturesComponent
      },
      {
        path: "rechercheFactures",
        component: RechercheFacturesComponent
      }
      ,
      {
        path: "test",
        component: FactureProfilComponent
      }
      
    ]
  }
];
