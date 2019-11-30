import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartArray: Array<any> = [];


  constructor() { }

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
}
