import { myCart } from "./myCart";

export class MyCartList{
  constructor(private myCartList:[myCart]){}

  get totalPrice(){
    return this.myCartList.reduce((sum, item)=>{
      return sum+=item.price;
    },0)
  }
}