import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../shared/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private registerUrl= 'http://10.51.144.46:8000/api/v1/';
  
  constructor(private http: HttpClient) { }
  
  login(email:string, pwd:string): Observable<User> {
    console.log("Invocando servicio de login url="+this.registerUrl+"usuarios/"+email+"/"+pwd);
    return this.http
    .get<User>(this.registerUrl+"usuarios/"+email+"/"+pwd, httpOptions)
    .pipe(
        tap((user:User) =>{
          console.log("Usuario "+ user.usuario + " encontrado, guardando en session");
          localStorage.setItem('currentUser', JSON.stringify(user));
        }),
        catchError( error => Observable.throw(error))
      )
  } 
  logout() {
    localStorage.removeItem('currentUser');
  }
}
