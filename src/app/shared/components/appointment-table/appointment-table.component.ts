import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../services/data.service';
import { Constants } from '../../../constants/Constants';
import { DateSeparator } from '../../enumerations';
import { ICalendarResponse, ICenters, ISessions } from 'src/app/interfaces';

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
  sessions: ISessions[];
  center: ICenters;
}


@Component({
  selector: 'ifc-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.scss']
})

export class AppointmentTableComponent implements OnInit, AfterViewInit {
  @Input() public response: ICalendarResponse;
  public peoplecolumns: ColumnDefinition[] = [
    {
      columnDef: 'center', header: '', sticky: true, cell: (element: people) => {
        return `<p>${element.center.name}</p><p>${element.center.address}</p>`;
      }
    },
    {
      columnDef: 'date1', header: 'Date 1', sticky: false, cell: (element: people) => {

        return this.buildSessionInfo(element.sessions);
      }
    },
    {
      columnDef: 'date2', header: 'Date 2', sticky: false, cell: (element: people) => {

        return this.buildSessionInfo(element.sessions);
      }
    },
    {
      columnDef: 'date3', header: 'Date 3', sticky: false, cell: (element: people) => {

        return this.buildSessionInfo(element.sessions);
      }
    },
    {
      columnDef: 'date4', header: 'Date 4', sticky: false, cell: (element: people) => {

        return this.buildSessionInfo(element.sessions);
      }
    },
    {
      columnDef: 'date5', header: 'Date 5', sticky: false, cell: (element: people) => {

        return this.buildSessionInfo(element.sessions);
      }
    },
    {
      columnDef: 'date6', header: 'Date 6', sticky: false, cell: (element: people) => {

        return this.buildSessionInfo(element.sessions);
      }
    },
    {
      columnDef: 'date7', header: 'Date 7', sticky: false, cell: (element: people) => {

        return this.buildSessionInfo(element.sessions);
      }
    }
    // { columnDef: 'date2', header: 'Date 2',  sticky: false, cell: (element: people) => `${element.canspeak}` },
    // { columnDef: 'date3', header: 'Date 3', sticky: false, cell: (element: people) => `${element.canwrite}` },
    // { columnDef: 'date4', header: 'Date 4', sticky: false, cell: (element: people) => `${element.canwrite}` },
    // { columnDef: 'date5', header: 'Date 5', sticky: false, cell: (element: people) => `${element.canwrite}` },
    // { columnDef: 'date6', header: 'Date 6', sticky: false, cell: (element: people) => `${element.canwrite}` },
    // { columnDef: 'date7', header: 'Date 7', sticky: false, cell: (element: people) => `${element.canwrite}` }
  ];
  displayedColumns: Array<string> = this.peoplecolumns.map(c => c.columnDef);
  PEOPLE_DATA: people[] = [];
  public mattabledataSource:  MatTableDataSource<any>;
  public displaycolumndefs: ColumnDefinition[];
  public peopledata;
  // displayedColumns: string[] = [];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  pageSizeOptions: number[] = Constants.PAGE_SIZE_OPTIONS;
  pageSize: number = Constants.PAGE_SIZE;
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private cdRef: ChangeDetectorRef, private dataService: DataService) {
    this.displaycolumndefs = this.peoplecolumns;
    this.peopledata  = this.PEOPLE_DATA;
    this.mattabledataSource = new MatTableDataSource<any>();
    this.mattabledataSource.data = this.peopledata;
  }

  ngOnInit() {
    this.setTableColumnHeaders();
    console.log(this.displayedColumns);
  }

  ngAfterViewInit() {
    console.log(this.response);
    this.PEOPLE_DATA = [];
    this.peopledata = this.PEOPLE_DATA;
    this.mattabledataSource.data = this.peopledata;
    if (this.response?.centers?.length > 0) {
      let k = 0;
      this.response.centers.forEach((center, index) => {
        if (center?.sessions?.length > 0) {
          k = (index + 1) % Constants.NO_OF_DAYS;
          if (k === 0) {
            k = 1;
          }
          const indexReset = k;
          this.PEOPLE_DATA.push({ center: center, sessions: this.getSessionInfo(center, this.peoplecolumns[indexReset]?.header) });
        }
      })
      this.peopledata = this.PEOPLE_DATA;
      this.mattabledataSource.data = this.peopledata;
      this.mattabledataSource.paginator = this.paginator;
      this.cdRef.detectChanges();
    }
  }

  private getSessionInfo(center: ICenters, columnHeader: string): ISessions[] {
    const headerDate = this.dataService.getCurrentDate(new Date(columnHeader));
    console.log(headerDate);
    if (center?.sessions?.length > 0) {
      return center.sessions.filter(s => s.date === headerDate);
    }
    return [];
  }

  private buildSessionInfo(sessions: ISessions[]): string {
    let str = '';
    sessions.forEach(s => {
      str += `<p>${s.available_capacity}</p><p>${s.vaccine}</p><p>${s.min_age_limit}+</p>`
    })
    return str;
  }

  private setTableColumnHeaders(): void {
    const presentDay = new Date();
    for (let i = 0; i < Constants.NO_OF_DAYS; i++) {
      const nextDay = new Date(presentDay.getTime() + i * 24 * 60 * 60 * 1000);
      this.peoplecolumns[i + 1].header = this.dataService.getCurrentDate(nextDay, true, DateSeparator.SPACE);
    }
  }
}
