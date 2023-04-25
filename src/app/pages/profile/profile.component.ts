import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Profile, UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ReservationsService } from 'src/app/services/reservations.service';
import { ConfirmationDialogComponent, ConfirmationDialogModel } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { ContactDetailsDialogComponent } from 'src/app/components/contact-details-dialog/contact-details-dialog.component';
import {default as auth0} from '../../../../auth0_config.json';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: Profile;
  usersReservations: any[]; // käyttäjän varaamat tuotteet
  reservations: any[] // käyttäjän tuotteiden varaukset

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService,
    private auth: AuthService,
    private itemService: ItemsService,
    private router: Router,
    private snackbar: MatSnackBar,
    private resService: ReservationsService,
  ) { }

  // openDialog() {
  //   this.dialog.open(ProfileDeleteDialog);
  // }

  ngOnInit(): void {
    this.auth.user$.subscribe({
      next: (authService) => {
        this.usersService.getUser(authService!.sub!).subscribe({
          next: (user) => {
            this.user = user;
          },
          error: (response) => {
            console.log(response);
          },
        });
        this.resService.getItemsReservedByUser(authService?.sub!).subscribe({
          next: (data) => {
            this.usersReservations = data;
          },
          error: (error) => {
            console.log(error);
          }
        });
        this.resService.getItemsReservedFromUser(authService?.sub!).subscribe({
          next: (data) => {
            this.reservations = data;
          }
        });
      },
    });
  }

  editItem(id: number) {
    this.router.navigateByUrl(`/tavara/muokkaa/${id}`);
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe({
      next: () => {
        this.snackbar.open('Tavara poistettu', 'X', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.ngOnInit();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteUser() {
    this.usersService.deleteUser(this.user.id).subscribe((data) => {
      this.auth.logout({ returnTo: auth0.logout_url });;
      this.snackbar.open('Profiili poistettu', 'X', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }

  editProfile() {
    this.router.navigateByUrl('edit-profile');
  }

  cancelReservation(resId: number) {
    let dialogData = new ConfirmationDialogModel("Varauksen peruminen", "Haluatko perua varauksen?")

    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (!dialogResult) {
        return;
      }
      this.resService.cancelReservation(resId).subscribe({
        next: () => {
          this.snackbar.open('Varaus peruttu', 'X', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.ngOnInit();
        },
        error: (error) => {
          console.log(error);
        }
      })
    });
  }

  contactInformation(user: any) {
    this.dialog.open(ContactDetailsDialogComponent, {
      data: { user }
    });


  }

  deleteConfirmation() {
    let title = "Profiilin poisto";
    let message = "Haluatko varmasti poistaa profiilin?";
    let dialogData = new ConfirmationDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (!dialogResult) {
        return;
      }
      this.deleteUser()
      })
    }

    goToItem(id: number) {
      this.router.navigateByUrl(`/app-item-details/${id}`);
    }
  }


