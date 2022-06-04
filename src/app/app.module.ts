import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { HeaderComponent } from './home/header/header.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './home/profile/profile.component';
import { FormateurApprenantComponent } from './home/formateur-apprenant/formateur-apprenant.component';
import { AddComponent } from './home/formateur-apprenant/add/add.component';
import { FormationComponent } from './home/formation/formation.component';
import { DetailComponent } from './home/formation/detail/detail.component';
import { DatePipe } from '@angular/common';
import { StepsComponent } from './home/formation/steps/steps.component';
import { RechercheMembrePipe } from './pipes/recherche-membre.pipe';

import { ClientComponent } from './home/client/client.component';
import { EditComponent } from './home/client/edit/edit.component';
import { ErrorComponent } from './home/error/error.component';
import { DemandeComponent } from './home/demande/demande.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    ProfileComponent,
    FormateurApprenantComponent,
    AddComponent,
    FormationComponent,
    DetailComponent,
    StepsComponent,
    RechercheMembrePipe,

    ClientComponent,
     EditComponent,
     ErrorComponent,
     DemandeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
