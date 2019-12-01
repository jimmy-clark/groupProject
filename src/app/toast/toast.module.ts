import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { AlertModule } from 'ngx-bootstrap/alert';

import { ToastService } from './toast.service';

@NgModule({
  declarations: [ToastComponent],
  imports: [
    CommonModule,
    AlertModule.forRoot()
  ],
  exports: [
    ToastComponent
  ],
  providers: [
    ToastService
  ]
})
export class ToastModule {

}
