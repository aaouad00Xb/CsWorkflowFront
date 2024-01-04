import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "../../components/components.module";

import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { AlternativeComponent } from "./alternative/alternative.component";

import { RouterModule } from "@angular/router";
import { DashboardsRoutes } from "./dashboards.routing";
import { BarComponent } from "src/app/charts/bar/bar.component";
import { EvolutionComponent } from "src/app/charts/evolution/evolution.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } 
    from '@angular/platform-browser/animations';
import { BrowserModule } from "@angular/platform-browser";
import { NgxEchartsModule } from "ngx-echarts";
import { GaugeComponent } from "src/app/charts/gauge/gauge.component";
@NgModule({
  declarations: [DashboardComponent, AlternativeComponent,BarComponent,EvolutionComponent ,   GaugeComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forChild(DashboardsRoutes),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  exports: [DashboardComponent, AlternativeComponent]
})
export class DashboardsModule {}
