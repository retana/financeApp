import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionPageRoutingModule } from './transaction-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TransactionComponent } from './transaction.component';
import { TransactionService } from '../transaction.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../category.service';



@NgModule({
  declarations: [TransactionComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ReactiveFormsModule,
    TransactionPageRoutingModule
  ],
  providers: [
    TransactionService,
    CategoryService
  ]
})
export class TransactionModule { }
