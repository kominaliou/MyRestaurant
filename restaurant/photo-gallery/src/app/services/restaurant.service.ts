import { Injectable } from '@angular/core';
import { Restaurant, LvfRating as LvfRestaurantRating } from 'src/Model/restaurant';
import {Storage} from '@ionic/storage';
import { ReplaySubject, Observable , from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
 public restaurants : Restaurant[];
 filteredRestaurants : Restaurant[];
 restaurantSubject: ReplaySubject<IRestaurantInfo>;

constructor(private storage : Storage) { 
  this.restaurantSubject = new ReplaySubject<IRestaurantInfo>(1);
  this.restaurantSave();
  this.filterRestaurant();
}

emitRestaurantEvent(info : IRestaurantInfo){
  this.restaurantSubject.next(info);
}

 CreateRestaurant(restaurant : Restaurant){
   restaurant.id = this.restaurants.length +1;
  this.restaurants.unshift(restaurant);
  this.storage.set('restaurants',this.restaurants);
 }

restaurantSave(){
  this.storage.get('restaurants').then((restaurants)=>{
    this.restaurants = restaurants || [];
  });
}
  
 deleteRestaurant(restaurantId: number){
  
    let restaurantIndex = this.restaurants.findIndex(r=>r.id==restaurantId)
    this.restaurants.splice(restaurantIndex,1)
    this.storage.set('restaurants', this.restaurants);
  }

   editRestaurant(restaurant :Restaurant){
    let restaurantIndex= this.restaurants.findIndex(p=>p.id==restaurant.id)
    this.restaurants[restaurantIndex]=restaurant;
    this.storage.set('restaurants', this.restaurants);
   }

   public filterRestaurant() {
    this.storage.get('restaurants')
      .then((restaurants: Restaurant[]) => {

        this.filteredRestaurants = restaurants
          .filter(r => r.currentRate >= LvfRestaurantRating.FOUR)
          .sort((a: Restaurant, b: Restaurant) => this.sortRestaurant(a, b))
          .slice(0, 5);
      });
  }
 
  private sortRestaurant(a: Restaurant, b: Restaurant) {
    if (a.currentRate < b.currentRate) {
      return 1;
    } else if (a.currentRate == b.currentRate) {
      return 0;
    } else {
      return -1;
    }
  }

  searchRestaurants(terms: string = ""): Observable<Restaurant[]> {
    return from(
      this.storage.get('restaurants')
        .then((restaurants: Restaurant[]) => {
  
          if (terms.trim() == "") {
            return restaurants;
          } else {
            return restaurants.filter(r => r.name && r.name.toLowerCase().indexOf(terms.toLowerCase()) > -1);
          }
        })
    );
  }
}
export interface IRestaurantInfo {
  data?: Restaurant;
  view?: 'list' | 'new',
  sender: 'tab3' | 'form' | 'card'
}