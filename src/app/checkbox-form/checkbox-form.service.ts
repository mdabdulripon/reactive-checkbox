import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CheckboxFormService {

	constructor() { }

	getMonths() {
		return [
			{ name: "January", value: "January", checked: true },
			{ name: "February", value: "February", checked: true },
			{ name: "March", value: "March", checked: true },
			{ name: "April", value: "April", checked: true },
			{ name: "May", value: "May", checked: true },
			{ name: "June", value: "June", checked: true },
			{ name: "July", value: "July", checked: true },
			{ name: "August", value: "August", checked: true },
			{ name: "September", value: "September", checked: true },
			{ name: "October", value: "October", checked: true },
			{ name: "November", value: "November", checked: true },
			{ name: "December", value: "December", checked: true }
		];
	}

	getDays() {
		return [
			{ key: 28, value: 28 },
			{ key: 29, value: 29 },
			{ key: 30, value: 30 },
			{ key: 31, value: 31 }
		];
	}
}
