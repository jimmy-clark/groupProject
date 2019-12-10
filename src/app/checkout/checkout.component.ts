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
    this.updateSubtotal();
  }
  quantityMinusOne(i: number) {
    if (this.items[i].quantity > 0) {
      this.items[i].quantity -= 1;
      this.saveCartToLocalStorage(this.items);

    } else {
      this.toastService.showToast('danger', 2500, 'Quantity cannot be below 0!');
    }
    this.updateSubtotal();
  }
  getItemsFromLocalStorage(key: string) {
    const savedItem = JSON.parse(localStorage.getItem(key));
    return savedItem;
  }
  async loadItems() {
    const savedItem = this.getItemsFromLocalStorage('items');
    if (savedItem && savedItem.length > 0) {
      this.items = savedItem;
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
    let Disable1 = false;
    let Disable5 = false;
    let Disable10 = false;
    let Disable20 = false;
    let Disable50 = false;
    let Disable100 = false;
    if (total > 1) {
      Disable1 = true;
    }
    if (total > 5) {
      Disable5 = true;
    }
    if (total > 10) {
      Disable10 = true;
    }
    if (total > 20) {
      Disable20 = true;
    }
    if (total > 50) {
      Disable50 = true;
    }
    if (total > 100) {
      Disable100 = true;
    }
    return {
      numberOfItems: totalItems,
      subtotalDue: roundedOwed,
      salesTax: roundedSalesTax,
      totalDue: totalRounded,
      one: Disable1,
      five: Disable5,
      ten: Disable10,
      twenty: Disable20,
      fifty: Disable50,
      hundred: Disable100

    };

  }
  readyForPayment() {
const data = this.calculateTotal();
localStorage.setItem('payment', JSON.stringify(data));
this.appComponent.navigateTo('payment');
  }
  removeFromCart(index: number) {
    this.items[index].quantity = 0;
    this.saveCartToLocalStorage(this.items);
  }
  updateSubtotal() {
    for (let i = 0; this.items.length > 0; i++) {
    if (this.items[i].quantity > 0) {
     const newSubtotal = this.items[i].price * this.items[i].quantity;
     this.items[i].subTotal = newSubtotal;
    }}}
isCartEmpty() {
    let cartEmpty: boolean;
    for (let i = 0; this.items.length > 0; i++) {
      if (this.items[i].quantity > 0) {cartEmpty = false;
      } else {cartEmpty = true; }
      }
    return cartEmpty;
  }
}
