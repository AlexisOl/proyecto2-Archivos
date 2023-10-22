import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { GeneralAdminComponent } from '../general-admin/general-admin.component';
import { loginguardGuard } from 'src/app/utils/loginguard.guard';


const routes: Routes = [
  {path: '',
  component:GeneralAdminComponent,
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
