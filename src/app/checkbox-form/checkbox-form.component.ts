import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
  FormArrayName
} from "@angular/forms";
import { of } from "rxjs";
import { CheckboxFormService } from "./checkbox-form.service";

@Component({
  selector: "app-checkbox-form",
  templateUrl: "./checkbox-form.component.html",
  styleUrls: ["./checkbox-form.component.scss"]
})
export class CheckboxFormComponent implements OnInit {
  public myForm: FormGroup;
  public monthLists = [];
  public daysLists = [];
  public dayLists = [];
  public experienceLists = [];
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
    of(this._checkboxFormService.getExperience()).subscribe(items => {
      this.experienceLists = items;
    });
  }

  ngOnInit() {
    this.myForm = this._fb.group({
      months: this._fb.array([]),
      experience: this._fb.group({
        beginners: [""],
        intermediate: [""],
        advance: [""],
        master: [""]
      })
    });

    for (let i = 0; i < 12; i++) {
      this.addMonthDay(this.monthLists[i].name, 30);
      this.dayLists.push(30);
    }
    console.log(this.myForm.value);
  }

  addMonthDay(monthName, day) {
    const monthArray = this.myForm.get("months") as FormArray;
    monthArray.push(
      new FormGroup({
        month: new FormControl(monthName),
        day: new FormControl(day)
      })
    );
  }

  changeDays(event, item) {
    var day = event.target.value;
    var month = item.value;
    this.changeDay(month, day);
    //this.myForm.value.months.push({ month: month, days: day });
  }

  changeDay(monthName, day) {
    var cnt = this.monthLists.length;
    for (let i = 0; i < cnt; i++) {
      var val = this.monthLists[i].value;
      var def = monthName;
      if (val === def) {
        if (this.myForm.value.months[i].month === def)
          this.myForm.value.months[i].day = day;
        this.dayLists[i] = day;
      }
    }
  }

  removeMonth(monthName) {
    var cnt = this.myForm.value.months.length;
    for (let i = 0; i < cnt; i++) {
      var val = this.myForm.value.months[i].month;
      var def = monthName;

      if (val === def) {
        console.log(val, def, i);
        const monthArray = this.myForm.get("months") as FormArray;
        monthArray.removeAt(i);
      }
    }
  }

  toggleMonth(item) {
    item.checked = !item.checked;
    if (item.checked === true) {
      //this.myForm.value.months.push({ month: item.value });
      var cnt = this.monthLists.length;
      for (let i = 0; i < cnt; i++) {
        var val = this.monthLists[i].value;
        var def = item.value;
        if (val === def) {
          this.addMonthDay(item.value, this.dayLists[i]);
        }
      }
    } else {
      this.removeMonth(item.value);
    }
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

  onRadioChange(event) {
    var i = 0;
    for (i = 0; i < 4; i++) {
      var val = event.value;
      var index = this.experienceLists[i].value;
      if (index === val) this.myForm.value.experience[index] = "true";
      else this.myForm.value.experience[index] = "false";
    }
  }

  save() {
    console.log(`Data:::`, this.myForm.value);
  }
}
