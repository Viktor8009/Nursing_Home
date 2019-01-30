import { Injectable, Output } from '@angular/core';
import { HttpService } from './http.service';
import { ConfigService } from './config.service';
import { Http,Response } from '@angular/http';
import { Subject } from 'rxjs';
import { Supply } from './model/Supply';

@Injectable({
  providedIn: 'root'
})
export class SupplyService extends HttpService {
private baseUrl:string;
public supplySubject:Subject<any> = new Subject();
@Output() supplies : Array<Supply> = [];

  constructor(http: Http, configService:ConfigService) 
  {
    super(http,configService);
    this.baseUrl=this.configService.get("usersApi");
    this.getItemsOnStock();
  }

  getItemsOnStock()
  {
    this.read(`${this.baseUrl}/supply/all`)
    .then(
      (response:Response) => {
        this.supplies = response.json();
        this.supplySubject.next(this.supplies);
      });
    }

    pushAnItem(supply:Supply)
    {
      return this.create(`${this.baseUrl}/supply`,supply)
    }

    editAnItem(supply:Supply)
    {
      return this.update(`${this.baseUrl}/supply/${supply.id}`,supply);
    }

    deleteAnItem(supply:Supply)
    {
      return this.delete(`${this.baseUrl}/supply/${supply.id}`);
    }
}
