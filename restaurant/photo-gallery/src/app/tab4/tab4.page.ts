import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private auhentificationService : AuthentificationService,
    private router : Router) { }

  ngOnInit() {
  }
  onLogin(user){
    let varAuthentic=this.auhentificationService.login(user.username, user.password);
 if(varAuthentic==true){
   this.router.navigateByUrl('/tabs');
 }else{
   this.router.navigateByUrl('/tab4');
 }
}
}
