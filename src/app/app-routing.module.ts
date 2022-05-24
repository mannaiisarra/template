
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ProfileComponent } from './home/profile/profile.component';

const routes: Routes = [
    {path:"login",component:LoginComponent},
    
    {path:"home",component:DashboardComponent,children:[

         {path:"profile",component:ProfileComponent},
       
       ]},
    
    ]
    
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
    export class AppRoutingModule { }
    