import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LoginService} from '../login/login.service';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MemberData } from '../../share/MemberData';
import { ResponseData } from '../../share/ResponseData';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MemberService {
  member_url = "http://172.104.110.249:7231/member";
  constructor(private http: HttpClient) { }

  getMember(): Observable<MemberData> {

      return this.http.get<MemberData>(this.member_url).pipe(
          tap(_ => console.log('get Member List'))
      );
    }

  addMember(name) {
      let param = {
          'name' : name
      }
      return this.http.post<ResponseData>(this.member_url, param, httpOptions).pipe(
          tap(_ => console.log('Added Member'))
      );
  }
}
