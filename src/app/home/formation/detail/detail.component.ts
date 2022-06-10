import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from 'src/app/_services/formation.service';
import { ThemeService } from 'src/app/_services/theme.service';
import { Theme } from 'src/app/model/theme';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { StepsService } from 'src/app/_services/steps.service';

import { environment } from 'src/environments/environment.prod';
import { DemandeService } from 'src/app/_services/demande.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  formFormation!: FormGroup;
  formuserToFormation!: FormGroup;
  formTheme!: FormGroup;
  formEmail!: FormGroup;
  term:string="";
  listUser:any;
  
  base_picture=environment.base_picture;
  fileToUpload: File | null = null;
  theme:any ;
 theme1:any ;
  photo:any;
  user:any
  id:string=this.activatedRouter.snapshot.params["id"];
  step = 0;
  demande:any
  panelOpenState = false;

  constructor(private fb: FormBuilder, private router:Router, private activatedRouter:ActivatedRoute,private formationService: FormationService,private themeService: ThemeService,private datePipe:DatePipe,private userService:UserService,private authService:AuthService ,private demandeService:DemandeService,private stepsService:StepsService ) {  }

  ngOnInit(): void {

    console.log("id from activate router ",this.id) 


    this.formFormation = this.fb.group({
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date_deDebut: ['', [Validators.required]],
      date_defin: ['', [Validators.required]],
      photo: ['', [Validators.required]],
    });
    this.formationService.getFormationbyId(this.id).subscribe(res=>{
  


      console.log("id from get by id here  ",new Date(res.data?.date_deDebut))
      this.formFormation.get("titre")?.setValue(res.data?.titre)
      this.formFormation.get("description")?.setValue(res.data?.description)
      this.formFormation.get("date_deDebut")?.setValue(this.datePipe.transform(new Date(res.data?.date_deDebut),"yyyy-MM-dd"))
      this.formFormation.get("date_defin")?.setValue(this.datePipe.transform(new Date(res.data?.date_deDebut),"yyyy-MM-dd"))
      this.photo=this.base_picture+res.data?.photo
      this.formFormation.get("photo")?.setValue(this.base_picture+res.data?.photo)

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

  this.formEmail = this.fb.group({
  
    email: ['', [Validators.required]],
  

  });

this.getThemeByFormationn();


this.search();

  }


  

  /**************************************************End ngOnInit **************************************************************/
/************ get theme by id **********/
getThemeById(id:any){
  this.themeService.getThemeById(id).subscribe(res=>{
    console.log("theme by idddd  ",res.data);
    this.theme1 = res.data;
  
     this.formTheme.patchValue({
      id: this.theme1.id,
      theme_titre: this.theme1.theme_titre, })

  })

}
/************* get theme by id ************/



  handleFileInput(e: any) {
    // if(e.target.files){
    //   var reader=new FileReader();
    //   reader.readAsDataURL(e.target.files[0]);
    //   reader.onload=(event:any ) => {
    //     this.photo=event.target.result;
    //   }
    // }
    console.log("Fine Input Done ", e.target.files[0])

    this.fileToUpload = e.target.files[0]

  }
/*********** update formation  **********/

  EditFormation()  {
    console.log('Done ', this.formFormation.value);
    const formdata = new FormData();
    formdata.append("description", this.formFormation.get('description')!.value)
    formdata.append("file", this.fileToUpload!)
    formdata.append("date_deDebut", this.formFormation.get('date_deDebut')!.value)
    formdata.append("date_defin", this.formFormation.get('date_defin')!.value)
    formdata.append("titre", this.formFormation.get('titre')!.value);



    this.formationService.updateformation(this.id,formdata).subscribe((res) => {
      console.log("Add Done ", res.data);
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

  /******** end update formation ******/

  /********** Ajouter theme ************/
  addTheme(): void {

    
    this.themeService.addTheme(this.formTheme.value,this.id).subscribe(
      data => {
        console.log(data);
       this.getThemeByFormationn();
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
    getThemeByFormationn(){
      this.themeService.getThemeByFormation(this.id).subscribe(res=>{
     
    console.log(" Get Theme By Formation ",res.data);
    this.theme = res.data;
   
   
    // this.stepsService.getEtapeByTheme(this.theme.id).subscribe(tes=>{
    //   console.log(" etape by theme ",tes.data);
  
  
    // })


})
}
  /********** end Ajouter theme ************/

 

    /********** delate theme By id ************/
removeTheme(id:any){
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
      this.themeService.removeTheme(id).subscribe((item) => {
        console.log('item remove', item);
        this.getThemeByFormationn();
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      });
    }
  })
}
 /********** END  delate theme By id ************/


  /**********   update theme By id ************/


EditTheme() {



  this.themeService.updateTheme(this.theme1.id,this.formTheme.value).subscribe((res) => {
    console.log("Add Done ", res);
    if (res.status == 200) {
      Swal.fire('Good job!', 'You clicked the button!', 'success');
      this.getThemeByFormationn();
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
 /********** END  update theme By id ************/


  search(): void {
  //const formdata = new FormData();
  //formdata.append("email", this.formEmail.get('email')!.value);
    
  this.userService.getAll().subscribe(
    resAllUser => {
      console.log("ddddddddddddddddddddddddddddddddza",resAllUser.data);
    this.user=resAllUser.data

    this.user= this.user.filter(item =>
      {
        return item.roles[0].name!== "ADMIN" &&   item.roles[0].name!== "SUPADMIN" && item.roles[0].name!== "FORMATEUR";
      }
      );
      // this.user= this.user.filter(item =>
      //   {
      //     array1.forEach(element => console.log(element));

      //   }
      //   );
      this.demandeService.getActive(this.id).subscribe(
        res => {
          console.log(res.data);
          this.listUser=res.data;  
          console.log("list user deja ajouter : ",this.listUser);     
            this.listUser.forEach(element =>{
    
              console.log("user ajouter is ",element.users.id);
              console.log("user all is ",this.user);
    
              this.user = this.user.filter( item=>{
                console.log("filtre condition ",item.id !== element.users.id);
                return item.id !== element.users.id  ;
                 })              
            } )  
          }
          
          )
    

    },

    
    
   
   );

  
  
  }
  /*
  listOfUsersAjouter() {
  
      
    this.demandeService.getformationAjouter(this.id).subscribe(
      res => {
        console.log(res.data);
        this.listUser=res.data;

        console.log("list user deja ajouter : ",this.listUser);

        console.log("")

        //this.listAprenantDejaParticipe.foreach(element => this.listUser.filter(item => return item.users.id !== element.id))
  
          this.listUser.forEach(element =>{
            console.log("user ajouter is ",element.users.id);

            this.listUser.filter( item=>{
              console.log("itemmm here",item);
              return  item.users.id !== element.users.id
               })
            
          }         
           
            

          )
   
      
      
          
    
    
  
  
        }
        
        )}
  
  

*/

addUserToFormation(users_id:any): void {

  this.formuserToFormation = this.fb.group({
    active: ['True', [Validators.required]], 
    date_de_demande: ['', [Validators.required]],  
    //formation: [this.id, [Validators.required]],
  });
  this.formTheme.patchValue({
    active: 'True',
    date_de_demande: '',       

})

    
  this.demandeService.addDemande(this.formuserToFormation.value,this.id,users_id).subscribe(
    data => {
      console.log(data);
      this.search();
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

removeUserByDemabde(id:any){
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
      this.demandeService.removeDemande(id).subscribe((item) => {
        this.search() ;
        console.log('item remove', item);
        
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      });
    }
  });
}




}