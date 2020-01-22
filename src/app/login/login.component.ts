import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loading = false;
  submitted = false;
  returnUrl = '/Home';

  error;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) {

    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {


    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.authService.login(this.f.username.value, this.f.password.value).pipe(first()).subscribe(data => {
      this.router.navigate(['/home'])
    },
      error => {
        if (error)
          console.log(error)
        this.loading = false;
      })
  }
}
