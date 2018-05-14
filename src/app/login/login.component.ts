import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginInput') loginInput: ElementRef<HTMLInputElement>;

  statuslogin: any;
  focusin: boolean = true;
  rForm: FormGroup;
  post: any;
  usernameAlert: string = "Please fill username";
  passwordAlert: string = "Please fill password";
  loginAlert: string;
  loginError: boolean = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private loginService: LoginService,
    public router: Router
  ) {
    this.rForm = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }
  ngOnInit() {
    this.loginService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/index';
  }

  ngAfterViewInit() {
    this.loginInput.nativeElement.focus();
  }

  addPost(post) {
    this.loginService.login(post).subscribe(
      res => {
        if (res.status == true) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.loginError = true
          this.loginAlert = res.message;
        }
      },
      err => {
        return err;

      }
    );

  }
}
