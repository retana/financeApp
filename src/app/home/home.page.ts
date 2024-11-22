import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TransactionService } from './transaction.service';  // Servicio de transacciones

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  transactions: any[] = [];  // Lista de transacciones
  errorMessage: string = ''; // Mensaje de error si no se pueden obtener las transacciones

  constructor(
    private navCtrl: NavController,
    private transactionService: TransactionService  // Servicio de transacciones
  ) {}

  ngOnInit() {
    this.loadUserTransactions();
  }

  // Cargar las transacciones del usuario
  loadUserTransactions() {
    const accessToken = localStorage.getItem('authToken')||'';
    const userId=Number(localStorage.getItem('userId')) || 0;
    console.log('Token:'+ accessToken);
    if (accessToken) {
        this.transactionService.getTransactions(userId, accessToken)
          .subscribe(
            (transactions: any[]) => {
              this.transactions = transactions;  // Asigna las transacciones a la lista
            },
            (error: any) => {
              if(error.status==404){
                this.errorMessage = error.error.message;  
              }else{
                this.errorMessage = 'Error al obtener las transacciones.';
              }
              console.error(error);
            }
          );
      } else {
        this.errorMessage = 'No se ha encontrado un token de acceso.';
      }
  
  }

  // Navegar a la página de creación de transacciones
  goToTransaction() {
    this.navCtrl.navigateForward('/transaction');
  }
}
