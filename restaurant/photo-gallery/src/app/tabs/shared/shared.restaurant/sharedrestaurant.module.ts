import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicRatingModule} from 'ionic4-rating';
import { IonicModule } from '@ionic/angular';
import { RestaurantCardComponent } from 'src/app/tab3/restaurant-card/restaurant-card.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [CommonModule, IonicModule, IonicRatingModule],
  declarations: [RestaurantCardComponent],
  exports: [RestaurantCardComponent, IonicModule, IonicRatingModule, CommonModule, FormsModule]
})

export class SharedRestaurantModule { }



 
