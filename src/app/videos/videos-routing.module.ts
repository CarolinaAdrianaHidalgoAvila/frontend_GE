import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'videos', redirectTo: 'videos/index', pathMatch: 'full'},
  { path: 'videos/index', component: IndexComponent },
  { path: 'videos/create', component: CreateComponent },
  { path: 'videos/edit/:idTutorial', component: EditComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }
