import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RestaurantService, IRestaurantInfo } from 'src/app/services/restaurant.service';
import { Restaurant } from 'src/Model/restaurant';

import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/Model/photo';

@Component({
  selector: 'app-new-restaurant',
  templateUrl: './new-restaurant.component.html',
  styleUrls: ['./new-restaurant.component.scss'],
})
export class NewRestaurantComponent implements OnInit {
 
  restaurant: Restaurant;
  carousselDisplay: boolean;
  isUdpdate : boolean;
  
  constructor(public restaurantService : RestaurantService, public photoService : PhotoService) { }

  ngOnInit() {
    this.restaurant = new Restaurant();
    this.carousselDisplay = false;
    this.isUdpdate = false;

    this.restaurantService.restaurantSubject
      .subscribe((info : IRestaurantInfo) => {
        if(info.sender!='form'){
          this.restaurant = info.data || new Restaurant();
          this.isUdpdate = info.data ? true : false;
        }
      });
  }
  
  CreateRestaurant(){
    this.restaurantService.CreateRestaurant(this.restaurant);
    this.restaurant = new Restaurant();
    this.restaurantService.restaurantSubject.next({
      view : 'list',
      sender : 'form'
    });
  }
   
  viewPhoto(){
    this.carousselDisplay = true;
  }

  selectPhoto(photo : Photo){
    
    this.carousselDisplay=false;
    this.restaurant.logoPhoto =photo;
  }

  editRestaurant(){
    this.restaurantService.editRestaurant(this.restaurant);
    this.restaurant = new Restaurant();
    this.restaurantService.restaurantSubject.next({
      view : 'list',
      sender : 'form'
    });
  }
}
