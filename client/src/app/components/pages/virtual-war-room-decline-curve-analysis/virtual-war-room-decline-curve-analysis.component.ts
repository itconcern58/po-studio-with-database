import { Component, ModuleWithProviders, OnInit, Input, Output, EventEmitter, getDebugNode } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AllModules, Module } from '@ag-grid-enterprise/all-modules';
import { ModuleRegistry } from "@ag-grid-community/core";

import { cloneDeep } from 'lodash';

ModuleRegistry.registerModules(AllModules);

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';

import { GridChartsModule } from "@ag-grid-enterprise/charts";
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import _ from 'lodash';
import { Observable } from 'rxjs';
import {  ProdsService } from './../../../services/prods.service';

ModuleRegistry.registerModules([ClientSideRowModelModule, GridChartsModule,  RangeSelectionModule, MenuModule, RowGroupingModule, ColumnsToolPanelModule, SetFilterModule ]);

import { DcaProdService } from './../../../services/dca-prod.service';
import { Prods } from './../../../models/prod';
import regression from 'regression';
import { GlobalConstants } from './../../../constants/global-constants';
import { RegressionComponent } from './../../../common/regression/regression.component';

@Component({
  selector: 'app-virtual-war-room-decline-curve-analysis',
  templateUrl: './virtual-war-room-decline-curve-analysis.component.html',
  styleUrls: ['./virtual-war-room-decline-curve-analysis.component.css']
})

export class VirtualWarRoomDeclineCurveAnalysisComponent implements OnInit {

  private sum: number;
  private gridApi;
  private gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public rowData: any;
  public components;
  public rowHeight;
  public getRowHeight;
  public rowStyle;
  public paginationPageSize;
  public suppressRowTransform;
  public getRowStyle;
  public rowClassRules;
  public getRowNodeId;
  public getRowNode;
  public popupParent;
  public modules: Module [] = [ClientSideRowModelModule, RangeSelectionModule, GridChartsModule, MenuModule, RowGroupingModule, ColumnsToolPanelModule, SetFilterModule];
  public autoGroupColumnDef;
  public headerHeight;
  public sideBar;
  public rowSelection;
  public well: any;
  private options: any;

constructor( private http: HttpClient, private _dcaProdService: DcaProdService, private _prodService: ProdsService, private regressioncomponent: RegressionComponent ) {  
 const slope = -0.001533;
 const yIntercept = 6.95962649

 const hypslope = 0.0000024;
 const hypyIntercept = 0.00084692;

 const harslope = 0.0000024;
 const haryIntercept = 0.00084692;
 
      this.columnDefs = [
      { headerName: 'Time-On', field : 'timeon', chartDataType:'category' },
      { headerName: 'Oil Prod', field : 'prod' },

      { 
        headerName: 'Short Term Oil', field: 'short_prod'},
      { 
        headerName: 'Pred (Exp)', field: 'pred_exp',
        //valueGetter: function(params) {
       // return Math.round(Math.exp((params.data.timeon*params.data.gradientexp + params.data.yInterceptexp)));
     // }
    },
      { headerName: 'Pred (Hyp)', field: 'pred_hyp',
       //valueGetter: function(params) {
       // return Math.round(Math.pow((params.data.timeon*params.data.gradienthyp + params.data.yIntercepthyp), -1))
       // return Math.round(Math.pow((params.data.timeon*hypslope + hypyIntercept), -1))
     // }
    },
    { headerName: 'Pred (Har)', field: 'pred_har',
      /* valueGetter: function(params) { 
         return Math.round(Math.pow((params.data.timeon*harslope + haryIntercept), -1))
       }*/
    },
    { headerName: 'Pred (Har)', field: 'pred_har',
    valueGetter: function(params) { 
      return Math.round(Math.pow((params.data.timeon*harslope + haryIntercept), -1))
    }
 },
 { headerName: 'Slope (exp)', field: 'gradientexp', hide:true },
 { headerName: 'Intercept (exp)', field: 'yInterceptexp', hide:true },

 { headerName: 'Slope (hyp)', field: 'gradienthyp', hide:true },
 { headerName: 'Intercept (hyp)', field: 'yIntercepthyp', hide:true },

 { headerName: 'Slope (har)', field: 'gradienthar', hide:true },
 { headerName: 'Intercept (har)', field: 'yIntercepthar', hide:true },

 { headerName: 'Log Y', field: 'log_y', hide:true,
    valueGetter: function(params) {
    return Math.log(params.data.prod);
  }
},
 { headerName: 'Log X', field: 'log_x', hide:true,
  valueGetter: function(params) {
    return Math.log(params.data.timeon);
  }
},

  { headerName: 'Reserves (Mbbl)', field: 'reserves',
    //   valueGetter: function(params) {
    //    return 688
   //   }
    },
    { headerName: 'Total Oil', field: 't_oil',hide:true,
       valueGetter: function(params) {
        return Math.round(Math.pow((params.data.timeon*harslope + haryIntercept), -1)) + params.data.short_prod;
      }
    },
  ];

    this.defaultColDef = {
    
      flex: 1,
      cellClass: 'cell-wrap-text',
      autoHeight: true,
      sortable: true,
      resizable: true,
      enableCharts: true,
      enableRangeSelection: true,
      editable:true,
      filter: true,
    };
    this.rowHeight = 20;
    this.popupParent = document.body;
    this.paginationPageSize = 51;
    this.suppressRowTransform = true;
    this.autoGroupColumnDef = {
      headerName: ' CUSTOM! ',
      minWidth: 270,
      cellRendererParams: {
        suppressCount: true,
        checkbox: true,
      },
    },
    this.sideBar = 'columns';
    this.headerHeight = 78;
    this.rowSelection = 'multiple';
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData;
  }

