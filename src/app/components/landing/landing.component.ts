import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { take } from 'rxjs/operators';
import { IDistricts, IDistrictsResponse, IDistrictWiseInfo, IStates, IStatesResponse } from '../../interfaces';

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
  public pincode: number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getStates().pipe(take(1)).subscribe((response: IStatesResponse) => {
      this.states = response.states;
    });
  }

  getDistrict(state: IStates): void {
    this.selectedState = state;
    this.dataService.getDistricts(this.selectedState.state_id).pipe((take(1))).subscribe((response: IDistrictsResponse) => {
      this.districts = response.districts;
    });
  }

  findByDistrict(district: IDistricts): void {
    this.selectedDistrict = district;
    this.dataService.findByDistrict(this.selectedDistrict.district_id).pipe(take(1)).subscribe((response: IDistrictWiseInfo) => {
      this.districtWiseInfo = response;
      console.log(this.districtWiseInfo);
    });
  }

  findByPin(): void {
    this.dataService.findByPin(this.pincode).pipe(take(1)).subscribe((response: IDistrictWiseInfo) => {
      console.log(response);
    });
  }
}
