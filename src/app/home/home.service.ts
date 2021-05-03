import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public http: HttpClient) { }
  public getList() {
    return this.http.get('https://swapi.dev/api/films/');
  }
}
