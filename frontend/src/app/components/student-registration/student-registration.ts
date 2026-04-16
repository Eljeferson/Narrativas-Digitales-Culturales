import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterStudentUseCase } from '../../core/application/auth/auth-use-cases';
import { User } from '../../core/domain/models/user.model';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [FormsModule],
  template: `
<div class="thread-scroll hidden lg:block"></div>
<main class="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row gap-12 items-start">
<div class="w-full md:w-5/12 flex flex-col space-y-8">
<div class="space-y-4">
<h1 class="text-primary font-headline text-4xl md:text-5xl font-bold leading-tight">
                    Inicia tu viaje como <span class="italic text-secondary">Tejedor de Historias</span>
</h1>
<p class="text-on-surface-variant text-lg leading-relaxed">
                    Cada gran narrativa comienza con un autor. Cuéntanos un poco sobre ti para personalizar tu experiencia en CulturaStory AI.
                </p>
</div>
<div class="relative group self-center md:self-start">
<div class="artisanal-border w-48 h-48 rounded-full flex items-center justify-center bg-surface-container overflow-hidden border-2 border-primary/20">
<div class="w-full h-full rounded-full bg-surface-variant flex items-center justify-center">
<span class="material-symbols-outlined text-primary/40 text-6xl">person_add</span>
</div>
<button class="absolute bottom-2 right-2 bg-secondary text-on-secondary p-3 rounded-full shadow-lg hover:scale-105 transition-transform">
<span class="material-symbols-outlined">photo_camera</span>
</button>
</div>
<p class="text-center mt-4 text-sm font-medium text-secondary italic">Sube tu foto de autor</p>
</div>
<div class="hidden md:block p-6 bg-tertiary/5 rounded-xl border-l-4 border-tertiary">
<p class="text-tertiary font-medium italic text-sm">
                    "La palabra es el hilo que une el pasado con el presente."
                </p>
</div>
</div>
<div class="w-full md:w-7/12 bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-sm border border-surface-variant/50 relative overflow-hidden">
<div class="absolute top-0 right-0 opacity-5 p-4 pointer-events-none">
    <span class="material-symbols-outlined text-8xl text-primary">texture</span>
</div>
<form (ngSubmit)="onSubmit()" class="space-y-8">
<div class="space-y-6">
<div class="group">
<label class="block text-xs font-bold uppercase tracking-wider text-secondary mb-2" for="fullname">Nombre Completo</label>
<input [(ngModel)]="fullName" name="fullname" class="w-full bg-surface-variant/30 border-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 px-0 py-3 transition-colors text-on-surface placeholder:text-on-surface-variant/50 font-medium" id="fullname" placeholder="Escribe tu nombre y apellidos" type="text" required/>
</div>
<div class="group">
<label class="block text-xs font-bold uppercase tracking-wider text-secondary mb-2" for="email">Correo Electrónico</label>
<input [(ngModel)]="email" name="email" class="w-full bg-surface-variant/30 border-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 px-0 py-3 transition-colors text-on-surface placeholder:text-on-surface-variant/50 font-medium" id="email" placeholder="tu@correo.com" type="email" required/>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
<div class="group">
<label class="block text-xs font-bold uppercase tracking-wider text-secondary mb-2" for="grade">Grado / Año</label>
<input [(ngModel)]="grade" name="grade" class="w-full bg-surface-variant/30 border-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 px-0 py-3 transition-colors text-on-surface placeholder:text-on-surface-variant/50 font-medium" id="grade" placeholder="Ej: 5to Secundaria" type="text" required/>
</div>
<div class="group">
<label class="block text-xs font-bold uppercase tracking-wider text-secondary mb-2" for="region">Región Cultural</label>
<select [(ngModel)]="region" name="region" class="w-full bg-surface-variant/30 border-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 px-0 py-3 transition-colors text-on-surface font-medium appearance-none" id="region" required>
<option value="" disabled>Selecciona tu región</option>
<option value="andina">Andina</option>
<option value="amazónica">Amazónica</option>
<option value="afroperuana">Afroperuana</option>
<option value="costeña">Costeña</option>
</select>
</div>
</div>
</div>
<div class="pt-6">
<button class="w-full group relative bg-primary text-on-primary py-4 px-8 rounded-md font-bold text-lg shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-3 overflow-hidden" type="submit">
<span class="relative z-10">Crear mi perfil de autor</span>
<span class="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">auto_stories</span>
<div class="absolute bottom-0 left-0 w-full h-1 bg-secondary opacity-50 group-hover:h-full group-hover:opacity-10 transition-all"></div>
</button>
<p class="text-center mt-4 text-on-surface-variant text-xs opacity-70">
                        Al registrarte, podrás empezar a crear tus propias narrativas digitales.
                    </p>
</div>
</form>
</div>
</main>
<div class="fixed bottom-0 left-0 w-full h-32 pointer-events-none overflow-hidden opacity-20 -z-10">
<div class="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent"></div>
<div class="flex justify-around items-end h-full">
<span class="material-symbols-outlined text-8xl text-primary opacity-20 translate-y-8">landscape</span>
<span class="material-symbols-outlined text-9xl text-primary opacity-20 translate-y-4">park</span>
<span class="material-symbols-outlined text-8xl text-primary opacity-20 translate-y-8">water</span>
</div>
</div>
  `,
  styles: `:host { display: block; }`
})
export class StudentRegistration {
  private registerUseCase = inject(RegisterStudentUseCase);
  private router = inject(Router);

  fullName = '';
  email = '';
  grade = '';
  region = '';

  onSubmit() {
    console.log(`[StudentRegistration] Registrando a ${this.fullName}`);
    const user: Partial<User> = {
      nombreCompleto: this.fullName,
      email: this.email,
      grado: this.grade,
      regionCultural: this.region
    };

    this.registerUseCase.execute(user).subscribe({
      next: (saved) => {
        console.log('Usuario registrado con éxito:', saved);
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert('Hubo un error al registrar el perfil. Por favor intenta de nuevo.');
      }
    });
  }
}
  `,
  styles: `
    :host { display: block; }
  `
})
export class StudentRegistration {}
