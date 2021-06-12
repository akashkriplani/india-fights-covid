import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../services/data.service';
import { IAppointmentTableData, ICalendarResponse, ICenters, ISessions } from '../../../interfaces/common.interface';
import { Constants } from '../../../constants/Constants';
import { DateSeparator } from '../../enumerations';

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

@Component({
  selector: 'ifc-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.scss']
})

export class AppointmentTableComponent implements OnInit, AfterViewInit {
  public appointmentTableColumns: ColumnDefinition[] = [
    {
      columnDef: 'center', header: '', sticky: true, cell: (element: IAppointmentTableData) => {
        return this.buildAddressInfo(element.center);
      }
    },
    {
      columnDef: 'date1', header: 'Date 1', sticky: false, cell: (element: IAppointmentTableData) => {

        return this.buildSessionInfo(element.sessions, this.appointmentTableColumns[1].header);
      }
    },
    {
      columnDef: 'date2', header: 'Date 2', sticky: false, cell: (element: IAppointmentTableData) => {

        return this.buildSessionInfo(element.sessions, this.appointmentTableColumns[2].header);
      }
    },
    {
      columnDef: 'date3', header: 'Date 3', sticky: false, cell: (element: IAppointmentTableData) => {

        return this.buildSessionInfo(element.sessions, this.appointmentTableColumns[3].header);
      }
    },
    {
      columnDef: 'date4', header: 'Date 4', sticky: false, cell: (element: IAppointmentTableData) => {

        return this.buildSessionInfo(element.sessions, this.appointmentTableColumns[4].header);
      }
    },
    {
      columnDef: 'date5', header: 'Date 5', sticky: false, cell: (element: IAppointmentTableData) => {

        return this.buildSessionInfo(element.sessions, this.appointmentTableColumns[5].header);
      }
    },
    {
      columnDef: 'date6', header: 'Date 6', sticky: false, cell: (element: IAppointmentTableData) => {

        return this.buildSessionInfo(element.sessions, this.appointmentTableColumns[6].header);
      }
    },
    {
      columnDef: 'date7', header: 'Date 7', sticky: false, cell: (element: IAppointmentTableData) => {

        return this.buildSessionInfo(element.sessions, this.appointmentTableColumns[7].header);
      }
    }
  ];
  public displayedColumns: Array<string> = this.appointmentTableColumns.map(c => c.columnDef);
  public matTableDataSource:  MatTableDataSource<IAppointmentTableData> = new MatTableDataSource<IAppointmentTableData>();
  public pageSizeOptions: number[] = Constants.PAGE_SIZE_OPTIONS;
  public pageSize: number = Constants.PAGE_SIZE;
  @ViewChild('paginator') paginator: MatPaginator;
  @Input() public response: ICalendarResponse;
  public TABLE_DATA: IAppointmentTableData[] = [];

  constructor(private cdRef: ChangeDetectorRef, private dataService: DataService) { }

  ngOnInit(): void {
    this.setTableColumnHeaders();
  }

  ngAfterViewInit(): void {
    this.TABLE_DATA = [];
    this.matTableDataSource.data = this.TABLE_DATA;
    if (this.response?.centers?.length > 0) {
      this.response.centers.forEach((center: ICenters) => {
        let dateColumnIndex = 0;
        const TABLE_DATA_ARR_LENGTH = this.TABLE_DATA.push({ center: center, sessions: [] });
        if (center?.sessions?.length > 0) {
          let getCurrentCenter = this.TABLE_DATA[TABLE_DATA_ARR_LENGTH - 1].center;
          let getCurrentSession = this.TABLE_DATA[TABLE_DATA_ARR_LENGTH - 1].sessions;
          while (dateColumnIndex !== Constants.NO_OF_DAYS) {
            let getNewSession = this.getSessionInfo(getCurrentCenter, this.appointmentTableColumns[dateColumnIndex + 1]?.header);
            getCurrentSession = [...getCurrentSession, ...getNewSession];
            dateColumnIndex++;
          }
          this.TABLE_DATA[TABLE_DATA_ARR_LENGTH - 1].sessions = getCurrentSession;
        }
      })
      this.matTableDataSource.data = this.TABLE_DATA;
      this.matTableDataSource.paginator = this.paginator;
      this.cdRef.detectChanges();
    }
  }

  private buildAddressInfo(center: ICenters): string {
    let str = '';
    if (center?.name) {
      str += `<p>${center.name}</p>`;
    }
    if (center?.address) {
      str += `<p>${center.address}`;
    }
    if (center?.district_name) {
      str += `<span>, ${center.district_name}</span>`;
    }
    if (center?.state_name) {
      str += `<span>, ${center.state_name}</span>`;
    }
    if (center?.pincode) {
      str += `<span>, ${center.pincode}</span></p>`;
    }
    return str;
  }

  private buildSessionInfo(sessions: ISessions[] = [], header: string): string {
    let str = '';
    const headerDate = this.dataService.getCurrentDate(new Date(header));
    const filteredSessions = sessions.filter(s => s.date === headerDate);
    if (filteredSessions?.length > 0) {
      filteredSessions.forEach(s => {
        str += `<p>${s.available_capacity}</p><p>${s.vaccine}</p><p>${s.min_age_limit}+</p>`
      });
    }
    return str === '' ? 'NA' : str;
  }

  private getSessionInfo(center: ICenters, columnHeader: string): ISessions[] {
    const headerDate = this.dataService.getCurrentDate(new Date(columnHeader));
    return center.sessions.filter(s => s.date === headerDate);
  }

  private setTableColumnHeaders(): void {
    const presentDay = new Date();
    for (let i = 0; i < Constants.NO_OF_DAYS; i++) {
      const nextDay = new Date(presentDay.getTime() + i * 24 * 60 * 60 * 1000);
      this.appointmentTableColumns[i + 1].header = this.dataService.getCurrentDate(nextDay, true, DateSeparator.SPACE);
    }
  }
}
