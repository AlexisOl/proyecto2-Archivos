import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaGeneralComponent } from './vistaLogin/vista-general/vista-general.component';
import { LoginComponent } from './vistaLogin/login/login.component';

const routes: Routes = [

{path: '', redirectTo:'inicio',  pathMatch: 'full'},
{path: 'inicio', component: VistaGeneralComponent},
{path: 'login', component: LoginComponent},
  // para la parte del sistema general
  {path: 'generalEmpleado',
  loadChildren: () => import('./vistaEmpleados/empleados-module/empleados-module.module').then(m => m.EmpleadosModuleModule) },
  {path: 'generalAdmin',
  loadChildren: () => import('./vistaAdministrador/admin-module/admin-module.module').then(m => m.AdminModuleModule) }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
