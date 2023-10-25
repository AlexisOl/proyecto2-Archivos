import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './utils/footer/footer.component';
import { LoginComponent } from './vistaLogin/login/login.component';
import { VistaGeneralComponent } from './vistaLogin/vista-general/vista-general.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './vistaLogin/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GeneralEmpleadoComponent } from './vistaEmpleados/general-empleado/general-empleado.component';
import { GeneralAdminComponent } from './vistaAdministrador/general-admin/general-admin.component';
import { MatCardModule } from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import { HeaderEmpleadoComponent } from './vistaEmpleados/header-empleado/header-empleado.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { CreacionArchivoComponent } from './vistaEmpleados/creacion-archivo/creacion-archivo.component';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    VistaGeneralComponent,
    HeaderComponent,
    GeneralEmpleadoComponent,
    GeneralAdminComponent,
    HeaderEmpleadoComponent,
    CreacionArchivoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CodemirrorModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    NgbModule,
    MatCardModule,
    MatBadgeModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
