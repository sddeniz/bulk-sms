import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/firebase/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-register-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss']
})
export class RegisterSimpleComponent implements OnInit {

  public show: boolean = false;
  public signUpForm: FormGroup;
  public errorMessage: any;
  public body:any = {};

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
  ) { 
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  showPassword() {
    this.show = !this.show;
  }

  signup() {
    console.log("121212", this.signUpForm.value['firstName'])
    this.body = {
      'firstName': this.signUpForm.value['firstName'],
      'lastName': this.signUpForm.value['lastName'],
      'email': this.signUpForm.value['email'],
      'password': this.signUpForm.value['password'],
    }
    console.log("BODY", this.body);
    this.authService.signup(this.body);
  }

}
