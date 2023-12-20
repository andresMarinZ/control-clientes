import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  email!: string;
  password!: string;

  constructor(private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService

  ) { }

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    })
  }

  registro() {
    this.loginService.registrarse(this.email, this.password)
      .then(res => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.toastr.show(error.message, 'Major Error', {
          timeOut: 3000,
        });
      });
  }
}
