import { Component, OnInit } from '@angular/core';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(public userSer:UserService){}
  ngOnInit() {
    this.userSer.currentU.next(this.userSer.getFromStorage());
  }
  
  title = 'project';
}
