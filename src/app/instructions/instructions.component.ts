import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {
  userName:string="";
constructor(public userSer:UserService){}
  ngOnInit() {
    this.userName=this.userSer?.currentU["FirstName"]+" "+this.userSer?.currentU["LastName"]
  }
  logout(){
    this.userSer.logout();
    }

}
