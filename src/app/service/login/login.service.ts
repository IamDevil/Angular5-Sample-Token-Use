import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { TokenData } from '../../share/TokenData';
import { TokenStatus } from '../../share/TokenStatus';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {
	login_url = "http://172.104.110.249:7231/";
    refresh_toekn_url = "http://172.104.110.249:7231/refresh";
	token_status: TokenStatus;
    my_timer;

	constructor(private http: HttpClient, private router: Router) {
        this.token_status = JSON.parse(localStorage.getItem('TokenStatus'));
        this.laterRreshToken();
    }

    loginOut() {
        localStorage.removeItem('TokenStatus');
        this.token_status = null;
    }

	valid(account: string, password: string): Observable<TokenData> {
        let param = {
            name : account,
            pwd: password
        };

    	return this.http.post<TokenData>(this.login_url, param, httpOptions ).pipe(
			tap(_ => console.log('logined'))
		);
	}

    setToken(token_status : TokenStatus) {
        localStorage.setItem('TokenStatus', JSON.stringify(token_status));
        this.token_status = token_status;
        this.laterRreshToken();
    }

    laterRreshToken() {
        if(this.my_timer) {
            clearTimeout(this.my_timer);
        }

        if(this.token_status) {
            if(this.token_status.exp > this.token_status.iat + 60) { // 最後60秒
                this.my_timer = setTimeout(_ => { this.refreshToken() }, (this.token_status.exp - this.token_status.iat - 60) * 1000);
            }
            else if(this.token_status.exp > this.token_status.iat) { // 最後60秒內
                this.refreshToken();
            }
            else {
                this.router.navigate(['/Login']);
            }
        }
    }

	refreshToken() {
        let httpOptions = {
            headers: new HttpHeaders({ 'Authorization': this.getToken() })
        };

    	this.http.get<TokenData>(this.refresh_toekn_url, httpOptions ).pipe(
			tap(_ => console.log('refreshed'))
		).subscribe(TokenData => {
            if(TokenData.success) {
                this.setToken(TokenData.token);
            }
            else {
                this.router.navigate(['/Login']);
            }
        });
	}

    getToken(): string {
        return this.token_status && this.token_status.token || null;
    }
}
