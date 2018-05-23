import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { Loan } from "../shared/loan.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  private loanUrl= 'http://10.51.144.46:8000/api/v1/';

  addLoan(loan:Loan):Observable<Loan>{
    console.log("Agreando prestamo con el servicio de loan " + this.loanUrl);
    return this.http.post<Loan>(this.loanUrl+"prestamos", loan, httpOptions)
    .pipe(
      tap((loan:Loan) =>{
        console.log(`Se generó el prestamo ${loan.id} para el usuario ${loan.usuario}`);
      }),
      catchError( error => Observable.throw(error))
    )
  }

  getLoanByUser(user:string):Observable<Loan[]>{
    console.log(this.loanUrl+"usuario/"+user+"/prestamos");
    return this.http
    .get<Loan[]>(this.loanUrl+"usuario/"+user+"/prestamos", httpOptions)
    .pipe(
        tap((loan:Loan[]) =>{
          console.log("Total de prestamos para el usuario "+ user +" es "+loan.length);
        }),
        catchError( error => Observable.throw(error))
      )
  }
  
}
