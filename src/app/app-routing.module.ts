import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberCreateComponent } from './member-create/member-create.component';

import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'Login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'MemberList',
    component: MemberListComponent,
    data: { title: 'MemberList' },
    canActivate: [AuthGuard]
  },
  {
    path: 'MemberCreate',
    component: MemberCreateComponent,
    data: { title: 'MemberCreate' },
    canActivate: [AuthGuard]
  }
];


@NgModule({
  imports: [ RouterModule.forRoot(
      appRoutes, { useHash: true }
    ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
