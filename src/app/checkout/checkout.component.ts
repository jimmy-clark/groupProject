import { Component, OnInit } from '@angular/core';
import { Item, IItem } from '../home/home.modal';
import { HomeComponent } from '../home/home.component';
import { ToastService } from '../toast/toast.service';
import { ToastModule } from '../toast/toast.module';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartArray: Array<IItem> = [];

  HomeComponent: any;

  constructor() { }

  cart: Array<Item> = [];

  ngOnInit() {

    this.cartArray = [
      {
        sku: 123333,
        name: 'Coffee',
        price: 1.99,
        description: 'fdsa',
        quantity: 1
      },
      {
        sku: 222222,
        name: 'Cake',
        price: 3.99,
        description: 'fdsa',
        quantity: 1
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
  quantityPlusOne(cart: Item) {
    cart.quantity = cart.quantity + 1;
    return cart.quantity + 1;
  }
  quantityMinusOne(cart: Item) {
    if (cart.quantity > 0 ) {cart.quantity = cart.quantity - 1; }
  }
}
