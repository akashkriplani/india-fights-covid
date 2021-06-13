import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { Constants } from '../../constants/Constants';
import { Notify } from '../../shared/enumerations';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'ifc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthenticated: boolean;
  @Input() public title: string = '';
  private authListenerSubs: Subscription;

  constructor(private dataService: DataService, private notifyService: NotifierService) { }

  ngOnInit(): void {
    this.authListenerSubs = this.dataService.authStatusListener.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  logout(): void {
    this.dataService.logout();
    this.notifyService.notify(Notify.SUCCESS, Constants.API_MESSAGE.USER_LOGOUT_SUCCESS);
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
