import { Component, ModuleWithProviders, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AllModules, Module } from '@ag-grid-enterprise/all-modules';
import { ModuleRegistry } from "@ag-grid-community/core";

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

ModuleRegistry.registerModules([ClientSideRowModelModule, GridChartsModule,  RangeSelectionModule, MenuModule, RowGroupingModule, ColumnsToolPanelModule, SetFilterModule ]);


@Component({
  selector: 'app-kpi-dashboard',
  templateUrl: './kpi-dashboard.component.html',
  styleUrls: ['./kpi-dashboard.component.css']
})
export class KpiDashboardComponent implements OnInit {
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
     
    { headerName: 'Company', field:'company', hide:true},
    { headerName: 'Asset', field:'asset' },
    { headerName: 'Field', field:'field' },
    { headerName: 'Reservior', field:'reservoir' },
    { headerName: 'Well', field:'well' },
    { headerName: 'MTH', field:'month' },
    { headerName: 'Pln-Oil', field:'plan_oil', aggFunc: 'sum', hide:false },
    { headerName: 'Act-Oil', field:'actual_oil', aggFunc: 'sum', hide:false},
    { headerName: 'Pln-Gas', field:'plan_gas',  aggFunc: 'sum', hide:false},
    { headerName: 'Act-Gas', field:'actual_gas',  aggFunc: 'sum', hide:false},
    { headerName: 'Pln-NGL', field:'plan_ngl',  aggFunc: 'sum', hide:false},
    { headerName: 'Act-NGL', field:'actual_ngl',  aggFunc: 'sum', hide:false},
    { headerName: 'Pln-CumOil', field:'plan_cumoil', aggFunc: 'sum'},
    { headerName: 'Act-CumOil', field:'actual_cumoil', aggFunc: 'sum'},

    { headerName: 'Pln-CumGas', field:'plan_cumgas', aggFunc: 'sum', hide:false },
    { headerName: 'Act-CumGas', field:'actual_cumgas', aggFunc: 'sum', hide:false },

    { headerName: 'Pln-CumNgl', field:'plan_cumngl', aggFunc: 'sum', hide:false },
    { headerName: 'Act-CumNgl', field:'actual_cumngl', aggFunc: 'sum', hide:false },

    { headerName: 'Pln-Cumboe', field:'plan_cumboe', aggFunc: 'sum', hide:true },
    { headerName: 'Act-Cumboe', field:'actual_cumboe', aggFunc: 'sum', hide:true },

    { headerName: 'Pln-ST-OIL', field:'plan_st_oil' },
    { headerName: 'Act-ST-OIL', field:'actual_st_oil' },
    { headerName: 'Pln-ST-GAS', field:'short_term_plan_gas', hide:true,  aggFunc: 'sum' },
    { headerName: 'Act-ST-GAS', field:'short_term_actual_gas', hide:true,  aggFunc: 'sum' },
    { headerName: 'Pln-ST-NGL', field:'short_term_plan_ngl', hide:true,  aggFunc: 'sum'},
    { headerName: 'Act-ST-NGL', field:'short_term_actual_ngl', hide:true,  aggFunc: 'sum' },
    { headerName: 'Pln-ST-CumOIL', field:'plan_st_cumoil',  aggFunc: 'sum', hide:false},
    { headerName: 'Act-ST-CumOIL', field:'actual_st_cumoil',  aggFunc: 'sum', hide:false},
    { headerName: 'Pln-ST-CumGAS', field:'short_term_cumgas', hide:true,  aggFunc: 'sum' },
    { headerName: 'Act-ST-CumGAS', field:'short_term_actual_cumgas', hide:true,  aggFunc: 'sum' },
    { headerName: 'Pln-ST-CumNGL', field:'short_term_plan_cumngl', hide:true,  aggFunc: 'sum'},
    { headerName: 'Act-ST-CumNGL', field:'short_term_actual_cumngl', hide:true,  aggFunc: 'sum' },
    { headerName: 'Pln-ST-CumBoe', field:'short_term_plan_cumboe', hide:true,  aggFunc: 'sum'},
    { headerName: 'Act-ST-CumBoe', field:'actual_st_cumboe', hide:true },
    { headerName: 'Pln-CAPX', field:'plan_capex'},
    { headerName: 'Act-CAPX', field:'actual_capex'},
    { headerName: 'Pln-OPX', field:'plan_opex'},
    { headerName: 'Act-OPX', field:'actual_opex'},  
    { headerName: 'Pln-CASH', field:'plan_cashflow'},
    { headerName: 'Act-CASH', field:'actual_cashflow'},
    { headerName: 'PlnST-CAPX', field:'plan_st_capex' },
    { headerName: 'ActST-CAPX', field:'actual_st_capex' },
    { headerName: 'PlnST-OPX', field:'plan__st_opex' },
    { headerName: 'ActST-OPX', field:'actual_st_opex'},
    { headerName: 'PlnST-CASH', field:'plan_st_cashflow' },
    { headerName: 'ActST-CASH', field:'actual_st_casflow' }
  
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
        columns: ['month', 'plan_cumoil', 'actual_cumoil', 'plan_st_oil', 'actual_st_oil'],
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
