import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormationService } from 'src/app/_services/formation.service';
import { environment } from 'src/environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  formFormation!: FormGroup;
  base_picture=environment.base_picture;

  id:any;
  constructor(private fb: FormBuilder, private router:Router, private activatedRouter:ActivatedRoute,private formationService: FormationService) {
    console.log("id from activate router ",this.activatedRouter.snapshot.params["id"])
    this.id=this.activatedRouter.snapshot.params["id"];

   }

  ngOnInit(): void {
  }

}
