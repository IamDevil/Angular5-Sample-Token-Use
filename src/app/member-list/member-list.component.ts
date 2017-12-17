import { Component, OnInit } from '@angular/core';
import { MemberService } from '../service/member/member.service';

import { MemberData } from '../share/MemberData';
import { Member } from '../share/Member';

@Component({
	selector: 'app-member-list',
	templateUrl: './member-list.component.html',
	styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
	member_list: Member[] = [];

	constructor(private newMemberService: MemberService) { }

	ngOnInit() {
		this.newMemberService.getMember().subscribe(MemberData => {
			if (MemberData.success) {
				this.member_list = MemberData.data;
			}
		});
	}

}
