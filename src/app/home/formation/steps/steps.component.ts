import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StepsService } from 'src/app/_services/steps.service';
import { Etape } from 'src/app/model/etape';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  formStep!: FormGroup;
  etape:any ;
  etapes:any ;
 
  id:string=this.activatedRouter.snapshot.params["id"];
  constructor(private stepService: StepsService,private fb: FormBuilder, private router:Router, private activatedRouter:ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    
    console.log("id from activate router ",this.id) 
    this.formStep = this.fb.group({
      step_titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      nombre_des_heurs: ['', [Validators.required]],
      name: ['', [Validators.required]],
     

    });
    this.formStep.patchValue({
      step_titre: '',
      description: '',
      nombre_des_heurs: '',
      name:'',
     // formation: '',       

  })

  this.getEtapeByTheme();

   this. getAllNameStapes();
  }

  addetape(): void {
   

    
    this.stepService.addSteps(this.formStep.value,this.id).subscribe(
      data => {
        console.log(data);
     
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

    getEtapeByTheme(){
      this.stepService.getEtapeByTheme(this.id).subscribe(res=>{
        console.log("etape by idddd  ",res.data);
        this.etape = res.data;
        //this.getEtapeByTheme();
      
         
    
      })
    
    }


    getAllNameStapes(){
      this.stepService.getAllNameOfStapes().subscribe(res=>{
        console.log("etape by nameeeeeeddd  ",res.data);
        this.etapes = res.data;
        //this.getEtapeByTheme();
      
         
    
      })
    
    }

    removeEtape(id:any){
      console.log(" Product deleted", id)
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
          this.stepService.removeEtape(id).subscribe((item) => {
           
            
            console.log('item remove', item);
     

           
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
          });
        }
      })

    }
    

   
      

}
