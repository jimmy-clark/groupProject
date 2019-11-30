import { Component, OnInit } from '@angular/core';
import { Item, IItem } from './home.modal';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Array<Item> = [];

  constructor(private http: HttpClient, private toastService: ToastService) { }

  async ngOnInit() {
    this.loadItems();
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
  async loadItemsFromFile() {
    const data0 = this.http.get('assets/items.json').toPromise();
    const data: any = await this.http.get('assets/items.json').toPromise();
    return data;
  }
  getItemsFromLocalStorage(key: string) {
    const savedItem = JSON.parse(localStorage.getItem(key));
    return savedItem;
  }

  saveItem(item: Item) {
    if (item.name === null || item.name === '') {
      this.toastService.showToast('alert', 'Name must not be blank!', 3000);
      alert('Name must not be blank!');
    } else {
    if (item.price === null) {
        // need validation that item.price is <number>
        this.toastService.showToast('alert', 'Price must not be blank!', 3000);
        alert('Price must not be blank!');
      } else {
      item.editing = false;
      this.saveItemsToLocalStorage(this.items);
      }
    }

  }
  sortBySKU(items: Array<Item>) {
    items.sort((prevItem: Item, presItem: Item) => {
      return prevItem.sku > presItem.sku ? 1 : -1;
    });
    return items;
  }
  saveItemsToLocalStorage(items: Array<Item>) {
    items = this.sortBySKU(items);

    const savedItem = localStorage.setItem('items', JSON.stringify(items));
    return savedItem;
  }
  addItem() {
    this.items.unshift(new Item({
    sku: Math.floor(Math.random() * 999999 + 100000)
    }));
}

  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.saveItemsToLocalStorage(this.items);
  }

  randomSKU() {
    let randomSKU = 0;
    randomSKU = (Math.random() * 100000) + 10000000;
    return randomSKU;

  }
editItem(item: Item) {
  item.editing = true;
}

}

