import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Profile, UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  profile: Profile;
  termsAndConds: string;
  userForm: FormGroup;

  constructor(
    public auth: AuthService,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe({
      next: (authUser) => {
        this.usersService.getUser(authUser!.sub as string).subscribe({
          next: (profile) => {
            this.profile = profile;
            this.userForm = new FormGroup({
              firstName: new FormControl(this.profile.firstName, [
                Validators.required,
              ]),
              lastName: new FormControl(this.profile.lastName, [
                Validators.required,
              ]),
              email: new FormControl(this.profile.email, [Validators.required]),
              phone: new FormControl(this.profile.phone, [Validators.required]),
              street: new FormControl(this.profile.address.street, [
                Validators.required,
              ]),
              zipCode: new FormControl(this.profile.address.zipCode, [
                Validators.required,
              ]),
              city: new FormControl(this.profile.address.city, [
                Validators.required,
              ]),
            });
          },
          error: (response) => {
            console.log(response);
          },
        });
      },
    });
  }

  submit() {
    console.dir(this.userForm.value);
    let formData = new FormData();
    formData.append('firstName', this.userForm.get('firstName')!.value!);
    formData.append('lastName', this.userForm.get('lastName')!.value!);
    formData.append('phone', this.userForm.get('phone')!.value!);
    formData.append('email', this.userForm.get('email')!.value!);
    formData.append('street', this.userForm.get('street')!.value!);
    formData.append('zipCode', this.userForm.get('zipCode')!.value!);
    formData.append('city', this.userForm.get('city')!.value!);
    this.usersService.updateUser(this.profile, formData).subscribe({
      next: () => {
        this.snackBar.open('Profiilia muokattu', 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 4000,
        });
        this.router.navigateByUrl('/profile');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  cancel() {
    this.router.navigateByUrl('/profile');
  }
}
