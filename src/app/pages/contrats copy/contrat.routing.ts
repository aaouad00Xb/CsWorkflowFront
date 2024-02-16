import { Routes } from "@angular/router";
import { SuiviComponent } from "./suivi/suivi.component";
import { MesContratComponent } from "./mes-contrat/mes-contrat.component";
import { ContratProfilComponent } from "./contrat-profil/contrat-profil.component";

export const ContratRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "contrat",
        component: SuiviComponent
      }
      ,
      {
        path: "MesContrat",
        component: MesContratComponent
      }
      ,
      {
        path: "test",
        component: ContratProfilComponent
      }
    ]
  }
];
