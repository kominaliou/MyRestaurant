import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage  implements OnInit{
  ngOnInit() {
    
  }

  constructor(private router : Router, private authentificationService : AuthentificationService) {}
 
  onMenuItem(menu){
    if(menu = 'logout'){
      this.authentificationService.logaout();
      this.router.navigateByUrl('/tab4')
    }else{
      this.router.navigateByUrl(menu);
    }
  }
 
}
