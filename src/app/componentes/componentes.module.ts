import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { SearchComponent } from './search/search.component';

import { FormsModule } from '@angular/forms';
import { ExportComponent } from './export/export.component';


@NgModule({
  declarations: [
    MessageComponent,
    SearchComponent,
    ExportComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MessageComponent,
    SearchComponent,
    ExportComponent
  ]
})
export class ComponentesModule { }
