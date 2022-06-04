import { Demande } from 'src/app/model/demande';
import { Component, OnInit } from '@angular/core';
import { DemandeService } from 'src/app/_services/demande.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  demande:any;
  constructor(private demandeService: DemandeService) { }

  ngOnInit(): void {
    this.getAll();
  }


  getAll(){
    this.demandeService.getAllDemande().subscribe(res=>{
     console.log("res demande : ",res.data)
    this.demande=res.data;

   
    })
  }

  activeAprenent(){
    console.log("here service update state demande ");
  }

}
