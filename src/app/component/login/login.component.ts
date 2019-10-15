import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EventEmitter } from 'events';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginSuccess = true;

  constructor(private router: Router, private formBuilder: FormBuilder, private auth: AuthenticationService) { }

  onSubmit() {
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    if (this.loginForm.valid) {
      if (email === 'upright@ccsi.org' && password === 'minda') {
        this.auth.authenticate();
        this.router.navigate(['/board']);
      } else {
        this.loginSuccess = false;
        this.loginForm.reset();
      }
    } else {

    }

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

}
