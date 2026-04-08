import { Component } from '@angular/core';

@Component({
  selector: 'app-storyboard-digital-ia',
  standalone: true,
  imports: [],
  template: `
<!-- Top Navigation Anchor -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-[#fff9ed] dark:bg-[#1a1614] border-b border-primary/5">
<div class="flex items-center gap-8">
<span class="text-2xl font-bold font-headline text-primary dark:text-[#b85932]">CulturaStory</span>
<nav class="hidden md:flex gap-6">
<a class="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Dashboard</a>
<a class="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Narrativas</a>
<a class="text-primary border-b-2 border-primary font-bold text-sm" href="#">Storyboards</a>
</nav>
</div>
<div class="flex items-center gap-4">
<div class="relative hidden sm:block">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
<input class="pl-10 pr-4 py-1.5 rounded-full bg-surface-container-low border-none focus:ring-1 focus:ring-primary text-sm w-64" placeholder="Buscar narrativa..." type="text"/>
</div>
<button class="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
<span class="material-symbols-outlined">notifications</span>
</button>
<div class="w-8 h-8 rounded-full overflow-hidden border border-primary/20">
<img class="w-full h-full object-cover" data-alt="Portrait of a creative professional in warm natural light, cinematic photography" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ8NvHyaNfcJfdusbmk2vENnbKQ_3JayGWxrD2uaJIvRbYTuTNZRhguRy55Oy2P6WOqaCbfWMFfclebhU2FoEQY20UcrB6rcUbogJozDxpnnDpSf4fstUWl8sNUv2zcHVopPGjit1QdIwnqb_CozVDeCqQMGNdx0WdZibU8DIKXKurvciOlp1cPTgleG7mheweIw00AuJI9QwGgAoad5n7dJg_-TVArtTGEIAs9GVSDXuw5qc-IqGvw30uAa5wKYxh4Hm-A8jigE6p"/>
</div>
</div>
</header>
<!-- Main Canvas -->
<main class="pt-24 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
<!-- Header Panel -->
<section class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
<div>
<span class="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">Proyecto Actual</span>
<h1 class="text-4xl md:text-5xl font-headline font-bold text-on-surface leading-tight">El Eco de los Abuelos</h1>
<p class="text-on-surface-variant mt-2 max-w-xl">Visualizando la tradición oral de la Sierra Maestra a través de una lente surrealista contemporánea.</p>
</div>
<div class="flex gap-3">
<button class="px-6 py-3 rounded-xl bg-surface-container-high text-on-surface-variant font-semibold hover:bg-surface-container-highest transition-colors flex items-center gap-2">
<span class="material-symbols-outlined text-xl">ios_share</span>
<span>Exportar PDF</span>
</button>
<button class="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center gap-2">
<span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">save</span>
<span>Guardar Cambios</span>
</button>
</div>
</section>
<!-- Storyboard Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
<!-- Vignette 1 -->
<article class="group relative bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 torn-edge border border-outline-variant/15">
<div class="grid-paper absolute inset-0 opacity-20 pointer-events-none rounded-2xl"></div>
<div class="relative z-10">
<div class="flex justify-between items-center mb-4">
<span class="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary font-headline font-bold text-xl">01</span>
<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors" title="Editar">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="p-2 hover:bg-error/10 hover:text-error rounded-lg text-on-surface-variant transition-colors" title="Eliminar">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
<div class="aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-outline-variant/10 bg-surface-container-low">
<img class="w-full h-full object-cover mix-blend-multiply opacity-90" data-alt="Digital watercolor illustration of an elderly indigenous man telling stories around a campfire, ethereal smoke forming spirit shapes, warm earth tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_TXwM8zpjtnGI6tZP5pBMQ8DWCp8QohoCx-HA663ItZfJcXYNJ8li7Cm8a_yZqpcgmU8Q87XUB83ZUddDT1TMVdj_Z6nGp_ZOApCAAVJel2JdmPyZKE3MmE_xLk7PDwJZpPx9lCR7nyzeJyLygzwSLJ2dFEfkd3QEL0JDejMkPhv8iHwYaHQW4TSk8o__NUtHMMqlphusgLTYfYA5PTZnqM8HujjDKg1Zd0DtoZbCMQvG822D1p2C4-HBQp6iFrAA4LwJhL8xrGRB"/>
</div>
<div class="space-y-4">
<div class="p-4 bg-surface-container/50 rounded-xl border-b border-primary/10">
<p class="text-sm font-medium text-on-surface leading-relaxed">
                                "El primer fuego fue encendido por el aliento de los jaguares." Un plano medio que capture la textura de la piel curtida y el brillo en los ojos del narrador.
                            </p>
</div>
<button class="w-full py-2.5 rounded-lg border border-tertiary/20 text-tertiary font-bold text-sm flex items-center justify-center gap-2 hover:bg-tertiary/5 transition-colors">
<span class="material-symbols-outlined text-lg">auto_awesome</span>
                            Regenerar IA
                        </button>
</div>
</div>
</article>
<!-- Vignette 2 (State: Generating) -->
<article class="group relative bg-surface-container-lowest p-5 rounded-2xl shadow-sm torn-edge border border-outline-variant/15 overflow-hidden">
<div class="grid-paper absolute inset-0 opacity-20 pointer-events-none rounded-2xl"></div>
<div class="relative z-10">
<div class="flex justify-between items-center mb-4">
<span class="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary font-headline font-bold text-xl">02</span>
</div>
<div class="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-surface-container flex flex-col items-center justify-center gap-4 border border-dashed border-primary/20">
<div class="relative">
<div class="w-16 h-16 rounded-full border-4 border-tertiary/20 border-t-tertiary animate-spin"></div>
<span class="material-symbols-outlined absolute inset-0 flex items-center justify-center text-tertiary" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
</div>
<p class="text-xs font-bold text-tertiary tracking-widest uppercase animate-pulse">Tejiendo narrativa visual...</p>
</div>
<div class="space-y-4">
<div class="p-4 bg-surface-container/30 rounded-xl">
<p class="text-sm italic text-on-surface-variant leading-relaxed">
                                Transición fluida hacia la espesura del bosque, donde las raíces parecen extremidades en movimiento...
                            </p>
</div>
<div class="h-10 w-full bg-surface-container-low rounded-lg animate-pulse"></div>
</div>
</div>
</article>
<!-- Vignette 3 -->
<article class="group relative bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 torn-edge border border-outline-variant/15">
<div class="grid-paper absolute inset-0 opacity-20 pointer-events-none rounded-2xl"></div>
<div class="relative z-10">
<div class="flex justify-between items-center mb-4">
<span class="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary font-headline font-bold text-xl">03</span>
<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="p-2 hover:bg-error/10 hover:text-error rounded-lg text-on-surface-variant transition-colors">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
<div class="aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-outline-variant/10 bg-surface-container-low">
<img class="w-full h-full object-cover mix-blend-multiply opacity-90" data-alt="Engraving style illustration of deep mountain peaks shrouded in mystical fog, dramatic shadows and intricate line work, sepia tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0vmbKAAHNQrCMYiQYbOI4MWQmHesVRUtt-5leL2_4GBQgI_lfVO9DoW_9CYY6QG0Jf3qmFq8zbBYJr8XahAd6MqXpXbmz-z42PRTVSEFKtSRRIymifIxG_-2UEcpVdG-sjypN73a7ugBQjGr2w2JsPAyZGry3_75zwbaSQxz5JjpzHrATnfFjiOH16YR5MHiymGnCVVvbR5hF7-Ajww3H_Pz-jB93ectOk5Pn4pxrRO7PSo20Xzc8h4o_b7KiMGRAR6yM-KYjg8Zi"/>
</div>
<div class="space-y-4">
<div class="p-4 bg-surface-container/50 rounded-xl border-b border-primary/10">
<p class="text-sm font-medium text-on-surface leading-relaxed">
                                Gran plano general de las montañas al amanecer. El estilo debe evocar los grabados antiguos en madera de las crónicas coloniales.
                            </p>
</div>
<button class="w-full py-2.5 rounded-lg border border-tertiary/20 text-tertiary font-bold text-sm flex items-center justify-center gap-2 hover:bg-tertiary/5 transition-colors">
<span class="material-symbols-outlined text-lg">auto_awesome</span>
                            Regenerar IA
                        </button>
</div>
</div>
</article>
<!-- Vignette 4 (Empty/Add State) -->
<button class="group relative h-full min-h-[400px] bg-surface-container-low/50 p-5 rounded-2xl border-2 border-dashed border-primary/10 hover:border-primary/40 hover:bg-surface-container-low transition-all flex flex-col items-center justify-center gap-4">
<div class="w-16 h-16 rounded-full bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-4xl">add</span>
</div>
<div class="text-center">
<p class="font-headline font-bold text-xl text-on-surface">Nueva Viñeta</p>
<p class="text-sm text-on-surface-variant mt-1">Define la siguiente escena</p>
</div>
</button>
</div>
</main>
<!-- Floating Action Button -->
<button class="fixed bottom-28 right-8 w-16 h-16 rounded-2xl bg-primary text-on-primary shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 transition-transform z-40 group">
<span class="material-symbols-outlined text-3xl">add</span>
<span class="absolute right-full mr-4 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Agregar viñeta
        </span>
</button>
<!-- Bottom Navigation Shell (Mobile Only) -->
<nav class="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-6 pb-4 bg-[#fff9ed]/80 dark:bg-[#1a1614]/80 backdrop-blur-lg border-t border-primary/10 shadow-[0_-10px_40px_rgba(153,65,28,0.05)] rounded-t-2xl">
<button class="flex flex-col items-center justify-center text-[#6b5b4e] dark:text-[#eae2cd] px-4 py-1 hover:text-primary transition-colors">
<span class="material-symbols-outlined">play_circle</span>
<span class="text-[10px] font-sans font-semibold">Player</span>
</button>
<button class="flex flex-col items-center justify-center bg-tertiary text-white rounded-xl px-4 py-1 scale-95">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">edit_note</span>
<span class="text-[10px] font-sans font-semibold">Editor</span>
</button>
<button class="flex flex-col items-center justify-center text-[#6b5b4e] dark:text-[#eae2cd] px-4 py-1 hover:text-primary transition-colors">
<span class="material-symbols-outlined">auto_awesome</span>
<span class="text-[10px] font-sans font-semibold">AI Assistant</span>
</button>
<button class="flex flex-col items-center justify-center text-[#6b5b4e] dark:text-[#eae2cd] px-4 py-1 hover:text-primary transition-colors">
<span class="material-symbols-outlined">menu_book</span>
<span class="text-[10px] font-sans font-semibold">Library</span>
</button>
</nav>
<!-- Side Decoration (The Chronicler Theme) -->
<div class="fixed top-0 left-0 h-full w-2 bg-gradient-to-b from-primary/10 via-tertiary/10 to-primary/10 pointer-events-none hidden lg:block"></div>
<div class="fixed top-0 right-0 h-full w-2 bg-gradient-to-b from-primary/10 via-tertiary/10 to-primary/10 pointer-events-none hidden lg:block"></div>
  `,
  styles: `
    :host { display: block; }
  `
})
export class StoryboardDigitalIa {}
