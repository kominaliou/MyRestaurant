import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {
  
 public authentificated : boolean;
 public code: string;
  constructor() { }

  login(username : string , password : string){
    if(username == 'aliou' && password =='aaaaaa'){
      this.authentificated = true
    }else{
      this.authentificated = false;
    }return this.authentificated;
  }
  
 
  logaout() {
    localStorage.removeItem('myCode');
  }
}
