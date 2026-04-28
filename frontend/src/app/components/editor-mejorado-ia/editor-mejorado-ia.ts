import { Component } from '@angular/core';

@Component({
  selector: 'app-editor-mejorado-ia',
  standalone: true,
  imports: [],
  template: `
<!-- TopNavBar -->
<nav class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-[#fff9ed] dark:bg-[#1a1614]">
<div class="flex items-center gap-8">
<span class="text-2xl font-bold font-serif text-[#99411c] dark:text-[#b85932]">CulturaStory</span>
<div class="hidden md:flex items-center gap-6">
<a class="text-[#56423c] dark:text-[#eae2cd] hover:text-[#99411c] font-body text-sm" href="#">Dashboard</a>
<a class="text-[#99411c] dark:text-[#fbf3de] border-b-2 border-[#99411c] font-bold font-body text-sm" href="#">Narrativas</a>
<a class="text-[#56423c] dark:text-[#eae2cd] hover:text-[#99411c] font-body text-sm" href="#">Storyboards</a>
</div>
</div>
<div class="flex items-center gap-4">
<div class="relative hidden lg:block">
<input class="bg-surface-container border-none rounded-full py-2 px-4 text-sm w-64 focus:ring-2 focus:ring-primary/20" placeholder="Buscar historias..." type="text"/>
<span class="material-symbols-outlined absolute right-3 top-2 text-on-surface-variant text-sm">search</span>
</div>
<button class="material-symbols-outlined text-on-surface-variant p-2 hover:bg-[#f5edd8] rounded-full transition-colors">notifications</button>
<button class="material-symbols-outlined text-on-surface-variant p-2 hover:bg-[#f5edd8] rounded-full transition-colors">settings</button>
<div class="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden border border-primary/10">
<img alt="User avatar" class="w-full h-full object-cover" data-alt="User avatar close-up professional portrait of a smiling person with warm lighting and soft background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ8ZSSD8-l-J9fWfePXxy7N18Z4f_VqMmtgWTRYvXpjgZxQKLPzrttcHfbD18_bJ3cL0WhIxY135u5Y-oAZxtZKc4RzOIVTfY31RT0HM_NPklsQStXcD4dOtpwKmUK7tAF47zwL8t81qYhFGSXaA1_AMXSJ50BJ5ug2eTp9SKb28wCzIO4KQO2XT9K_eiglKtwgnKYYg673b_Pm29oEJu8QdY6Rw6W-WfU76V28cu2rlRudkSoGtshq6cs1DtUQheP-uN2FY5qAymL"/>
</div>
</div>
</nav>
<main class="pt-16 h-screen flex">
<!-- PANEL IZQUIERDO: Editor Principal -->
<section class="flex-1 overflow-y-auto p-8 lg:p-12">
<div class="max-w-4xl mx-auto space-y-8">
<!-- Breadcrumbs & Meta -->
<div class="flex items-center gap-2 text-xs font-label uppercase tracking-widest text-on-surface-variant/60">
<span>Proyectos</span>
<span class="material-symbols-outlined text-[10px]">chevron_right</span>
<span>Andes Centrales</span>
<span class="material-symbols-outlined text-[10px]">chevron_right</span>
<span class="text-primary font-bold">Editor de Narrativa</span>
</div>
<!-- Form Fields -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div class="space-y-1">
<label class="text-xs font-bold text-primary uppercase tracking-tighter ml-1">Título de la Obra</label>
<input class="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary border-t-0 border-l-0 border-r-0 px-1 py-3 text-2xl font-serif text-on-surface placeholder:text-on-surface-variant/30 focus:ring-0 transition-all" type="text" value="El Secreto del Cóndor Herido"/>
</div>
<div class="grid grid-cols-2 gap-4">
<div class="space-y-1">
<label class="text-xs font-bold text-primary uppercase tracking-tighter ml-1">Región</label>
<select class="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary/20 appearance-none">
<option>Andes Centrales</option>
<option>Costa Norte</option>
<option>Selva Amazónica</option>
</select>
</div>
<div class="space-y-1">
<label class="text-xs font-bold text-primary uppercase tracking-tighter ml-1">Tipo de Relato</label>
<select class="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary/20 appearance-none">
<option>Mito Ancestral</option>
<option>Leyenda Urbana</option>
<option>Crónica Histórica</option>
</select>
</div>
</div>
</div>
<!-- Main Editor Area -->
<div class="relative bg-surface-container-lowest rounded-3xl p-8 shadow-sm min-h-[600px] flex flex-col">
<div class="flex items-center gap-4 mb-6 border-b border-surface-container pb-4">
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">format_bold</button>
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">format_italic</button>
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">format_list_bulleted</button>
<div class="h-4 w-[1px] bg-outline-variant/30 mx-2"></div>
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">auto_stories</button>
<span class="text-[10px] font-label text-on-surface-variant/40 ml-auto">Último guardado: hace 2 min</span>
</div>
<textarea class="flex-1 w-full bg-transparent border-none focus:ring-0 text-lg leading-relaxed font-serif text-on-surface-variant resize-none" placeholder="Comienza a crear tu historia aquí..." spellcheck="false">Las nubes se aferraban a los picos de granito como jirones de lana alpaca. En lo más alto del valle del Urubamba, donde el aire es tan delgado que las palabras parecen cristalizarse antes de ser pronunciadas, vivía Yupanqui.

No era un hombre de muchas posesiones, pero guardaba en su memoria los cantos que las piedras le susurraban durante el solsticio. Aquella mañana, un destello cobrizo interrumpió su meditación. No era oro, sino la sangre de un mensajero divino: el gran Kuntur.

La criatura yacía con el ala quebrada sobre un altar natural de cuarzo. Yupanqui sabía que este no era un accidente fortuito. Los vientos de los Apus traían noticias de un cambio inminente, un desequilibrio que solo la narrativa de los antiguos podría restaurar...</textarea>
</div>
</div>
</section>
<!-- PANEL DERECHO: Asistente IA -->
<aside class="w-[400px] bg-surface-container-low flex flex-col border-l border-primary/5">
<!-- IA Header -->
<div class="p-6 border-b border-primary/10 flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-2xl bg-tertiary flex items-center justify-center text-white shadow-lg shadow-tertiary/20">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
</div>
<div>
<h2 class="text-sm font-bold text-on-surface">Asistente Cultural IA</h2>
<div class="flex items-center gap-1.5">
<span class="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
<span class="text-[10px] font-medium text-tertiary">Pensando...</span>
</div>
</div>
</div>
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary">more_vert</button>
</div>
<!-- Chat / Suggestions Area -->
<div class="flex-1 overflow-y-auto p-6 space-y-6">
<!-- Quick Actions -->
<div class="space-y-2">
<p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-3">Acciones Sugeridas</p>
<button class="w-full flex items-center gap-3 bg-white hover:bg-tertiary-container hover:text-white transition-all p-3 rounded-2xl text-sm font-medium text-on-surface shadow-sm border border-tertiary/5 text-left group">
<span class="material-symbols-outlined text-tertiary group-hover:text-white">groups</span>
                        Sugerir personajes culturales
                    </button>
<button class="w-full flex items-center gap-3 bg-white hover:bg-tertiary-container hover:text-white transition-all p-3 rounded-2xl text-sm font-medium text-on-surface shadow-sm border border-tertiary/5 text-left group">
<span class="material-symbols-outlined text-tertiary group-hover:text-white">account_tree</span>
                        Estructurar mi historia
                    </button>
<button class="w-full flex items-center gap-3 bg-white hover:bg-tertiary-container hover:text-white transition-all p-3 rounded-2xl text-sm font-medium text-on-surface shadow-sm border border-tertiary/5 text-left group">
<span class="material-symbols-outlined text-tertiary group-hover:text-white">location_on</span>
                        Detalles de la región
                    </button>
</div>
<!-- Chat Bubbles -->
<div class="space-y-4">
<div class="flex gap-3">
<div class="flex-1 bg-tertiary-container/10 p-4 rounded-2xl rounded-tl-none border border-tertiary/10">
<p class="text-xs text-on-surface leading-relaxed">
                                He notado que mencionas al <strong class="text-tertiary">Kuntur</strong> (Cóndor). En la mitología andina, es el mensajero entre el mundo de los vivos y el de los dioses. ¿Te gustaría integrar un ritual de sanación basado en hierbas locales como la <strong class="text-tertiary">Muña</strong> o la <strong class="text-tertiary">Coca</strong>?
                            </p>
</div>
</div>
<div class="flex flex-wrap gap-2">
<span class="text-[9px] font-bold text-on-surface-variant/50 uppercase block w-full mb-1">Historial Aplicado</span>
<div class="bg-surface-container-highest px-3 py-1 rounded-full text-[10px] font-medium text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-[12px]">check</span> Simbolismo del Apu
                        </div>
<div class="bg-surface-container-highest px-3 py-1 rounded-full text-[10px] font-medium text-on-surface-variant flex items-center gap-1">
<span class="material-symbols-outlined text-[12px]">check</span> Terminología Quechua
                        </div>
</div>
</div>
<!-- Visual Context Card (AI Generated) -->
<div class="rounded-2xl overflow-hidden shadow-md border border-white/20">
<div class="relative h-40">
<img class="w-full h-full object-cover" data-alt="Cinematic wide shot of majestic Andes mountains at sunrise with golden light hitting snow-capped peaks and mist in the valleys" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZUDP74hnACl8UCxF7pQNyxr8z9x0YqP9Gy0DW7YH8UF8YH0cnwmQNwLU7dy9wFgtQi_NvT8_dGLEwBmW_GEjr4T7f_3kBmryGs9ljcakTyHvpX-1H7H804DdmOUh90Nw0s62p_AMeKhQNLa2NflZskFhRuGKA30b12TChRCceRq6rWJEnv6NC0tA_svruM5MuPkApg5lOKuOOisPmfaIofG7fbuWAB4o_IWk8ffbGsSZbTU3teqBdYozyJKiBOWntkT8BzvcBYtt5"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
<span class="text-[10px] font-medium text-white/90 italic">Referencia visual: Valle Sagrado al amanecer</span>
</div>
</div>
</div>
</div>
<!-- IA Input Area -->
<div class="p-6 bg-surface-container">
<div class="relative bg-white rounded-2xl shadow-sm border border-tertiary/10 p-2 focus-within:ring-2 focus-within:ring-tertiary/20 transition-all">
<textarea class="w-full bg-transparent border-none focus:ring-0 text-sm py-2 px-3 resize-none min-h-[80px]" placeholder="Pídele algo a la IA..."></textarea>
<div class="flex items-center justify-between mt-2 px-2">
<div class="flex items-center gap-2">
<button class="material-symbols-outlined text-on-surface-variant hover:text-tertiary transition-colors text-lg">mic</button>
<button class="material-symbols-outlined text-on-surface-variant hover:text-tertiary transition-colors text-lg">attach_file</button>
</div>
<button class="bg-tertiary text-white w-8 h-8 rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
<span class="material-symbols-outlined text-sm">send</span>
</button>
</div>
</div>
</div>
</aside>
</main>
<!-- Contextual FAB -->
<button class="fixed bottom-8 right-[432px] bg-primary text-white flex items-center gap-2 px-6 py-4 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all group">
<span class="material-symbols-outlined group-hover:rotate-12 transition-transform">auto_stories</span>
<span class="font-bold text-sm">Generar Storyboard</span>
</button>
  `,
  styles: `
    :host { display: block; }
  `
})
export class EditorMejoradoIa {}
