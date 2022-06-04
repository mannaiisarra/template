import { Users } from 'src/app/model/users';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  formCategory !: FormGroup;
  fileToUpload: File | null = null;
 users:Users[] | undefined=[];
 base_picture=environment.base_picture;

 form: any = {
  username: null,
  email: null,
  password: null
};
isSuccessful = false;
isSignUpFailed = false;
errorMessage = '';
role:string;
  constructor(private fb: FormBuilder,private userService: UserService,private AuthService: AuthService,private router:Router) { }

  ngOnInit(): void {

    this.role = localStorage.getItem("role");
    console.log("role is :",this.role)
/*
    this.formValue = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      adress: ['', [Validators.required]],
    });
*/
this.formCategory = this.fb.group({
  username: ['', [Validators.required]],
  email: ['', [Validators.required]],
  password: ['', [Validators.required]],
  phone: ['', [Validators.required]],
  adress: ['', [Validators.required]],
  photo: ['', [Validators.required]],

});
    this.getAll();
  }

  //  addProduct() {
  //   console.log('Done ', this.formValue.value);
  //   const formdata = new FormData();
  //   formdata.append("username", this.formValue.get('username')!.value)
  //   formdata.append("email", this.formValue.get('email')!.value)
  //   formdata.append("phone", this.formValue.get('phone')!.value)
  //   formdata.append("adress", this.formValue.get('adress')!.value)

  //   //formdata.append("file", this.fileToUpload!);

  //   this.userService.register(formdata).subscribe((res) => {
  //     console.log("Add Done ", res);
  //     if (res.status == 200) {
  //       Swal.fire('Good job!', 'You clicked the button!', 'success');
  //       this.router.navigate(["Category"]);
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: 'Something went wrong!',
  //         footer: '<a href="">Why do I have this issue?</a>',
  //       });
  //     }
  //   });

  // }
/*
  onSubmit(): void {
    const { username, email, password ,phone,adress } = this.form;

    this.AuthService.register(username, email, password,phone,adress).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.getAll();
        Swal.fire('Good job!', 'You clicked the button!', 'success');

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
      
      
     
    );
  }
  */

  onSubmit(): void {
    console.log('Done ', this.formCategory.value);
    const formdata = new FormData();
    formdata.append("username", this.formCategory.get('username')!.value)
    formdata.append("email", this.formCategory.get('email')!.value)
    formdata.append("password", this.formCategory.get('password')!.value)
    formdata.append("phone", this.formCategory.get('phone')!.value)
    formdata.append("adress", this.formCategory.get('adress')!.value)
    formdata.append("file", this.fileToUpload!);  

    this.userService.addCategory(formdata).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.getAll();
        Swal.fire('Good job!', 'You clicked the button!', 'success');

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
      
      
     
     );

    }


    getAll(){
     this.userService.getAll().subscribe(res=>{
      console.log("res client : ",res.data)
     this.users=res.data;

     this.users= this.users.filter(item =>
      {
        return item.roles[0].name!== "FORMATEUR" && item.roles[0].name!=="APPRENANT";
      }
      );
     })
   }


   removeOrder(id:any){
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


  
  handleFileInput(e: any) {
    console.log("Fine Input Done ", e.target.files[0])

    this.fileToUpload = e.target.files[0]

  }

 



}

  

