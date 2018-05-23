import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from '../service/login.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError:boolean=false;
  hide:boolean=true;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {
    this.loginForm = fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      pwd: [null, Validators.required],
    });
  }

  get f(){return this.loginForm.controls;}


  @ViewChild('loginInput') loginInput: ElementRef<HTMLInputElement>

  ngOnInit() {
    this.loginService.logout();
  }

  ngAfterViewInit() {
    this.loginInput.nativeElement.focus();
  }

  register(){
    this.router.navigate(["register"]);
  }

  login(data) {
    console.log("Haciendo login");
    console.log("Usuario="+data.email +" Contraseña="+data.pwd);
    this.loginService.login(data.email.trim(), data.pwd.trim()).subscribe(
      res => {
        this.router.navigate(["home"]);
      },
      err => {
        this.snackBar.open("Usuario o contraseña son incorrectos", "OK", {
          duration: 3000,
        });
      }
    );
  }
}
