import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'ruta', redirectTo: 'ruta/index', pathMatch: 'full'},
  { path: 'ruta/index', component: IndexComponent },
  { path: 'ruta/create', component: CreateComponent },
  { path: 'ruta/edit/:idRuta', component: EditComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RutaRoutingModule { }
