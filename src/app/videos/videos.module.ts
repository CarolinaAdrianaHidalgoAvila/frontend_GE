import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MessageComponent } from '../componentes/message/message.component';
import { SearchComponent } from '../componentes/search/search.component';
@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    MessageComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    VideosRoutingModule,
    FormsModule,
    ReactiveFormsModule
    ]
})
export class VideosModule { }
