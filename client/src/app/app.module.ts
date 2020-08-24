import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule} from '@angular/material/select';
import { KpiMainComponent } from './components/kpi-main/kpi-main.component';
import { VirtualWarRoomMainComponent } from './components/virtual-war-room-main/virtual-war-room-main.component';
import { ProductionGapAnalysisMainComponent } from './components/production-gap-analysis-main/production-gap-analysis-main.component';
import { RootCauseAnalysisMainComponent } from './components/root-cause-analysis-main/root-cause-analysis-main.component';
import { CountermeasureMainComponent } from './components/countermeasure-main/countermeasure-main.component';
import { ActionTrackerMainComponent } from './components/action-tracker-main/action-tracker-main.component';
import { ProgressMonitorMainComponent } from './components/progress-monitor-main/progress-monitor-main.component';
import { AggregatorMainComponent } from './components/aggregator-main/aggregator-main.component';
import { KpiDashboardComponent } from './components/pages/kpi-dashboard/kpi-dashboard.component';
import { VirtualWarRoomWellOperatingEnvelopeComponent } from './components/pages/virtual-war-room-well-operating-envelope/virtual-war-room-well-operating-envelope.component';
import { VirtualWarRoomWellPerfDasboardComponent } from './components/pages/virtual-war-room-well-perf-dasboard/virtual-war-room-well-perf-dasboard.component';
import { VirtualWarRoomPotAssSheetComponent } from './components/pages/virtual-war-room-pot-ass-sheet/virtual-war-room-pot-ass-sheet.component';
import { VirtualWarRoomBubbleMapComponent } from './components/pages/virtual-war-room-bubble-map/virtual-war-room-bubble-map.component';
import { VirtualWarRoomDeclineCurveAnalysisComponent } from './components/pages/virtual-war-room-decline-curve-analysis/virtual-war-room-decline-curve-analysis.component';
import { ProdGapAnalysisDiffComponent } from './components/pages/prod-gap-analysis-diff/prod-gap-analysis-diff.component';
import { ProdGapAnalysisForecastComponent } from './components/pages/prod-gap-analysis-forecast/prod-gap-analysis-forecast.component';
import { RcaReportComponent } from './components/pages/rca-report/rca-report.component';
import { RcaAssessmentSheetComponent } from './components/pages/rca-assessment-sheet/rca-assessment-sheet.component';
import { CountermeasurePlanComponent } from './components/pages/countermeasure-plan/countermeasure-plan.component';
import { ActionTrackerSheetComponent } from './components/pages/action-tracker-sheet/action-tracker-sheet.component';
import { ProgressMonitorChartComponent } from './components/pages/progress-monitor-chart/progress-monitor-chart.component';
import { AggregatorDashboardComponent } from './components/pages/aggregator-dashboard/aggregator-dashboard.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { AgGridModule } from 'ag-grid-angular';// or only import minimal modules required for charts
import { ModuleRegistry } from "@ag-grid-community/core";
import { GridChartsModule } from "@ag-grid-enterprise/charts";
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';

ModuleRegistry.registerModules([ClientSideRowModelModule, GridChartsModule, RangeSelectionModule]);

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { KpiDashboardLtOilComponent } from './components/pages/kpi-dashboard-lt-oil/kpi-dashboard-lt-oil.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { KpiDashboardStOilComponent } from './components/pages/kpi-dashboard-st-oil/kpi-dashboard-st-oil.component';
import { KpiDashboardNglComponent } from './components/pages/kpi-dashboard-ngl/kpi-dashboard-ngl.component';
import { DcaProdService } from './services/dca-prod.service';
import { ProdsService } from './services/prods.service';
import { RegressionComponent } from './common/regression/regression.component';
import { KpiDashboardLtGasComponent } from './components/pages/kpi-dashboard-lt-gas/kpi-dashboard-lt-gas.component';

@NgModule({
  declarations: [
    AppComponent,
    KpiMainComponent,
    VirtualWarRoomMainComponent,
    ProductionGapAnalysisMainComponent,
    RootCauseAnalysisMainComponent,
    CountermeasureMainComponent,
    ActionTrackerMainComponent,
    ProgressMonitorMainComponent,
    AggregatorMainComponent,
    KpiDashboardComponent,
    VirtualWarRoomWellOperatingEnvelopeComponent,
    VirtualWarRoomWellPerfDasboardComponent,
    VirtualWarRoomPotAssSheetComponent,
    VirtualWarRoomBubbleMapComponent,
    VirtualWarRoomDeclineCurveAnalysisComponent,
    ProdGapAnalysisDiffComponent,
    ProdGapAnalysisForecastComponent,
    RcaReportComponent,
    RcaAssessmentSheetComponent,
    CountermeasurePlanComponent,
    ActionTrackerSheetComponent,
    ProgressMonitorChartComponent,
    AggregatorDashboardComponent,
    WelcomePageComponent,
    KpiDashboardLtOilComponent,
    KpiDashboardStOilComponent,
    KpiDashboardNglComponent,
    RegressionComponent,
    KpiDashboardLtGasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    AgGridModule.withComponents([])
  ],
  providers: [HttpClient, DcaProdService, ProdsService, RegressionComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