  onFirstDataRendered(event) {
    {
      var eContainer1 = document.querySelector('#chart1');
      var params1 = {
        cellRange: {
          rowStartIndex: 0,
          rowEndIndex: 51,
          columns: ['timeon', 'prod', 'pred_exp', 'pred_hyp', 'pred_har', 'reserves'],
        },
        chartType: 'line',
        chartContainer: eContainer1,
        processChartOptions: function(params) {
          params.options.seriesDefaults.tooltip.renderer = function(params) {
            var titleStyle = params.color
              ? ' style="color: white; background-color:' + params.color + '"'
              : '';
            var title = params.title
              ? '<div class="ag-chart-tooltip-title"' +
                titleStyle +
                '>' +
                params.title +
                '</div>'
              : '';
            var value = params.datum[params.yKey]
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            return (
              title +
              '<div class="ag-chart-tooltip-content" style="text-align: center">' +
              value +
              '</div>'
            );
          };
          return params.options;
        },
      };
      event.api.createRangeChart(params1);
      var eContainer2 = document.querySelector('#chart2');
      var params2 = {
        cellRange: {
          columns: ['month', 'plan_cashflow', 'actual_cashflow'],
        },
    
        chartType: 'line',
        chartContainer: eContainer2,
        aggFunc: 'sum',
        processChartOptions: function(params) {
          params.options.legend.position = 'bottom';
          params.options.padding = {
            top: 20,
            left: 10,
            bottom: 30,
            right: 10,
          };
          params.options.seriesDefaults.tooltip.renderer = function(params) {
            var titleStyle = params.color
              ? ' style="color: white; background-color:' + params.color + '"'
              : '';
            var title = params.title
              ? '<div class="ag-chart-tooltip-title"' +
                titleStyle +
                '>' +
                params.title +
                '</div>'
              : '';
            var value = params.datum[params.angleKey]
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            return (
              title +
              '<div class="ag-chart-tooltip-content" style="text-align: center">' +
              value +
              '</div>'
            );
          };
          return params.options;
        },
      };
      event.api.createRangeChart(params2);
      var eContainer3 = document.querySelector('#chart3');
      var params3 = {
        cellRange: {
          columns: ['month', 'plan_oil', 'actual_oil',],
        },
        chartType: 'line',
        chartContainer: eContainer3,
        aggFunc: 'sum',
        processChartOptions: function(params) {
          params.options.legend.position = 'bottom';
          params.options.padding = {
            top: 20,
            left: 10,
            bottom: 30,
            right: 10,
          };
          params.options.seriesDefaults.tooltip.renderer = function(params) {
            var titleStyle = params.color
              ? ' style="color: white; background-color:' + params.color + '"'
              : '';
            var title = params.title
              ? '<div class="ag-chart-tooltip-title"' +
                titleStyle +
                '>' +
                params.title +
                '</div>'
              : '';
            var value = params.datum[params.angleKey]
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            return (
              title +
              '<div class="ag-chart-tooltip-content" style="text-align: center">' +
              value +
              '</div>'
            );
          };
          return params.options;
        },
      };
      event.api.createRangeChart(params3);
    }
  }
  getChartToolbarItems(params) {
    return [ 'chartDownload', 'chartData', 'chartSettings' ];
    }
    
  columnTypes: {
      actual_cumboe: {
      chartDataType: 'series',
      cellClass: 'number',
      cellRenderer: 'agAnimateShowChangeCellRenderer'
    }
    
  }

       
  selectedChangeHandler (event: any) {
    //Update the well 
  this.rowData[0].well = event.target.value;
  }

  onColumnResized(params) {
    params.api.resetRowHeights();
  }

