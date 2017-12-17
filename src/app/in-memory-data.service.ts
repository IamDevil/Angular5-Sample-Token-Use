import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		const login_data = {
			"token": {
				"name": "ken",
				"iat": 1482748545,
				"exp": 1482766545,
				"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2VuIiwiaWF0IjoxNDgyNzQ4NTQ1LCJleHAiOjE0ODI3NjY1NDV9.BxQ5Ex7hhzXTMhb3EPl-9MdjFVy1ZCKLrGb19beaFns"
			},
			"success": true,
			"message": ""
		};

		const member_data = {
			"data": [
				{
					"ID": 1,
					"name": "ken"
				},
				{
					"ID": 2,
					"name": "ken"
				},
				{
					"ID": 3,
					"name": "ken2"
				},
				{
					"ID": 4,
					"name": "ken3"
				}
			],
            "success": true,
			"message": ""
		}
		return { login: login_data, member: member_data };
	}
}
