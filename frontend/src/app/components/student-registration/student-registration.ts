import { Component } from '@angular/core';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [],
  template: `
<div class="thread-scroll hidden lg:block"></div>
<main class="relative z-10 w-full max-w-4xl px-6 py-12 md:py-24 flex flex-col md:flex-row gap-12 items-start">
<div class="w-full md:w-5/12 flex flex-col space-y-8">
<div class="space-y-4">
<h1 class="text-primary font-noto-serif text-4xl md:text-5xl font-bold leading-tight">
                    Inicia tu viaje como <span class="italic">Tejedor de Historias</span>
</h1>
<p class="text-on-surface-variant text-lg leading-relaxed">
                    Cada gran narrativa comienza con un autor. Cuéntanos un poco sobre ti para personalizar tu experiencia en CulturaStory AI.
                </p>
</div>
<div class="relative group self-center md:self-start">
<div class="artisanal-border w-48 h-48 rounded-full flex items-center justify-center bg-surface-container overflow-hidden">
<div class="w-full h-full rounded-full bg-surface-variant flex items-center justify-center border-2 border-primary/20">
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
<div class="w-full md:w-7/12 bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-sm border border-surface-variant/50 andean-pattern">
<form action="#" class="space-y-8" method="POST">
<div class="space-y-6">
<div class="group">
<label class="block text-xs font-bold uppercase tracking-wider text-secondary mb-2" for="fullname">Nombre Completo</label>
<input class="w-full bg-surface-variant/30 border-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 px-0 py-3 transition-colors text-on-surface placeholder:text-on-surface-variant/50 font-medium" id="fullname" name="fullname" placeholder="Escribe tu nombre y apellidos" type="text"/>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
<div class="group">
<label class="block text-xs font-bold uppercase tracking-wider text-secondary mb-2" for="grade">Grado / Año</label>
<input class="w-full bg-surface-variant/30 border-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 px-0 py-3 transition-colors text-on-surface placeholder:text-on-surface-variant/50 font-medium" id="grade" name="grade" placeholder="Ej: 5to Grado" type="text"/>
</div>
<div class="group">
<label class="block text-xs font-bold uppercase tracking-wider text-secondary mb-2" for="region">Región Cultural</label>
<select class="w-full bg-surface-variant/30 border-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 px-0 py-3 transition-colors text-on-surface font-medium appearance-none" id="region" name="region">
<option disabled="" selected="" value="">Selecciona tu región</option>
<option value="andean">Andina</option>
<option value="amazonian">Amazónica</option>
<option value="coastal">Costeña</option>
</select>
</div>
</div>
<div class="group">
<label class="block text-xs font-bold uppercase tracking-wider text-secondary mb-2" for="language">Lengua Nativa (Opcional)</label>
<div class="flex items-center gap-2 bg-surface-variant/30 border-0 border-b-2 border-outline-variant px-0 transition-colors focus-within:border-tertiary">
<span class="material-symbols-outlined text-secondary text-xl pl-1">translate</span>
<input class="w-full bg-transparent border-0 focus:ring-0 py-3 text-on-surface placeholder:text-on-surface-variant/50 font-medium" id="language" name="language" placeholder="Ej: Quechua, Asháninka..." type="text"/>
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
                        Al registrarte, aceptas nuestros términos de preservación cultural y privacidad.
                    </p>
</div>
</form>
</div>
</main>
<div class="fixed bottom-0 left-0 w-full h-32 pointer-events-none overflow-hidden opacity-20">
<div class="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent"></div>
<div class="flex justify-around items-end h-full">
<span class="material-symbols-outlined text-8xl text-primary opacity-20 translate-y-8">landscape</span>
<span class="material-symbols-outlined text-9xl text-primary opacity-20 translate-y-4">park</span>
<span class="material-symbols-outlined text-8xl text-primary opacity-20 translate-y-8">water</span>
</div>
</div>
<img class="hidden" data-alt="Soft ethereal background texture of hand-woven alpaca wool with subtle geometric patterns in warm cream and earthy terracotta tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApuKlOoM2Ni7Ck1iVtbi-s-9JyVYg36Jwc68xm8nSgBNwo4a1KpBUoIw_UR31kakqM7sUoDhYHix_mRwKDMw4G732iZB-DWFZnTQStIeasnlobptGjIVwD-cO4m_4CSTOkhkwbjrJBHIalugispW7YcTae5UV-fX3PEHyxxMesWjOAI_79FEdn-ThKU-lzyfOQSU48bMgTDUS2xlk51IVfC8YQ3gLYsqBsNrxMug51z_-7RHumUnOaVIHasa1NMtA3A2P67F60"/>
  `,
  styles: `
    :host { display: block; }
  `
})
export class StudentRegistration {}
