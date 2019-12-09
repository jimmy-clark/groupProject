import { Component, OnInit } from '@angular/core';
import { Item, IItem } from '../home/home.modal';
import { ToastService } from '../toast/toast.service';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartArray: Array<IItem> = [];

  HomeComponent: any;

  constructor(
    private toastService: ToastService,
    private http: HttpClient,
    private router: RouterModule,
    private appComponent: AppComponent
  ) { }

  items: Array<Item> = [];

  async ngOnInit() {

    this.loadItems();

  }
  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.saveCartToLocalStorage(this.items);
  }
  saveCartToLocalStorage(items: Array<Item>) {
    const shoppingCart = localStorage.setItem('items', JSON.stringify(items));
    return shoppingCart;
  }
  quantityPlusOne(i: number) {
    this.items[i].quantity += 1;
    this.saveCartToLocalStorage(this.items);
  }
  quantityMinusOne(i: number) {
    if (this.items[i].quantity > 0) {
      this.items[i].quantity -= 1;
    } else {
      this.toastService.showToast('danger', 2500, 'Quantity cannot be below 0!');
      this.saveCartToLocalStorage(this.items);
    }
  }
  getItemsFromLocalStorage(key: string) {
    const savedItem = JSON.parse(localStorage.getItem(key));
    return savedItem;
  }
  async loadItems() {
    const savedItem = this.getItemsFromLocalStorage('items');
    if (savedItem && savedItem.length > 0) {
      this.items = savedItem;
      console.log('from checkout.loadItems()', savedItem);
    } else {
      this.items = await this.loadItemsFromFile();
    }
    this.sortBySKU(this.items);
  }
  sortBySKU(items: Array<Item>) {
    items.sort((prevItem: Item, presItem: Item) => {
      return prevItem.sku > presItem.sku ? 1 : -1;
    });
    return items;
  }
  async loadItemsFromFile() {
    const data0 = this.http.get('assets/items.json').toPromise();
    const data: any = await this.http.get('assets/items.json').toPromise();
    return data;
  }
  calculateTotal() {
    let owed = 0;
    let totalItems = 0;
    console.log(this.items.length);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.items.length; i++) { // loops through each item to add up the total owed
      if (this.items[i].quantity > 0) {
        owed += (this.items[i].price * this.items[i].quantity);
        totalItems += this.items[i].quantity;
      }
    }
    const roundedOwed = owed.toFixed(2);
    const salesTax: number = owed * 0.0795;
    const roundedSalesTax = salesTax.toFixed(2);
    const total = owed + salesTax;
    const totalRounded = total.toFixed(2);
    // navigate to payment // navigateTo() wont work
    return {
      numberOfItems: totalItems,
      subtotalDue: roundedOwed,
      salesTax: roundedSalesTax,
      totalDue: totalRounded

    };

  }
  readyForPayment() {
const data = this.calculateTotal();
localStorage.setItem('payment', JSON.stringify(data));
this.appComponent.navigateTo('payment');
  }
}
