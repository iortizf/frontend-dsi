import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable} from 'rxjs'
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = 'http://localhost:3269/api/';
  constructor(private http: Http) { }
  login(post): Observable<any> {
 
    console.log(post);
    const getLoginUrl = this.url + 'get/login/' + post['username'] + '/' + post['password'];
    return this.http
      .get(getLoginUrl, {})
      .pipe(map(
      res => {
        if (res.json().status == true) {
          localStorage.setItem('currentUser', JSON.stringify(res.json().data));
        }
        return res.json();
      },
      err => {
        return err;
      }))
  }
 
  logout() {
    localStorage.removeItem('currentUser');
  }
  getItem(): Observable<any> {
    const getItemUrl = this.url + 'get/item/list';
    return this.http
      .get(getItemUrl, {})
      .pipe(map(
      res => {
        return res.json();
      },
      err => {
        return err;
      }))
  }
}
