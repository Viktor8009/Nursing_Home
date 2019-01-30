import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
data:Object = 
{
  appTitle: 'Csupaszív nyugdíjasház',
  api: 'api',
  usersApi:'http://localhost:3333'
};

  constructor() {}

  get(key)
  {
    return this.data[key] || null;
  }

  set(key, value)
  {
    this.data[key] = value;
    return true;
  }
}
