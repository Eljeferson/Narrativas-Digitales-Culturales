import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUseCase } from '../../core/application/auth/login.use-case';

@Component({
  selector: 'app-landing-login',
  standalone: true,
  imports: [FormsModule],
  template: `
<!-- Top Navigation Anchor -->
<nav class="sticky top-0 z-50 flex justify-between items-center px-8 py-4 w-full bg-[#FFF8EF]/80 dark:bg-[#1E1B13]/80 backdrop-blur-md">
<div class="flex items-center gap-3">
  <img src="logo-cultura.png" alt="CulturaStory AI Logo" class="h-12 w-auto object-contain">
  <span class="text-2xl font-headline italic font-bold tracking-tight text-[#B59449]">Historia Cultural</span>
</div>
<div class="hidden md:flex items-center gap-8">
  <a class="text-[#1E1B13]/70 dark:text-[#FFF8EF]/70 border-b-2 border-[#B59449] pb-1 font-bold" href="#">Narrativas</a>
  <a class="text-[#1E1B13]/70 dark:text-[#FFF8EF]/70 hover:border-b-2 hover:border-[#B59449]/50 pb-1 transition-all" href="#">Regiones</a>
  <a class="text-[#1E1B13]/70 dark:text-[#FFF8EF]/70 hover:border-b-2 hover:border-[#B59449]/50 pb-1 transition-all" href="#">Library</a>
</div>
<div class="flex items-center gap-4">
<button class="p-2 hover:bg-[#823B18]/5 rounded-full transition-colors">
<span class="material-symbols-outlined text-[#823B18]" data-icon="notifications">notifications</span>
</button>
<button class="p-2 hover:bg-[#823B18]/5 rounded-full transition-colors">
<span class="material-symbols-outlined text-[#823B18]" data-icon="settings">settings</span>
</button>
</div>
<div class="bg-gradient-to-r from-transparent via-[#795900]/20 to-transparent h-[1px] w-full absolute bottom-0"></div>
</nav>
<main class="min-h-[calc(100vh-80px)] flex flex-col md:flex-row relative overflow-hidden">
<div class="absolute left-8 top-0 bottom-0 w-[1px] bg-secondary opacity-30 hidden lg:block"></div>
<section class="flex-1 px-8 py-16 lg:px-24 flex flex-col justify-center relative">
<div class="absolute inset-0 textile-pattern -z-10"></div>
<div class="max-w-2xl space-y-8 relative">
<div class="inline-flex items-center gap-2 px-4 py-2 bg-tertiary-container/10 text-tertiary rounded-full text-sm font-medium">
<span class="material-symbols-outlined text-sm" data-icon="auto_awesome">auto_awesome</span>
                    Creando el futuro del aprendizaje cultural
                </div>
<h1 class="text-6xl md:text-7xl font-headline font-bold text-primary leading-tight">
                    Preserva la Memoria, <span class="italic text-secondary">Crea</span> el Manana.
                </h1>
<p class="text-lg text-on-surface-variant leading-relaxed max-w-lg">
                    Descubre una plataforma educativa donde la inteligencia artificial se encuentra con la herencia ancestral para crear narrativas culturales inolvidables.
                </p>
<div class="grid grid-cols-2 gap-8 pt-8">
<div class="space-y-2">
<span class="text-4xl font-headline text-tertiary">500+</span>
<p class="text-sm font-medium text-on-surface-variant">Historias Ancestrales Digitalizadas</p>
</div>
<div class="space-y-2">
<span class="text-4xl font-headline text-secondary">12</span>
<p class="text-sm font-medium text-on-surface-variant">Regiones Culturales Activas</p>
</div>
</div>
</div>
<div class="mt-16 relative w-full h-64 rounded-xl overflow-hidden shadow-2xl md:hidden">
<img alt="stylized andean textile texture" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyQZAD72R1NlwzEBq8PmUVaJ8eFOIUCWkhR6YqFNWVdMV_Bj2pDHuMpSW6VAD9wHvKt2ixvNh10D6xksapwRly3WP-3nZ5ikmykxmmg-lJ4tst9MYhT7H6gdUxJbcsDUEY-MlEI3zC5nSHcdVlFRKZBPwoxIbI2CEAS6_IJ_w0mKyhGZHD70LPqItlzEYumac6xRcZd9sAyl4hJXzGoRnsXcnMJg935N2n-8Pm0i7QLMoXZMNOE_Xgv1EUnS1VfTBbOQ-0Z9gS"/>
</div>
</section>
<section class="flex-1 flex items-center justify-center p-8 bg-surface-container-low relative">
<div class="absolute top-0 right-0 w-32 h-32 opacity-10 p-8">
<span class="material-symbols-outlined text-8xl text-primary" data-icon="texture">texture</span>
</div>
<div class="w-full max-w-md bg-surface-container-lowest p-10 rounded-xl shadow-[0_32px_64px_-15px_rgba(30,27,19,0.05)] border-b-4 border-secondary/20 relative">
<div class="space-y-2 mb-10 text-center">
<h2 class="text-3xl font-headline font-bold text-on-surface">Bienvenido a CulturaStory</h2>
<p class="text-on-surface-variant">Ingresa para continuar tu historia</p>
</div>
<form (ngSubmit)="onSubmit()" class="space-y-6">
<div class="space-y-3">
<label class="text-sm font-label font-semibold text-on-surface-variant">Tipo de Perfil</label>
<div class="grid grid-cols-2 gap-2">
<button (click)="setRole('student')" [class.bg-primary]="selectedRole === 'student'" [class.text-on-primary]="selectedRole === 'student'" class="flex flex-col items-center justify-center p-3 rounded-lg border-b-2 border-outline-variant bg-surface-variant hover:bg-secondary-fixed/30 transition-all group" type="button">
<span class="material-symbols-outlined text-primary group-hover:scale-110 transition-transform" [class.text-on-primary]="selectedRole === 'student'">school</span>
<span class="text-[10px] mt-1 font-bold">Estudiante</span>
</button>
<button (click)="setRole('teacher')" [class.bg-primary]="selectedRole === 'teacher'" [class.text-on-primary]="selectedRole === 'teacher'" class="flex flex-col items-center justify-center p-3 rounded-lg border-b-2 border-outline-variant bg-surface-variant hover:bg-secondary-fixed/30 transition-all group" type="button">
<span class="material-symbols-outlined text-primary group-hover:scale-110 transition-transform" [class.text-on-primary]="selectedRole === 'teacher'">co_present</span>
<span class="text-[10px] mt-1 font-bold">Docente</span>
</button>
</div>
</div>
<div class="space-y-1">
<label class="text-sm font-label font-semibold text-on-surface-variant" for="email">Correo Institucional</label>
<div class="relative">
<span class="absolute left-0 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">mail</span>
<input [(ngModel)]="email" name="email" class="w-full pl-8 pr-4 py-3 bg-transparent border-t-0 border-x-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 transition-colors placeholder:text-outline-variant" id="email" placeholder="usuario@cultura.edu" type="email"/>
</div>
</div>
<div class="space-y-1">
<label class="text-sm font-label font-semibold text-on-surface-variant" for="password">Contrasena</label>
<div class="relative">
<span class="absolute left-0 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">lock</span>
<input [(ngModel)]="password" name="password" class="w-full pl-8 pr-12 py-3 bg-transparent border-t-0 border-x-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 transition-colors placeholder:text-outline-variant" id="password" placeholder="••••••••" [type]="showPassword ? 'text' : 'password'"/>
<button type="button" (click)="showPassword = !showPassword" class="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-on-surface-variant/60 hover:text-primary transition-colors focus:outline-none">
  <span class="material-symbols-outlined text-[20px]">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
</button>
</div>
<a class="text-xs text-tertiary hover:underline block pt-2" href="#">Olvidaste tu clave?</a>
</div>
<button class="w-full group relative overflow-hidden bg-primary text-on-primary py-4 rounded-md font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98]" type="submit">
<span class="relative z-10 flex items-center justify-center gap-2">
                            Entrar a CulturaStory Hub
                            <span class="material-symbols-outlined text-xl">arrow_right_alt</span>
</span>
<div class="absolute bottom-0 left-0 w-full h-[4px] bg-[repeating-linear-gradient(45deg,#795900,#795900_10px,#823b18_10px,#823b18_20px)] opacity-50"></div>
</button>
<p class="text-center text-sm text-on-surface-variant">
                        Nuevo en CulturaStory?
                        <a (click)="goToRegistration()" class="text-primary font-bold hover:underline ml-1 cursor-pointer">Registrate como {{ selectedRole === 'teacher' ? 'Docente' : 'Estudiante' }}</a>
</p>
</form>

<!-- Premium Notification Toast -->
@if (notification) {
  <div class="fixed top-24 right-8 z-[100] animate-slide-up">
    <div class="flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/20" 
         [class.bg-green-500/90]="notification.type === 'success'"
         [class.bg-red-500/90]="notification.type === 'error'"
         [class.text-white]="true">
      <span class="material-symbols-outlined text-2xl">
        {{ notification.type === 'success' ? 'check_circle' : 'error' }}
      </span>
      <div class="flex flex-col">
        <span class="font-bold text-sm uppercase tracking-wider">{{ notification.type === 'success' ? 'Éxito' : 'Error' }}</span>
        <span class="text-sm opacity-90">{{ notification.message }}</span>
      </div>
      <button (click)="notification = null" class="ml-4 hover:rotate-90 transition-transform">
        <span class="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  </div>
}

<div class="mt-8 pt-8 border-t border-surface-variant space-y-4">
<p class="text-[10px] uppercase tracking-widest text-center text-outline font-bold">O accede via</p>
<div class="flex gap-4 justify-center">
<button class="p-3 border border-outline-variant rounded-lg hover:bg-surface-variant transition-colors">
<img alt="Google Logo" class="w-5 h-5 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGe1KA1qCkKAh61WBaKGUnX_9EkKEkHQxBYwcu9bYdWSPpRXqurlonVYrYMYu6afoXwIgsLuklv-rAmepDWAqr9Wa9T4kI64JrBMytIA3ZXYsqpvbVk_oURQrUghLGldp-YTlzN2D_6-7gXRJkUn-LoOahM0AdWBwBe0dgHMqN9nYWagRAtqmzLrz22E33QELmrUONuOqkue-3rKY8T8rsue9XRMksidXmjLhfVT5s5Ol63MwWjLuWV3ctEdmEi1Nl3xN9bsrl"/>
</button>
</div>
</div>
</div>
</section>
</main>
<footer class="px-8 py-12 bg-surface-container flex flex-col md:flex-row justify-between items-center gap-8">
<div class="flex flex-col gap-2">
<div class="flex items-center gap-2 opacity-60">
<span class="material-symbols-outlined text-sm">fingerprint</span>
<span class="text-xs font-label uppercase tracking-tighter">Autenticacion Segura</span>
</div>
<p class="text-xs text-on-surface-variant">© 2024 CulturaStory AI. Creando identidades digitales.</p>
</div>
<div class="flex gap-6">
<a class="text-xs font-bold text-tertiary hover:opacity-70" href="#">Privacidad</a>
<a class="text-xs font-bold text-tertiary hover:opacity-70" href="#">Terminos de Uso</a>
<a class="text-xs font-bold text-tertiary hover:opacity-70" href="#">Soporte</a>
</div>
</footer>
<div class="fixed -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-20"></div>
<div class="fixed -top-24 -right-24 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl -z-20"></div>
  `,
  styles: `
    :host { display: block; }
  `
})
export class LandingLogin {
  private loginUseCase = inject(LoginUseCase);
  private router = inject(Router);

