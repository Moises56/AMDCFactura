import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormControl, Validators,  } from '@angular/forms';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Authenticationrequest } from './param/AuthenticationRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule ]
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  screen: any = 'signin';

  form: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });
  

  isLoading: boolean = false;
  isToastOpen: boolean = false;
  toastMessage = "Welcome to Facturación App!";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  change(event: any){
    this.screen = event;
  }
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  login(){
    var request: Authenticationrequest = new Authenticationrequest(
      this.form.get("username")?.value, 
      this.form.get("password")?.value
    );
      
    if(this.form.valid){
      console.log("Login request: ", request);
      // this.authenticationService.userLogin(request).then(()=>{
      //   //todo Validate token expiry before redirect
      //   if(this.authenticationService.isAuthenticated()){
      //   this.authenticationService.redirectTo('/tabs/dashboard');
      //  }
      // });
    }  
  }

  onSubmit(): void {
    console.log(this.form.value);
  }

}
