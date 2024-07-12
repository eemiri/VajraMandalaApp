import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    IonicModule,
    AdminDashboardRoutingModule
  ]
})
export class AdminDashboardPageModule {}
