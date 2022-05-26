
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ProfileComponent } from './home/profile/profile.component';
import { FormateurApprenantComponent } from './home/formateur-apprenant/formateur-apprenant.component';
import { AddComponent } from './home/formateur-apprenant/add/add.component';
import { FormationComponent } from './home/formation/formation.component';
import { DetailComponent } from './home/formation/detail/detail.component';
import { StepsComponent } from './home/formation/steps/steps.component';


const routes: Routes = [
    {path:"login",component:LoginComponent},
    
    {path:"home",component:DashboardComponent,children:[

         {path:"profile",component:ProfileComponent},
         {path:"formateur_Apprenant",component:FormateurApprenantComponent},
         {path:"formateur_App/:id",component:FormateurApprenantComponent},
         {path:"add",component:AddComponent},
         {path:"formation",component:FormationComponent},
         {path:"detailformation/:id",component:DetailComponent},
         {path:"steps",component:StepsComponent},
         {path:"AddComponent",component:AddComponent}

       
       ]},
    
    ]
    
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
    export class AppRoutingModule { }
    