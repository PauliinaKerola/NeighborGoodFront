import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  userId?: string;
  items: any[] = [];
  p: number = 1;

  constructor(private location: Location, private itemService: ItemsService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.itemService.getItems()
      .subscribe({
        next: (items) => {
          this.items = items;
        },
        error: (error) => {
          console.log(error)
        }
      })
  }
  backToLastPage(){
    this.location.back();
  }
}

