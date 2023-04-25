import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  itemId: number;
  item: any;
  itemForm: FormGroup;
  categories: any;

  constructor(private itemService: ItemsService, private router: Router, private activatedRoute: ActivatedRoute, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.itemService.getCategories().subscribe((data) => {
      this.categories = data;
    });

    this.activatedRoute.params.subscribe((params) => {
      this.itemId = params["id"];
      this.itemService.getItem(this.itemId).subscribe({
        next: (data) => {
          this.item = data;
          this.itemForm = new FormGroup({
            itemName: new FormControl(data.name, [Validators.required]),
            description: new FormControl(data.description),
            file: new FormControl(''),
            fileSource: new FormControl(''),
            addInfo: new FormControl(data.addInfo),
            category: new FormControl(data.category.name, [Validators.required]),
          })
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  submit() {
    console.dir(this.itemForm.value);
    let formData = new FormData();
    formData.append('file', this.itemForm.get('fileSource')!.value!);
    formData.append('itemName', this.itemForm.get('itemName')!.value!);
    formData.append('description', this.itemForm.get('description')!.value!);
    formData.append('addInfo', this.itemForm.get('addInfo')!.value!);
    formData.append('category', this.itemForm.get('category')!.value!);
    
    this.itemService.updateItem(this.item.id, formData).subscribe({
      next: (result) => {
        this.router.navigateByUrl("/profile");
        this.snackbar.open("Tavaran tiedot päivitetty", "X", {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  cancel() {
    this.router.navigateByUrl("/profile");
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.itemForm.patchValue({
        fileSource: file,
      });
    }
  }
}
