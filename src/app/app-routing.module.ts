import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { NovoEmprestimoComponent } from './views/novo-emprestimo/novo-emprestimo.component';
import { CadastroUsuarioComponent } from './views/cadastro-usuario/cadastro-usuario.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LivrosComponent } from './views/livros/livros.component';
import { GuardsGuard } from './guard/guards.guard';
import { EditarEmprestimoComponent } from './views/editar-emprestimo/editar-emprestimo.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ GuardsGuard ],
    title: 'Home | Bibliotech'
  }, 
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login | Bibliotech'
  },
  {
    path: 'painel',
    component: DashboardComponent,
    canActivate: [ GuardsGuard ],
    title: 'Painel de Controle | Bibliotech'
  },
  {
    path: 'livros',
    component: LivrosComponent,
    canActivate: [ GuardsGuard ],
    title: 'Livros | Bibliotech'
  },
  {
    path: 'cadastrar',
    component: CadastroUsuarioComponent,
    title: 'Cadastrar-se | Bibliotech'
  },
  {
    path:'painel/novo',
    component: NovoEmprestimoComponent,
    canActivate: [ GuardsGuard ],
    title: 'Novo Emprestimo | Bibliotech'
  },
  {
    path: 'painel/editar/:id',
    component: EditarEmprestimoComponent,
    canActivate: [ GuardsGuard ],
    title: 'Editar Emprestimo | Bibliotech'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
