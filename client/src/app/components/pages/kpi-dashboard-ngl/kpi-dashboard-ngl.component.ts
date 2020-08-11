import { Component, ModuleWithProviders, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

ModuleRegistry.registerModules([ClientSideRowModelModule, GridChartsModule,  RangeSelectionModule, MenuModule, RowGroupingModule, ColumnsToolPanelModule, SetFilterModule ]);


@Component({
  selector: 'app-kpi-dashboard-ngl',
  templateUrl: './kpi-dashboard-ngl.component.html',
  styleUrls: ['./kpi-dashboard-ngl.component.css']
})
export class KpiDashboardNglComponent implements OnInit {
  Id:Number;
  wellArray: any;
  public selected;
  private gridApi;
  private gridColumnApi;
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
  
  prevSelectValue = null;
  selectedValue = 0;
  selectedValue1 = 0;

  public dropDownString;
  public wellValue;

  columnDefs = [

    { headerName: 'COMP', field:'company', enablePivot:true, hide:true },
    { headerName: 'ASST', field:'asset',  enablePivot:true, hide:true },
    { headerName: 'FLD', field:'field', enablePivot:true, hide:true },
    { headerName: 'RESV', field:'reservoir', enablePivot:true, hide:true },
    { headerName: 'WELL', field:'well', menuTabs: ['filterMenuTab', 'columnsMenuTab'],enablePivot:true, hide:true},
    { headerName: 'MTH', field: 'month', chartDataType: "categories" },
    { headerName: 'PL NGL (BBL/D)', field: 'plan_oil', chartDataType: "series" },
    { headerName: 'ACT NGL (BBL/D)', field: 'actual_oil', chartDataType: "series" },
    { headerName: 'PL CUMNGL (MMBBL)', field: 'plan_cumoil', chartDataType: "series",aggFunc:"sum"},
    { headerName: 'ACT CUMNGL (MMBBL)', field: 'actual_cumoil', chartDataType: "series", aggFunc:"sum" },
    { headerName: 'PL CAPEX (MM$)', field: 'plan_capex', chartDataType: "series", aggFunc:"sum" },
    { headerName: 'ACT CAPEX (MM$)', field: 'actual_capex', chartDataType: "series", aggFunc:"sum" },
    { headerName: 'PL OPEX (MM$)', field: 'plan_opex', chartDataType: "series" , aggFunc:"sum"},
    { headerName: 'ACT OPEX (MM$)', field: 'actual_opex', chartDataType: "series" , aggFunc:"sum"},
    { headerName: 'PL CAFLOW (MM$)',field: 'plan_cashflow', chartDataType: "series", aggFunc:"sum" },
    { headerName: 'ACT CAFLOW (MM$)', field: 'actual_cashflow', chartDataType: "series", aggFunc:"sum"}, 
    
    { headerName: 'PL ST NGL (BBL/D)', field: 'plan_oil', chartDataType: "series" },
    { headerName: 'ACT ST NGL (BBL/D)', field: 'actual_oil', chartDataType: "series" },
    { headerName: 'PL ST CUMNGL (MMBBL)', field: 'plan_cumoil', chartDataType: "series",aggFunc:"sum"},
    { headerName: 'ACT ST CUMNGL (MMBBL)', field: 'actual_cumoil', chartDataType: "series", aggFunc:"sum" },
    { headerName: 'PL ST CAPEX (MM$)', field: 'plan_capex', chartDataType: "series", aggFunc:"sum" },
    { headerName: 'ACT ST CAPEX (MM$)', field: 'actual_capex', chartDataType: "series", aggFunc:"sum" },
    { headerName: 'PL ST OPEX (MM$)', field: 'plan_opex', chartDataType: "series" , aggFunc:"sum"},
    { headerName: 'ACT ST OPEX (MM$)', field: 'actual_opex', chartDataType: "series" , aggFunc:"sum"},
    { headerName: 'PL ST CAFLOW (MM$)',field: 'plan_cashflow', chartDataType: "series", aggFunc:"sum" },
    { headerName: 'ACT ST CAFLOW (MM$)', field: 'actual_cashflow', chartDataType: "series", aggFunc:"sum"},   
];


constructor( private http: HttpClient ) {
 
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
  this.paginationPageSize = 12;
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

// Choose city using select dropdown
changeWell (e) {
  console.log(e.target.value);
}

onSelectionChanged($event) {
  var selectedRows = this.gridApi.getSelectedRows();
  var selectedRowsString = '';
  var maxToShow = 5;
  selectedRows.forEach(function(selectedRow, index) {
    if (index >= maxToShow) {
      return;
    }
    if (index > 0) {
      selectedRowsString += ', ';
    }
    selectedRowsString += selectedRow.well;
  });
  if (selectedRows.length > maxToShow) {
    var othersCount = selectedRows.length - maxToShow;
    selectedRowsString +=
      ' and ' + othersCount + ' other' + (othersCount !== 1 ? 's' : '');
  }
  document.querySelector('#selectedRows').innerHTML = selectedRowsString;
}

numberFormatter(params) {
  return Number(params.newValue).toFixed(2);
}

onFirstDataRendered(event) {
  {
    var eContainer1 = document.querySelector('#chart1');
    var params1 = {
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 11,
        columns: ['month', 'plan_cumoil', 'actual_cumoil', 'plan_cashflow', 'actual_cashflow'],
      },
      chartType: 'groupedColumn',
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

numberCellFormatter(params) {
  return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
    
onColumnResized(params) {
  params.api.resetRowHeights();
}

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get('http://localhost:8080/api/kpis')
      //.get('./assets/data/kpi/mockdata/mock-work.json')
      .subscribe(data => {
      this.rowData = data ;
      this.well = [];
      for (var i=0; i<this.rowData.length; i++) {
        this.well.push(this.rowData[i].well);
        //this.well = this.rowData[i].well;
        
        this.selected = [
          this.rowData[2]
        ];
      //  this.well = [];
       // this.well.push(this.well);  
       console.log(this.rowData);

      }
    });
    
  }
      
  selectedChangeHandler (event: any) {
    //Update the well 
    this.rowData[0].well = event.target.value;
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
    
  }

}
