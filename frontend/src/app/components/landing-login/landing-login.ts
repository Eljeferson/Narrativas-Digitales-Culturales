import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-login',
  standalone: true,
  imports: [],
  template: `
<!-- Top Navigation Anchor -->
<nav class="sticky top-0 z-50 flex justify-between items-center px-8 py-4 w-full bg-[#FFF8EF]/80 dark:bg-[#1E1B13]/80 backdrop-blur-md">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-3xl" data-icon="hub">hub</span>
<span class="text-2xl font-headline italic font-bold tracking-tight text-[#823B18] dark:text-[#A0522D]">CulturaStory AI</span>
</div>
<div class="hidden md:flex items-center gap-8">
<a class="text-[#823B18] border-b-2 border-[#795900] pb-1 font-bold" href="#">Narratives</a>
<a class="text-[#1E1B13]/70 dark:text-[#FFF8EF]/70 hover:text-[#823B18] transition-colors" href="#">Regions</a>
<a class="text-[#1E1B13]/70 dark:text-[#FFF8EF]/70 hover:text-[#823B18] transition-colors" href="#">Library</a>
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
<!-- Thread Scroll Decorative Line -->
<div class="absolute left-8 top-0 bottom-0 w-[1px] bg-secondary opacity-30 hidden lg:block"></div>
<!-- Left Content: Hero Section -->
<section class="flex-1 px-8 py-16 lg:px-24 flex flex-col justify-center relative">
<div class="absolute inset-0 textile-pattern -z-10"></div>
<div class="max-w-2xl space-y-8 relative">
<div class="inline-flex items-center gap-2 px-4 py-2 bg-tertiary-container/10 text-tertiary rounded-full text-sm font-medium">
<span class="material-symbols-outlined text-sm" data-icon="auto_awesome">auto_awesome</span>
                    Tejiendo el futuro del aprendizaje cultural
                </div>
<h1 class="text-6xl md:text-7xl font-headline font-bold text-primary leading-tight">
                    Preserva la Memoria, <span class="italic text-secondary">Crea</span> el Mañana.
                </h1>
<p class="text-lg text-on-surface-variant leading-relaxed max-w-lg">
                    Descubre una plataforma educativa donde la inteligencia artificial se encuentra con la herencia ancestral para tejer narrativas culturales inolvidables.
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
<!-- Asymmetrical Image Element -->
<div class="mt-16 relative w-full h-64 rounded-xl overflow-hidden shadow-2xl md:hidden">
<img alt="stylized andean textile texture" class="w-full h-full object-cover" data-alt="Close-up of a vibrant hand-woven Andean textile with intricate geometric patterns in terracotta, ochre, and turquoise hues." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyQZAD72R1NlwzEBq8PmUVaJ8eFOIUCWkhR6YqFNWVdMV_Bj2pDHuMpSW6VAD9wHvKt2ixvNh10D6xksapwRly3WP-3nZ5ikmykxmmg-lJ4tst9MYhT7H6gdUxJbcsDUEY-MlEI3zC5nSHcdVlFRKZBPwoxIbI2CEAS6_IJ_w0mKyhGZHD70LPqItlzEYumac6xRcZd9sAyl4hJXzGoRnsXcnMJg935N2n-8Pm0i7QLMoXZMNOE_Xgv1EUnS1VfTBbOQ-0Z9gS"/>
</div>
</section>
<!-- Right Content: Login Section -->
<section class="flex-1 flex items-center justify-center p-8 bg-surface-container-low relative">
<!-- Decorative Pattern Corner -->
<div class="absolute top-0 right-0 w-32 h-32 opacity-10 p-8">
<span class="material-symbols-outlined text-8xl text-primary" data-icon="texture">texture</span>
</div>
<div class="w-full max-w-md bg-surface-container-lowest p-10 rounded-xl shadow-[0_32px_64px_-15px_rgba(30,27,19,0.05)] border-b-4 border-secondary/20 relative">
<div class="space-y-2 mb-10 text-center">
<h2 class="text-3xl font-headline font-bold text-on-surface">Bienvenido al Telar</h2>
<p class="text-on-surface-variant">Ingresa para continuar tu historia</p>
</div>
<form class="space-y-6">
<!-- Role Selector -->
<div class="space-y-3">
<label class="text-sm font-label font-semibold text-on-surface-variant">Tipo de Perfil</label>
<div class="grid grid-cols-3 gap-2">
<button class="flex flex-col items-center justify-center p-3 rounded-lg border-b-2 border-outline-variant bg-surface-variant hover:bg-secondary-fixed/30 transition-all group" type="button">
<span class="material-symbols-outlined text-primary group-hover:scale-110 transition-transform" data-icon="school">school</span>
<span class="text-[10px] mt-1 font-bold">Estudiante</span>
</button>
<button class="flex flex-col items-center justify-center p-3 rounded-lg border-b-2 border-primary bg-primary text-on-primary shadow-sm group" type="button">
<span class="material-symbols-outlined group-hover:scale-110 transition-transform" data-icon="co_present">co_present</span>
<span class="text-[10px] mt-1 font-bold">Docente</span>
</button>
<button class="flex flex-col items-center justify-center p-3 rounded-lg border-b-2 border-outline-variant bg-surface-variant hover:bg-secondary-fixed/30 transition-all group" type="button">
<span class="material-symbols-outlined text-primary group-hover:scale-110 transition-transform" data-icon="admin_panel_settings">admin_panel_settings</span>
<span class="text-[10px] mt-1 font-bold">Admin</span>
</button>
</div>
</div>
<!-- Input Email -->
<div class="space-y-1">
<label class="text-sm font-label font-semibold text-on-surface-variant" for="email">Correo Institucional</label>
<div class="relative">
<span class="absolute left-0 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" data-icon="mail">mail</span>
<input class="w-full pl-8 pr-4 py-3 bg-transparent border-t-0 border-x-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 transition-colors placeholder:text-outline-variant" id="email" placeholder="usuario@cultura.edu" type="email"/>
</div>
</div>
<!-- Input Password -->
<div class="space-y-1">
<div class="flex justify-between items-center">
<label class="text-sm font-label font-semibold text-on-surface-variant" for="password">Contraseña</label>
<a class="text-xs text-tertiary hover:underline" href="#">¿Olvidaste tu clave?</a>
</div>
<div class="relative">
<span class="absolute left-0 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" data-icon="lock">lock</span>
<input class="w-full pl-8 pr-4 py-3 bg-transparent border-t-0 border-x-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 transition-colors placeholder:text-outline-variant" id="password" placeholder="••••••••" type="password"/>
</div>
</div>
<!-- CTA Button -->
<button class="w-full group relative overflow-hidden bg-primary text-on-primary py-4 rounded-md font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98]" type="submit">
<span class="relative z-10 flex items-center justify-center gap-2">
                            Entrar al Weaver's Hub
                            <span class="material-symbols-outlined text-xl" data-icon="arrow_right_alt">arrow_right_alt</span>
</span>
<!-- Decorative Ethnic Border Detail -->
<div class="absolute bottom-0 left-0 w-full h-[4px] bg-[repeating-linear-gradient(45deg,#795900,#795900_10px,#823b18_10px,#823b18_20px)] opacity-50"></div>
</button>
<!-- Registration Link -->
<p class="text-center text-sm text-on-surface-variant">
                        ¿Nuevo en el telar? 
                        <a class="text-primary font-bold hover:underline ml-1" href="#">Regístrate como Estudiante</a>
</p>
</form>
<!-- Social/External Login Mock -->
<div class="mt-8 pt-8 border-t border-surface-variant space-y-4">
<p class="text-[10px] uppercase tracking-widest text-center text-outline font-bold">O accede vía</p>
<div class="flex gap-4 justify-center">
<button class="p-3 border border-outline-variant rounded-lg hover:bg-surface-variant transition-colors">
<img alt="Google Logo" class="w-5 h-5 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGe1KA1qCkKAh61WBaKGUnX_9EkKEkHQxBYwcu9bYdWSPpRXqurlonVYrYMYu6afoXwIgsLuklv-rAmepDWAqr9Wa9T4kI64JrBMytIA3ZXYsqpvbVk_oURQrUghLGldp-YTlzN2D_6-7gXRJkUn-LoOahM0AdWBwBe0dgHMqN9nYWagRAtqmzLrz22E33QELmrUONuOqkue-3rKY8T8rsue9XRMksidXmjLhfVT5s5Ol63MwWjLuWV3ctEdmEi1Nl3xN9bsrl"/>
</button>
</div>
</div>
</div>
</section>
</main>
<!-- Footer Credit Section -->
<footer class="px-8 py-12 bg-surface-container flex flex-col md:flex-row justify-between items-center gap-8">
<div class="flex flex-col gap-2">
<div class="flex items-center gap-2 opacity-60">
<span class="material-symbols-outlined text-sm" data-icon="fingerprint">fingerprint</span>
<span class="text-xs font-label uppercase tracking-tighter">Autenticación Segura vía Supabase</span>
</div>
<p class="text-xs text-on-surface-variant">© 2024 CulturaStory AI. Tejiendo identidades digitales.</p>
</div>
<div class="flex gap-6">
<a class="text-xs font-bold text-tertiary hover:opacity-70" href="#">Privacidad</a>
<a class="text-xs font-bold text-tertiary hover:opacity-70" href="#">Términos del Gremio</a>
<a class="text-xs font-bold text-tertiary hover:opacity-70" href="#">Soporte</a>
</div>
</footer>
<!-- Signature Background Element (Asymmetric overlapping image) -->
<div class="fixed -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-20"></div>
<div class="fixed -top-24 -right-24 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl -z-20"></div>
  `,
  styles: `
    :host { display: block; }
  `
})
export class LandingLogin {}
