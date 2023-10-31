import { Component, Input } from '@angular/core';
import { jsPDF } from 'jspdf'; 
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent {
  @Input() tableData!: any[];

  exportToExcel() {
    if (this.tableData) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tableData);
      const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      XLSX.writeFile(wb, 'table.xlsx');
    }
  }
}
