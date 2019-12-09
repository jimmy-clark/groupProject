import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  HomeComponent: HomeComponent;
  data: any = {};
  constructor(private toastService: ToastService) { }

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
  this.toastService.showToast('success', 10000, `Thank You! Your change is ${leftOver}`);
  }
}
}
