import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor() { }
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let token_status = JSON.parse(localStorage.getItem('TokenStatus'));
		if (token_status) {
			request = request.clone({
				setHeaders: {
					'Authorization': token_status.token
				}
			});
		}
		return next.handle(request);
	}
}
