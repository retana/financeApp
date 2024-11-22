import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../home/transaction.service';

@Component({
  selector: 'app-stadistic',
  templateUrl: './stadistic.component.html',
  styleUrls: ['./stadistic.component.scss'],
})
export class StadisticComponent  implements OnInit {
  categoryStats: any[] = []; // Arreglo para almacenar las estadísticas
  isLoading: boolean = true;  // Para manejar el estado de carga

  constructor(private transactionService:TransactionService) { }

  ngOnInit() {
    this.loadCategoryStats();
  }

  loadCategoryStats() {
    this.transactionService.getCategoryStats().subscribe(
      (stats) => {
        this.categoryStats = stats;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error cargando estadísticas', error);
        this.isLoading = false;
      }
    );
  }

}
