import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../services/data.service';
import { IAppointmentTableData, ICalendarResponse, ICenters, ISessions } from '../../../interfaces/common.interface';
import { ColumnDefinition } from './column-definition';
import { Constants } from '../../../constants/Constants';
import { DateSeparator, FeeType } from '../../enumerations';

@Component({
  selector: 'ifc-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.scss']
})

export class AppointmentTableComponent implements OnInit, AfterViewInit {
  public appointmentTableColumns: ColumnDefinition[] = [
    {
      columnDef: 'center',
      header: 'Vaccination center',
      sticky: true,
      enableSort: true,
      cell: (element: IAppointmentTableData) => this.buildAddressInfo(element.center)
    },
    {
      columnDef: 'date1',
      header: 'Date 1',
      sticky: false,
      enableSort: false,
      cell: (element: IAppointmentTableData) => this.buildSessionInfo(element.sessions, this.appointmentTableColumns[1].header)
    },
    {
      columnDef: 'date2',
      header: 'Date 2',
      sticky: false,
      enableSort: false,
      cell: (element: IAppointmentTableData) => this.buildSessionInfo(element.sessions, this.appointmentTableColumns[2].header)
    },
    {
      columnDef: 'date3',
      header: 'Date 3',
      sticky: false,
      enableSort: false,
      cell: (element: IAppointmentTableData) => this.buildSessionInfo(element.sessions, this.appointmentTableColumns[3].header)
    },
    {
      columnDef: 'date4',
      header: 'Date 4',
      sticky: false,
      enableSort: false,
      cell: (element: IAppointmentTableData) => this.buildSessionInfo(element.sessions, this.appointmentTableColumns[4].header)
    },
    {
      columnDef: 'date5',
      header: 'Date 5',
      sticky: false,
      enableSort: false,
      cell: (element: IAppointmentTableData) => this.buildSessionInfo(element.sessions, this.appointmentTableColumns[5].header)
    },
    {
      columnDef: 'date6',
      header: 'Date 6',
      sticky: false,
      enableSort: false,
      cell: (element: IAppointmentTableData) => this.buildSessionInfo(element.sessions, this.appointmentTableColumns[6].header)
    },
    {
      columnDef: 'date7',
      header: 'Date 7',
      sticky: false,
      enableSort: false,
      cell: (element: IAppointmentTableData) => this.buildSessionInfo(element.sessions, this.appointmentTableColumns[7].header)
    }
  ];
  public displayedColumns: Array<string> = this.appointmentTableColumns.map(c => c.columnDef);
  public matTableDataSource:  MatTableDataSource<IAppointmentTableData> = new MatTableDataSource<IAppointmentTableData>();
  public pageSizeOptions: number[] = Constants.PAGE_SIZE_OPTIONS;
  public pageSize: number = Constants.PAGE_SIZE;
  @ViewChild('paginator') public paginator: MatPaginator;
  @Input() public response: ICalendarResponse;
  @ViewChild(MatSort) public sort: MatSort;
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
      this.matTableDataSource.sort = this.sort;
      this.setCustomSort();
      this.sortTableData();
      this.cdRef.detectChanges();
    }
  }

  public sortTableData(): void {
    this.matTableDataSource.data = this.matTableDataSource.sortData(this.matTableDataSource.data, this.sort);
  }
  private setCustomSort(): void {
    this.matTableDataSource.sortData = (data: IAppointmentTableData[], sort: MatSort) => {
      return data.sort((a: IAppointmentTableData, b: IAppointmentTableData) => {
        if (!sort.active || sort.direction === '') {
          return;
        }
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
            case 'center': return this.compare(a.center.name, b.center.name, isAsc);
            default: return 0;
        }
      })
    };
  }

  private buildAddressInfo(center: ICenters): string {
    let str = '';
    if (center?.name) {
      str += `<p class="center-name">${center.name}`;
    }

    if (center?.fee_type === FeeType.PAID) {
      str += `<span class="fee-type">${center.fee_type.toUpperCase()}</span></p>`;
    } else {
      str += `</p>`;
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

    if (center?.vaccine_fees?.length > 0) {
      center.vaccine_fees.forEach(v => {
        str += `<p>${v.vaccine}: &#8377;${v.fee}</p>`;
      })
    }
    return str;
  }

  private buildSessionInfo(sessions: ISessions[] = [], header: string): string {
    let str = '';
    const headerDate = this.dataService.getCurrentDate(new Date(header));
    const filteredSessions = sessions.filter(s => s.date === headerDate);
    if (filteredSessions?.length > 0) {
      filteredSessions.forEach(s => {
        if (s.available_capacity === 0) {
          str += `
            <div class="slot-container">
              <p class="slot-full">${Constants.BOOKED}</p>
              <p>${s.vaccine}</p>
              <small>Age ${s.min_age_limit}+</small>
            </div>`
        } else {
          str += `
          <div class="slot-container">
            <div class="slot-available">
              <div class="dose-1">
                <div>D1</div>
                <div>${s.available_capacity_dose1}</div>
              </div>
              <div class="total-doses">${s.available_capacity}</div>
              <div class="dose-2">
                <div>D2</div>
                <div>${s.available_capacity_dose2}</div>
              </div>
            </div>
            <p>${s.vaccine}</p>
            <small>Age ${s.min_age_limit}+</small>
          </div>`
        }
      });
    }

    return str === '' ? Constants.NOT_AVAILABLE : str;
  }

  private compare(a: any, b: any, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
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
