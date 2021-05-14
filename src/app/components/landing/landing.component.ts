import { Component, OnInit } from '@angular/core';
import { DataService } from '../../servcies/data.service';
import { take } from 'rxjs/operators';
import { IDistricts, IDistrictWiseInfo, IStates, IStatesResponse } from 'src/app/interfaces';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ifc-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public districts: IDistricts[];
  public districtWiseInfo: IDistrictWiseInfo;
  public states: IStates[];
  public selectedDistrict: IDistricts;
  public selectedState: IStates;
  public stateControl = new FormControl('', Validators.required);
  public districtControl = new FormControl('', Validators.required);


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getStates().pipe(take(1)).subscribe((response: IStatesResponse) => {
      this.states = response.states;
    });
  }

  getDistrict(state: IStates): void {
    this.selectedState = state;
    this.dataService.getDistricts(this.selectedState.state_id).pipe((take(1))).subscribe((response) => {
      this.districts = response.districts;
    });
  }

  findByDistrict(district: IDistricts): void {
    this.selectedDistrict = district;
    this.dataService.findByDistrict(this.selectedDistrict.district_id).pipe(take(1)).subscribe((response) => {
      this.districtWiseInfo = response;
    });
  }
}
