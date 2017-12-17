import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LoginService} from '../login/login.service';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MemberData } from '../../share/MemberData';
import { ResponseData } from '../../share/ResponseData';

@Injectable()
export class MemberService {
  member_url = "/member";
  constructor(private newLoginService : LoginService, private http: HttpClient) { }

  getMember(): Observable<MemberData> {
      let httpOptions = {
          headers: new HttpHeaders({ 'Authorization': this.newLoginService.getToken() })
      };

      return this.http.get<MemberData>(this.member_url, httpOptions).pipe(
          tap(_ => console.log('get Member List'))
      );
    }

  addMember(name) {
      let httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': this.newLoginService.getToken() })
      };

      let param = {
          'name' : name
      }
      return this.http.post<ResponseData>(this.member_url, param, httpOptions).pipe(
          tap(_ => console.log('Added Member'))
      );
  }
}
