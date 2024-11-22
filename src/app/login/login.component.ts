import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from './auth.service';  // Importa el servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService  // Inyecta el servicio de autenticación
  ) {
    // Inicializa el formulario
    this.loginForm = this.formBuilder.group({
      email: ['user@retana.com', [Validators.required, Validators.email]],
      password: ['123', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    // Llamada al servicio de autenticación
    this.authService.login(email, password).subscribe(
      (response:any) => {
        // Si la respuesta es exitosa, guarda el token y navega a la pantalla principal
        localStorage.setItem('authToken', response.access_token);  // Guarda el token de autenticación si es necesario
        localStorage.setItem('userId', response.userId);
        this.navCtrl.navigateForward('/home');  // Redirige a la página principal
      },
      (error:any) => {
        // Si ocurre un error, muestra un mensaje
        this.loginError = 'Correo o contraseña incorrectos.';
      }
    );
  }
}
