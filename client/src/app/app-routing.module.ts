import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KpiMainComponent } from "./components/kpi-main/kpi-main.component";
import { VirtualWarRoomMainComponent } from "./components/virtual-war-room-main/virtual-war-room-main.component";
import { ProductionGapAnalysisMainComponent } from "./components/production-gap-analysis-main/production-gap-analysis-main.component";
import { RootCauseAnalysisMainComponent } from "./components/root-cause-analysis-main/root-cause-analysis-main.component";
import { CountermeasureMainComponent } from "./components/countermeasure-main/countermeasure-main.component";
import { ActionTrackerMainComponent } from "./components/action-tracker-main/action-tracker-main.component";
import { ProgressMonitorMainComponent } from "./components/progress-monitor-main/progress-monitor-main.component";
import { AggregatorMainComponent } from "./components/aggregator-main/aggregator-main.component";

import { KpiDashboardComponent } from "./components/pages/kpi-dashboard/kpi-dashboard.component";
import { KpiDashboardLtOilComponent } from "./components/pages/kpi-dashboard-lt-oil/kpi-dashboard-lt-oil.component";
import { KpiDashboardStOilComponent } from "./components/pages/kpi-dashboard-st-oil/kpi-dashboard-st-oil.component";
import { KpiDashboardNglComponent } from "./components/pages/kpi-dashboard-ngl/kpi-dashboard-ngl.component";
import { KpiDashboardLtGasComponent } from "./components/pages/kpi-dashboard-lt-gas/kpi-dashboard-lt-gas.component";

import { VirtualWarRoomWellPerfDasboardComponent } from "./components/pages/virtual-war-room-well-perf-dasboard/virtual-war-room-well-perf-dasboard.component";
import { VirtualWarRoomPotAssSheetComponent } from "./components/pages/virtual-war-room-pot-ass-sheet/virtual-war-room-pot-ass-sheet.component";
import { VirtualWarRoomWellOperatingEnvelopeComponent } from "./components/pages/virtual-war-room-well-operating-envelope/virtual-war-room-well-operating-envelope.component";
import { VirtualWarRoomBubbleMapComponent } from "./components/pages/virtual-war-room-bubble-map/virtual-war-room-bubble-map.component";
import { VirtualWarRoomDeclineCurveAnalysisComponent } from "./components/pages/virtual-war-room-decline-curve-analysis/virtual-war-room-decline-curve-analysis.component";

import { ProdGapAnalysisForecastComponent } from "./components/pages/prod-gap-analysis-forecast/prod-gap-analysis-forecast.component";
import { ProdGapAnalysisDiffComponent } from "./components/pages/prod-gap-analysis-diff/prod-gap-analysis-diff.component";

import { RcaReportComponent } from "./components/pages/rca-report/rca-report.component";
import { RcaAssessmentSheetComponent } from "./components/pages/rca-assessment-sheet/rca-assessment-sheet.component"

import { CountermeasurePlanComponent } from "./components/pages/countermeasure-plan/countermeasure-plan.component";

import { ActionTrackerSheetComponent } from "./components/pages/action-tracker-sheet/action-tracker-sheet.component";
import { ProgressMonitorChartComponent } from "./components/pages/progress-monitor-chart/progress-monitor-chart.component";
import { AggregatorDashboardComponent }  from "./components/pages/aggregator-dashboard/aggregator-dashboard.component";
import { RegressionComponent } from "./common/regression/regression.component";

const routes: Routes = [
  { path: 'kpi-main', component:KpiMainComponent },
  { path: 'virtual-war-room-main', component:VirtualWarRoomMainComponent },
  { path: 'production-gap-analysis-main', component:ProductionGapAnalysisMainComponent },
  { path: 'root-cause-analysis-main', component:RootCauseAnalysisMainComponent },
  { path: 'countermeasure-main', component:CountermeasureMainComponent },
  { path: 'action-tracker-main', component:ActionTrackerMainComponent },
  { path: 'progress-monitor-main', component:ProgressMonitorMainComponent },
  { path: 'aggregator-main', component:AggregatorMainComponent },

  { path: 'kpi-dashboard', component:KpiDashboardComponent },
  { path: 'kpi-dashboard-lt-oil', component:KpiDashboardLtOilComponent },
  { path: 'kpi-dashboard-st-oil', component:KpiDashboardStOilComponent },
  { path: 'kpi-dashboard-ngl', component:KpiDashboardNglComponent },
  { path: 'kpi-dashboard-gas', component:KpiDashboardLtGasComponent },

  { path: 'virtual-war-room-wpd', component:VirtualWarRoomWellPerfDasboardComponent },
  { path: 'virtual-war-room-woe', component:VirtualWarRoomWellOperatingEnvelopeComponent },
  { path: 'virtual-war-room-pas', component:VirtualWarRoomPotAssSheetComponent },
  { path: 'virtual-war-room-bubble-map', component:VirtualWarRoomBubbleMapComponent },
  { path: 'virtual-war-room-dca', component:VirtualWarRoomDeclineCurveAnalysisComponent },

  { path: 'pga-main', component:ProductionGapAnalysisMainComponent },
  { path: 'pga-forecast', component:ProdGapAnalysisForecastComponent },
  { path: 'pga-difference', component:ProdGapAnalysisDiffComponent },

  { path: 'root-cause-analysis-report', component:RcaReportComponent },
  { path: 'root-cause-analysis-assessment-sheet', component: RcaAssessmentSheetComponent },

  { path: 'cm-plan', component: CountermeasurePlanComponent },
  { path: 'action-tracker-sheet', component: ActionTrackerSheetComponent },
  { path: 'progress-monitor-chart', component:ProgressMonitorChartComponent },
  { path: 'aggregator-dashboard', component:AggregatorDashboardComponent },
  { path: 'regression', component:RegressionComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
