export type CartItem = {
    id:string,
    title:string,
    type:string,
    price:number,
    count:number,
    imageUrl:string,
    size:number
}
  
export interface CartSliceState {
    totalPrice:number;
    items:CartItem[]
}
  