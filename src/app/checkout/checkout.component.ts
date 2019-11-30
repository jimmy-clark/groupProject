import { Component, OnInit } from '@angular/core';
import { Item } from '../home/home.modal';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartArray: Array<any> = [];


  constructor() { }

  cart: Array<Item> = [];

  ngOnInit() {
    this.cartArray = [
      {
        SKU: 123333,
        Item: 'Coffee',
        Price: 1.99,
        Description: 'fdsa',
        Quantity: 1
      },
      {
        SKU: 222222,
        Item: 'Cake',
        Price: 3.99,
        Description: 'fdsa',
        Quantity: 1
      }
    ];
    // I wrote this just to see how the table would look like. You can delete it.
  }
  deleteItem(index: number) {
    this.cart.splice(index, 1);
    this.saveCartToLocalStorage(this.cart);
  }
  saveCartToLocalStorage(cart: Array<Item>) {
    const shoppingCart = localStorage.setItem('cart', JSON.stringify(cart));
    return shoppingCart;
  }
