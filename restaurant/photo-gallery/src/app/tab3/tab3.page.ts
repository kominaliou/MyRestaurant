import { Component } from '@angular/core';
import { RestaurantService, IRestaurantInfo } from '../services/restaurant.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  listView : boolean

  constructor(private restaurantService : RestaurantService) {}

ngOnInit(){
  this.restaurantService.restaurantSubject
    .subscribe((info : IRestaurantInfo) =>{
      if(info.sender ! = 'tab3'){
        this.listView=info.view=='list';
      }
   });
}

  evenementChange(event: any){
     this.listView=event.detail.value=="Restaurant-list";
  }

  onChangeView(childProvidedData : boolean){
    this.listView = childProvidedData;
  }
}
