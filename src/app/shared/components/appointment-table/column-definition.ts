export class ColumnDefinition {
  columnDef: string;
  header: string;
  cell: any;
  sticky: boolean;
  enableSort: boolean;
  constructor(_columnDef: string, _header: string, _cell: any, _sticky: boolean, _enableSort: boolean) {
    this.cell = _cell;
    this.columnDef = _columnDef;
    this.enableSort = _enableSort;
    this.header = _header;
    this.sticky = _sticky;
  }
}
