import { Component, OnInit } from '@angular/core';
import { Item, IItem } from '../home/home.modal';
import { ToastService } from '../toast/toast.service';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient
  ) { }

  items: Array<Item> = [];

  async ngOnInit() {

    this.loadItems();

    // I wrote this just to see how the table would look like. You can delete it.
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
  }
  quantityMinusOne(i: number) {
    if (this.items[i].quantity > 0) {
    this.items[i].quantity -= 1;
    } else {
      this.toastService.showToast('danger', 2500, 'Quantity cannot be below 0!');
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
    if (this.items.length > 0) {
      let total = 0;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.items.length - 1; i++) {

        if (this.items[i].quantity >= 0 && this.items[i].quantity !== null) {
          total = this.items[i].quantity * this.items[i].price;
        }
        console.log('from calculate>>>>>>>>>>>>>>', total);
        return total;
      }
    } else {
      this.toastService.showToast('danger', 5000, 'cart empty');
    }
  }
}