  processChartOptions(params) {
    var opts = params.options;
    opts.title.enabled = true;
    opts.title.text = 'Comparison Chart';
    opts.legend.position = 'bottom';
    opts.seriesDefaults.tooltip.renderer = function(params) {
      var titleStyle = params.color
        ? ' style="color: white; background-color:' + params.color + '"'
        : '';
      var title = params.title
        ? '<div class="ag-chart-tooltip-title"' +
          titleStyle +
          '>' +
          params.title +
          '</div>'
        : '';
      var value = params.datum[params.yKey]
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      return (
        title +
        '<div class="ag-chart-tooltip-content" style="text-align: center">' +
        value +
        '</div>'
      );
    };
    if (opts.xAxis) {
      opts.xAxis.label.rotation = 0;
    }
    if (opts.yAxis) {
      opts.yAxis.label.rotation = 0;
    }
    return opts;
  };

  
  ngOnInit() { 
    this._dcaProdService.getProd()
    .subscribe 
    (data => {
      this.rowData = data;

      /* ****** Exponential Decline */

      let PrdsData = this.rowData.map( Object.values );
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
      /* **** End of Exponential Decline ***/

      /* ****** Hyperbolic Decline */
      let PrdsHypData = this.rowData.map( Object.values );
      let newPrdsHypArray = [];

      for (var i = 0; i < PrdsHypData.length; i++) {
        newPrdsHypArray.push(PrdsHypData[i].splice(-20,2));
      }

      let mod_newPrdsHypArray = newPrdsHypArray.splice(-51,21);

      let modified_newPrdsHypArray = [];

      for (var i = 0; i < mod_newPrdsHypArray.length; i++) {
       // modified_newPrdsHypArray.push(Math.log(mod_newPrdsHypArray[i].map(Math.log)));
        modified_newPrdsHypArray.push((mod_newPrdsHypArray[i].map(Math.log10)));
      }

      console.log(modified_newPrdsHypArray);

      var result = regression.linear(modified_newPrdsHypArray, { precision: 8 });
      var gradienthyp = result.equation[0];
      var yIntercepthyp = result.equation[1];
      console.log(yIntercepthyp);

      /* **** End of Hyperbolic Decline ***/

           /* ****** Harmonic Decline */
          let RecPrdsData = this.rowData.map( Object.values );
          let newRecPrdsArray = [];
          
          for (var i = 0; i < RecPrdsData.length; i++) {
            
            [RecPrdsData[i][1],RecPrdsData[i][3]] = [RecPrdsData[i][3],RecPrdsData[i][1]];
            newRecPrdsArray.push(RecPrdsData[i].splice(-20,2));
          }

        var mod_newRecPrdsArray = newRecPrdsArray.splice(-51, 21);

        var harresult = regression.linear(mod_newRecPrdsArray, {precision: 8});
        var gradienthar = harresult.equation[0];
        var yIntercepthar = harresult.equation[1];
        console.log(yIntercepthar);
        console.log(gradienthar);
     
           /* **** End of Harmonic Decline ***/


      /* **** RowData Update **/

      /* ***** Update Exponential Prediction **/
      var i = 0;
      for (i; i < this.rowData.length; i++) 
      {
        this.rowData[i].pred_exp = Math.round(Math.exp(this.rowData[i].timeon*gradient + yIntercept));
      } 

        /* ***** Update Hyperbolic Prediction **/
        var i = 0;
        for (i; i < this.rowData.length; i++) 
        {
          let xi = (((Math.log10(this.rowData[i].timeon)*gradienthyp + yIntercepthyp)));

          this.rowData[i].pred_hyp = Math.round(Math.pow(10, xi));
        } 

          /* ***** Update Harmonic Prediction **/
          var i = 0;
          for (i; i < this.rowData.length; i++) 
          {
            //Math.round(Math.pow((params.data.timeon*harslope + haryIntercept), -1))
            let yi = this.rowData[i].timeon*gradienthar + yIntercepthar;
  
            this.rowData[i].pred_har = Math.round(1/yi);
          } 

           /* ***** Update of Reserves **/
                  
           var i = 0;
           for (i; i < this.rowData.length; i++) 
           {
            this.rowData[0].reserves = (Math.round(1/1000*(this.rowData[1].pred_har*this.rowData[0].timeon))) +
            (Math.round(1/1000*(this.rowData[1].short_prod*this.rowData[0].timeon)));
            
            this.rowData[i+1].reserves = (Math.round(this.rowData[i].reserves + (this.rowData[i+1].pred_har*(this.rowData[i+1].timeon - this.rowData[i].timeon))/1000))
             + ((this.rowData[i+1].short_prod*(this.rowData[i+1].timeon - this.rowData[i].timeon))/1000);
           } 
    });

  }
}