import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Authorisation';
  currentUser: User;

  constructor(private authService: AuthenticationService,private router: Router) {
    this.authService.currentUser.subscribe(x => this.currentUser = x );
 
  }

}


