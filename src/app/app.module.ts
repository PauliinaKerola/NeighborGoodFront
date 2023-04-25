import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { default as authInfo } from '../../auth0_config.json';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@auth0/auth0-angular';

import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { SearchComponent } from './components/search/search.component';
import { ExtendedSearchComponent } from './components/extended-search/extended-search.component';
import { WelcomeSearchComponent } from './components/welcome-search/welcome-search.component';

import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';

import { FillInformationComponent } from './pages/fill-information/fill-information.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemMapComponent } from './components/item-map/item-map.component';
import { ItemsComponent } from './pages/items/items.component';
import { ItemCarouselComponent } from './components/item-carousel/item-carousel.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';

import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { HeadlineComponent } from './components/headline/headline.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditItemComponent } from './pages/edit-item/edit-item.component';
import { ReservationDialogComponent } from './components/reservation-dialog/reservation-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import {MatListModule} from '@angular/material/list';
import { ContactDetailsDialogComponent } from './components/contact-details-dialog/contact-details-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    WelcomeSearchComponent,
    FooterComponent,
    ItemCarouselComponent,
    ExtendedSearchComponent,
    ItemListComponent,
    ItemMapComponent,
    ItemsComponent,
    ConfirmationComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    SearchComponent,
    CreateProfileComponent,
    ItemDetailsComponent,
    AddItemComponent,
    FillInformationComponent,
    CallbackComponent,
    AddItemFormComponent,
    SearchResultComponent,
    ProfileComponent,
    EditItemComponent,
    ReservationDialogComponent,
    ConfirmationDialogComponent,
    EditProfileComponent,
    HeadlineComponent,
    ContactDetailsDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule.forRoot({
      // auth0_config.json
      domain: authInfo.domain,
      clientId: authInfo.clientId,
    }),
    MatButtonModule,
    MatTabsModule,
    LeafletModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCheckboxModule,
    NgxPaginationModule,
    MatDialogModule,
    MatSnackBarModule,
    MatListModule
  ],
  providers: [],
  entryComponents: [ConfirmationDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
