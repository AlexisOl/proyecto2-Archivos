import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { GeneralAdminComponent } from '../general-admin/general-admin.component';
import { loginguardGuard } from 'src/app/utils/loginguard.guard';
import { CrearEmpleadosComponent } from '../crear-empleados/crear-empleados.component';
import { PapeleraComponent } from '../papelera/papelera.component';


const routes: Routes = [
  {path: '',
  component:GeneralAdminComponent,
  canActivate: [loginguardGuard]},
  {path: 'crearEmpleados',
  component:CrearEmpleadosComponent,
  canActivate: [loginguardGuard]},
  {path: 'papelera',
  component:PapeleraComponent,
  canActivate: [loginguardGuard]}
]




@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminModuleModule { }
