import { Component, OnInit } from '@angular/core';
import { AuthService} from '@auth0/auth0-angular';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-welcome-search',
  templateUrl: './welcome-search.component.html',
  styleUrls: ['./welcome-search.component.scss']
})
export class WelcomeSearchComponent implements OnInit {
  user: any;

  constructor(public auth: AuthService, private userService: UsersService) { }
  
  ngOnInit(): void {
    this.auth.user$.subscribe({
      next: (auth) => {
        this.userService.getUser(auth?.sub!).subscribe({
          next: (user) => {
            this.user = user;
          }
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
