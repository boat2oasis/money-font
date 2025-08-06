import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { AccountComponent } from './account/account.component';
import { SpentInformationComponent } from './spent-information/spent-information.component'
import { BudgetComponent } from './budget/budget.component'

import { ChartjsComponent } from './charts/chartjs/chartjs.component'
import { TreeTableComponent } from './treetable/treetable.component'
import { LifeThingsComponent } from './life-things/life-things.component'
import { SentenceComponent } from './sentence/sentence.component';
import { FrequencyComponent } from './frequency/frequency.component'

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    
    {
      path: 'spent',
      component: SpentInformationComponent
    },
    {
      path: 'treeTable',
      component: TreeTableComponent
    },
    {
      path: 'account',
      component: AccountComponent,
    },

    {
      path: 'budget',
      component: BudgetComponent,
    },

    {
      path: 'statistics',
      component: ChartjsComponent,
    },

    {
      path: 'liftThings',
      component: LifeThingsComponent,
    },
    {
      path: 'sentence',
      component: SentenceComponent,
    },
    {
      path: 'frequency',
      component: FrequencyComponent,
    },
    
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: '',
      redirectTo: 'spent',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
