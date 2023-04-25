import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  userId?: string;
  items: any[] = [];
  p: number = 1;

  constructor(private location: Location, private route: ActivatedRoute, private itemService: ItemsService, private auth: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let searchTerm = params["searchTerm"];
      let category = params["category"];
      let city = params["city"];

      if (category === undefined && city === undefined) {
        this.itemService.getResults(searchTerm).subscribe({
          next: (response) => {
            this.items = response;
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
      else {
        this.itemService.getExtendedSearchResults(searchTerm, category, city)
          .subscribe({
            next: (response) => {
              this.items = response;
            },
            error: (err) => {
              console.log(err);
            }
          });
      }
    });
  }
  backToLastPage(){
    this.location.back();
  }
}
