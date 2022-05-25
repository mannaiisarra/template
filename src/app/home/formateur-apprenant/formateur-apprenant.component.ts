import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/users';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formateur-apprenant',
  templateUrl: './formateur-apprenant.component.html',
  styleUrls: ['./formateur-apprenant.component.css']
})
export class FormateurApprenantComponent implements OnInit {
  users:Users[] | undefined=[];
  base_picture=environment.base_picture;
  formUser!: FormGroup;
  id:any;
  user:any;
  constructor(private fb: FormBuilder, private router:Router, private activatedRouter:ActivatedRoute,private userService: UserService) {
    console.log("id from activate router ",this.activatedRouter.snapshot.params["id"])
    this.id=this.activatedRouter.snapshot.params["id"];

   }

  ngOnInit(): void {
    this.getAll();
    this.formUser = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      //password: ['', [Validators.required]],
      
   
    });
    this.userService.getUser(this.id).subscribe(res=>{
      console.log("id from get by id  ",res.data);
      this.user = res.data;

       this.formUser.patchValue({
        id: this.user.id,
         username: this.user.username,
         email: this.user.email,
         phone: this.user.phone,
         adress: this.user.adress,
         //password: this.user.password,
        

     })
 
  
  })
}



  
  getAll(){
    this.userService.getAll().subscribe(res=>{
     console.log("res categories : ",res.data)
    this.users=res.data;
    })
  }
  removeUser(id:any){
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
        this.userService.removeUser(id).subscribe((item) => {
          console.log('item remove', item);
          this.getAll();
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
        });
      }
    });
  }
  EditUsers() {
    console.log('Done ', this.formUser.value);


    this.userService.updateUser(this.id,this.formUser.value).subscribe((res) => {
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
      this.router.navigateByUrl('/home/formateur_Apprenant')
    });

  }
}

