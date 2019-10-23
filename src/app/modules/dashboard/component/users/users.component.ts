import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userData: any = {};
  loading: boolean;
  constructor(private service: ProductsService, private builder: FormBuilder) {
    this.loading = true;
  }

  getUsers() {
    this.loading = true;
    this.service.getUsers().subscribe(res => {
      this.loading = false;
      this.userData = res;
    }, err => {
      this.loading = false;
      alert("Ooop a network error occcured and users couldn't be retrieved");
      console.dir(err);
    })
  }

  ngOnInit() {
    this.getUsers();
  }

}
