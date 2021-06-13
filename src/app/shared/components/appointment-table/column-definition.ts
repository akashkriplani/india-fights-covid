export class ColumnDefinition {
  public cell: any;
  public columnDef: string;
  public enableSort: boolean;
  public header: string;
  public sticky: boolean;

  constructor(
    _columnDef: string,
    _header: string,
    _cell: any,
    _sticky: boolean,
    _enableSort: boolean
  ) {
    this.cell = _cell;
    this.columnDef = _columnDef;
    this.enableSort = _enableSort;
    this.header = _header;
    this.sticky = _sticky;
  }
}
