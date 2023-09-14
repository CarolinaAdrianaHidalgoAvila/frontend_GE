import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  filterValue: string = '';

  @Output() applyFilter = new EventEmitter<string>();

  constructor() {}

  onFilter() {
    this.applyFilter.emit(this.filterValue);
  }

  onInputChange(event: any) {
    this.filterValue = event.target.value;
  }
}

