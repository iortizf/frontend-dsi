import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Loan } from "../shared/loan.model";
import { LoanService } from "../service/loan.service";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  displayedColumns = ['id','fecha', 'usuario', 'monto', 'plazo'];
  dataSource = new MatTableDataSource();

  constructor(private loanService:LoanService,
    public snackBar: MatSnackBar) { 
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  loans: Loan[];

  ngOnInit() {
    let usr = JSON.parse(localStorage.getItem("currentUser"))
    this.loanService.getLoanByUser(usr.id).subscribe(
      resp =>{
        this.loans = resp;
        this.dataSource.data = this.loans;
      },
      error =>{
        this.snackBar.open("Error al obtener los prestamos del usuario "+usr, "OK", {
          duration: 3000,
        });
      }
    );
  }
}