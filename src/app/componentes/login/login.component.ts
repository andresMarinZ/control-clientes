import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService,

  ) { }

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    })
  }

  login() {
    this.loginService.login(this.email, this.password)
      .then((res: any) => {
        this.router.navigate(['/']);
      })
      .catch((error: any) => {
        this.toastr.show(error.message, 'Major Error', {
          timeOut: 3000,
        });
      });
  }

}
