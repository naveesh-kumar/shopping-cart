import { Product } from "./product";

export class myCart{
  
  constructor(public product:Product, public qty:number, public size:string, public price:number){}

}