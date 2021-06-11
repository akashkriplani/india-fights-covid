import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DataService } from '../../services/data.service';
import { ICalendarResponse, IDistricts, IDistrictsResponse, IDistrictWiseInfo, IStates, IStatesResponse } from '../../interfaces';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ifc-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public districts: IDistricts[];
  public districtWiseInfo: IDistrictWiseInfo;
  public floatLabelControl = new FormControl('auto');
  public states: IStates[];
  public selectedDistrict: IDistricts;
  public selectedIndex: number = 0;
  public selectedState: IStates;
  public stateControl = new FormControl('', Validators.required);
  public districtControl = new FormControl('', Validators.required);
  public pincodeControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
    Validators.pattern('^[0-9]{6}$')
  ]);

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

  }

  calendarByDistrict(): void {
    this.dataService.calendarByDistrict(this.selectedDistrict.district_id).pipe(take(1)).subscribe((response: ICalendarResponse) => console.log(response));
  }

  calendarByPin(): void {
    this.dataService.calendarByPin(this.pincodeControl.value).pipe(take(1)).subscribe((response: ICalendarResponse) => console.log(response.centers));
  }

  getDistrict(state: IStates): void {
    this.selectedState = state;
    this.districtControl.setValue('');
    this.districtControl.markAsUntouched();
    if (this.selectedState) {
      this.dataService.getDistricts(this.selectedState.state_id)
      .pipe((take(1))).subscribe((response: IDistrictsResponse) => {
        this.districts = response.districts;
      });
    }
  }

  getStates(event: MatTabChangeEvent): void {
    if (event.tab.textLabel === 'Search by District' && !this.states) {
      this.dataService.getStates().pipe(take(1)).subscribe((response: IStatesResponse) => {
        this.states = response.states;
      });
    }
  }

  findByDistrict(): void {
    this.dataService.findByDistrict(this.selectedDistrict.district_id).pipe(take(1)).subscribe((response: IDistrictWiseInfo) => {
      this.districtWiseInfo = response;
      console.log(this.districtWiseInfo);
    });
  }

  findByPin(): void {
    this.dataService.findByPin(this.pincodeControl.value).pipe(take(1)).subscribe((response: IDistrictWiseInfo) => {
      console.log(response);
    });
  }

  validateNumber(event: any): void {
    this.dataService.validateNumber(event);
  }
}
