import { Component, OnInit } from '@angular/core';
import { Item, IItem } from '../home/home.modal';
import { ToastService } from '../toast/toast.service';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {
  HomeComponent: HomeComponent;
  data: any = {};
  final: string = null;
  finalExitShow = false;

  constructor(
    private toastService: ToastService,
    private http: HttpClient,
    private router: RouterModule,
    private appComponent: AppComponent
  ) { }

  async ngOnInit() {
    this.data = await JSON.parse(localStorage.getItem('payment'));
  }
  change(outOf: number) {
    console.log(outOf);
    const totalDue = this.data.totalDue;
    const leftOver0 = outOf - totalDue;
    const leftOver = leftOver0.toFixed(2);
    if (leftOver0 < 0) {
      this.final = ('Insufficent Amount! Balence is $' + (-leftOver));
      this.finalExitShow = false;
    } else if (leftOver0 === 0 || leftOver === '0.00') {
      this.final = ('Thank You! Exact change was given.');
      this.finalExitShow = true;
    } else {
      this.final = ('Thank You! Your change is $' + leftOver);
      this.finalExitShow = true;
    }
  }
  navigateTo(path: string) {
    this.appComponent.navigateTo(path);
  }
}
