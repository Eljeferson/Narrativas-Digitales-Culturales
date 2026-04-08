import { Component } from '@angular/core';

@Component({
  selector: 'app-author-editor-desk',
  standalone: true,
  imports: [],
  template: `
<div class="loom-thread"></div>
<!-- TopNavBar -->
<nav class="sticky top-0 z-50 flex justify-between items-center px-8 py-4 w-full bg-[#FFF8EF]/80 dark:bg-[#1E1B13]/80 backdrop-blur-md">
<div class="flex items-center gap-8">
<span class="text-2xl font-bold tracking-tight text-[#823B18] dark:text-[#A0522D] font-noto-serif italic">CulturaStory AI</span>
<div class="hidden md:flex gap-6">
<a class="text-[#1E1B13]/70 dark:text-[#FFF8EF]/70 hover:text-[#823B18] transition-colors font-medium" href="#">Narratives</a>
<a class="text-[#1E1B13]/70 dark:text-[#FFF8EF]/70 hover:text-[#823B18] transition-colors font-medium" href="#">Regions</a>
<a class="text-[#1E1B13]/70 dark:text-[#FFF8EF]/70 hover:text-[#823B18] transition-colors font-medium" href="#">Library</a>
</div>
</div>
<div class="flex items-center gap-4">
<button class="p-2 rounded-full hover:bg-[#823B18]/5 transition-colors">
<span class="material-symbols-outlined text-[#823B18]">notifications</span>
</button>
<button class="p-2 rounded-full hover:bg-[#823B18]/5 transition-colors">
<span class="material-symbols-outlined text-[#823B18]">settings</span>
</button>
<div class="h-8 w-8 rounded-full overflow-hidden border border-outline-variant">
<img alt="User profile avatar" data-alt="User profile avatar with a warm, professional expression against a soft-focus library background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj86HNumaISbWtDD8CLuzs951MJiQv6XayZG3I-o1i4jXtN9ZYwRdxPge6LvHgyMPtfGsddInJrKHFTdDSPMRmNeoNthr1z295Esjn4foelB3VhPUyZOErOY9BY8f18fxN_Oh9flfxbv_VqNu4Ai0OTHEq80P65nrhBumhSLrPjYRvbu78BJXij38N41QkwpZc5ythO2bZFo24z4BauInHnLKXtlZnA5TGtCL71Ve5C7rYu9wCwIaBTKTV_FzlbD3nLHtHXkZU"/>
</div>
</div>
<div class="bg-gradient-to-r from-transparent via-[#795900]/20 to-transparent h-[1px] w-full absolute bottom-0"></div>
</nav>
<main class="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-24">
<!-- Header Actions -->
<div class="flex justify-between items-end mb-12">
<div>
<nav class="flex items-center gap-2 text-sm text-outline mb-4">
<span class="hover:text-primary cursor-pointer">The Weaver's Hub</span>
<span class="material-symbols-outlined text-xs">chevron_right</span>
<span class="text-on-surface-variant font-medium">Editor de Narrativa</span>
</nav>
<h1 class="text-4xl font-headline font-bold text-primary tracking-tight">Author's Desk</h1>
</div>
<div class="flex items-center gap-3 bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/30">
<button class="px-4 py-2 text-sm font-bold bg-primary text-on-primary rounded-lg shadow-sm">Borrador</button>
<button class="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all">Listo para revisión</button>
</div>
</div>
<!-- Editor Container -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden">
<!-- Metadata Bar -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 border-b border-surface-variant">
<div class="space-y-2">
<label class="block text-xs font-bold uppercase tracking-widest text-secondary font-label">Título de la Obra</label>
<input class="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-tertiary transition-colors text-xl font-headline placeholder:text-outline-variant py-2" placeholder="Escribe el nombre de tu historia..." type="text"/>
</div>
<div class="space-y-2">
<label class="block text-xs font-bold uppercase tracking-widest text-secondary font-label">Región Cultural</label>
<select class="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-tertiary transition-colors py-2 text-on-surface">
<option>Andes Centrales</option>
<option>Amazonía</option>
<option>Costa Norte</option>
<option>Altiplano</option>
</select>
</div>
<div class="space-y-2">
<label class="block text-xs font-bold uppercase tracking-widest text-secondary font-label">Tipo de Narrativa</label>
<select class="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-tertiary transition-colors py-2 text-on-surface">
<option>Mito</option>
<option>Leyenda</option>
<option>Cuento Popular</option>
<option>Fábula</option>
</select>
</div>
</div>
<!-- Toolbar (Floating Style) -->
<div class="flex items-center gap-2 px-8 py-3 bg-surface-container-low/50 border-b border-surface-variant">
<button class="p-2 hover:bg-surface-variant rounded text-on-surface-variant"><span class="material-symbols-outlined">format_bold</span></button>
<button class="p-2 hover:bg-surface-variant rounded text-on-surface-variant"><span class="material-symbols-outlined">format_italic</span></button>
<button class="p-2 hover:bg-surface-variant rounded text-on-surface-variant"><span class="material-symbols-outlined">format_list_bulleted</span></button>
<div class="w-[1px] h-6 bg-outline-variant mx-2"></div>
<button class="p-2 hover:bg-surface-variant rounded text-on-surface-variant"><span class="material-symbols-outlined">auto_fix_high</span></button>
<span class="text-xs text-tertiary font-medium ml-2">Asistente AI activo</span>
</div>
<!-- Text Content Area -->
<div class="paper-texture p-12 min-h-[600px] relative">
<!-- Andean Pattern Corner Detail -->
<div class="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
<svg class="text-primary" fill="currentColor" height="120" viewbox="0 0 100 100" width="120">
<path d="M0 0h20v20H0zM20 20h20v20H20zM40 40h20v20H40zM60 60h20v20H60zM80 80h20v20H80zM0 80h20v20H0zM80 0h20v20H80z"></path>
</svg>
</div>
<div class="max-w-3xl mx-auto">
<textarea class="w-full min-h-[500px] bg-transparent border-none focus:ring-0 text-lg leading-relaxed text-on-surface font-serif placeholder:text-outline-variant/50" placeholder="Hace mucho tiempo, en las cumbres más altas de los Andes..."></textarea>
</div>
</div>
</div>
<!-- Footer Actions -->
<div class="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
<div class="flex items-center gap-4 text-on-surface-variant text-sm italic">
<span class="material-symbols-outlined text-secondary">cloud_done</span>
                Guardado automáticamente hace 2 minutos
            </div>
<div class="flex items-center gap-4 w-full md:w-auto">
<button class="flex-1 md:flex-none px-8 py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined">save</span>
                    Guardar borrador
                </button>
<button class="flex-1 md:flex-none px-8 py-3 rounded-lg bg-primary text-on-primary font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 relative overflow-hidden group">
<div class="absolute bottom-0 left-0 w-full h-[4px] bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
<span class="material-symbols-outlined">send</span>
                    Enviar al docente
                </button>
</div>
</div>
</main>
<!-- Contextual FAB (Hidden on this focused screen as per rules, but included if user navigates back) -->
<!-- Suppression logic: Screen is "Task-Focused" (Editor), FAB suppressed to prioritize the Canvas. -->
  `,
  styles: `
    :host { display: block; }
  `
})
export class AuthorEditorDesk {}
