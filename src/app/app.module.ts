import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ToastrModule } from "ngx-toastr";
import { TagInputModule } from "ngx-chips";
import { CollapseModule } from "ngx-bootstrap/collapse";

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { PresentationModule } from "./pages/presentation/presentation.module";

import { BrowserModule } from "@angular/platform-browser";
import { ComponentsModule } from "./components/components.module";

import { AppRoutingModule } from "./app-routing.module";
import { ModalModule } from "ngx-bootstrap/modal";
import { LoginComponent } from "./login/login.component";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/Store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AuthInterceptorInterceptor } from "./auth-interceptor.interceptor";
import { NgxEchartsModule } from "ngx-echarts";

import { Evolution2Component } from './charts/evolution2/evolution2.component';
import { PieComponent } from './charts/pie/pie.component';
import { Pie2Component } from './charts/pie2/pie2.component';
import { GaugeComponent } from './charts/gauge/gauge.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LoginComponent,
 
    Evolution2Component,
    PieComponent,
    Pie2Component,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ComponentsModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    TagInputModule,
    PresentationModule,
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
    }),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  static injector: any;
}
