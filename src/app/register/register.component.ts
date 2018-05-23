import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from "../service/register.service";
import { User } from '../shared/user.model';
import {MatSnackBar} from '@angular/material';
import { Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hide:boolean=true;

  constructor(private formBuilder: FormBuilder,
     private registerService:RegisterService,
     public snackBar: MatSnackBar,
     public router: Router) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          name: ['', Validators.required],
          apaterno: ['', Validators.required],
          amaterno: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          pwd: ['', Validators.required ],
          pwdr: ['', Validators.required ]
      });
  }

  // Mucho mejor para obtener los campos del formulario
  get f() { return this.registerForm.controls; }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  register(values:any) {
      console.log("Entrando a registrar");
      if (this.registerForm.invalid) {
          return;
      }
      console.log(values);
      let user = new User();
      user.email = values.email;
      user.pass = values.pwd;
      user.usuario = values.name + " "+ values.apaterno + " "+ values.amaterno;

      this.registerService.addUser(user)
      .subscribe(user=>{
        console.log("Usuario agredado!!");
        this.openSnackBar(user.usuario +" registrado correctamente", "OK");
        console.log(user);
        this.router.navigate(["login"]);
      },error=>{
        console.error("Error en el servicio");
      }
      );      
  }

}
