import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ThemeService } from 'src/app/_services/theme.service';
import { Theme } from 'src/app/model/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent implements OnInit {
  formTheme!: FormGroup;
  theme:Theme[] | undefined=[];
  constructor(private themeService: ThemeService,private fb: FormBuilder, private router:Router) { }
 

  ngOnInit(): void {
    this.formTheme = this.fb.group({
      theme_titre: ['', [Validators.required]],

    });
    this.formTheme.patchValue({
      theme_titre: '',
  
     

  })

  }
  
  // addTheme(): void {

    
  //   this.themeService.addTheme(this.formTheme.value).subscribe(
  //     data => {
  //       console.log(data);
       
  //       Swal.fire('Good job!', 'You clicked the button!', 'success');

  //     },
  //     err => {
      
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: 'Something went wrong!',
  //         footer: '<a href="">Why do I have this issue?</a>',
  //       });
  //     }
      
      
     
  //    );

  //   }
 


}
