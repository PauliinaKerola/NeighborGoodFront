import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-item-carousel',
  templateUrl: './item-carousel.component.html',
  styleUrls: ['./item-carousel.component.scss']
})
export class ItemCarouselComponent {
  userId?: string;
  items:any[]=[];
  p: number = 1;

  constructor(private itemService: ItemsService, private auth: AuthService) {}


  ngOnInit(): void {
    this.auth.user$.subscribe(profile => {
      this.userId = profile?.sub;
    })
  this.getItems();
  }

 
  getItems() {
    this.itemService.getItems()
  .subscribe({
    next: (items) => {
      this.items = items;
    },
    error:(error) => {
      console.log(error);
    }
  })
}

}
