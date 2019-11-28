import { Component, OnInit } from '@angular/core';
import { RestaurantService, IRestaurantInfo } from 'src/app/services/restaurant.service';
import { Observable, ReplaySubject } from 'rxjs';
import { Restaurant } from 'src/Model/restaurant';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class RestaurantListComponent implements OnInit {
  
  filtredRestaurants$: Observable<Restaurant[]>;
  private searchItems = new ReplaySubject<string>(1);

  constructor(public restaurantService: RestaurantService) { }

  ngOnInit() { 

    this.restaurantService.restaurantSubject
    .subscribe((data : IRestaurantInfo) =>{
      if(data.view == 'list'){
        this.searchRestaurant("   ");
      }
    });
   
    this.filtredRestaurants$ = this.searchItems.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.restaurantService.searchRestaurants(term)),
    );

    this.searchRestaurant();
   }
  
   searchRestaurant(terms: string ="") {
    this.searchItems.next(terms);
  }
}
