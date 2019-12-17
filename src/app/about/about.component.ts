import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FlexModalService } from '../shared-components/flex-modal/flex-modal.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  errorMessage = '';
  constructor(
    private router: Router,
    private routerModule: RouterModule,
    private flexModal: FlexModalService
  ) { }

  ngOnInit() {
  }
  showModal() {
    this.errorMessage = 'Testing';
    this.flexModal.openDialog('error-modal', null);
  }
}
