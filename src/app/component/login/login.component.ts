import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EventEmitter } from 'events';
import { AuthenticationService } from '../../services/authentication.service';
import { ProductsService } from 'src/app/modules/dashboard/services/products.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean;
  loginForm: FormGroup;
  loginSuccess = true;

  constructor(private router: Router, private formBuilder: FormBuilder, private auth: AuthenticationService, private service: ProductsService) { }

  onSubmit() {
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    if (this.loginForm.valid) {
      this.loading = true;
      if (email === 'upright@ccsi.org' && password === 'minda') {
        this.service.login()
          .subscribe(res => {
            console.dir(res);
            sessionStorage.setItem("activeUser", JSON.stringify(res));
            this.auth.authenticate();
            this.router.navigate(['/board']);
            this.loginForm.reset();
            this.loading = false;
          }, err => {
            this.loading = false;
            console.log(err);
            this.loginSuccess = false;
            alert("Login failed as we could not fetch the default Upright User data from our server because of a network failure");
          })

      } else {
        this.loginSuccess = false;
      }
    } else {

    }

  }

  ngOnInit() {
    this.loading = false;
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

}
