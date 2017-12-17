import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../service/login/login.service';
import { TokenData } from '../share/TokenData';
import { TokenStatus } from '../share/TokenStatus';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: []
})
export class LoginComponent implements OnInit {
  account : string = "ken";
  password : string = "hello";

  constructor(private router: Router, private newLoginService : LoginService) { }

  ngOnInit() {
      this.newLoginService.loginOut();
  }

  userValid() {
      this.newLoginService.valid(this.account, this.password)
      .subscribe(TokenData => {
          if(TokenData.success) {
              this.newLoginService.setToken(TokenData.token);
              this.router.navigate(['MemberList']);
          }
          else {
              alert('登入失敗');
          }
      });
  }
}
