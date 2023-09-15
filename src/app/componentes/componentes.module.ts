import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { SearchComponent } from './search/search.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MessageComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MessageComponent,
    SearchComponent
  ]
})
export class ComponentesModule { }
