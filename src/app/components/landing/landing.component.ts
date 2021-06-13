import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DataService } from '../../services/data.service';
import { NotifierService } from 'angular-notifier';
import { ICalendarResponse, IDistricts, IDistrictsResponse, IDistrictWiseInfo, IStates, IStatesResponse } from '../../interfaces';
import { take } from 'rxjs/operators';
import { Constants } from '../../constants/Constants';
import { Notify } from '../../shared/enumerations';

@Component({
  selector: 'ifc-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  public districtControl = new FormControl('', Validators.required);
  public districts: IDistricts[];
  public districtWiseInfo: IDistrictWiseInfo;
  public floatLabelControl = new FormControl('auto');
  public isLoading = true;
  public pincodeControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
    Validators.pattern('^[0-9]{6}$')
  ]);
  public selectedDistrict: IDistricts;
  public selectedIndex: number = Constants.STARTING_TAB_INDEX;
  public selectedState: IStates;
  public stateControl = new FormControl('', Validators.required);
  public states: IStates[];
  public tableResponseByDistrict: ICalendarResponse;
  public tableResponseByPin: ICalendarResponse;

  constructor(private dataService: DataService, private notifyService: NotifierService) { }

  ngOnInit(): void {
    if (this.selectedIndex === 1) {
      const event: MatTabChangeEvent = <MatTabChangeEvent>{
        tab: {
          textLabel: 'Search by District'
        }
      };
      this.getStates(event);
    }
  }

  calendarByDistrict(): void {
    this.tableResponseByDistrict = null;
    this.isLoading = true;
    this.dataService.calendarByDistrict(this.selectedDistrict.district_id).pipe(take(1)).subscribe((response: ICalendarResponse) => {
      this.notifyService.notify(Notify.SUCCESS, Constants.API_MESSAGE.GET_DETAILS_SUCCESS);
      this.tableResponseByDistrict = response;
    }, () => {
      this.notifyService.notify(Notify.ERROR, Constants.API_MESSAGE.SWW_ERROR);
    }, () => {
      this.isLoading = false;
    });
  }

  calendarByPin(): void {
    this.tableResponseByPin = null;
    this.isLoading = true;
    this.dataService.calendarByPin(this.pincodeControl.value).pipe(take(1)).subscribe((response: ICalendarResponse) => {
      this.notifyService.notify(Notify.SUCCESS, Constants.API_MESSAGE.GET_DETAILS_SUCCESS);
      this.tableResponseByPin = response;
    }, () => {
      this.notifyService.notify(Notify.ERROR, Constants.API_MESSAGE.SWW_ERROR);
    }, () => {
      this.isLoading = false;
    });
  }

  getDistrict(state: IStates): void {
    this.selectedState = state;
    this.districtControl.setValue('');
    this.districtControl.markAsUntouched();
    if (this.selectedState) {
      this.isLoading = true;
      this.dataService.getDistricts(this.selectedState.state_id)
        .pipe((take(1))).subscribe((response: IDistrictsResponse) => {
        this.notifyService.notify(Notify.SUCCESS, Constants.API_MESSAGE.GET_DISTRICT_SUCCESS);
          this.districts = response.districts;
      }, () => {
        this.notifyService.notify(Notify.ERROR, Constants.API_MESSAGE.SWW_ERROR);
        }, () => {
        this.isLoading = false;
      });
    }
  }

  getStates(event: MatTabChangeEvent): void {
    if (event.tab.textLabel === 'Search by District' && !this.states) {
      this.isLoading = true;
      this.dataService.getStates().pipe(take(1)).subscribe((response: IStatesResponse) => {
        this.notifyService.notify(Notify.SUCCESS, Constants.API_MESSAGE.GET_STATES_SUCCESS);
        this.states = response.states;
      }, () => {
        this.notifyService.notify(Notify.ERROR, Constants.API_MESSAGE.SWW_ERROR);
      }, () => {
        this.isLoading = false;
      });
    }
  }

  findByDistrict(): void {
    this.dataService.findByDistrict(this.selectedDistrict.district_id).pipe(take(1)).subscribe((response: IDistrictWiseInfo) => {
      // TODO: To be handled
      this.districtWiseInfo = response;
    }, () => {
      this.notifyService.notify(Notify.ERROR, Constants.API_MESSAGE.SWW_ERROR);
    });
  }

  findByPin(): void {
    this.dataService.findByPin(this.pincodeControl.value).pipe(take(1)).subscribe((response: IDistrictWiseInfo) => {
      // TODO: To be handled
    }, () => {
      this.notifyService.notify(Notify.ERROR, Constants.API_MESSAGE.SWW_ERROR);
    });
  }

  validateNumber(event: any): void {
    this.dataService.validateNumber(event);
  }
}
