import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from 'src/app/_services/formation.service';
import { ThemeService } from 'src/app/_services/theme.service';

import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  formFormation!: FormGroup;
  base_picture=environment.base_picture;
  fileToUpload: File | null = null;

  photo:any;
  id:any;
  constructor(private fb: FormBuilder, private router:Router, private activatedRouter:ActivatedRoute,private formationService: FormationService,private themeService: ThemeService) {
    console.log("id from activate router ",this.activatedRouter.snapshot.params["id"])
    this.id=this.activatedRouter.snapshot.params["id"];

   }

  ngOnInit(): void {
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
      this.formFormation.get("date_deDebut")?.setValue(new Date(res.data?.date_deDebut))
      this.formFormation.get("date_defin")?.setValue(new Date(res.data?.date_defin))
      this.photo=this.base_picture+res.data?.photo
     })
  }

  handleFileInput(e: any) {
    if(e.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any ) => {
        this.photo=event.target.result;
      }
    }

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
      console.log("Add Done ", res);
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


  
}
