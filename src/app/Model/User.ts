import {Child} from './Child'
export class User{
    constructor(public Id:number,public FirstName :string 
        ,public LastName :string,public IdNumber:string 
        ,public DOB:Date  , public gender:string,  
          public HOM :string,public  Children: Array<Child>){}
}