import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }

  public isBrowser(): boolean {
    return (
      document.URL.startsWith('http') === false || 
      document.URL.startsWith('ionic') === false || 
      document.URL.startsWith('https://localhost') === false
    );
  }

  // public isBrowser(): boolean {
  //   return !this.isApp();
  // }

}
