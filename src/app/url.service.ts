import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
@Output() urlChanged : EventEmitter<{url:string , data:Object}> = new EventEmitter();

  currentURL : string ="/";

  constructor() { }

  jumpTo(url:string, data:object = {})
  {
    this.currentURL = url;
    this.urlChanged.emit({url:this.currentURL, data});
  }
}
