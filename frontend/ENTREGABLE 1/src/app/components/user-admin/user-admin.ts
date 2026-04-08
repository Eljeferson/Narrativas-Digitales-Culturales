import { Component } from '@angular/core';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [],
  template: `
<div class="thread-scroll hidden lg:block"></div>
<!-- SideNavBar Component -->
<aside class="fixed left-0 top-0 h-full flex flex-col p-6 space-y-4 bg-[#FFF8EF] dark:bg-[#1E1B13] h-screen w-64 border-r-0 z-40">
<div class="mb-8 flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
<span class="material-symbols-outlined text-on-primary-container" style="font-variation-settings: 'FILL' 1;">auto_stories</span>
</div>
<div>
<h2 class="text-lg font-serif text-[#823B18] leading-none">The Weaver's Hub</h2>
<p class="text-xs font-medium opacity-60">Portal de Administrador</p>
</div>
</div>
<nav class="flex-1 space-y-1">
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all font-plus-jakarta text-sm font-medium" href="#">
<span class="material-symbols-outlined">dashboard</span>
                Dashboard
            </a>
<a class="flex items-center gap-3 bg-[#823B18] text-[#FFF8EF] rounded-md px-4 py-3 shadow-sm font-plus-jakarta text-sm font-medium translate-x-1 duration-200" href="#">
<span class="material-symbols-outlined">group</span>
                Gestión de Usuarios
            </a>
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all font-plus-jakarta text-sm font-medium" href="#">
<span class="material-symbols-outlined">auto_stories</span>
                Narrativas
            </a>
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all font-plus-jakarta text-sm font-medium" href="#">
<span class="material-symbols-outlined">explore</span>
                Mapa Cultural
            </a>
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all font-plus-jakarta text-sm font-medium" href="#">
<span class="material-symbols-outlined">analytics</span>
                Analíticas
            </a>
</nav>
<button class="w-full py-3 px-4 bg-primary text-on-primary rounded-xl font-semibold flex items-center justify-center gap-2 mb-6 hover:bg-primary/90 transition-colors">
<span class="material-symbols-outlined">person_add</span>
            Invitar nuevo usuario
        </button>
<div class="pt-6 border-t border-outline-variant/30 space-y-1">
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all font-plus-jakarta text-sm font-medium" href="#">
<span class="material-symbols-outlined">help_outline</span>
                Support
            </a>
<a class="flex items-center gap-3 text-error px-4 py-3 opacity-70 hover:bg-error/5 transition-all font-plus-jakarta text-sm font-medium" href="#">
<span class="material-symbols-outlined">logout</span>
                Sign Out
            </a>
</div>
</aside>
<main class="ml-64 min-h-screen p-8 lg:p-12 relative">
<!-- Header Section -->
<header class="mb-12">
<h1 class="font-headline text-4xl text-primary font-bold italic mb-2 tracking-tight">Gestión de Usuarios</h1>
<p class="text-on-surface-variant max-w-2xl">Administra la comunidad de CulturaStory AI. Supervisa roles, accesos y participación de estudiantes y docentes en el tejido narrativo.</p>
</header>
<!-- Stats Bento Grid (Asymmetric) -->
<section class="grid grid-cols-12 gap-6 mb-12">
<div class="col-span-12 md:col-span-4 bg-surface-container-lowest p-8 rounded-xl relative overflow-hidden">
<div class="absolute top-0 right-0 w-24 h-24 andean-accent opacity-10"></div>
<div class="relative z-10">
<p class="text-secondary font-semibold text-sm mb-1">Total Usuarios</p>
<h3 class="text-5xl font-headline font-bold text-on-surface">1,284</h3>
<p class="text-xs text-on-surface-variant mt-2 flex items-center gap-1">
<span class="material-symbols-outlined text-xs text-tertiary">trending_up</span>
                        +12% desde el último mes
                    </p>
</div>
</div>
<div class="col-span-12 md:col-span-8 bg-surface-container-low p-8 rounded-xl flex items-end justify-between border-b-4 border-secondary/20">
<div class="space-y-4">
<div class="flex gap-4">
<div class="px-4 py-2 bg-surface-container-highest rounded-lg text-sm font-medium">
<span class="block text-xs opacity-60">Docentes</span>
<span class="text-primary">84</span>
</div>
<div class="px-4 py-2 bg-surface-container-highest rounded-lg text-sm font-medium">
<span class="block text-xs opacity-60">Estudiantes</span>
<span class="text-primary">1,120</span>
</div>
<div class="px-4 py-2 bg-surface-container-highest rounded-lg text-sm font-medium">
<span class="block text-xs opacity-60">Comunidad</span>
<span class="text-primary">80</span>
</div>
</div>
</div>
<div class="text-right">
<span class="material-symbols-outlined text-6xl text-primary opacity-20">diversity_3</span>
</div>
</div>
</section>
<!-- Main Content Area (Tonal Layering) -->
<section class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
<!-- Filter Bar -->
<div class="p-6 border-b border-outline-variant/20 flex flex-wrap items-center justify-between gap-4">
<div class="flex items-center gap-3">
<span class="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Filtrar por:</span>
<div class="flex gap-2">
<button class="px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">Todos</button>
<button class="px-4 py-1.5 rounded-full border border-outline-variant hover:bg-surface-variant transition-colors text-xs font-bold">Estudiante</button>
<button class="px-4 py-1.5 rounded-full border border-outline-variant hover:bg-surface-variant transition-colors text-xs font-bold">Docente</button>
<button class="px-4 py-1.5 rounded-full border border-outline-variant hover:bg-surface-variant transition-colors text-xs font-bold">Comunidad</button>
</div>
</div>
<div class="relative min-w-[300px]">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
<input class="w-full pl-10 pr-4 py-2 bg-surface-variant border-none border-b-2 border-outline-variant focus:ring-0 focus:border-tertiary transition-colors text-sm rounded-t-lg" placeholder="Buscar por nombre o email..." type="text"/>
</div>
</div>
<!-- Table -->
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead class="bg-surface-container-low text-on-surface-variant uppercase text-[10px] tracking-[0.2em] font-bold">
<tr>
<th class="px-8 py-4">Usuario</th>
<th class="px-6 py-4">Rol</th>
<th class="px-6 py-4">Estado</th>
<th class="px-6 py-4 text-right">Acciones</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/10">
<!-- User Row 1 -->
<tr class="hover:bg-surface-bright transition-colors group">
<td class="px-8 py-5">
<div class="flex items-center gap-4">
<img alt="Avatar" class="w-10 h-10 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all" data-alt="portrait of a young man with warm skin tones and kind expression in natural outdoor lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEWBO3rvRMyokoXJG1tvDbvJfma2H2futSdZz0dJYjr24mpjQlyec65Wm7cImY76Fd0NejkGu_brRNfM_FxwaRV0q85XH0QF6tVwTB9uveAeJ6_ExfH_tPGokHojmyRZR5_E54vryrS5szFyXHxpvRyL8ZpYjBzQcJ-0QiQBaxNUsZdIIcgKth6nupn7w5Dj4j3KxSaAm1jKpBiQdfLWG6wyeY822djgvddA9IdGOIxLFMZXzyqjXFdSuGGhSu3qRRHuVtIe9N"/>
<div>
<p class="font-bold text-on-surface">Mateo Quispe</p>
<p class="text-xs text-on-surface-variant">mateo.q@unmsm.edu.pe</p>
</div>
</div>
</td>
<td class="px-6 py-5">
<span class="px-2.5 py-1 rounded bg-tertiary/10 text-tertiary text-xs font-bold">Estudiante</span>
</td>
<td class="px-6 py-5">
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-green-600"></span>
<span class="text-xs font-medium">Activo</span>
</div>
</td>
<td class="px-6 py-5 text-right">
<div class="flex items-center justify-end gap-2">
<button class="p-2 hover:bg-secondary-container rounded-lg transition-colors text-secondary" title="Cambiar Rol">
<span class="material-symbols-outlined text-lg">edit_note</span>
</button>
<button class="p-2 hover:bg-error-container rounded-lg transition-colors text-error" title="Desactivar">
<span class="material-symbols-outlined text-lg">block</span>
</button>
</div>
</td>
</tr>
<!-- User Row 2 -->
<tr class="hover:bg-surface-bright transition-colors group">
<td class="px-8 py-5">
<div class="flex items-center gap-4">
<img alt="Avatar" class="w-10 h-10 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all" data-alt="smiling woman with glasses and professional attire in a bright office setting with soft focus background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD59dQ23iEru0Z4lHSSXEpfB42xZ_YyckOgpIPlcZbL2JSSLj0aMEUVN4ozT_6-WKQ_6JCOZyBD5TTOowTJQCpO1o-MWaGeRLqvcxk7ElYIz3ABIGZsd6AXkTmpDeyvKgvec5LMTFaXtnvTuAmm8pQpv8lcRXKZuLLLhw43FhwsUF3-aqj5zRXKDkbQQk7hg8V53539RvA2RW6unM6TyI6f6L4777PMUfkH0BdhIudk_Za3K6sxXZyT2Wq-lJwIE3g3AKP4Reh3"/>
<div>
<p class="font-bold text-on-surface">Elena Condori</p>
<p class="text-xs text-on-surface-variant">e.condori@cultura.pe</p>
</div>
</div>
</td>
<td class="px-6 py-5">
<span class="px-2.5 py-1 rounded bg-primary/10 text-primary text-xs font-bold">Docente</span>
</td>
<td class="px-6 py-5">
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-green-600"></span>
<span class="text-xs font-medium">Activo</span>
</div>
</td>
<td class="px-6 py-5 text-right">
<div class="flex items-center justify-end gap-2">
<button class="p-2 hover:bg-secondary-container rounded-lg transition-colors text-secondary" title="Cambiar Rol">
<span class="material-symbols-outlined text-lg">edit_note</span>
</button>
<button class="p-2 hover:bg-error-container rounded-lg transition-colors text-error" title="Desactivar">
<span class="material-symbols-outlined text-lg">block</span>
</button>
</div>
</td>
</tr>
<!-- User Row 3 (Inactive) -->
<tr class="hover:bg-surface-bright transition-colors group opacity-60">
<td class="px-8 py-5">
<div class="flex items-center gap-4">
<img alt="Avatar" class="w-10 h-10 rounded-lg object-cover grayscale" data-alt="middle aged man with beard and serious expression looking at camera in a workshop setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpfKJcot5UQW7EbhOFBv70wKbUQMxkctr1iVfbL_7GcSkRRqU_7ex8-rf_7-3COMUBssGB9ksupx0Q_xbds01wIVsqi70sRDTrFX0cg2p6FNDV6soaGtM0BJaWf77Yxz3RrxqE5Q1BcZ351fN7YvEnQ9rRfL21JJuUM-e3E7RNyQxBBKaeUF46RdlHUMP449S50opVHvU-g1obkP0gHqh14S1aP920JH1A84NihrfYNu82-R3ea8Tfr9PK64kzQwAfLsiukkRP"/>
<div>
<p class="font-bold text-on-surface">Carlos Mamani</p>
<p class="text-xs text-on-surface-variant">c.mamani@outlook.com</p>
</div>
</div>
</td>
<td class="px-6 py-5">
<span class="px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed text-xs font-bold">Comunidad</span>
</td>
<td class="px-6 py-5">
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-outline"></span>
<span class="text-xs font-medium">Inactivo</span>
</div>
</td>
<td class="px-6 py-5 text-right">
<div class="flex items-center justify-end gap-2">
<button class="p-2 hover:bg-tertiary-fixed rounded-lg transition-colors text-tertiary" title="Activar">
<span class="material-symbols-outlined text-lg">check_circle</span>
</button>
<button class="p-2 hover:bg-secondary-container rounded-lg transition-colors text-secondary" title="Cambiar Rol">
<span class="material-symbols-outlined text-lg">edit_note</span>
</button>
</div>
</td>
</tr>
<!-- User Row 4 -->
<tr class="hover:bg-surface-bright transition-colors group">
<td class="px-8 py-5">
<div class="flex items-center gap-4">
<img alt="Avatar" class="w-10 h-10 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all" data-alt="young artist woman with creative expression and colorful background in soft lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwiAKIkdLndJUHke5pR4IF3QCWSzmI67WtOvpgpnDMkOSAFxUl7GZ5aheypBBBZ3ctqHzFkjzCCNsHpTzUdAWGL0SjZv6Klv5zQ9fBD_Z1ewMO-j98acI8gYTMJGe6j-jv7iWM1nMnCFnWVpX3xUpBjWuPFUAQKc6K_xVMSmXEVRLhyHHroeqzvXh022Ky9pa8deFHR128cE0IROQzix7nOHec1NCjuE_8MUA2GfguGlYrKuB-RKHJV50VC0ucm6lKeGVYTSZ-"/>
<div>
<p class="font-bold text-on-surface">Sara Huaman</p>
<p class="text-xs text-on-surface-variant">sara.h@pucp.edu.pe</p>
</div>
</div>
</td>
<td class="px-6 py-5">
<span class="px-2.5 py-1 rounded bg-tertiary/10 text-tertiary text-xs font-bold">Estudiante</span>
</td>
<td class="px-6 py-5">
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-green-600"></span>
<span class="text-xs font-medium">Activo</span>
</div>
</td>
<td class="px-6 py-5 text-right">
<div class="flex items-center justify-end gap-2">
<button class="p-2 hover:bg-secondary-container rounded-lg transition-colors text-secondary" title="Cambiar Rol">
<span class="material-symbols-outlined text-lg">edit_note</span>
</button>
<button class="p-2 hover:bg-error-container rounded-lg transition-colors text-error" title="Desactivar">
<span class="material-symbols-outlined text-lg">block</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Pagination -->
<div class="px-8 py-6 bg-surface-container-low flex items-center justify-between">
<span class="text-xs text-on-surface-variant font-medium">Mostrando 4 de 1,284 usuarios</span>
<div class="flex items-center gap-1">
<button class="p-2 rounded hover:bg-surface-container-highest disabled:opacity-30" disabled="">
<span class="material-symbols-outlined">chevron_left</span>
</button>
<button class="w-8 h-8 rounded bg-primary text-on-primary text-xs font-bold">1</button>
<button class="w-8 h-8 rounded hover:bg-surface-container-highest text-xs font-bold">2</button>
<button class="w-8 h-8 rounded hover:bg-surface-container-highest text-xs font-bold">3</button>
<span class="px-2 text-xs opacity-40">...</span>
<button class="w-8 h-8 rounded hover:bg-surface-container-highest text-xs font-bold">48</button>
<button class="p-2 rounded hover:bg-surface-container-highest">
<span class="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</section>
<!-- Subtle Pattern Accent -->
<div class="mt-24 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent relative">
<div class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4">
<span class="material-symbols-outlined text-secondary opacity-30">gesture</span>
</div>
</div>
</main>
<!-- FAB Overlay (Hidden by default, shown for primary context) -->
<button class="fixed bottom-8 right-8 w-16 h-16 bg-tertiary text-on-tertiary-container rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform group">
<span class="material-symbols-outlined text-3xl">auto_fix_high</span>
<div class="absolute right-full mr-4 bg-inverse-surface text-inverse-on-surface text-xs py-2 px-4 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Auditoría de Roles AI
        </div>
</button>
  `,
  styles: `
    :host { display: block; }
  `
})
export class UserAdmin {}
