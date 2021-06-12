import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../services/data.service';
import { Constants } from '../../../constants/Constants';
import { DateSeparator } from '../../enumerations';
import { ICalendarResponse, ICenters } from 'src/app/interfaces';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: `Hydrogen`, weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' }
];

 export  class ColumnDefinition {
  columnDef: string;
  header: string;
  cell: any;
   sticky: boolean;
  constructor(_columnDef: string, _header: string, _cell: any, _sticky: boolean) {
    this.columnDef = _columnDef;
    this.header = _header;
    this.cell = _cell;
    this.sticky = _sticky;
  }
 }

 export interface people {
  name: string;
  center: ICenters;
  canspeak: boolean;
  canwrite: boolean;
}
export const peoplecolumns: ColumnDefinition[] = [
  { columnDef: 'center', header: ' ', sticky: true, cell: (element: people) => {
      return `<p>${element.center.name}</p><p>${element.center.address}</p>`;
  }},
  { columnDef: 'date1', header: 'Date 1', sticky: false, cell: (element: people) => `${element.name}` },
  { columnDef: 'date2', header: 'Date 2',  sticky: false,cell: (element: people) => `${element.canspeak}` },
  { columnDef: 'date3', header: 'Date 3', sticky: false, cell: (element: people) => `${element.canwrite}` },
  { columnDef: 'date4', header: 'Date 4', sticky: false, cell: (element: people) => `${element.canwrite}` },
  { columnDef: 'date5', header: 'Date 5', sticky: false, cell: (element: people) => `${element.canwrite}` },
  { columnDef: 'date6', header: 'Date 6', sticky: false, cell: (element: people) => `${element.canwrite}` },
  { columnDef: 'date7', header: 'Date 7', sticky: false, cell: (element: people) => `${element.canwrite}` }
];

 export let PEOPLE_DATA: people[] = [];

@Component({
  selector: 'ifc-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.scss']
})

export class AppointmentTableComponent implements OnInit, AfterViewInit {
  @Input() public response: ICalendarResponse;
  displayedColumns: Array<string> = peoplecolumns.map(c => c.columnDef);
  public mattabledataSource:  MatTableDataSource<any>;
  public displaycolumndefs: ColumnDefinition[];
  public peopledata;
  // displayedColumns: string[] = [];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(private cdRef: ChangeDetectorRef, private dataService: DataService) {
    this.displaycolumndefs = peoplecolumns;
    this.peopledata  = PEOPLE_DATA;
    this.mattabledataSource = new MatTableDataSource<any>();
    this.mattabledataSource.data = this.peopledata;
  }

  ngOnInit() {
    this.setTableColumnHeaders();
    console.log(this.displayedColumns);
  }

  ngAfterViewInit() {
    console.log(this.response);
    PEOPLE_DATA = [];
    this.peopledata = PEOPLE_DATA;
    this.mattabledataSource.data = this.peopledata;
    if (this.response?.centers?.length > 0) {
      this.response.centers.forEach(center => {
        PEOPLE_DATA.push({ center: center, name: '', canspeak: true, canwrite: true });
      })
      this.peopledata = PEOPLE_DATA;
      this.mattabledataSource.data = this.peopledata;
      this.cdRef.detectChanges();
    }
  }
  private setTableColumnHeaders(): void {
    const presentDay = new Date();
    for (let i = 0; i < Constants.NO_OF_DAYS; i++) {
      const nextDay = new Date(presentDay.getTime() + i * 24 * 60 * 60 * 1000);
      peoplecolumns[i + 1].header = this.dataService.getCurrentDate(nextDay, true, DateSeparator.SPACE);
    }
  }
}
