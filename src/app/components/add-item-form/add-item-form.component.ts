import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ItemsService } from 'src/app/services/items.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss'],
})
export class AddItemFormComponent implements OnInit {
  userId?: string;
  categories: any[];

  constructor(
    private itemService: ItemsService,
    private auth: AuthService,
    private snackbar: MatSnackBar
  ) {}

  itemForm = new FormGroup({
    itemName: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    file: new FormControl(''),
    fileSource: new FormControl('', [Validators.required]),
    addInfo: new FormControl(''),
    category: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      this.userId = profile?.sub;
    });

    this.itemService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.itemForm.patchValue({
        fileSource: file,
      });
    }
  }

  submit() {
    let formData = new FormData();
    formData.append('file', this.itemForm.get('fileSource')!.value!);
    formData.append('itemName', this.itemForm.get('itemName')!.value!);
    formData.append('description', this.itemForm.get('description')!.value!);
    formData.append('userId', this.userId!);
    formData.append('addInfo', this.itemForm.get('addInfo')!.value!);
    formData.append('category', this.itemForm.get('category')!.value!);

    this.itemService.addItem(formData).subscribe({
      next: (createdTool) => {
        this.itemForm.reset();
        this.snackbar.open('Lainatavara lisätty', 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 4000,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
