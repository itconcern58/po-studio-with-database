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
  selector: 'app-kpi-dashboard-lt-oil',
  templateUrl: './kpi-dashboard-lt-oil.component.html',
  styleUrls: ['./kpi-dashboard-lt-oil.component.css']
})
export class KpiDashboardLtOilComponent implements OnInit {
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
  public well: any[]

  columnDefs = [
    //{ headerName: 'Month', field:'month', rowGroup:true, enableRowGroup:true, enablePivot:true, hide:true, chartDataType:"category" }, 
    { headerName: 'Company', field:'company', rowGroup:true, hide:true,
    enablePivot: true},
    { headerName: 'Asset', field:'asset', rowGroup:true, enableRowGroup:true, enablePivot:true, hide:true, chartDataType:"series" },
    { headerName: 'Field', field:'field', rowGroup:true, hide:true, enableRowGroup:true, enablePivot:true},
    { headerName: 'Reservior', field:'reservoir', rowGroup:true, hide:true, enableRowGroup:true},
    { headerName: 'Well', field:'well', rowGroup:true, enablePivot:true},
    { headerName: 'Month', field: 'month',  rowGroup:true, enablePivot:true},
    { 
      headerName: 'Plan Oil Prod (bbb/d)', field:'plan_oil', chartDataType:"series", aggFunc: 'sum'  
    },
    { 
      headerName: 'Actual Oil Prod (bbl/d)', field:'actual_oil', aggFunc: 'sum'},
    { 
      headerName: 'Plan  Monthly Total (Mbbl)', field:'plan_cumoil', aggFunc: 'sum',
    valueGetter: function(params) {
      if
        (params.data.plan_cumoil = Number(Math.round(parseFloat(params.data.plan_cumoil + 'e' + 1)) + 'e-' + 1)) {
          return params.data.plan_cumoil
        }
    },
    valueSetter: function(params) {
      params.data.plan_cumoil = params.newValue;
      return true;
    },
  },
    { 
      headerName: 'Actual Monthly Total (Mbbl)', field:'actual_cumoil', 
      valueGetter: function(params) {
        if
          (params.data.actual_cumoil = Number(Math.round(parseFloat(params.data.actual_cumoil + 'e' + 2)) + 'e-' + 2)) {
            return params.data.actual_cumoil
          }
      },
      valueSetter: function(params) {
        params.data.actual_cumoil = params.newValue;
        return true;
      }, 
      aggFunc: 'sum' 
    },
    { 
      headerName: 'Plan CAPEX (MM$)', field:'plan_capex', 
      valueGetter: function(params) {
        if
          (params.data.plan_capex = Number(Math.round(parseFloat(params.data.plan_capex + 'e' + 1)) + 'e-' + 1)) {
            return params.data.plan_capex
          }
      },
      valueSetter: function(params) {
        params.data.plan_capex = params.newValue;
        return true;
      },
      aggFunc: 'sum'
    },
    { 
      headerName: 'Actual CAPEX (MM$)', field:'actual_capex',
      valueGetter: function(params) {
        if
          (params.data.actual_capex = Number(Number(Math.round(parseFloat(params.data.actual_capex + 'e' + 2)) + 'e-' + 2))) {
            return (params.data.actual_capex);
          }
      },
      valueSetter: function(params) {
        params.data.actual_capex = params.newValue;
        return true;
      }, 
       aggFunc: 'sum'
      
      },
    { 
      headerName: 'Plan OPEX (MM$)', field:'plan_opex',  
      valueGetter: function(params) {
        if
          (params.data.plan_opex = Number(Number(Math.round(parseFloat(params.data.plan_opex + 'e' + 2)) + 'e-' + 2))) {
            return (params.data.plan_opex);
          }
      },
      valueSetter: function(params) {
        params.data.plan_opex = params.newValue;
        return true;
      },
      aggFunc: 'sum'
    },
    { 
      headerName: 'Actual OPEX (MM$)', field:'plan_opex',  
      valueGetter: function(params) {
        if
          (params.data.actual_opex = Number(Number(Math.round(parseFloat(params.data.actual_opex + 'e' + 2)) + 'e-' + 2))) {
            return (params.data.actual_opex);
          }
      },
      valueSetter: function(params) {
        params.data.actual_opex = params.newValue;
        return true;
      },
      aggFunc: 'sum'
  },  
    { 
      headerName: 'Plan Cash flow (MM$)', field:'plan_cashflow',
      valueGetter: function(params) {
        if
          (params.data.plan_cashflow = Number(Number(Math.round(parseFloat(params.data.plan_cashflow + 'e' + 2)) + 'e-' + 2))) {
            return (params.data.plan_cashflow);
          }
      }, 
      valueSetter: function(params) {
        params.data.plan_cashflow = params.newValue;
        return true;
      },
      aggFunc: 'sum'
    },
    { 
      headerName: 'Actual Cash flow (MM$)', field:'actual_cashflow', 
      valueGetter: function(params) {
        if
          (params.data.actual_cashflow = Number(Number(Math.round(parseFloat(params.data.actual_cashflow + 'e' + 2)) + 'e-' + 2))) {
            return (params.data.actual_cashflow);
          }
      }, 
      valueSetter: function(params) {
        params.data.actual_cashflow = params.newValue;
        return true;
      }, 
      aggFunc: 'sum'
    }, 
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
  this.paginationPageSize = 6;
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
        rowEndIndex: 4,
        columns: ['month', 'plan_oil', 'actual_oil'],
      },
      chartType: 'groupedBar',
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
        columns: ['group', 'well'],
      },
      chartType: 'pie',
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
        columns: ['month', 'plan_capex', 'actual_capex'],
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
  return [];
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
        this.rowData = data;
        this.well = this.rowData.well;
      });
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
