import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from '@angular/common/http';
import { RegData } from './../models/regdata';

@Injectable({
  providedIn: "root"
})
export class ProdsService {

  constructor( private httpclient: HttpClient ) {}

  getRegData(): Observable<any> {
    return this.httpclient.get('http://localhost:8080/api/prd');
    }
}

