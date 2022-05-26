import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from 'src/app/_services/formation.service';
import { ThemeService } from 'src/app/_services/theme.service';
import { Theme } from 'src/app/model/theme';
import { DatePipe } from '@angular/common';

import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  formFormation!: FormGroup;
  formTheme!: FormGroup;
  base_picture=environment.base_picture;
  fileToUpload: File | null = null;
  theme:any ;

  photo:any;
  id:string=this.activatedRouter.snapshot.params["id"];
  constructor(private fb: FormBuilder, private router:Router, private activatedRouter:ActivatedRoute,private formationService: FormationService,private themeService: ThemeService,private datePipe:DatePipe) {  }

  ngOnInit(): void {

    console.log("id from activate router ",this.id)
  


    this.formFormation = this.fb.group({
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      date_deDebut: ['', [Validators.required]],
      date_defin: ['', [Validators.required]],
    });
    this.formationService.getFormationbyId(this.id).subscribe(res=>{

  


      console.log("id from get by id here  ",new Date(res.data?.date_deDebut))
      this.formFormation.get("titre")?.setValue(res.data?.titre)
      this.formFormation.get("description")?.setValue(res.data?.description)
      this.formFormation.get("date_deDebut")?.setValue(this.datePipe.transform(new Date(res.data?.date_deDebut),"yyyy-MM-dd"))
      this.formFormation.get("date_defin")?.setValue(this.datePipe.transform(new Date(res.data?.date_defin),"yyyy-MM-dd"))
      this.photo=this.base_picture+res.data?.photo
     })

     this.formTheme = this.fb.group({
      idtheme: ['', [Validators.required]], 
      theme_titre: ['', [Validators.required]],  
      //formation: [this.id, [Validators.required]],
    });
    this.formTheme.patchValue({
      theme_titre: '',
     // formation: '',  
     

  })
  this.getUserById();
  this.getAll();

  }

  handleFileInput(e: any) {
    console.log("Fine Input Done ", e.target.files[0])
  
    this.fileToUpload = e.target.files[0]

  }


  EditFormation()  {
    console.log('Done ', this.formFormation.value);
    const formdata = new FormData();
    formdata.append("titre", this.formFormation.get('titre')!.value)
    formdata.append("description", this.formFormation.get('description')!.value)
    formdata.append("date_deDebut", this.formFormation.get('date_deDebut')!.value)
    formdata.append("date_defin", this.formFormation.get('date_defin')!.value)
    formdata.append("file", this.fileToUpload!);


    this.formationService.updateformation(this.id,formdata).subscribe((res) => {
      console.log("Add Done update ", res.data);
      if (res.status == 200) {
        Swal.fire('Good job!', 'You clicked the button!', 'success');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
    });

  }
  addTheme(): void {

    
    this.themeService.addTheme(this.formTheme.value,this.id).subscribe(
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
    getUserById(){
      this.themeService.getThemeById(this.id).subscribe(res=>{
    console.log(" data ",res.data);
   
   
    


})
}
getAll(){
  this.themeService.getAllThemes().subscribe(res=>{
   console.log("res theme : ",res.data)
  this.theme=res.data;
  })

}

  
}
