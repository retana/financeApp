import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TransactionService } from './transaction.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './category.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
  ],
  providers: [TransactionService],
  declarations: [HomePage]
})
export class HomePageModule {}
