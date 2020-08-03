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

  columnDefs = [
    /*{ headerName: 'Company', field: 'company', resizable:true, hide: true, 'minWidth':40, editable:true, rowGroup: true,},
    { headerName: 'Asset-1', field: 'asset-1', resizable:true, hide: true, 'minWidth':40, editable:true, rowGroup: true },
    { headerName: 'Asset-1', field: 'asset-2', resizable:true, hide: true, 'minWidth':40, editable:true, rowGroup: true },
    { headerName: 'Fld-ABAC', field: 'fld-abac', resizable:true, hide: true, 'minWidth':40, editable:true, rowGroup: true },
    { headerName: 'Fld-ADAE', field: 'fld-adae', resizable:true, hide: true, 'minWidth':40, editable:true, rowGroup: true },
    { headerName: 'Fld-AFAG', field: 'fld-afag', resizable:true, hide: true, 'minWidth':40, editable:true, rowGroup: true },
    { headerName: 'Fld-AHAI', field: 'fld-ahai', resizable:true, hide: true, 'minWidth':40, editable:true, rowGroup: true },
    { headerName: 'Res-AB', field: 'res-AB', resizable:true, hide: true, 'minWidth':40, editable:true, rowGroup: true },
    { headerName: 'Res-AC', field: 'res-AC', resizable:true, hide: true, 'minWidth':40, editable:true, rowGroup: true },
    { headerName: 'Res-AD', field: 'res-ad', resizable:true, hide:true,'minWidth':40, editable:true},
    { headerName: 'Res-AE', field: 'res-ae', resizable:true, hide:true,'minWidth':40, editable:true},
    { headerName: 'Res-AF', field: 'res-af', resizable:true, hide:true,'minWidth':40, editable:true},
    { headerName: 'Res-AG', field: 'res-ag', resizable:true, hide:true,'minWidth':40, editable:true},
    { headerName: 'Res-AH', field: 'res-ah', resizable:true, hide:true,'minWidth':40, editable:true},
    { headerName: 'Res-AI', field: 'res-ai', resizable:true, hide:true,'minWidth':40, editable:true},*/
    
    { headerName: 'Company', field:'company', rowGroup:true, hide:true},
    { headerName: 'Asset', field:'asset', rowGroup:true, hide:true},
    { headerName: 'Field', field:'field', rowGroup:true, hide:true},
    { headerName: 'Reservior', field:'reservoir', rowGroup:true, hide:true},
    { headerName: 'Well', field:'well', hide:false },
    { headerName: 'Date', field:'date' },
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

    { headerName: 'Pln-Cumboe', field:'plan_cumboe', aggFunc: 'sum', hide:false },
    { headerName: 'Act-Cumboe', field:'actual_cumboe', aggFunc: 'sum', hide:false },

    { headerName: 'Pln-ST-OIL', field:'short_term_plan_oil',  aggFunc: 'sum', hide:false},
    { headerName: 'Act-ST-OIL', field:'short_term_actual_oil',  aggFunc: 'sum', hide:false},
    { headerName: 'Pln-ST-GAS', field:'short_term_plan_gas', hide:false,  aggFunc: 'sum' },
    { headerName: 'Act-ST-GAS', field:'short_term_actual_gas', hide:false,  aggFunc: 'sum' },
    { headerName: 'Pln-ST-NGL', field:'short_term_plan_ngl', hide:false,  aggFunc: 'sum'},
    { headerName: 'Act-ST-NGL', field:'short_term_actual_ngl', hide:false,  aggFunc: 'sum' },
    { headerName: 'Pln-ST-CumOIL', field:'short_term_plan_cumoil',  aggFunc: 'sum', hide:false},
    { headerName: 'Act-ST-CumOIL', field:'short_term_actual_cumoil',  aggFunc: 'sum', hide:false},
    { headerName: 'Pln-ST-CumGAS', field:'short_term_cumgas', hide:false,  aggFunc: 'sum' },
    { headerName: 'Act-ST-CumGAS', field:'short_term_actual_cumgas', hide:false,  aggFunc: 'sum' },
    { headerName: 'Pln-ST-CumNGL', field:'short_term_plan_cumngl', hide:false,  aggFunc: 'sum'},
    { headerName: 'Act-ST-CumNGL', field:'short_term_actual_cumngl', hide:false,  aggFunc: 'sum' },
    { headerName: 'Pln-ST-CumBoe', field:'short_term_plan_cumboe', hide:false,  aggFunc: 'sum'},
    { headerName: 'Act-ST-CumBoe', field:'short_term_actual_cumboe', hide:false,  aggFunc: 'sum' },
    { headerName: 'Pln-CAPX', field:'plan_capex',  aggFunc: 'sum'},
    { headerName: 'Act-CAPX', field:'actual_capex',  aggFunc: 'sum'},
    { headerName: 'Pln-OPX', field:'plan_opex',  aggFunc: 'sum'},
    { headerName: 'Act-OPX', field:'plan_opex',  aggFunc: 'sum'},  
    { headerName: 'Pln-CASH', field:'plan_cashflow',  aggFunc: 'sum'},
    { headerName: 'Act-CASH', field:'actual_cashflow',  aggFunc: 'sum'},
    { headerName: 'PlnST-CAPX', field:'short_term_plan_capex', hide:false,  aggFunc: 'sum' },
    { headerName: 'ActST-CAPX', field:'short_term_actual_capex', hide:false,  aggFunc: 'sum' },
    { headerName: 'PlnST-OPX', field:'short_term_plan_opex', hide:false,  aggFunc: 'sum' },
    { headerName: 'ActST-OPX', field:'short_term_actual_opex', hide:false,  aggFunc: 'sum' },
    { headerName: 'PlnST-CASH', field:'short_term_plan_cashflow', hide:false,  aggFunc: 'sum' },
    { headerName: 'ActST-CASH', field:'short_term_actual_cashflow', hide:false,  aggFunc: 'sum' }
  

    /*{ 
      headerName: 'WellAB-1', field: 'ab-1', resizable:true, hide:true, 'minWidth':40, editable:true,
      children:[
        { headerName: 'Date', field: 'plan_ytd', resizable:true, 'minWidth':40, editable:true, chartDataType: 'category' }, 
        { headerName: 'Oil (Kbbl/d)', resizable:true, 'minWidth':60, editable:true,  
          children: [
            { headerName: 'Plan', field: 'plan_oil_rate', chartType:'series' },
            { headerName: 'Act.', field: 'actual_oil_rate', chartType:'series'  },
          ]
        },
    { 
      headerName: 'Gas (MMscf/d)', resizable:true,  editable:true, 
      children: [
         { 
            headerName: 'Plan', field: 'plan_gas_rate', 'minWidth':60, chartType:'series',
            valueGetter: function(params) {
            return (800*(params.data.plan_oil_rate)/1000).toFixed(1);
          },
          valueSetter: function(params) {
            params.data.plan_gas_rate = params.newValue;
            return true;
          },
        },
        { 
            headerName: 'Act.', field: 'actual_gas_rate', 'width':60, chartType:'series', 
            valueGetter: function(params) {
              let numboe = (800*(params.data.actual_oil_rate)/1000).toFixed(1);
            return numboe;
            },
            valueSetter: function(params) {
              params.data.actual_gas_rate = params.newValue;
              return true;
            },
          },
        ],
      },
      { 
        headerName: 'BOE (boed)', resizable:true, 'minWidth':60, editable:true, 
        children: [
          { 
        
            headerName: 'Plan', field: 'plan_boe_rate',
            valueGetter: function(params) {
              return (params.data.plan_oil_rate + (params.data.plan_oil_rate*800)/5658.3).toFixed(1);
            }
          },
          { headerName: 'Act.', field: 'actual_boe_rate',
          valueGetter: function(params) {
            return (params.data.actual_oil_rate + (params.data.actual_oil_rate*800)/5658.3).toFixed(1);
          }
         },
        ]
      },
      { 
        headerName: 'CAPEX ($K)', resizable:true, 'minWidth':60, editable:true, 
        children: [
          { headerName: 'Plan', field: 'plan_capex' },
          { headerName: 'Act.', field: 'actual_capex' },
        ]
      },
      { 
        headerName: 'OPEX ($K)', resizable:true, 'minWidth':60, editable:true, 
        children: [
          { headerName: 'Plan', field: 'plan_opex' },
          { headerName: 'Act.', field: 'actual_opex' },
        ]
      },
      { 
        headerName: 'CumBOE', resizable:true, 'minWidth':60, editable:true, 
        children: [
          { 
            headerName: 'Plan', field: 'plan_cumboe', chartDataType: 'series',
            
            valueGetter: function(params) {
              var plan_cumboe = params.data.plan_oil_rate + (params.data.plan_oil_rate*800)/5658.3;
              return ((plan_cumboe*365/12)/1000).toFixed(1);
            }
         
        },
          { 
            headerName: 'Act.', field: 'actual_cumboe', chartDataType: 'series',
            valueFormatter: this.numberCellFormatter,
            valueGetter: function(params) {
              var actual_cumboe = params.data.actual_oil_rate + (params.data.actual_oil_rate*800)/5658.3;
              return ((actual_cumboe*365/12)/1000).toFixed(1);
            }
         
         },
        ]
      },
      { 
        headerName: 'PV', resizable:true, 'minWidth':60, editable:true, 
        children: [
          { 
            headerName: 'Plan', field: 'plan_pv', 
            valueGetter: function(params) {
              var plan_cumboe = params.data.plan_oil_rate + (params.data.plan_oil_rate*800)/5658.3;
              return (((plan_cumboe*45*365/12)/1000)/(params.data.plan_capex + params.data.plan_opex)).toFixed(1);
            }
          },
          { headerName: 'Act.', field: 'actual_pv',
          valueGetter: function(params) {
            var actual_cumboe = params.data.actual_oil_rate + (params.data.actual_oil_rate*800)/5658.3;
            return (((actual_cumboe*45*365/12)/1000)/(params.data.actual_capex + params.data.actual_opex)).toFixed(1);
          }
        },
        ]
      }
    ] 
    },
    { headerName: 'WellAB-2', field: 'ab-2', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAB-3', field: 'ab-3', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAB-4', field: 'ab-4', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAC-1', field: 'ac-1', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAC-1', field: 'ac-2', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAC-3', field: 'ac-3', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAB-1', field: 'ad-1', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAD-2', field: 'ad-2', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAB-3', field: 'ad-3', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAD-4', field: 'ad-4', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAD-5', field: 'ad-5', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAE-1', field: 'ae-1', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAE-2', field: 'ae-2', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAE-3', field: 'ae-3', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAF-1', field: 'af-1', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAF-2', field: 'af-2', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAF-3', field: 'af-3', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAG-1', field: 'ag-1', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAG-2', field: 'ag-2', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAG-3', field: 'ag-3', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAH-1', field: 'ah-1', resizable:true, hide:true,'minWidth':40, editable:true},
    { headerName: 'WellAH-2', field: 'ah-2', resizable:true, hide:true,'minWidth':40, editable:true},
    { headerName: 'WellAH-3', field: 'ah-3', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAI-1', field: 'ai-1', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAI-2', field: 'ai-2', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAI-3', field: 'ah-3', resizable:true, hide:true, 'minWidth':40, editable:true},
    { headerName: 'WellAI-4', field: 'ah-4', resizable:true, hide:true, 'minWidth':40, editable:true},
    */
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
    editable:true
  };
  this.rowHeight = 20;
  this.popupParent = document.body;
  this.paginationPageSize = 14;
  this.suppressRowTransform = true;
  this.autoGroupColumnDef = { minWidth: 200 };
  this.headerHeight = 58;
}

onFirstDataRendered(params) {
  var cellRange = {
    rowStartIndex: 0,
    rowEndIndex: 11,
    columns: ['plan_ytd', 'plan_capex', 'actual_capex', 'plan_oil_rate', 'actual_oil_rate'],
  };

  var createRangeChartParams = {
    cellRange: cellRange,
    chartType: 'line',
  };
//  params.api.createRangeChart(createRangeChartParams);
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
     // .get('./assets/data/kpi/mockdata/kpi-dashboard.json')
      .get('./assets/data/kpi/mockdata/mock-work.json')
      .subscribe(data => {
        this.rowData = data;
      });
    }

    processChartOptions(params) {
      var opts = params.options;
      opts.title.enabled = true;
      opts.title.text = 'Medals by Age';
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