import { Adress } from './adress';
import {Photo} from './photo';

export class Restaurant {
    id : number;
    name: string;
    number : number;
    currentRate:LvfRating
    adress : Adress;
    logoPhoto: Photo;

    constructor(){
        this.adress = new Adress();
        this.logoPhoto = new Photo();
    }
}

export enum LvfRating{
    ONE =1,
    TWO =2,
    THREE =3,
    FOUR =4,
    FIVE =5
}