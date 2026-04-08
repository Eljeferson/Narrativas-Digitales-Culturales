import { Component } from '@angular/core';

@Component({
  selector: 'app-reproductor-narrativa-tts',
  standalone: true,
  imports: [],
  template: `
<!-- TopNavBar -->
<nav class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-[#fff9ed] dark:bg-[#1a1614] font-headline text-[#56423c] dark:text-[#eae2cd]">
<div class="text-2xl font-bold font-serif text-[#99411c] dark:text-[#b85932]">CulturaStory</div>
<div class="hidden md:flex gap-8 items-center">
<a class="text-[#56423c] dark:text-[#eae2cd] hover:text-[#99411c] transition-colors" href="#">Dashboard</a>
<a class="text-[#56423c] dark:text-[#eae2cd] hover:text-[#99411c] transition-colors" href="#">Narrativas</a>
<a class="text-[#56423c] dark:text-[#eae2cd] hover:text-[#99411c] transition-colors" href="#">Storyboards</a>
</div>
<div class="flex items-center gap-4">
<button class="material-symbols-outlined text-[#99411c] hover:bg-[#f5edd8] dark:hover:bg-[#3d332d] p-2 rounded-full transition-colors">notifications</button>
<button class="material-symbols-outlined text-[#99411c] hover:bg-[#f5edd8] dark:hover:bg-[#3d332d] p-2 rounded-full transition-colors">settings</button>
<div class="w-8 h-8 rounded-full overflow-hidden border border-[#99411c]/20">
<img alt="User avatar" class="w-full h-full object-cover" data-alt="professional headshot of a person with friendly expression in soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo5ozfOxkIQKAgTqhbpFAzIkrh9RbR9UgwqzPeSyXjuCVtjv30MmBDlMOxWd6j57fUjVXEV-BCXoHiLlcqRCKHEW-QiGCZeF4_CCduJKwDZOOdxawPddoXHiSfSzUk5sM2SIa-DKfFBWjFMd_f6HdMhOdjxhXYQ0ghrVXGFJfXfPmeTj1jElRfu6Rn5WiQf-piyaojgxuFN0ZQ9ug3QSpSR5jthFTSuxTQ1RUofpep8EsD59s2xJEvVex1dPGboxeq-XDi4XfVB3G2"/>
</div>
</div>
</nav>
<main class="pt-24 pb-28 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
<!-- Left Column: Audio Player Content -->
<div class="lg:col-span-8 flex flex-col gap-8">
<!-- Player Section -->
<section class="bg-surface-container-low rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center md:items-start">
<!-- Background decorative element -->
<div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
<!-- Cover Art -->
<div class="relative w-64 h-64 shrink-0 rounded-2xl overflow-hidden shadow-2xl rotate-[-2deg] transition-transform hover:rotate-0 duration-500">
<img alt="Cover Art" class="w-full h-full object-cover" data-alt="hand-drawn artisanal illustration of ancient andean patterns with rich terracotta and gold tones, organic textures" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATJ7FI7RebYRvfAHvPt4LYFQe0uJMEyPmlNMcBXQb9OApWRpg4cm57glNm8Ss3JmjQXRincIGLFJmunUEi05PGUYHGmA3k__2MR63_VNJYRCrTOHk_dvWkT7HEx-Gqch-mqAs6hmXhOZX-F2wyzpVr2H9Fo4_IJromatdcCFsjoAepa2u5zb8dOPLCbAk2boh6pEgTm3hLNO37mNLVkaa6K1i-jbzNUZnomLWSIYD45gzENgYMCIhQyzY_bAOgwRA7J-uTzoCtls3D"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
</div>
<!-- Info & Primary Controls -->
<div class="flex-1 text-center md:text-left">
<span class="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-3 tracking-wider">REGIÓN ANDINA</span>
<h1 class="font-headline text-4xl md:text-5xl text-on-surface mb-2 font-bold tracking-tight">El Eco de los Apus</h1>
<p class="text-on-surface-variant font-medium mb-8">Narrado por el Sistema CulturaStory AI</p>
<!-- Audio Interface -->
<div class="space-y-6">
<!-- Controls Row -->
<div class="flex items-center justify-center md:justify-start gap-6">
<button class="material-symbols-outlined text-3xl text-on-surface-variant hover:text-primary transition-colors">replay_10</button>
<button class="w-16 h-16 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all">
<span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</button>
<button class="material-symbols-outlined text-3xl text-on-surface-variant hover:text-primary transition-colors">forward_10</button>
</div>
<!-- Progress Bar -->
<div class="space-y-2">
<div class="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden relative group cursor-pointer">
<div class="absolute top-0 left-0 h-full w-1/3 bg-primary rounded-full"></div>
<div class="absolute top-1/2 left-1/3 -translate-y-1/2 w-4 h-4 bg-primary border-4 border-surface-container-lowest rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
</div>
<div class="flex justify-between text-xs font-medium text-on-surface-variant">
<span>14:20</span>
<span>42:15</span>
</div>
</div>
<!-- Secondary Options -->
<div class="flex flex-wrap items-center justify-center md:justify-start gap-4">
<div class="flex items-center gap-2 bg-surface-container-highest px-4 py-2 rounded-xl">
<span class="material-symbols-outlined text-lg text-primary">record_voice_over</span>
<select class="bg-transparent border-none focus:ring-0 text-sm font-medium text-on-surface py-0 pr-8 pl-0">
<option>Voz masculina andina</option>
<option>Voz femenina serrana</option>
<option>Voz ancestral profunda</option>
</select>
</div>
<div class="flex items-center gap-2 bg-surface-container-highest px-4 py-2 rounded-xl">
<span class="material-symbols-outlined text-lg text-primary">speed</span>
<select class="bg-transparent border-none focus:ring-0 text-sm font-medium text-on-surface py-0 pr-8 pl-0">
<option>1.0x</option>
<option>0.75x</option>
<option>1.25x</option>
<option>1.5x</option>
</select>
</div>
</div>
</div>
</div>
</section>
<!-- Transcription Section -->
<section class="bg-surface-container-low rounded-[32px] p-8 md:p-12">
<div class="flex items-center justify-between mb-8">
<h2 class="font-headline text-2xl font-bold text-on-surface">Transcripción en Vivo</h2>
<div class="flex gap-2">
<button class="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/5 rounded-xl transition-colors text-sm font-bold">
<span class="material-symbols-outlined text-xl">download</span>
                            Descargar
                        </button>
<button class="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/5 rounded-xl transition-colors text-sm font-bold">
<span class="material-symbols-outlined text-xl">share</span>
                            Compartir
                        </button>
</div>
</div>
<div class="space-y-6 text-xl md:text-2xl font-headline leading-relaxed text-on-surface-variant/60">
<p>
                        "Cuando el primer rayo de sol toca la cumbre del Ausangate, los pobladores dicen que las <span class="bg-secondary-fixed text-on-secondary-fixed px-1 rounded-sm">montañas comienzan a respirar</span>. No es un aliento humano, sino un susurro antiguo que atraviesa los siglos."
                    </p>
<p>
                        Este fenómeno, conocido localmente como 'El Despertar de los Apus', marca el inicio de la temporada de siembra. Las familias se reúnen en silencio, ofreciendo hojas de coca a la tierra, mientras el viento arrastra historias de héroes olvidados y deidades que habitan en la piedra.
                    </p>
<p>
                        Para el habitante de estas tierras, la historia no es algo que se lea en libros, sino algo que se siente en los huesos y se escucha en el eco del valle. Cada roca tiene un nombre, cada arroyo un destino...
                    </p>
</div>
<div class="mt-12 flex justify-center">
<button class="w-12 h-12 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center animate-pulse">
<span class="material-symbols-outlined">auto_awesome</span>
</button>
</div>
</section>
</div>
<!-- Right Column: Sidebar -->
<aside class="lg:col-span-4 space-y-8">
<div class="bg-surface-container-high rounded-[32px] p-8 border-r border-[#99411c]/15">
<h3 class="font-headline text-xl font-bold text-on-surface mb-6">Otras narrativas de este autor</h3>
<div class="space-y-6">
<!-- Item 1 -->
<div class="group flex gap-4 cursor-pointer">
<div class="w-16 h-16 shrink-0 rounded-xl overflow-hidden shadow-sm transition-transform group-hover:scale-105">
<img alt="Thumbnail" class="w-full h-full object-cover" data-alt="vibrant sunset over a colonial coastal town with terracotta roofs and deep orange sky" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjKyJ4uwgrvqL5OjZSQz3R-BY7xALlTnaaT7kKJjHITJfuWYoWDRfJHB0_cFeiX-PpKutwv9zj28X8IVpW_3N623LHZbTdqkUQ3247bahGHjK5dSFeSNypSHAI5NSj2Y6XwkXn1gekf4hK8CGtFCIUFUOK32MCrkrtXokJhXhKOGlN3YU03Tu2XO7E32qAx1oRBuMhBn9IHBgKygmttPmEVAwNyC8TMHBuSVy27PqtNJ476xUqwp7CEFz6XfZ_WR0bWzU8EoZsnMXQ"/>
</div>
<div class="flex-1">
<h4 class="font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">Las Sombras de Chan Chan</h4>
<p class="text-xs text-on-surface-variant mt-1">Costa Central • 28 min</p>
</div>
</div>
<!-- Item 2 -->
<div class="group flex gap-4 cursor-pointer">
<div class="w-16 h-16 shrink-0 rounded-xl overflow-hidden shadow-sm transition-transform group-hover:scale-105">
<img alt="Thumbnail" class="w-full h-full object-cover" data-alt="dense tropical rainforest with misty atmosphere and exotic birds in flight, oil painting style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9h8RIqyBAiXd4WUz5S7Ts8rHEQkpAV7-LTPtCX49SkSH8mwdo0YyjHX4GXSZaiAjon8YQGhi-Gssphu9a050Rljs9-XPddQkBxsiCn3u0A3VUymEaQoRKgZjJUr2gZjLtcbDycDXcZ73_25J9g1d-9ifBqWuh5zQ-6EdchjnVrvNoRiJHZxECve_6zoDyqK0kV1ywt28GlBs2iCLEIOfD8YWjsgUCsZJdV0vtV26U4kS55mUDLYR5KgVXTYyhFnDwiXJ7YQLbw19W"/>
</div>
<div class="flex-1">
<h4 class="font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">Secretos de la Selva Alta</h4>
<p class="text-xs text-on-surface-variant mt-1">Amazonía • 35 min</p>
</div>
</div>
<!-- Item 3 -->
<div class="group flex gap-4 cursor-pointer">
<div class="w-16 h-16 shrink-0 rounded-xl overflow-hidden shadow-sm transition-transform group-hover:scale-105">
<img alt="Thumbnail" class="w-full h-full object-cover" data-alt="mystical night sky over high altitude desert with clear constellations and milky way" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe7xaUHC8BSv01-BtZhpE1UZcy989yDPg6jH26A-ytNAP-HfP8h-WBF9lYZi1ZSWcw5PUTQyiXF2mgeQY_6bW4YvgJFaztMd3EWiu8VXVhzX8QUbrreZLF-ZEpN29yaPFJAb1w9oU-JJjbELkZ-JYUAwHszYMukv4a2MHQdgKG7bdOZQs1aYYCtU6oynN9LHYBfgfOnVwu-_lXyevvl1spbLBiyvnVJDxYNIOEE9qsQpTJ1L3Lh7PYeCPV15SHymQSPGdvOafmkbX2"/>
</div>
<div class="flex-1">
<h4 class="font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">Bajo el Cielo de Atacama</h4>
<p class="text-xs text-on-surface-variant mt-1">Desierto • 22 min</p>
</div>
</div>
</div>
<button class="w-full mt-8 py-4 bg-surface-container-highest border border-primary/10 rounded-2xl text-primary font-bold hover:bg-primary/5 transition-colors">
                    Ver catálogo completo
                </button>
</div>
<!-- AI Insight Card -->
<div class="bg-tertiary-container text-on-tertiary-container rounded-[32px] p-8 relative overflow-hidden">
<div class="absolute -bottom-8 -right-8 opacity-20 transform rotate-12">
<span class="material-symbols-outlined text-8xl" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
</div>
<h3 class="font-bold text-lg mb-4 flex items-center gap-2">
<span class="material-symbols-outlined text-tertiary-fixed">psychology</span>
                    Contexto AI
                </h3>
<p class="text-sm leading-relaxed opacity-90">
                    He adaptado el tono de la voz para reflejar la altitud y la solemnidad de la cultura quechua, utilizando pausas rítmicas inspiradas en la música de viento andina.
                </p>
</div>
</aside>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-6 pb-4 bg-[#fff9ed]/80 dark:bg-[#1a1614]/80 backdrop-blur-lg border-t border-[#99411c]/10 shadow-[0_-10px_40px_rgba(153,65,28,0.05)] rounded-t-2xl">
<button class="flex flex-col items-center justify-center text-[#6b5b4e] dark:text-[#eae2cd] px-4 py-1 hover:text-[#99411c]">
<span class="material-symbols-outlined">menu_book</span>
<span class="text-[10px] font-sans font-semibold">Library</span>
</button>
<button class="flex flex-col items-center justify-center bg-[#09685b] text-white rounded-xl px-4 py-1 scale-95 duration-200">
<span class="material-symbols-outlined">play_circle</span>
<span class="text-[10px] font-sans font-semibold">Player</span>
</button>
<button class="flex flex-col items-center justify-center text-[#6b5b4e] dark:text-[#eae2cd] px-4 py-1 hover:text-[#99411c]">
<span class="material-symbols-outlined">edit_note</span>
<span class="text-[10px] font-sans font-semibold">Editor</span>
</button>
<button class="flex flex-col items-center justify-center text-[#6b5b4e] dark:text-[#eae2cd] px-4 py-1 hover:text-[#99411c]">
<span class="material-symbols-outlined">auto_awesome</span>
<span class="text-[10px] font-sans font-semibold">AI Assistant</span>
</button>
</nav>
  `,
  styles: `
    :host { display: block; }
  `
})
export class ReproductorNarrativaTts {}
