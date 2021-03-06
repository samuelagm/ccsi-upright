import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  collapsed: boolean;
  constructor(private router: Router, private auth: AuthenticationService) {
    this.collapsed = true;
  }

  ngOnInit() {
  }

  public logout() {
    this.auth.logoutUser();
    this.router.navigate(['']);
  }
}
