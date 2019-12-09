import { Component, OnInit } from '@angular/core';
import { Item, IItem } from '../home/home.modal';
import { ToastService } from '../toast/toast.service';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  HomeComponent: HomeComponent;
  data: any = {};
  constructor(
    private toastService: ToastService,
    private http: HttpClient,
    private router: RouterModule
    ) { }

  async ngOnInit() {
    this.data = await JSON.parse(localStorage.getItem('payment'));
  }
change(outOf: number) {
  const totalDue = this.data.totalDue;
  const leftOver = outOf - totalDue;
  if (totalDue > outOf) {
    this.toastService.showToast('danger', 3000, `insufficent amount, still need ${leftOver * -1}`);
  } else {
  console.log(leftOver);
  // turn this into a flex modal
  // then navigate to item editor
  this.toastService.showToast('success', 10000, `Thank You! Your change is ${leftOver}`);
  }
}
}
