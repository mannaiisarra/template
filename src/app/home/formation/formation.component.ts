import {Formation } from 'src/app/model/formation';
import { Component, OnInit } from '@angular/core';
import { FormationService } from 'src/app/_services/formation.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  formFormation !: FormGroup;
  fileToUpload: File | null = null;
  formations:any ;
  base_picture=environment.base_picture;
  
  id:any;
  
  
    constructor(private fb: FormBuilder,private formationService: FormationService,private router:Router) { }
  
    ngOnInit(): void {
      this.formFormation = this.fb.group({
        date_deDebut: ['', [Validators.required]],
        titre: ['', [Validators.required]],
        description: ['', [Validators.required]],
        photo: ['', [Validators.required]],
        date_defin: ['', [Validators.required]],
  
       
  
      });
     
      this.getAll();
    }
    getAll(){
      this.formationService.getAll().subscribe(res=>{
       console.log("res formation : ",res.data)
      this.formations=res.data;
      })
    }
  
    handleFileInput(e: any) {
      console.log("Fine Input Done ", e.target.files[0])
  
      this.fileToUpload = e.target.files[0]
  
    }
    onSubmit(): void {
     // console.log('role is :' , this.formFormation.value.role)
      console.log('Done ', this.formFormation.value);
      const formdata = new FormData();
      formdata.append("date_deDebut", this.formFormation.get('date_deDebut')!.value)
      formdata.append("description", this.formFormation.get('description')!.value)
      formdata.append("file", this.fileToUpload!)
      formdata.append("date_defin", this.formFormation.get('date_defin')!.value)
      formdata.append("titre", this.formFormation.get('titre')!.value);
  
  
      this.formationService.addFormation(formdata).subscribe(
        data => {
          console.log(data);
          //this.isSuccessful = true;
         // this.isSignUpFailed = false;
         this.getAll();
          Swal.fire('Good job!', 'You clicked the button!', 'success');
  
        },
        err => {
        
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>',
          });
        }
        
        
       
       );
  
      }
  
      removeFormation(id:any){
        console.log(" l'id de Formation deleted", id)
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.formationService.removeFormation(id).subscribe((item) => {
              console.log('item remove', item);
              this.getAll();
              Swal.fire('Deleted!', 'User has been deleted.', 'success');
            });
          }
        });
      }
   
  }
  