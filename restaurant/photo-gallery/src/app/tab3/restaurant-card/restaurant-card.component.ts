import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from 'src/Model/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';


@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss'],
})
export class RestaurantCardComponent implements OnInit {

 @Input() restaurant : Restaurant;
 @Input() isFilterReadOnly : Boolean;

  constructor(public restaurantService: RestaurantService) { }

  ngOnInit() {  }
  
  onDeleteRestaurant(restaurantId: number){
    this.restaurantService.deleteRestaurant(restaurantId);

    this.restaurantService.restaurantSubject
      .next({
        view : 'list',
        sender : 'card'
      });
  }

  onEditRestaurant(restaurant : Restaurant){
    this.restaurantService.emitRestaurantEvent({
      data:restaurant,
      view:"new",
      sender:'card'
    });
  }
}
