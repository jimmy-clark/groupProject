import { Component, OnInit } from '@angular/core';
import { Item } from './home.modal';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast/toast.service';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { FlexModalService } from '../shared-components/flex-modal/flex-modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Array<Item> = [];
  disableFinish = false;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private router: RouterModule,
    private appComponent: AppComponent,
    private flexModal: FlexModalService
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
    if (item.name === null || item.name === '' || item === null) {
      this.errorMessage = 'Name cannot be blank!';
      this.flexModal.openDialog('error-modal', null);
    } else {
     if (isNaN(item.price) === true) {
      this.errorMessage = 'The price must be a number!';
      this.flexModal.openDialog('error-modal', null);
     } else {
      if (item.price === null) {
        this.errorMessage = 'The price cannot be blank!';
        this.flexModal.openDialog('error-modal', null);
      } else {
        this.toastService.showToast('success', 3000, 'Save Successful');
        item.editing = false;
        this.saveItemsToLocalStorage(this.items);
        this.disableFinish = false;
      }
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
    this.disableFinish = true;
  }
  sendToCheckout() {
    this.appComponent.navigateTo('checkout');
  }
}


