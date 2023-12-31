import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { AuthGuard } from './guard/auth.guard';
import { configuracionGuard } from './guard/configuracion.guard';

const routes: Routes = [
  {
    path: '', component: TableroComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent, canActivate: [configuracionGuard]
  },
  {
    path: 'registrarse', component: RegistroComponent, canActivate: [configuracionGuard]
  },
  {
    path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cliente/editar/:id', component: EditarClienteComponent, canActivate: [AuthGuard]
  },
  {
    path: '**', component: NoEncontradoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
