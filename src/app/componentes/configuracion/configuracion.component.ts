import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracion } from 'src/app/model/configuracion.model';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {

  permitirRegistro:any = false;

  constructor(
    private router: Router,
    private configuracionService: ConfiguracionService
  ) { }

  ngOnInit() {
    this.configuracionService.getConfiguracion().subscribe(
      (configuracion: Configuracion) => {
        this.permitirRegistro = configuracion.permitirRegistro;
      }
    )
  }

  guardar(){
    let configuracion = {permitirRegistro: this.permitirRegistro};
    this.configuracionService.modificarConfiguracion(configuracion);
    this.router.navigate(['/']);
  }

}
