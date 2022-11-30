import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { MaterialModule } from './material/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovoEmprestimoComponent } from './views/novo-emprestimo/novo-emprestimo.component';
import { CadastroUsuarioComponent } from './views/cadastro-usuario/cadastro-usuario.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { LivrosComponent } from './views/livros/livros.component';
import { AvatarPipe } from './pipes/avatar.pipe';
import { DetaisComponent } from './components/detais/detais.component';
import { EditarEmprestimoComponent } from './views/editar-emprestimo/editar-emprestimo.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    EditarEmprestimoComponent,
    NovoEmprestimoComponent,
    DashboardComponent,
    LivrosComponent,
    AvatarPipe,
    DetaisComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
