import { Routes } from "@angular/router";
import { PolesComponent } from "./poles/poles.component";
import { DivisionsComponent } from "./divisions/divisions.component";
import { AffaireComponent } from "./affaire/affaire.component";
import { SoutraitantComponent } from "./soutraitant/soutraitant.component";
import { ContratsSoutraitancesComponent } from "./contrats-soutraitances/contrats-soutraitances.component";
import { UsersComponent } from "./users/users.component";


export const AdministrationRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "poles",
        component: PolesComponent
      }
      ,
      {
        path: "users",
        component: UsersComponent
      }
      ,
      {
        path: "divisions",
        component: DivisionsComponent
      }
      ,
      {
        path: "affaires",
        component: AffaireComponent
      }
      ,
      {
        path: "soustraitants",
        component: SoutraitantComponent
      }
      ,
      {
        path: "contratSoustraintance",
        component: ContratsSoutraitancesComponent
      }
    ]
  }
];
