import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login/login.service';
import { TokenStatus } from '../share/TokenStatus';

@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public newLoginService : LoginService) {
  }

  ngOnInit() {
  }

}
