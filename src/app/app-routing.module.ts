import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { ItemListComponent } from './components/item-list/item-list.component';
import { SearchComponent } from './components/search/search.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { FillInformationComponent } from './pages/fill-information/fill-information.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ItemMapComponent } from './components/item-map/item-map.component';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ItemCarouselComponent } from './components/item-carousel/item-carousel.component';
import { ItemsComponent } from './pages/items/items.component';
import { EditItemComponent } from './pages/edit-item/edit-item.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'item-map',
    component: ItemMapComponent,
  },
  {
    path: 'add-item',
    component: AddItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'items',
    component: ItemsComponent
  },
  {
    path: 'app-search',
    component: SearchComponent,
  },

  {
    path: 'result',
    component: SearchResultComponent,
  },

  {
    path: 'app-item-details/:id',
    component: ItemDetailsComponent,
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },
  {
    path: 'fill',
    component: FillInformationComponent,
  },
  {
    path: 'create-profile',
    component: CreateProfileComponent,
  },
  {
    path: 'tavara/muokkaa/:id',
    component: EditItemComponent
  },
  {
    path: 'tavara/muokkaa/:id',
    component: EditItemComponent
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
