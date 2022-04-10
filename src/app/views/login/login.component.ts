import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private global: GlobalService
  ) { }

  ngOnInit(): void {
    this.loginIsValid();
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    this.spinner.show();
    
    this.auth.login(this.form.value).then(() => {
      this.global.router.navigateByUrl('admin');
    }).catch((e) => {
      this.spinner.hide();
      console.log('deu erro ao logar');      
    })
    
  }

  async loginIsValid() {
    try {
      const login = await this.auth.isLogged();
      if (login) {
        this.global.router.navigate(['admin/dashboard']);
      }
    } catch (err) {
      console.log('error é', err);

    }
  }

}
