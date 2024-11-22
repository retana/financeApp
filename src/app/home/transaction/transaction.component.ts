import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../transaction.service'; // Ajusta la ruta
import { CategoryService } from '../category.service'; // Ajusta la ruta
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  transactionForm: FormGroup;
  isEdit: boolean = false;
  transactionId: number = 0;
  categories: any[] = [];  // Arreglo para almacenar las categorías
  userId: string | null = '';  // Guardar el userId desde localStorage
  minDate: string = ''; // Opcional: para establecer una fecha mínima en el campo de fecha

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private categoryService: CategoryService,  // Inyecta el servicio de categorías
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router
  ) {
    // Inicia el formulario
    this.transactionForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      date: ['', Validators.required],
      userId: ['', Validators.required],  // Este campo lo rellenaremos desde localStorage
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Obtener el userId desde localStorage
    this.userId = localStorage.getItem('userId');
    
    // Establecer el valor de userId en el formulario
    if (this.userId) {
      this.transactionForm.patchValue({
        userId: this.userId,
      });
    }

    // Establecer una fecha mínima (opcional)
    const today = new Date();
    this.minDate = today.toISOString();  // Formato ISO para la fecha mínima

    // Cargar categorías desde la API
    this.loadCategories();

    // Si estamos editando una transacción, cargar los datos
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.transactionId = +id;
        this.loadTransaction();
      }
    });
  }

  // Método para cargar las categorías desde la API
  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;  // Guarda las categorías obtenidas
    });
  }

  // Método para cargar la transacción en el formulario en caso de edición
  loadTransaction() {
    if (this.transactionId) {
      this.transactionService.getTransactionById(this.transactionId).subscribe((transaction: any) => {
        this.transactionForm.patchValue({
          amount: transaction.amount,
          description: transaction.description,
          date: transaction.date,
          userId: transaction.user.id,  // Esto se puede omitir si ya está en localStorage
          categoryId: transaction.category.id,
        });
      });
    }
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.transactionForm.invalid) return;

    const formData = this.transactionForm.value;
  
    // Asignar el userId como objeto con id
  const user = { id: this.userId };

  // Asignar categoryId como objeto con id
  const category = { id: formData.categoryId };

  // Crear un objeto de transacción con la estructura esperada
  const transactionData = {
    amount: formData.amount,
    description: formData.description,
    date: formData.date,
    user,       // Asignamos el objeto user
    category,   // Asignamos el objeto category
  };


    if (this.isEdit) {
      this.transactionService.updateTransaction(this.transactionId, formData).subscribe(() => {
        this.navCtrl.back();
      });
    } else {
      this.transactionService.addTransaction(formData).subscribe(() => {
        this.navCtrl.back();
      });
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}
