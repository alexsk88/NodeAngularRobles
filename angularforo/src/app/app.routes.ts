import { ModuleWithProviders  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';



const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'ajustes', component: UserEditComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'temas/:page', component: TopicsComponent },
    { path: 'tema/:id', component: TopicDetailComponent },
    { path: '**', component: PageNotFoundComponent },
];

// Exportar la configuracion 
export const appRoutingProviders:any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
