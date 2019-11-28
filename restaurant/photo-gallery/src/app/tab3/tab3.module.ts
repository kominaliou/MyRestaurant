import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { RestaurantListComponent } from './liste/liste.component';
import { NewRestaurantComponent } from './new-restaurant/new-restaurant.component';

import { IonicRatingModule} from 'ionic4-rating';
import { SharedRestaurantModule } from '../tabs/shared/shared.restaurant/sharedrestaurant.module';

@NgModule({
  imports: [
    IonicModule,
    SharedRestaurantModule,
    CommonModule,
    FormsModule,
    IonicRatingModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page, RestaurantListComponent, NewRestaurantComponent]
})
export class Tab3PageModule {}
