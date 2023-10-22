import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralEmpleadoComponent } from '../general-empleado/general-empleado.component';
import { loginguardGuard } from 'src/app/utils/loginguard.guard';
import { Route, RouterModule, Routes } from '@angular/router';


const routes:Routes = [
  {path: '',
  component:GeneralEmpleadoComponent,
  canActivate: [loginguardGuard]}
]




@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmpleadosModuleModule { }
