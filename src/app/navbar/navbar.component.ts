import { Component , OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import { User } from '../shared/user.model';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(private breakpointObserver: BreakpointObserver) {}

  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"))
    console.log(this.user);
  }

  
}