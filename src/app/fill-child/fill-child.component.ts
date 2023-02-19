import { Component, Input } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FloatLabelType } from '@angular/material/form-field';
import { Child } from '../Model/Child';
import { MatButtonModule } from '@angular/material/button';
import { ChildService } from '../Services/child.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { UserService } from '../Services/user.service';
@Component({
  selector: 'app-fill-child',
  templateUrl: './fill-child.component.html',
  styleUrls: ['./fill-child.component.scss']
})
export class FillChildComponent implements ErrorStateMatcher {

constructor(public userSer:UserService){}
  nameFormControl = new FormControl('', [Validators.required,Validators.pattern("^[ a-zA-Zא-ת]*$")]);
  passwordFormControl = new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$") ,Validators.maxLength(9), Validators.minLength(9)]);
  dateFormControl = new FormControl('', [Validators.required,Validators.pattern(/^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{4}$/)]);
  matcher = new MyErrorStateMatcher();
  @Input()
  child:Child;
  d:string;
   update:boolean;
ngOnInit() {
  this.update=this.child.Id==0?true:false;
  if(this.child!=null){
    this.d=this.child.DOB?.toString().slice(0,15);
  }
  if(this.d==null){    this.d="תאריך לידה";}
}
   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
     
    }
loginChild(c){
this.update=true;
this.d="תאריך לידה";
this.child.Id=0;
this.userSer.countChild++;
this.userSer.setInStorage(this.userSer.currentU);
this.userSer.currentU.next(this.userSer.currentU.value);
return true;
}
addEvent( event: MatDatepickerInputEvent<Date>) {
  this.child.DOB=event.value;
}
}
// ___________________________________________________________________
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
