import { Component, OnInit } from '@angular/core';
import { MemberService } from '../service/member/member.service';

import { ResponseData } from '../share/ResponseData';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.scss']
})
export class MemberCreateComponent implements OnInit {

  constructor(private newMemberService: MemberService) { }

  ngOnInit() {
  }

  addMember( name ) {
      this.newMemberService.addMember(name)
      .subscribe(ResponseData => {
          if(ResponseData.success) {
              alert('新增成功');
          }
          else {
              alert('新增失敗');
          }
      });
  }
}
