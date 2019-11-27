import { Component, OnInit } from '@angular/core';
import { Item } from './home.modal';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Array<Item> = [];

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.loadItems();
  }
  async loadItems() {
    const savedItem = this.getItemsFromLocalStorage('items');
    if (savedItem && savedItem.length > 0) {
      this.items = savedItem;
    } else {
      // not sure why this error is happening
      this.items = await this.loadItemsFromFile();
    }
    this.sortBySKU(this.items);
  }
  async loadItemsFromFile() {
    const data0 = this.http.get('assets/items.json').toPromise();
    console.log('datq a---.', data0);
    const data: any = await this.http.get('assets/items.json').toPromise();
    return data;
  }
  getItemsFromLocalStorage(key: string) {
    const savedItem = JSON.parse(localStorage.getItem(key));
    return savedItem;
  }
  saveItem(item: Item) {
   item.editing = false;
   this.saveItemsToLocalStorage(this.items);
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
  this.items.unshift(new Item({}));
}
deleteItem(index: number) {
  this.items.splice(index, 1);
  this.saveItemsToLocalStorage(this.items);
}
}
