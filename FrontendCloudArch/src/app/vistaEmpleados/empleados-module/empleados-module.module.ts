import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralEmpleadoComponent } from '../general-empleado/general-empleado.component';
import { loginguardGuard } from 'src/app/utils/loginguard.guard';
import { Route, RouterModule, Routes } from '@angular/router';
import { VistaEspecificaArchivosComponent } from '../vista-especifica-archivos/vista-especifica-archivos.component';


const routes:Routes = [
  {path: '',
  component:GeneralEmpleadoComponent,
  canActivate: [loginguardGuard]},
  {
    path:'archivo/:id',
    component:VistaEspecificaArchivosComponent,
    canActivate: [loginguardGuard]
  }
]




@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmpleadosModuleModule { }
