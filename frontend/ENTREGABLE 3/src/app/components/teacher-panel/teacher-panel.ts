import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-panel',
  standalone: true,
  imports: [],
  template: `
<div class="thread-line"></div>
<!-- SideNavBar (Execution from JSON) -->
<aside class="fixed left-0 top-0 h-full flex flex-col p-6 space-y-4 bg-[#FFF8EF] dark:bg-[#1E1B13] h-screen w-64 border-r-0 z-40 hidden md:flex">
<div class="mb-8">
<h2 class="text-lg font-serif text-[#823B18] font-bold">The Weaver's Hub</h2>
<p class="text-xs opacity-60 font-medium">Student Portal</p>
</div>
<nav class="flex-1 space-y-2">
<!-- Active: Dashboard -->
<a class="flex items-center gap-3 bg-[#823B18] text-[#FFF8EF] rounded-md px-4 py-3 shadow-sm transition-all duration-200 translate-x-1" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-medium">Dashboard</span>
</a>
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all" href="#">
<span class="material-symbols-outlined">auto_stories</span>
<span class="font-medium">My Stories</span>
</a>
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all" href="#">
<span class="material-symbols-outlined">group</span>
<span class="font-medium">Classroom</span>
</a>
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all" href="#">
<span class="material-symbols-outlined">explore</span>
<span class="font-medium">Cultural Map</span>
</a>
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all" href="#">
<span class="material-symbols-outlined">analytics</span>
<span class="font-medium">Analytics</span>
</a>
</nav>
<button class="w-full py-3 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg mb-6 border-b-4 border-secondary">
<span class="material-symbols-outlined">add</span>
            + New Narrative
        </button>
<div class="pt-6 border-t border-outline-variant/30 space-y-1">
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-2 opacity-70 hover:bg-[#795900]/10 transition-all text-sm" href="#">
<span class="material-symbols-outlined text-base">help_outline</span>
                Support
            </a>
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-2 opacity-70 hover:bg-[#795900]/10 transition-all text-sm" href="#">
<span class="material-symbols-outlined text-base">logout</span>
                Sign Out
            </a>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="md:ml-64 min-h-screen p-8 lg:p-12 relative overflow-hidden">
<!-- Top Navigation (Contextual) -->
<header class="sticky top-0 z-50 flex justify-between items-center px-0 py-4 w-full bg-[#FFF8EF]/80 backdrop-blur-md mb-12">
<div>
<h1 class="text-3xl font-headline italic font-bold tracking-tight text-primary">Dashboard del Docente</h1>
<p class="text-on-surface-variant font-medium">Bienvenido, Prof. Alejandro Mendoza</p>
</div>
<div class="flex items-center gap-4">
<button class="p-2 rounded-full hover:bg-secondary/5 transition-colors text-primary">
<span class="material-symbols-outlined">notifications</span>
</button>
<div class="w-10 h-10 rounded-full bg-surface-container-high border-2 border-primary-container overflow-hidden">
<img alt="User profile avatar" data-alt="Portrait of a middle-aged male teacher with glasses in a professional warm lit setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8FUKLPrxgEBOcY3f7sNTc0xNj7uqY575ZsHswUHmXtf2P9vkiraUHZWkvP-vGWY8XE76MHCClv-LQ8FWoP7kHRcozjYcmbfOb0UwTmu4SNpu0ar9otG7EHJvyPFbJ7j3zxC9q1vuZui5K5-0N9GkndP79NnGBgRxRtL8EffD2kRWK3ryfP5gSb2fTJLVqKuyEiLLfiEt0SSyCNNDu2rhQ6-dfZ_VrIAP-ZnXZ9fHslVcXuVF4wIs7HxtpSqaf5gdRL-i3tJ_5"/>
</div>
</div>
<div class="bg-gradient-to-r from-transparent via-[#795900]/20 to-transparent h-[1px] w-full absolute bottom-0"></div>
</header>
<!-- Stats Overview: Bento Style -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
<!-- Card 1: Students -->
<div class="bg-surface-container-lowest p-8 rounded-xl relative overflow-hidden shadow-sm group">
<div class="andean-pattern absolute inset-0"></div>
<div class="relative z-10">
<span class="text-secondary font-bold text-sm tracking-widest uppercase">Estudiantes Activos</span>
<div class="flex items-end gap-3 mt-2">
<span class="text-5xl font-headline text-primary font-bold">124</span>
<span class="text-tertiary font-bold mb-2 flex items-center text-sm">
<span class="material-symbols-outlined text-sm">trending_up</span> +5%
                        </span>
</div>
</div>
<div class="absolute right-4 bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="material-symbols-outlined text-6xl">groups</span>
</div>
</div>
<!-- Card 2: Narratives -->
<div class="bg-surface-container-lowest p-8 rounded-xl relative overflow-hidden shadow-sm group border-b-4 border-secondary/20">
<div class="andean-pattern absolute inset-0"></div>
<div class="relative z-10">
<span class="text-secondary font-bold text-sm tracking-widest uppercase">Narrativas Creadas</span>
<div class="flex items-end gap-3 mt-2">
<span class="text-5xl font-headline text-primary font-bold">842</span>
<span class="text-on-surface-variant font-medium mb-2 text-sm">Total histórico</span>
</div>
</div>
<div class="absolute right-4 bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="material-symbols-outlined text-6xl">auto_stories</span>
</div>
</div>
<!-- Card 3: Pending Review (High Priority) -->
<div class="bg-tertiary-container text-on-tertiary-container p-8 rounded-xl relative overflow-hidden shadow-lg group">
<div class="absolute top-0 right-0 p-4">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">priority_high</span>
</div>
<div class="relative z-10">
<span class="text-on-tertiary-container/80 font-bold text-sm tracking-widest uppercase">Pendientes de Revisión</span>
<div class="flex items-end gap-3 mt-2">
<span class="text-5xl font-headline font-bold text-on-tertiary-container">18</span>
<span class="bg-error text-white text-[10px] px-2 py-0.5 rounded-full mb-3 font-bold">URGENTE</span>
</div>
</div>
<div class="mt-4 flex -space-x-2">
<div class="w-8 h-8 rounded-full border-2 border-tertiary-container bg-surface-dim overflow-hidden">
<img alt="Student avatar" data-alt="Close-up face of a young Andean student with a bright smile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdEiaI9iUgfKJ1nwL6v82oGnukDxuarf-_cWn2pGonFu0WnH30k63089i17jqvGxVt8u2b2UYLJ0wBEtYEzbJHykFVApo7j9hpeZlsgeG0OqV3vY4IQxPoTxYNfLbv0RP8wRjHvNXvFPay4U7-gNLE6gjmB1shZHnHV27v3-SbttHtlKJ9bY0pTthKwEEGUl3VuVCQUo6Qub_EQCYnjLlEiRdCAqvgueGKywWAFEUUILoSagjaeiL-fpQzIdges0N4NLuCyCHW"/>
</div>
<div class="w-8 h-8 rounded-full border-2 border-tertiary-container bg-surface-dim overflow-hidden">
<img alt="Student avatar" data-alt="Portrait of a young indigenous girl from the Amazon region looking thoughtfully" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYD4Kr4c-OQeuxv59dnXfN0gx2R9YIpOwbpn9Ve88ovXW-YPBbcGVGxhjmYkhQlPYbCBLiL3nfHgUNox4Py2T1fzyKj0EtYUhByqnuOrmlq-rYpDJ57bQPLoAjsYqV08SZBmE74JNARPNyMH4FuhX75bH7X5bpPdOu74AZ-YToOj-nP15k5HRwZS9iUiLKSwkINl8TEKFgLM09umhHO_rcfDa5gbByul23L1Rl3rZCapsKThA3oPC9PlWxNgZHRb_vpGRst1Gh"/>
</div>
<div class="w-8 h-8 rounded-full border-2 border-tertiary-container bg-surface-dim overflow-hidden">
<img alt="Student avatar" data-alt="Portrait of a smiling teenage boy with traditional Peruvian textile background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1TQ0SiToViA-TBLhVlmaBOZDgeb5lD2iPxIOu9gcM1Yq-V4osv25PTyT40iBbPME0b1BzGV4hkX_LxP6nBylcmNcnUIsLU-n4AxOm2Nc1v0whRgS1QkYFfXSqXor86FJYQ6t4IwDK9WSePIDwDeVU4lsV98WSEgGVcSXz-b-lvWVGBa3_TruCnAdkc7srcZUCvhRfbX1Mv46E9at0OW4slTzEhkG9T6t1a-JDM2fdnEMZeNxN8YaQFh-OobZf38vGLkAUBGBr"/>
</div>
<div class="w-8 h-8 rounded-full border-2 border-tertiary-container bg-tertiary flex items-center justify-center text-[10px] font-bold">
                        +15
                    </div>
</div>
</div>
</section>
<!-- Filters and Table Section -->
<section class="bg-surface-container-low rounded-xl p-1 relative">
<div class="bg-surface-container-lowest rounded-lg p-6 shadow-sm border border-outline-variant/10">
<!-- Filter Bar -->
<div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
<h3 class="text-xl font-headline text-primary font-bold">Revisión de Narrativas</h3>
<div class="flex flex-wrap gap-3">
<div class="relative">
<select class="appearance-none bg-surface-variant/50 border-b-2 border-outline-variant rounded-t-lg px-4 py-2 pr-10 focus:border-tertiary focus:ring-0 text-sm font-medium transition-all">
<option>Todos los Grados</option>
<option>3ro Secundario</option>
<option>4to Secundario</option>
<option>5to Secundario</option>
</select>
<span class="material-symbols-outlined absolute right-2 top-2 text-on-surface-variant pointer-events-none">expand_more</span>
</div>
<div class="relative">
<select class="appearance-none bg-surface-variant/50 border-b-2 border-outline-variant rounded-t-lg px-4 py-2 pr-10 focus:border-tertiary focus:ring-0 text-sm font-medium transition-all">
<option>Todas las Regiones</option>
<option>Andina</option>
<option>Amazónica</option>
<option>Costera</option>
</select>
<span class="material-symbols-outlined absolute right-2 top-2 text-on-surface-variant pointer-events-none">location_on</span>
</div>
<div class="relative">
<select class="appearance-none bg-surface-variant/50 border-b-2 border-outline-variant rounded-t-lg px-4 py-2 pr-10 focus:border-tertiary focus:ring-0 text-sm font-medium transition-all">
<option>Estado: Pendiente</option>
<option>Estado: Aprobado</option>
<option>Estado: Observado</option>
</select>
<span class="material-symbols-outlined absolute right-2 top-2 text-on-surface-variant pointer-events-none">filter_list</span>
</div>
</div>
</div>
<!-- Narrative Table -->
<div class="overflow-x-auto">
<table class="w-full text-left border-separate border-spacing-y-4">
<thead>
<tr class="text-secondary text-xs font-bold tracking-widest uppercase px-4">
<th class="pb-2 px-4">Estudiante</th>
<th class="pb-2 px-4">Título de la Narrativa</th>
<th class="pb-2 px-4">Región</th>
<th class="pb-2 px-4">Fecha</th>
<th class="pb-2 px-4">Estado</th>
<th class="pb-2 px-4 text-right">Acciones</th>
</tr>
</thead>
<tbody>
<!-- Row 1 -->
<tr class="bg-surface hover:bg-surface-container transition-colors group">
<td class="py-4 px-4 rounded-l-xl">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">MC</div>
<div>
<div class="font-bold text-on-surface">Mateo Quispe</div>
<div class="text-xs text-on-surface-variant">4to Grado B</div>
</div>
</div>
</td>
<td class="py-4 px-4 font-serif text-primary font-medium italic">El Vuelo del Cóndor de Plata</td>
<td class="py-4 px-4">
<span class="bg-secondary/10 text-secondary-container bg-secondary px-3 py-1 rounded-full text-xs font-bold">Cusco</span>
</td>
<td class="py-4 px-4 text-sm text-on-surface-variant">12 Oct, 2023</td>
<td class="py-4 px-4">
<div class="flex items-center gap-2 text-error font-bold text-xs">
<span class="w-2 h-2 rounded-full bg-error"></span> Pendiente
                                    </div>
</td>
<td class="py-4 px-4 rounded-r-xl text-right">
<div class="flex justify-end gap-2">
<button class="p-2 rounded-lg hover:bg-tertiary-container/20 text-tertiary transition-colors" title="Ver detalle">
<span class="material-symbols-outlined">visibility</span>
</button>
<button class="p-2 rounded-lg hover:bg-secondary/20 text-secondary transition-colors" title="Aprobar">
<span class="material-symbols-outlined">check_circle</span>
</button>
<button class="p-2 rounded-lg hover:bg-error/10 text-error transition-colors" title="Devolver">
<span class="material-symbols-outlined">chat_bubble</span>
</button>
</div>
</td>
</tr>
<!-- Row 2 -->
<tr class="bg-surface hover:bg-surface-container transition-colors">
<td class="py-4 px-4 rounded-l-xl">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary font-bold">SA</div>
<div>
<div class="font-bold text-on-surface">Sofía Arirama</div>
<div class="text-xs text-on-surface-variant">5to Grado A</div>
</div>
</div>
</td>
<td class="py-4 px-4 font-serif text-primary font-medium italic">Secretos del Río Amazonas</td>
<td class="py-4 px-4">
<span class="bg-tertiary/10 text-tertiary px-3 py-1 rounded-full text-xs font-bold">Loreto</span>
</td>
<td class="py-4 px-4 text-sm text-on-surface-variant">11 Oct, 2023</td>
<td class="py-4 px-4">
<div class="flex items-center gap-2 text-tertiary font-bold text-xs">
<span class="w-2 h-2 rounded-full bg-tertiary"></span> Aprobado
                                    </div>
</td>
<td class="py-4 px-4 rounded-r-xl text-right">
<div class="flex justify-end gap-2">
<button class="p-2 rounded-lg hover:bg-tertiary-container/20 text-tertiary transition-colors">
<span class="material-symbols-outlined">visibility</span>
</button>
<button class="p-2 rounded-lg opacity-30 cursor-not-allowed">
<span class="material-symbols-outlined">check_circle</span>
</button>
<button class="p-2 rounded-lg hover:bg-error/10 text-error transition-colors">
<span class="material-symbols-outlined">chat_bubble</span>
</button>
</div>
</td>
</tr>
<!-- Row 3 -->
<tr class="bg-surface hover:bg-surface-container transition-colors">
<td class="py-4 px-4 rounded-l-xl">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary font-bold">JL</div>
<div>
<div class="font-bold text-on-surface">José Luna</div>
<div class="text-xs text-on-surface-variant">3ro Grado C</div>
</div>
</div>
</td>
<td class="py-4 px-4 font-serif text-primary font-medium italic">La Dama de Cao y el Tiempo</td>
<td class="py-4 px-4">
<span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">La Libertad</span>
</td>
<td class="py-4 px-4 text-sm text-on-surface-variant">10 Oct, 2023</td>
<td class="py-4 px-4">
<div class="flex items-center gap-2 text-on-surface-variant font-bold text-xs">
<span class="w-2 h-2 rounded-full bg-secondary-fixed"></span> En Revisión
                                    </div>
</td>
<td class="py-4 px-4 rounded-r-xl text-right">
<div class="flex justify-end gap-2">
<button class="p-2 rounded-lg hover:bg-tertiary-container/20 text-tertiary transition-colors">
<span class="material-symbols-outlined">visibility</span>
</button>
<button class="p-2 rounded-lg hover:bg-secondary/20 text-secondary transition-colors">
<span class="material-symbols-outlined">check_circle</span>
</button>
<button class="p-2 rounded-lg hover:bg-error/10 text-error transition-colors">
<span class="material-symbols-outlined">chat_bubble</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Pagination -->
<div class="mt-8 flex justify-between items-center px-4">
<p class="text-xs text-on-surface-variant font-medium">Mostrando 3 de 42 narrativas</p>
<div class="flex gap-2">
<button class="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-variant transition-colors">
<span class="material-symbols-outlined text-sm">chevron_left</span>
</button>
<button class="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold text-xs">1</button>
<button class="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-variant transition-colors text-xs">2</button>
<button class="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-variant transition-colors text-xs">3</button>
<button class="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-variant transition-colors">
<span class="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
</div>
</section>
<!-- Feedback Modal Contextual (Simulation Overlay) -->
<div class="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 hidden">
<!-- This would be visible on 'Devolver con comentario' action -->
<div class="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-2xl overflow-hidden relative">
<div class="andean-pattern absolute inset-0 opacity-10"></div>
<div class="p-8 relative">
<div class="flex justify-between items-start mb-6">
<div>
<h4 class="text-2xl font-headline text-primary font-bold">Devolver con Comentario</h4>
<p class="text-on-surface-variant text-sm">Estudiante: Mateo Quispe</p>
</div>
<button class="text-on-surface-variant hover:text-primary"><span class="material-symbols-outlined">close</span></button>
</div>
<div class="space-y-6">
<div>
<label class="block text-xs font-bold text-secondary uppercase tracking-widest mb-2">Comentarios Sugeridos (AI)</label>
<div class="flex flex-wrap gap-2 mb-4">
<button class="text-[10px] bg-tertiary-container/10 text-tertiary border border-tertiary/20 px-3 py-1 rounded-full font-medium hover:bg-tertiary/10 transition-colors">Reforzar mitología</button>
<button class="text-[10px] bg-tertiary-container/10 text-tertiary border border-tertiary/20 px-3 py-1 rounded-full font-medium hover:bg-tertiary/10 transition-colors">Corregir concordancia</button>
<button class="text-[10px] bg-tertiary-container/10 text-tertiary border border-tertiary/20 px-3 py-1 rounded-full font-medium hover:bg-tertiary/10 transition-colors">Expandir descripción regional</button>
</div>
<textarea class="w-full bg-surface-variant/30 border-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 rounded-t-lg p-4 h-32 placeholder-on-surface-variant/50" placeholder="Escribe tus observaciones aquí para que el estudiante pueda mejorar su historia..."></textarea>
</div>
<div class="flex items-center gap-2 text-sm text-tertiary font-medium">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
<span>La IA ayudará al estudiante a aplicar estos cambios.</span>
</div>
<div class="flex gap-4 pt-4">
<button class="flex-1 py-3 bg-primary text-on-primary rounded-xl font-bold border-b-4 border-secondary shadow-lg">Enviar Feedback</button>
<button class="px-6 py-3 border border-outline text-on-surface-variant rounded-xl font-bold">Cancelar</button>
</div>
</div>
</div>
</div>
</div>
</main>
<!-- Mobile Navigation Shell -->
<nav class="md:hidden fixed bottom-0 left-0 w-full bg-[#FFF8EF]/80 backdrop-blur-md z-50 flex justify-around py-3">
<button class="flex flex-col items-center gap-1 text-primary">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">dashboard</span>
<span class="text-[10px] font-bold">Inicio</span>
</button>
<button class="flex flex-col items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined">auto_stories</span>
<span class="text-[10px] font-bold">Historias</span>
</button>
<button class="flex flex-col items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined">group</span>
<span class="text-[10px] font-bold">Clases</span>
</button>
<button class="flex flex-col items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined">analytics</span>
<span class="text-[10px] font-bold">Reportes</span>
</button>
</nav>
  `,
  styles: `
    :host { display: block; }
  `
})
export class TeacherPanel {}
