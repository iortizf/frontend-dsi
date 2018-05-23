import { Component, OnInit } from '@angular/core';
import { LoanService } from "../service/loan.service";
import { MatSnackBar } from '@angular/material';
import { Loan } from "../shared/loan.model";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addloan',
  templateUrl: './addloan.component.html',
  styleUrls: ['./addloan.component.css']
})
export class AddloanComponent implements OnInit {

  newLoanForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loanService:LoanService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.newLoanForm = this.formBuilder.group({
      monto: ['', Validators.required],
      plazo: ['', Validators.required]
  });
  }

  // Mucho mejor para obtener los campos del formulario
  get f() { return this.newLoanForm.controls; }

  addLoan(newLoanForm){
    console.log("Registrando prestamo");   
    if (newLoanForm.invalid) {
      console.log("Form no válido");
      return;
    }
    console.log(newLoanForm)
    let usr = JSON.parse(localStorage.getItem("currentUser"))
    let currentDate = new Date();
    let newLoan = new Loan();
    newLoan.monto = newLoanForm.monto;
    newLoan.plazo = newLoanForm.plazo;    
    newLoan.usuario = usr.id;
    newLoan.fecha = currentDate.getDay()+"/"+currentDate.getMonth()+"/"+currentDate.getFullYear();

    console.log("Fecha:"+ newLoan.fecha);

    this.loanService.addLoan(newLoan).subscribe(
      resp =>{
        this.snackBar.open("Se generó el siguiente prestamo"+ resp.id+" con monto "+ resp.monto+" a "+ resp.plazo+" plazos", "OK", {
          duration: 3000,
        });
      },
      error =>{
        this.snackBar.open("Error en el servicio de prestamos", "OK", {
          duration: 3000,
        });
      }
    );
  }

}
