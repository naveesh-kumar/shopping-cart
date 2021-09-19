import { myCart } from "./myCart";

export interface User{
  id:number,
  username:string,
  password:string,
  myProducts?:[myCart]
}