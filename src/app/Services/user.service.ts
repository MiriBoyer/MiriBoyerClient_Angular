import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, find } from "rxjs";
import { environment } from "src/environments/environment";
import { Child } from "../Model/Child";
import { User } from "../Model/User";

@Injectable({
    providedIn: 'root'
  })

export class UserService{
constructor(public http: HttpClient) { }
open:boolean=false;
countChild:number=0;
currentU=new BehaviorSubject<User>({Id:-1,FirstName:"",LastName:"",IdNumber:"",DOB:null,gender:"",HOM:"",Children: []});
baseRouteUrl = `${environment.baseUrl}User`

  getAllUsers() {
    return this.http.get<User[]>(this.baseRouteUrl);
  }
  getUserById(id:number) {
    return this.http.get<User>(`${this.baseRouteUrl}//${id}`);
  }
  addUser() {
    var o= this.http.post<User>(this.baseRouteUrl,this.currentU).subscribe(
      (succ)=>{console.log(succ)},
      (err) => { 
        console.log('-------------------------------------------------------------------------');
        console.log("Error all the fields are required but you didn't fill well all of them!!!");
        console.log('-------------------------------------------------------------------------');
      });
  }
  updateUser(id:number, user: User) {
    return this.http.put<User>(`${this.baseRouteUrl}/${id}`, user);
  }
  removeUser(id:number){
    return this.http.delete<User>(`${this.baseRouteUrl}/${id}`);
  }

  setInStorage(user){
    localStorage.setItem("currentU",JSON.stringify(user));
  }
  removeFromStoreage(){
    localStorage.removeItem("currentU");
  }
  getFromStorage(){
    let u=localStorage.getItem("currentU")
    return u==null? new BehaviorSubject<User>({Id:-1,FirstName:"",LastName:"",IdNumber:"",DOB:null,gender:"",HOM:"",Children: []}) :JSON.parse(u);
  }

  logout(){
    this.removeFromStoreage();
    this.currentU=new BehaviorSubject<User>
({Id:0,FirstName:"",LastName:"",IdNumber:"",DOB:null,gender:"זכר",HOM:"מכבי",Children: []});
  }
  isExsist(c:Child){
   return this.getFromStorage().Children.find((ch)=>{return ch.Name===c.Name&&ch.Password===c.IdNumber&&ch.DOB===c.DOB} )!=undefined;
  }
}