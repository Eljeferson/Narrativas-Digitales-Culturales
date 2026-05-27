import { Component } from '@angular/core';

@Component({
  selector: 'app-grabacion-voz-stt',
  standalone: true,
  imports: [],
  template: `
<!-- Screen Wrapper (Inmersive Dark Mode / Digital Bonfire) -->
<div class="relative w-full h-full flex flex-col items-center justify-between p-6 md:p-12">
<!-- Background Ambient Elements -->
<div class="absolute inset-0 z-0 opacity-20 pointer-events-none">
<div class="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[120px] rounded-full"></div>
<div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-tertiary/10 blur-[100px] rounded-full"></div>
</div>
<!-- Top Header Navigation (CulturaStory - Suppressed main nav for focus) -->
<header class="w-full max-w-6xl z-10 flex justify-between items-center">
<div class="flex flex-col">
<span class="font-headline text-3xl font-bold text-primary-container tracking-tight">CulturaStory</span>
<span class="text-xs uppercase tracking-widest text-on-surface-variant opacity-60">Crónica de Voz</span>
</div>
<button class="flex items-center gap-2 px-4 py-2 text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined text-xl">close</span>
<span class="text-sm font-medium">Finalizar sesión</span>
</button>
</header>
<!-- Main Content Area: Recording Interface -->
<main class="w-full max-w-4xl flex flex-col items-center justify-center gap-12 z-10">
<!-- Timer and Microphone State -->
<div class="text-center">
<div class="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md mb-4 border border-white/5">
<span class="relative flex h-3 w-3">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
<span class="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
</span>
<span class="text-sm font-semibold tracking-wider text-primary-container uppercase">Grabando ahora</span>
</div>
<h1 class="font-headline text-7xl md:text-8xl font-medium tracking-tighter text-on-primary-container">
                    03:42
                </h1>
</div>
<!-- Central Orbe Visualizer -->
<div class="relative group cursor-pointer">
<!-- Outer Pulse Rings -->
<div class="absolute inset-0 scale-150 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
<!-- Main Core -->
<div class="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
<!-- Glassmorphic Layers -->
<div class="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-primary-container/20 border border-white/10 orb-glow"></div>
<!-- Dynamic Waveform Placeholder (Visual Only) -->
<div class="absolute inset-0 flex items-center justify-center gap-1 px-8">
<div class="w-1.5 h-16 bg-primary-container/60 rounded-full animate-pulse" style="animation-delay: 0.1s"></div>
<div class="w-1.5 h-24 bg-primary-container/80 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
<div class="w-1.5 h-32 bg-primary rounded-full animate-pulse" style="animation-delay: 0.3s"></div>
<div class="w-1.5 h-44 bg-white/80 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
<div class="w-1.5 h-32 bg-primary rounded-full animate-pulse" style="animation-delay: 0.5s"></div>
<div class="w-1.5 h-24 bg-primary-container/80 rounded-full animate-pulse" style="animation-delay: 0.6s"></div>
<div class="w-1.5 h-16 bg-primary-container/60 rounded-full animate-pulse" style="animation-delay: 0.7s"></div>
</div>
<!-- Centered Control Icon -->
<div class="z-20 w-24 h-24 rounded-full bg-on-primary flex items-center justify-center shadow-2xl active:scale-90 transition-transform duration-150">
<span class="material-symbols-outlined text-primary text-5xl" style="font-variation-settings: 'FILL' 1;">pause</span>
</div>
</div>
</div>
<!-- Real-time Transcription Preview -->
<div class="w-full bg-[#2a2420]/50 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 border border-white/5 relative overflow-hidden group">
<div class="absolute top-0 right-0 p-4 opacity-40 group-hover:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-tertiary-fixed-dim">auto_awesome</span>
</div>
<p class="font-headline text-2xl md:text-3xl leading-relaxed text-[#eae2cd] opacity-90 transition-all duration-1000">
                    "...y entonces mi abuelo recordó aquel mercado en Oaxaca. Decía que el olor a copal y canela flotaba en el aire como una promesa. <span class="text-primary-container">Esa mañana, el tiempo parecía haberse detenido entre los puestos de textiles..."</span>
<span class="inline-block w-0.5 h-8 bg-primary animate-pulse ml-1 align-middle"></span>
</p>
<!-- Audio Preview Bar (Appears when paused) -->
<div class="mt-8 pt-8 border-t border-white/5 flex items-center gap-6">
<button class="w-12 h-12 rounded-full bg-surface-container-highest/20 flex items-center justify-center text-primary-container">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</button>
<div class="flex-1 h-1.5 bg-white/10 rounded-full relative">
<div class="absolute top-0 left-0 h-full w-[65%] bg-primary rounded-full"></div>
<div class="absolute top-1/2 left-[65%] -translate-y-1/2 w-4 h-4 rounded-full bg-on-primary shadow-lg border-4 border-primary"></div>
</div>
<span class="text-xs font-medium opacity-50 tracking-widest uppercase">02:30 / 03:42</span>
</div>
</div>
</main>
<!-- Bottom Action Bar & Privacy -->
<footer class="w-full max-w-4xl z-10 flex flex-col gap-6">
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<button class="flex items-center justify-center gap-3 bg-tertiary text-white py-5 rounded-2xl font-bold text-lg hover:bg-tertiary-container transition-all active:scale-[0.98]">
<span class="material-symbols-outlined">auto_stories</span>
                    Insertar en mi narrativa
                </button>
<button class="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-[#fbf3de] py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all active:scale-[0.98]">
<span class="material-symbols-outlined">refresh</span>
                    Volver a grabar
                </button>
</div>
<div class="flex items-center justify-center gap-2 opacity-40 text-[10px] uppercase tracking-[0.2em]">
<span class="material-symbols-outlined text-sm">lock</span>
                Su privacidad es sagrada. Las grabaciones se procesan localmente y se cifran de extremo a extremo.
            </div>
</footer>
</div>
<!-- Background Decorative Image (Asymmetric Bleed) -->
<div class="fixed top-0 right-0 w-1/3 h-full z-0 opacity-10 mix-blend-overlay">
<img class="w-full h-full object-cover grayscale invert" data-alt="Close up of aged vintage paper textures with subtle ink stains and organic fiber patterns in warm sepia tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4299zD4yYIZA_JD_rboJQAk3LsyyjORBwbzuja4Y38ZtELPr1VmCnitbjQABPS1p80faT0a6apyUh2QybByAcyVgavSx99SryfmJlCsTbIbiBTu94XG_nofVm1GzlKPhrC4xEtX-Zap_YJGJJfkQcPAz5SntRZ0QZ0iQ4wEtCMD__Fg24NgNnFrl7biY3zWkf82cIyJ_E4ARQzOhHIYvUhHBvzvPz6KbwlQZX2t2zKB4FMCeDvonpKexQzS2j-zaWaM-pQtxXB8Ye"/>
</div>
<!-- Bottom Navigation Component (Suppressed per logic for transactional focused task) -->
<!-- Not rendering BottomNavBar or SideNav to prioritize the immersive focus of recording -->
  `,
  styles: `
    :host { display: block; }
  `
})
export class GrabacionVozStt {}
