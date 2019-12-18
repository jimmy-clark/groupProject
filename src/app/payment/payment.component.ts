import { Component, OnInit } from '@angular/core';
import { Item, IItem } from '../home/home.modal';
import { ToastService } from '../toast/toast.service';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AppComponent } from '../app.component';
import { FlexModalService } from '../shared-components/flex-modal/flex-modal.service';

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
  errorMessage = '';

  constructor(
    private toastService: ToastService,
    private http: HttpClient,
    private router: RouterModule,
    private appComponent: AppComponent,
    private flexModal: FlexModalService,


  ) { }

  async ngOnInit() {
    this.data = await JSON.parse(localStorage.getItem('payment'));
  }
  change(outOf: number) {
    const totalDue = this.data.totalDue;
    const leftOver0 = outOf - totalDue;
    const leftOver = leftOver0.toFixed(2);
    if (leftOver0 < 0) {
      this.errorMessage = ('Insufficent Amount! Balence is $' + (-leftOver));
      this.flexModal.openDialog('error-modal', null);

    } else if (leftOver0 === 0 || leftOver === '0.00') {
      this.errorMessage = ('Thank You! Exact change was given.');
      this.flexModal.openDialog('success-modal', null);
    } else {
      this.errorMessage = ('Thank You! Your change is $' + leftOver);
      this.flexModal.openDialog('success-modal', null);

    }
  }
  navigateTo(path: string) {
    this.appComponent.navigateTo(path);
  }

}
