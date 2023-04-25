import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ItemsService } from 'src/app/services/items.service';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationsService } from 'src/app/services/reservations.service';
import { ReservationDialogComponent } from 'src/app/components/reservation-dialog/reservation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent, ConfirmationDialogModel } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent {
  showMap:boolean=false;
  userId?: string;
  user: any;
  item: any;
  panelOpenState = false;
  itemId: number;
  reservations: any[];
  reservation = new FormControl(new Date(), [Validators.required]);
  todayDate: Date = new Date();

  constructor(private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private itemService: ItemsService,
    private usersService: UsersService,
    public auth: AuthService,
    private resService: ReservationsService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(profile => {
      this.userId = profile?.sub;
      this.usersService.getUser(this.userId!).subscribe({
        next: (user) => {
          this.user = user;
        }
      })
    })

    this.getItem();
  }

  reservationFilter = (d: Date | null): boolean => {
    let isoD = d?.toISOString().split("T")[0];
    return !this.reservations.find(x => x == isoD);

  }

  getItem() {
    this.activatedRoute.params.subscribe(params => {
      let id: number = params['id'];
      this.itemId = id;
      //using parameter information
      this.itemService.getItem(id).subscribe((item) => {
        this.item = item
        this.getReservations(item.id);
      })

    })
  }

  getReservations(itemId: number) {
    this.resService.getReservations(itemId).subscribe({
      next: (data) => {
        this.reservations = data.map((r: any) => new Date(r.reservationDate).toISOString().split("T")[0]);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  loginPlease() {
    this.auth.loginWithRedirect({
      appState: { target: `/app-item-details/${this.itemId}` } // ohjaus haluttuun urliin kirjautumisen jälkeen
    });
  }

  reserveDay() {
    let title = "Tavaran varaus";
    let message = "Haluatko varmasti varata tavaran?";
    let dialogData = new ConfirmationDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (!dialogResult) {
        return;
      }
      let reservation = {
        reservationDate: this.reservation!.value?.toISOString(),
        item: this.item,
        reserver: this.user
      }
      this.resService.addReservation(reservation).subscribe({
        next: (response) => {
          this.snackbar.open("Varattu", "X", {
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          })
          this.reservation.reset();
          this.ngOnInit();
        },
        error: (error) => {
          console.log(error);
        }
      })
    });

  }

  backToLastPage(){
    this.location.back();
  }

  currentDate: any = new Date();


  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    const month = d.getMonth();
    const todays_date = d.getDate();
    const todaysDateObject = new Date();
    const today = todaysDateObject.getDate();
    const actualMonth = todaysDateObject.getMonth();
    /** Prevent actual system date from being selected.*/
    if (month === actualMonth && todays_date === today) {
      return false;

    } else if (day !== 0 && day !== 6) {
      return true;


    } else {
      return false;
    }
  }
}



