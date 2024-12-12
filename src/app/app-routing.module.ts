import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaunchComponent } from './modules/launch/launch.component';
import { HistoryComponent } from './modules/history/history.component';
import { SettingsComponent } from './modules/settings/settings.component';


const routes: Routes = [
  {
    path: 'launch',
    component: LaunchComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
