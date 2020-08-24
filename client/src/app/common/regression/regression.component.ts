import { Component, OnInit } from '@angular/core';
import { ProdsService } from './../../services/prods.service'
import regression from 'regression';
import { DcaProdService } from './../../services/dca-prod.service';

@Component({
  selector: 'app-regression',
  templateUrl: './regression.component.html',
  styleUrls: ['./regression.component.css']
})
export class RegressionComponent implements OnInit {

  public regArray: any;
  public ProdsData: any;
  public result: any;

  public gradient: number;

  constructor( private _prodService : ProdsService ) {}
  

  ngOnInit() {

    this._prodService.getRegData()
    .subscribe (data => {
      this.regArray = data;

      let PrdsData = this.regArray.map( Object.values );
      let newPrdsArray = [];

      for (var i = 0; i < PrdsData.length; i++) {
        
        [PrdsData[i][1],PrdsData[i][2]] = [PrdsData[i][2],PrdsData[i][1]];
        newPrdsArray.push(PrdsData[i].splice(-20,2));
      }
      let mod_newPrdsArray = newPrdsArray.splice(-51,21)
      console.log(mod_newPrdsArray);
      var result = regression.linear(mod_newPrdsArray, {precision: 8});
      var gradient = result.equation[0];
      var yIntercept = result.equation[1];
      console.log(yIntercept);
      console.log(gradient);
    });

    this._prodService.getRegData()
    .subscribe (data => {
      this.regArray = data;
      console.log (this.regArray);
      let RecPrdsData = this.regArray.map( Object.values );
      let newRecPrdsArray = [];
      
      for (var i = 0; i < RecPrdsData.length; i++) {
        
        [RecPrdsData[i][1],RecPrdsData[i][3]] = [RecPrdsData[i][3],RecPrdsData[i][1]];
        newRecPrdsArray.push(RecPrdsData[i].splice(-20,2));
      }

      var mod_newRecPrdsArray = newRecPrdsArray.splice(-51, 21);

      var hypresult = regression.polynomial(mod_newRecPrdsArray, {order:0.3, precision: 8});
      var gradienthyp = hypresult.equation[0];
      var yIntercepthyp = hypresult.equation[1];
      console.log(yIntercepthyp);
      console.log(gradienthyp);

      var harresult = regression.linear(mod_newRecPrdsArray, {order:0.3, precision: 8});
      var gradienthar = harresult.equation[0];
      var yIntercepthar = harresult.equation[1];
      console.log(yIntercepthar);
      console.log(gradienthar);
    });
  }

}
