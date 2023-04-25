import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { UsersService } from 'src/app/services/users.service';
import { default as terms } from '../../../../terms_and_conditions.json';
import { default as auth0 } from '../../../../auth0_config.json';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createPhoneNumberValidator } from 'src/app/classes/phoneValidator';

@Component({
  selector: 'app-fill-information',
  templateUrl: './fill-information.component.html',
  styleUrls: ['./fill-information.component.scss'],
})
export class FillInformationComponent implements OnInit {
  user: any;
  authId: any;
  userForm!: FormGroup;
  termsAndConds: string;
  constructor(
    public auth: AuthService,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      this.authId = profile?.sub;
      console.log(this.authId);
      this.user = profile;
      this.createForm(this.user);
    });
    this.termsAndConds = terms.terms;
  }

  createForm(user: any) {
    this.userForm = new FormGroup({
      firstName: new FormControl(user.given_name, [Validators.required]),
      lastName: new FormControl(user.family_name, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required]),
      phone: new FormControl('', [Validators.required, createPhoneNumberValidator()]),
      street: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      terms: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  cancel() {
    this.auth.logout({ returnTo: auth0.logout_url });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userForm.patchValue({
        imageUrl: file,
      });
    }
  }

  submit() {
    let user = {
      auth0Id: this.authId,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
      phone: this.userForm.value.phone,
      address: {
        street: this.userForm.value.street,
        zipCode: this.userForm.value.zipCode,
        city: this.userForm.value.city,
      },
    };
    console.dir(user);
    this.usersService.addUser(user).subscribe({
      next: () => {
        this.router.navigateByUrl('');
      },
      error: (error) => {
        if (error.error === 'Osoitetta ei löytynyt') {
          this.snackBar.open('Osoite virheellinen, yritä uudelleen', 'X', {
            duration: 4000,
            verticalPosition:'top',
            horizontalPosition: 'center'
          });
        } else {
          console.log(error);
        }
      },
    });
  }
}