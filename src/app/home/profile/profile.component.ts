import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/model/users';
import { environment } from 'src/environments/environment.prod';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fileToUpload: File | null = null;
  formUser!: FormGroup;
  base_picture=environment.base_picture;
  user:any;
  id:any;

  currentUser: any;
 //current: any;
  constructor(private token: TokenStorageService,private fb: FormBuilder, private router:Router, private activatedRouter:ActivatedRoute,private userService: UserService) { 
    console.log("id from activate router ",this.activatedRouter.snapshot.params["id"])
    this.id=this.activatedRouter.snapshot.params["id"];
  }
  

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  // this.current = this.token.getUser();
    //this.user = localStorage.getItem("auth-user");
   // this.roles = this.tokenStorage.getUser().roles;
       // localStorage.setItem("role",this.roles[0]);
  console.log("user in local storage is : ",this.currentUser.id)
  
     //this.users = res.data;
    //  this.formCategory.get("username")?.setValue(this.users?.username)
    //  this.formCategory.get("email")?.setValue(res.data?.email)
    //  this.formCategory.get("phone")?.setValue(res.data?.phone)
    //  this.formCategory.get("adress")?.setValue(res.data?.adress)
    //  this.formCategory.get("password")?.setValue(res.data?.password)
    //  this.photo=this.base_picture+res.data?.photo
   
    // this.formUser = this.fb.group({
    //   username: [this.currentUser.username, [Validators.required]],
    //   email: [this.currentUser.email, [Validators.required]],
    //   phone: [this.currentUser.phone, [Validators.required]],
    //   adress: [this.currentUser.adress, [Validators.required]],
    //   role: [this.currentUser.roles[0], [Validators.required]],
      //photo: ['', [Validators.required]],
      
   
  
    // })

    this.formUser = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      password: ['', [Validators.required]],
      
   
    });
    this.userService.getUser(this.currentUser.id).subscribe(res=>{
      console.log("id from get by id  ",res.data);
      this.user = res.data;

       this.formUser.patchValue({
         username: this.user.username,
         email: this.user.email,
         phone: this.user.phone,
         adress: this.user.adress,
         //password: this.user.password,
        

     })
 
  
  })
}

  EditUsers() {
    console.log('Done ', this.formUser.value);


    this.userService.updateUser(this.currentUser.id,this.formUser.value).subscribe((res) => {
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
