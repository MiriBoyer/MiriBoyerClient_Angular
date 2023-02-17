import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { Child } from "../Model/Child";

@Injectable({
    providedIn: 'root'
  })

export class ChildService{
constructor(public http: HttpClient) { }
  baseRouteUrl = `${environment.baseUrl}/Child`

  getAllChildren() {
    return this.http.get<Child[]>(`${this.baseRouteUrl}/Get`);
  }
  getChildById(id:number) {
    return this.http.get<Child>(`${this.baseRouteUrl}/GetById/${id}`);
  }
  // getChildByParentId(id:number) {
  //   return this.http.get<Child>(`${this.baseRouteUrl}/getChildByParentId/${id}`);
  // }
  addChild(c:Child) {
    return this.http.post<Child>(`${this.baseRouteUrl}/post`,c);
  }
  updateChild(id:number, child: Child) {
    return this.http.put<Child>(`${this.baseRouteUrl}/Put/${id}`, child);
  }
  delete(id:number) {
    return this.http.delete<Child>(`${this.baseRouteUrl}/Delete/${id}`);
  }
}