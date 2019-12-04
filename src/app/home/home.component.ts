import { Component, OnInit } from '@angular/core';
import { Item } from './home.modal';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast/toast.service';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Array<Item> = [];

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private router: RouterModule,
    private appComponent: AppComponent
    ) { }

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
      this.toastService.showToast('danger', 3000, 'Name must not be blank!');
    } else {
    if (item.price === null || isNaN(item.price) === true) {
        this.toastService.showToast('danger', 3000, 'Price must be a number and not blank!');
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


