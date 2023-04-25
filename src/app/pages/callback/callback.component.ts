import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  userId?: string
  constructor(public auth: AuthService, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(profile => {
      this.userId = profile?.sub;
      this.usersService.getUser(this.userId!).subscribe({
        next: user => {
          if(user === null) {
            this.router.navigateByUrl("fill");
          }
          else
          {
            this.router.navigateByUrl("");
          }
        },
        error: error => {
            console.log(error)
        }
      });
    })
  }
}