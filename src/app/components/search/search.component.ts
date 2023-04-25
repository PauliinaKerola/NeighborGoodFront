import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { retry } from 'rxjs';
import { ItemsService } from 'src/app/services/items.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm = '';
  cities: any[];
  categories: any[];

  extendedSearch = new FormGroup({
    searchTerm: new FormControl(''),
    category: new FormControl(''),
    city: new FormControl('')
  });

  constructor(
    private router: Router,
    private itemService: ItemsService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.itemService.getCities().subscribe({
      next: (data) => {
        this.cities = data;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.itemService.getCategories().subscribe({
      next: (data) => {
        this.categories = data
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  searchItems(): void {
    if (this.searchTerm === '') return;
    this.router.navigate(['result'], {queryParams: {searchTerm: this.searchTerm}});
  }

  extendedSearchItems(): void {
    let searchTerm = this.extendedSearch.value.searchTerm;
    let city = this.extendedSearch.value.city;
    let category = this.extendedSearch.value.category;
    if (searchTerm === '' && category === '' && city === '') {
      this.snackBar.open("Anna vähintään yksi hakuehto", "X",
      {
        duration: 4000, 
        horizontalPosition:"center", 
        verticalPosition: 'top'
      });
      return;
    }
    this.router.navigate(['result'], {queryParams: {searchTerm: searchTerm, category: category, city: city}})
  }
}