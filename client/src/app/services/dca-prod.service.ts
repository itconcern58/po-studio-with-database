import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from '@angular/common/http';
import regression from "regression";
import { Prods }  from "./../models/prod";

@Injectable()
export class DcaProdService {
public ProdsData: Prods[];

  constructor( private httpclient: HttpClient ) { }

  getProd(): Observable<any> {
    return this.httpclient.get("http://localhost:8080/api/prd");
  }

  getProdsForForecast(): Observable<any> {
    return this.httpclient.get("http://localhost:8080/api/prd");
  }
  

  getProdForRegression () {
    let meso = (this.getProd ()
    .subscribe (data => {
      this.ProdsData = data;
      var res = this.ProdsData
    }))}
      //  var ProdsData = [];
       // ProdsData = data
      /*  let PrdsData = ProdsData.map( Object.values );
        let newPrdsArray = [];
        for (var i = 0; i < PrdsData.length; i++) {
        
        [PrdsData[i][1],PrdsData[i][2]] = [PrdsData[i][2],PrdsData[i][1]];
        newPrdsArray.push(PrdsData[i].splice(-7,2));
      }
      var result = regression.linear(newPrdsArray, {precision: 8});*/
    //  return this.ProdsData;      
  //  };
  

  getSlope () {
    var result = regression.linear([[0, 1], [32, 67], [12, 79]]);
    return result.equation[1];
}
}
