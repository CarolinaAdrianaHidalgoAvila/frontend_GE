import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    MessageComponent,
    SearchComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentesModule { }
