import { Component, OnInit  } from '@angular/core'
import {DcaProdService } from './../services/dca-prod.service';
import regression from 'regression';
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from '@angular/common/http';
import { DomElementSchemaRegistry } from '@angular/compiler';
import { GridApi } from '@ag-grid-enterprise/all-modules';


export class GlobalConstants  {

    doReg() {
        var result: any
        if (result = regression.linear([1,2],[2,4])) {
            return result.equation[0];
        }
        this.doReg()
    }
    

public static gradient: number;
gradient = this.doReg();
    /*public static ProdsData: [];
    result: any;
    resultHyp: any;
    gradientHyp: number;
    yIntercept: number;
    yInterceptHyp: number; 
    gradient: number;
    public static siteTitle: string = "This is example of ItSolutionStuff.com";
    
    constructor(private httpclient:HttpClient, private _dcaProdService: DcaProdService) {}
    public static gradient: number = 0.005;
    
    ngOnInit() {
        this._dcaProdService.getProd() 
        .subscribe 
        (data => {
            return  GlobalConstants.ProdsData = data;
        })

    let PrdsData = GlobalConstants.ProdsData.map( Object.values );
    let newPrdsArray = [];
    for (var i = 0; i < PrdsData.length; i++) {
    
    [PrdsData[i][1],PrdsData[i][2]] = [PrdsData[i][2],PrdsData[i][1]];
    newPrdsArray.push(PrdsData[i].splice(-7,2));    

    }
   // console.log(this.ProdsData);

    this.result = regression.linear(newPrdsArray, {precision: 8});
    
    this.gradient= this.result.equation[0];
    this. yIntercept = this.result.equation[1]
    //console.log(this.gradient);
    //console.log(this.yIntercept);
    //console.log(this.result);
    //let res = [this.gradient, this.yIntercept];
    //console.log(res);

    GlobalConstants.ProdsData

    }*/
}