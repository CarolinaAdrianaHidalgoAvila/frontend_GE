import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'rutas', redirectTo: 'rutas/index', pathMatch: 'full'},
  { path: 'rutas/index', component: IndexComponent },
  { path: 'rutas/create', component: CreateComponent },
  { path: 'rutas/edit/:idRuta', component: EditComponent } 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RutasRoutingModule { }
