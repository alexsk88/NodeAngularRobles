import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';        
import { AngularFileUploaderModule } from "angular-file-uploader";

//Cargar Modulo de PANEL USUARIO
import { PanelModule } from './panel/panel.module';

// Rutas 



import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { routing, appRoutingProviders } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    PageNotFoundComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    PanelModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
