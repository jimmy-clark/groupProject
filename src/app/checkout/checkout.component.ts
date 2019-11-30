import { Component, OnInit } from '@angular/core';
import { Item } from '../home/home.modal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor() { }

  cart: Array<Item> = [];

  ngOnInit() {
  }
  deleteItem(index: number) {
    this.cart.splice(index, 1);
    this.saveCartToLocalStorage(this.cart);
  }
  saveCartToLocalStorage(cart: Array<Item>) {
    const shoppingCart = localStorage.setItem('cart', JSON.stringify(cart));
    return shoppingCart;
  }
}