  email = '';
  password = '';
  showPassword = false;
  selectedRole: 'student' | 'teacher' = 'student';
  notification: { message: string, type: 'success' | 'error' } | null = null;

  setRole(role: 'student' | 'teacher') {
    this.selectedRole = role;
  }

  private showNotification(message: string, type: 'success' | 'error') {
    this.notification = { message, type };
    setTimeout(() => this.notification = null, 5000);
  }

  private getLoginErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const backendMessage = error.error?.message;

      if (error.status === 401) {
        return backendMessage || 'Las credenciales no son correctas.';
      }
    }

    return 'No se pudo iniciar sesion. Verifica tus credenciales.';
  }

  onSubmit() {
    if (!this.email.trim() || !this.password.trim()) {
      this.showNotification('Ingresa tu correo y contrasena.', 'error');
      return;
    }

    this.loginUseCase.execute(this.email, this.password, this.selectedRole)
      .subscribe({
        next: (user) => {
          this.showNotification('Bienvenido a CulturaStory Hub', 'success');
          setTimeout(() => {
            const role = user.rol?.toString().toUpperCase();
            if (role === 'ADMINISTRADOR') {
              this.router.navigate(['/gestion-de-usuarios']);
            } else if (role === 'DOCENTE') {
              this.router.navigate(['/panel-del-docente']);
            } else {
              this.router.navigate(['/panel-del-estudiante']);
            }
          }, 800);
        },
        error: (err) => {
          console.error('Error de login:', err);
          this.showNotification(this.getLoginErrorMessage(err), 'error');
        }
      });
  }

  goToRegistration() {
    this.router.navigate(['/registro-de-estudiante'], { queryParams: { role: this.selectedRole } });
  }
}
