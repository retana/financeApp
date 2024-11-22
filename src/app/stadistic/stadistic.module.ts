import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';
import { StadisticPageRoutingModule } from './stadistic-routing.module';
import { StadisticComponent } from './stadistic.component';
import { TransactionService } from '../home/transaction.service';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    StadisticPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [StadisticComponent],
  providers: [TransactionService]
})
export class StadisticModule {}
