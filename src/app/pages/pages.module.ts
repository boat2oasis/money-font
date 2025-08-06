import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { AccountModule } from './account/account.module';
import { SpentInformationModule } from './spent-information/spent-information.module';
import { BudgetModule } from './budget/budget.module';
import { TreetableModule } from './treetable/treetable.module';
import {
    NbCardModule,NbButtonModule,
  } from '@nebular/theme';
import { LoginModule } from './login/login.module';
import { LifeThingsModule } from './life-things/life-things.module';

  const materialModules = [
      NbCardModule,NbButtonModule,
  ]

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    AccountModule,
    SpentInformationModule,
    BudgetModule,
    TreetableModule,
    LoginModule,
    LifeThingsModule,
    ...materialModules
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
