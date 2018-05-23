import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../shared/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private registerUrl= 'http://10.51.144.46:8000/api/v1/usuarios/';

  constructor(private http: HttpClient) { }

  addUser(user:User):Observable<User>{
    console.log("Invocando en servicio a " + this.registerUrl);
    return this.http.post<User>(this.registerUrl,user, httpOptions)
    .pipe(
      tap((user:User) =>{
        console.log(`Usuario ${user.usuario} agregado correctamente con id=${user.id}`);
      }),
      catchError( error => Observable.throw(error))
    )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      console.error(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
