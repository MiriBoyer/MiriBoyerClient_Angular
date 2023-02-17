import { Component, Injectable, OnInit } from '@angular/core';
import { User } from '../Model/User';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {FloatLabelType} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../Services/user.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Child } from '../Model/Child';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})

export class FillFormComponent implements  OnInit ,ErrorStateMatcher {
//  user:User=new User(0,"","","",null,"זכר","",[]);
 d:string;fileName= 'ExcelSheet.xlsx';
  constructor(public userS:UserService){}

  nameFormControl = new FormControl('', [Validators.required,Validators.pattern("^[ a-zA-Zא-ת]*$")]);
  nameFormControl2 = new FormControl('', [Validators.required,Validators.pattern("^[ a-zA-Zא-ת]*$")]);
  passwordFormControl = new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$") ,Validators.maxLength(9), Validators.minLength(9)]);
  genderFormControl = new FormControl('', [Validators.required]);
  healthFundFormControl = new FormControl('', [Validators.required]);
  dateFormControl = new FormControl('', [Validators.required
    // ,Validators.pattern(/^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{4}$/)
  ]);
  matcher = new MyErrorStateMatcher();

  //אתחול
  ngOnInit() {
   
    // if(    (this.userS.currentU.value['Id']==-1||this.userS.currentU.value['Id']==undefined) &&  this.userS.getFromStorage()!=null ){
    //   console.log("enter");
    //   this.userS.currentU=this.userS.getFromStorage();
    //  } this.userS.currentU['Id']=0;


    if(this.userS.currentU!=null){
      console.log(this.userS.currentU["DOB"]);
      this.d=this.userS.currentU["DOB"]?.toString().slice(0,15);
    }
    if(this.d==null){    this.d="תאריך לידה";}
    if(this.userS.currentU["HOM"]==null){this.userS.currentU["HOM"]="מכבי";    }
    if( this.userS.currentU["gender"]==null){this.userS.currentU["gender"]="זכר";}
    if( this.userS.currentU["Children"]==null){this.userS.currentU["Children"]=[];}

  }
  //עבור בדיקות ולידציה
 isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean 
 {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
  //הוספת ילד למערך של האבא
  addChild(){
    this.userS.currentU["Children"]   .push(new Child(-1,"","",null));
  }
  //קבלת התאריך ועדכונו
  addEvent( event: MatDatepickerInputEvent<Date>) {
    this.userS.currentU["DOB"]=event.value;
  }
  login(o){
    this.d="תאריך לידה";

    this.userS.setInStorage(this.userS.currentU);
    this.userS.currentU.next(this.userS.currentU.value); 
    console.log("-----------------------");

    console.log(this.userS.currentU.value);
    console.log("-----------------------");

       this.userS.addUser();
  } 
  save(){
    this.d="תאריך לידה";
    this.userS.setInStorage(this.userS.currentU);
    this.userS.currentU.next(this.userS.currentU.value);
  }
  IsFullChild(){
  return this.userS.currentU['Children'].length===this.userS.countChild;
  }
  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }
    numOfChild(){
      return this.userS.currentU["Children"].length;
    }
}


//________________________________________________________
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
