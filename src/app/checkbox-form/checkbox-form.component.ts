import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from "@angular/forms";
import { of } from "rxjs";
import { CheckboxFormService } from './checkbox-form.service';

@Component({
	selector: 'app-checkbox-form',
	templateUrl: './checkbox-form.component.html',
	styleUrls: ['./checkbox-form.component.scss']
})
export class CheckboxFormComponent implements OnInit {

	public myForm: FormGroup;
	public monthLists = [];
	public daysLists = [];

	constructor(
		private _fb: FormBuilder,
		private _checkboxFormService: CheckboxFormService
	) {
		of(this._checkboxFormService.getMonths()).subscribe(items => {
			this.monthLists = items;
		});
		of(this._checkboxFormService.getDays()).subscribe(items => {
			this.daysLists = items;
		});
		this.myForm = this._fb.group({
			months: new FormArray([]),
			experience: this._fb.group({
				beginners: [""],
				intermediate: [""],
				advance: [""],
				master: [""]
			})
		});
	}

	ngOnInit() { }

	changeDays(event) {
		console.log(event.target.value);
	}

	toggleMonth(item) {
		/** 
		* TODO
		* I want all the select value fro month and day push to the months form array like the following 
		"months": [
		{"month": "January", "days": 31 },
		{"month": "February", "days": 30},
		{"month": "March", "days": 31},
		{"month": "April", "days": 30}
		........
		........
		]
		* ! Also if you dis- select a month you should remove the item from the months formArray
		*
		*/
	}

	save() {
		console.log(`Data:::`, this.myForm.value);
	}

}
