import { Component } from '@angular/core';

@Component({
  selector: 'app-student-panel',
  standalone: true,
  imports: [],
  template: `
<!-- Thread Scroll Guide -->
<div class="thread-scroll hidden md:block"></div>
<!-- SideNavBar (Shared Component Blueprint) -->
<aside class="fixed left-0 top-0 h-full flex flex-col p-6 space-y-4 bg-[#FFF8EF] dark:bg-[#1E1B13] h-screen w-64 border-r-0 z-50">
<div class="mb-8">
<div class="flex items-center gap-3 mb-2">
<div class="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">auto_stories</span>
</div>
<div>
<h1 class="text-lg font-serif text-[#823B18] font-headline font-bold leading-none">The Weaver's Hub</h1>
<span class="text-xs font-label opacity-60">Student Portal</span>
</div>
</div>
</div>
<nav class="flex-1 space-y-2 font-plus-jakarta text-sm font-medium">
<!-- Active State: Dashboard -->
<a class="flex items-center gap-3 bg-[#823B18] text-[#FFF8EF] rounded-md px-4 py-3 shadow-sm translate-x-1 duration-200" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span>Dashboard</span>
</a>
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all" href="#">
<span class="material-symbols-outlined">auto_stories</span>
<span>My Stories</span>
</a>
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all" href="#">
<span class="material-symbols-outlined">group</span>
<span>Classroom</span>
</a>
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all" href="#">
<span class="material-symbols-outlined">explore</span>
<span>Cultural Map</span>
</a>
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all" href="#">
<span class="material-symbols-outlined">analytics</span>
<span>Analytics</span>
</a>
</nav>
<div class="pt-6 mt-6 border-t border-outline-variant/20 space-y-2">
<button class="w-full bg-primary text-on-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-opacity">
<span class="material-symbols-outlined">add</span>
<span>+ New Narrative</span>
</button>
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all" href="#">
<span class="material-symbols-outlined">help_outline</span>
<span>Support</span>
</a>
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all" href="#">
<span class="material-symbols-outlined">logout</span>
<span>Sign Out</span>
</a>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="md:ml-64 p-8 lg:p-12">
<!-- Personalized Greeting Section -->
<header class="mb-12 relative">
<div class="max-w-4xl">
<h2 class="text-primary text-5xl font-headline italic font-bold tracking-tight mb-2">¡Hola, Juan!</h2>
<p class="text-on-surface-variant text-xl font-body max-w-2xl">
                    Tu hilo narrativo fluye desde la <span class="text-tertiary font-bold">región Amazónica</span>. Hoy es un gran día para tejer nuevas historias sobre el río y la selva.
                </p>
</div>
<!-- Abstract Cultural Element Decoration -->
<div class="absolute -top-10 -right-10 w-64 h-64 opacity-5 pointer-events-none">
<svg class="text-secondary" fill="currentColor" viewbox="0 0 100 100">
<path d="M50 0 L100 50 L50 100 L0 50 Z M50 20 L80 50 L50 80 L20 50 Z"></path>
</svg>
</div>
</header>
<!-- Main Bento Grid Layout -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
<!-- Primary Action & Status Summary (Left Column) -->
<div class="lg:col-span-4 space-y-8">
<!-- Large Add Narrative Button -->
<button class="w-full group relative overflow-hidden aspect-video bg-primary-container text-on-primary-container rounded-xl flex flex-col items-center justify-center gap-4 transition-transform hover:scale-[1.02] active:scale-95">
<div class="andean-pattern-accent absolute inset-0"></div>
<div class="relative z-10 bg-on-primary-container/20 p-4 rounded-full">
<span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">add_circle</span>
</div>
<span class="relative z-10 text-2xl font-headline font-bold">Crear Nueva Narrativa</span>
<div class="absolute bottom-0 left-0 w-full h-1 bg-secondary"></div>
</button>
<!-- Cultural Context Card -->
<div class="bg-surface-container-low p-6 rounded-xl relative overflow-hidden">
<div class="absolute top-0 right-0 p-4 opacity-10">
<span class="material-symbols-outlined text-6xl">water_drop</span>
</div>
<h3 class="text-tertiary font-headline font-bold text-lg mb-4">Sabiduría del Río</h3>
<p class="text-sm text-on-surface-variant italic mb-6">"El río no solo lleva agua, lleva los susurros de los abuelos que cuidaron la selva antes que nosotros."</p>
<div class="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider">
<span class="material-symbols-outlined text-sm">local_library</span>
                        Explorar Biblioteca
                    </div>
</div>
</div>
<!-- Narrative Cards List (Right Column) -->
<div class="lg:col-span-8 space-y-6">
<div class="flex justify-between items-end mb-4">
<h3 class="text-2xl font-headline font-bold text-on-surface">Mis historias recientes</h3>
<div class="flex gap-4">
<span class="text-sm font-medium text-on-surface-variant border-b-2 border-secondary pb-1">Todas</span>
<span class="text-sm font-medium text-outline hover:text-on-surface cursor-pointer pb-1">Borradores</span>
<span class="text-sm font-medium text-outline hover:text-on-surface cursor-pointer pb-1">Publicadas</span>
</div>
</div>
<!-- Narrative Card 1 -->
<div class="bg-surface-container-lowest p-6 rounded-xl flex flex-col md:flex-row gap-6 items-start transition-all hover:bg-surface-container shadow-sm border-l-4 border-tertiary">
<div class="w-full md:w-40 h-28 shrink-0 rounded-lg overflow-hidden bg-surface-variant">
<img class="w-full h-full object-cover" data-alt="vibrant rainforest river landscape with traditional wooden canoe and misty green mountains in the background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlDrLlDie0x1k8exzNSqbPcWXgCv1w-x8Z3EGXiwex08JUP5EqFvyvv4QIBmLKbFx-73vLCn4X9H32kqtOqNC8O-iTNYjhjhJiF000iGbjPywfTJJ8jFFxueH8MYuJq79seqBom83DHezR_pqoowGblVGLGhkDY0yw8CkUAxEuEs0i7H3uzUJr1d4ZUyzCLceLMx3O-DqspLOUSnTO0cvqJcj8u1lPKlSUb8iS0k5UXuoYvAdvs4sVelBrnf1PUf18jIs03dfB"/>
</div>
<div class="flex-1">
<div class="flex justify-between items-start mb-1">
<h4 class="text-xl font-headline font-bold text-primary">El Canto de la Yacu Mama</h4>
<span class="px-3 py-1 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold uppercase tracking-widest rounded-full">Publicada</span>
</div>
<div class="flex gap-4 text-xs text-on-surface-variant mb-4">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">location_on</span> Región Amazónica</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">calendar_today</span> 12 Oct, 2023</span>
</div>
<div class="flex gap-3">
<button class="flex items-center gap-2 px-4 py-2 bg-surface-variant text-on-surface-variant rounded-lg text-sm font-bold hover:bg-outline-variant/30 transition-colors">
<span class="material-symbols-outlined text-sm">visibility</span> Ver
                            </button>
<button class="flex items-center gap-2 px-4 py-2 bg-surface-variant text-on-surface-variant rounded-lg text-sm font-bold hover:bg-outline-variant/30 transition-colors">
<span class="material-symbols-outlined text-sm">edit</span> Editar
                            </button>
<button class="flex items-center gap-2 px-4 py-2 text-error/70 hover:text-error rounded-lg text-sm font-bold transition-colors ml-auto">
<span class="material-symbols-outlined text-sm">delete</span> Eliminar
                            </button>
</div>
</div>
</div>
<!-- Narrative Card 2 -->
<div class="bg-surface-container-lowest p-6 rounded-xl flex flex-col md:flex-row gap-6 items-start transition-all hover:bg-surface-container shadow-sm border-l-4 border-secondary">
<div class="w-full md:w-40 h-28 shrink-0 rounded-lg overflow-hidden bg-surface-variant">
<img class="w-full h-full object-cover" data-alt="macro photo of colorful hand-woven indigenous textile patterns with geometric shapes and earth-toned threads" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDERLvUK9p92orCTrUyslS6zAzVX1rR4W8DNEAjBmMXofb484dJ6svoiWYoYD0b16czKgSqviWUJapiZSRkyjjlV3zperts2FRdV71BQxs1Bf4kukEuON_sFX7BDkqH6qFtSRBeZOXbvVq8Fv4G0tfSTSgMlggrTdy_88D1ycXyth_uRBQxqy6MjkP3YdZG1xfI6flRfpSDvznT-ihPwI_xRb1F5hyyRYMaU3lvFD9ztwdENNkD-8NHPa3vkeprFTOethZdzqIw"/>
</div>
<div class="flex-1">
<div class="flex justify-between items-start mb-1">
<h4 class="text-xl font-headline font-bold text-primary">Secretos del Tejido Asháninka</h4>
<span class="px-3 py-1 bg-surface-variant text-on-surface-variant text-[10px] font-bold uppercase tracking-widest rounded-full">Borrador</span>
</div>
<div class="flex gap-4 text-xs text-on-surface-variant mb-4">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">location_on</span> Región Amazónica</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">calendar_today</span> 05 Nov, 2023</span>
</div>
<div class="flex gap-3">
<button class="flex items-center gap-2 px-4 py-2 bg-surface-variant text-on-surface-variant rounded-lg text-sm font-bold hover:bg-outline-variant/30 transition-colors">
<span class="material-symbols-outlined text-sm">visibility</span> Ver
                            </button>
<button class="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
<span class="material-symbols-outlined text-sm">edit</span> Continuar
                            </button>
<button class="flex items-center gap-2 px-4 py-2 text-error/70 hover:text-error rounded-lg text-sm font-bold transition-colors ml-auto">
<span class="material-symbols-outlined text-sm">delete</span> Eliminar
                            </button>
</div>
</div>
</div>
<!-- Narrative Card 3 -->
<div class="bg-surface-container-lowest p-6 rounded-xl flex flex-col md:flex-row gap-6 items-start transition-all hover:bg-surface-container shadow-sm border-l-4 border-tertiary">
<div class="w-full md:w-40 h-28 shrink-0 rounded-lg overflow-hidden bg-surface-variant">
<img class="w-full h-full object-cover" data-alt="traditional clay pottery decorated with indigenous symbols sitting on a weathered wooden table in soft morning light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwZRFgvOvww_FJR80LZI02dUiTJbHorAv1IY2GfnUuvlPW23ZJR3ww9C5D1d3NcuHgaeLvC7vxEGvNBOGBBdnW8hIYeZHyAHdCSq9h6IwuLPs7aPYRf4HaBgxBkGlquPr4WCLIFXJe4eScKy_OveVyF9GOgYt0XCicHHExMjrWRbNdr_cCMDkOF8iRdcUx8eimG-OYLfhPOXrWIRds3LxQDaHTVYG_emZfhBeSCrR3EWKO-rHk5hFQ9gqTy2ZY8QhTCzUcNIbd"/>
</div>
<div class="flex-1">
<div class="flex justify-between items-start mb-1">
<h4 class="text-xl font-headline font-bold text-primary">La Cerámica que Habla</h4>
<span class="px-3 py-1 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold uppercase tracking-widest rounded-full">Publicada</span>
</div>
<div class="flex gap-4 text-xs text-on-surface-variant mb-4">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">location_on</span> Selva Central</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">calendar_today</span> 28 Sep, 2023</span>
</div>
<div class="flex gap-3">
<button class="flex items-center gap-2 px-4 py-2 bg-surface-variant text-on-surface-variant rounded-lg text-sm font-bold hover:bg-outline-variant/30 transition-colors">
<span class="material-symbols-outlined text-sm">visibility</span> Ver
                            </button>
<button class="flex items-center gap-2 px-4 py-2 bg-surface-variant text-on-surface-variant rounded-lg text-sm font-bold hover:bg-outline-variant/30 transition-colors">
<span class="material-symbols-outlined text-sm">edit</span> Editar
                            </button>
<button class="flex items-center gap-2 px-4 py-2 text-error/70 hover:text-error rounded-lg text-sm font-bold transition-colors ml-auto">
<span class="material-symbols-outlined text-sm">delete</span> Eliminar
                            </button>
</div>
</div>
</div>
</div>
</div>
<!-- Floating Action Button (FAB) Suppression check: High context - showing cultural help -->
<button class="fixed bottom-8 right-8 w-16 h-16 bg-tertiary text-on-tertiary-container rounded-full shadow-2xl flex items-center justify-center group">
<span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
<div class="absolute right-20 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm font-bold">
                Asistente Cultural AI
            </div>
</button>
</main>
  `,
  styles: `
    :host { display: block; }
  `
})
export class StudentPanel {}
