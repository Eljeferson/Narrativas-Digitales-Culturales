import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-creativo-estudiante',
  standalone: true,
  imports: [],
  template: `
<!-- TopNavBar -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-[#fff9ed] dark:bg-[#1a1614] font-serif text-[#56423c] dark:text-[#eae2cd]">
<div class="text-2xl font-bold font-serif text-[#99411c] dark:text-[#b85932]">CulturaStory</div>
<nav class="hidden md:flex gap-8 items-center h-full">
<a class="text-[#56423c] dark:text-[#eae2cd] hover:text-[#99411c] transition-colors h-full flex items-center px-2" href="#">Dashboard</a>
<a class="text-[#56423c] dark:text-[#eae2cd] hover:text-[#99411c] transition-colors h-full flex items-center px-2" href="#">Narrativas</a>
<a class="text-[#56423c] dark:text-[#eae2cd] hover:text-[#99411c] transition-colors h-full flex items-center px-2" href="#">Storyboards</a>
</nav>
<div class="flex items-center gap-4">
<span class="material-symbols-outlined cursor-pointer hover:bg-[#f5edd8] p-2 rounded-full transition-colors">notifications</span>
<span class="material-symbols-outlined cursor-pointer hover:bg-[#f5edd8] p-2 rounded-full transition-colors">settings</span>
<img alt="User avatar" class="w-8 h-8 rounded-full border-2 border-primary" data-alt="close-up portrait of a smiling young indigenous man with bright warm eyes and a friendly expression, soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeWKkwZpDOoCALLyhPdlhoORy1FXLQXz4rPhGXtwBEALdlGxrKcLQFak1I6Tdxbz_c5kga34RlecVyc-EUk_-WBjhQ82sY5JeBukdSKuAIn4RCVPd0n9sRlTYqOviRz3xWZYnb6gc9UENzh1Uo6s5HcmyezOALH4J4A3VAN4wl1XO9HDPmaoQo2ru_nRhpRBUG_XPtvvgAtTb1JGuMJFNQSKEjzMYw_KlOU39SIdv5qaATNJTnjQyjn0XutHMjj1T7JgBb0j0-z2S5"/>
</div>
</header>
<!-- SideNavBar -->
<aside class="fixed left-0 top-16 h-[calc(100vh-64px)] z-40 flex flex-col p-4 w-64 bg-[#fbf3de] dark:bg-[#1a1614] border-r border-[#99411c]/15 hidden md:flex">
<div class="flex items-center gap-3 mb-8 px-2">
<div class="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center text-white">
<span class="material-symbols-outlined">auto_stories</span>
</div>
<div>
<h2 class="text-lg font-serif text-[#99411c]">Project Alpha</h2>
<p class="text-xs text-on-surface-variant">Cultural Narrative</p>
</div>
</div>
<nav class="flex flex-col gap-2 flex-grow">
<a class="text-[#56423c] dark:text-[#eae2cd] px-4 py-2 hover:bg-[#eae2cd]/50 transition-colors flex items-center gap-3 rounded-lg" href="#">
<span class="material-symbols-outlined">dashboard</span> General
            </a>
<a class="text-[#56423c] dark:text-[#eae2cd] px-4 py-2 hover:bg-[#eae2cd]/50 transition-colors flex items-center gap-3 rounded-lg" href="#">
<span class="material-symbols-outlined">analytics</span> Student Progress
            </a>
<a class="text-[#56423c] dark:text-[#eae2cd] px-4 py-2 hover:bg-[#eae2cd]/50 transition-colors flex items-center gap-3 rounded-lg" href="#">
<span class="material-symbols-outlined">auto_awesome</span> IA Metrics
            </a>
</nav>
<button class="mt-auto bg-primary text-white py-3 rounded-xl font-bold hover:opacity-90 active:scale-[0.98] transition-transform">
            New Narrative
        </button>
</aside>
<!-- Main Content Canvas -->
<main class="md:ml-64 pt-24 pb-32 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
<!-- Header: Author Profile -->
<section class="relative mb-16">
<div class="bg-surface-container-low rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 shadow-[0_20px_50px_rgba(153,65,28,0.06)]">
<div class="relative">
<div class="w-40 h-40 md:w-56 md:h-56 rounded-[3rem] overflow-hidden rotate-3 shadow-xl">
<img alt="Perfil del estudiante" class="w-full h-full object-cover" data-alt="Artistic portrait of a young male writer in a sunny creative studio filled with traditional crafts and modern technology" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZJ7ngqfdo-X8b1_1jj01DYIi3BNNsmMWIOfHgt6rKJz5my9V6-ntDR-pzd4ctGLtHTVVMsRQmTJEPRsEyoYVRhobSLMFitIIAQDkqBQUhRONFaiGGHwg5dZvyxniM1rP_lIXPugtAchBlfEmiptL7sB2yKTm5kNLh-uEnnUmshmdK8VQ39-oE88cpTK9HGuldYhZ4AJQfYZW7HwzLiKSnWtYuosysE7SS1ysIwgVFJ-h-q-6Xv4ogJBJmkmEAnMu-ccBijvzNwBBz"/>
</div>
<div class="absolute -bottom-4 -right-4 bg-tertiary text-white p-3 rounded-2xl shadow-lg">
<span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
</div>
</div>
<div class="flex-grow text-center md:text-left">
<h1 class="font-headline text-5xl md:text-7xl font-bold text-primary mb-4 leading-none">Mateo Huamán</h1>
<div class="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
<span class="flex items-center gap-2 px-4 py-1.5 bg-surface-container-highest rounded-full text-sm font-medium text-on-surface-variant">
<span class="material-symbols-outlined text-lg">location_on</span> Cusco, Perú
                        </span>
<span class="flex items-center gap-2 px-4 py-1.5 bg-surface-container-highest rounded-full text-sm font-medium text-on-surface-variant">
<span class="material-symbols-outlined text-lg">translate</span> Quechua (Lengua Materna)
                        </span>
</div>
<div class="grid grid-cols-3 gap-8 pt-6 border-t border-primary/10">
<div>
<p class="text-3xl font-headline font-bold text-primary leading-none">12</p>
<p class="text-xs uppercase tracking-wider text-on-surface-variant font-bold">Narrativas</p>
</div>
<div>
<p class="text-3xl font-headline font-bold text-primary leading-none">8.4k</p>
<p class="text-xs uppercase tracking-wider text-on-surface-variant font-bold">Palabras</p>
</div>
<div>
<p class="text-3xl font-headline font-bold text-primary leading-none">45m</p>
<p class="text-xs uppercase tracking-wider text-on-surface-variant font-bold">Oralidad</p>
</div>
</div>
</div>
</div>
</section>
<!-- Bento Grid for Achievements and Strengths -->
<section class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
<!-- IA Narrative Strengths -->
<div class="lg:col-span-2 bg-tertiary-container text-on-tertiary-container rounded-[2rem] p-8 flex flex-col justify-between">
<div>
<div class="flex items-center gap-3 mb-6">
<span class="material-symbols-outlined text-3xl">psychology</span>
<h3 class="text-2xl font-headline font-bold">Fortalezas Narrativas (IA)</h3>
</div>
<div class="flex flex-wrap gap-3">
<div class="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl flex-grow">
<span class="material-symbols-outlined mb-2">auto_awesome</span>
<h4 class="font-bold text-lg">Preservación Lingüística</h4>
<p class="text-sm opacity-90">Uso excepcional de metáforas en quechua integradas al relato.</p>
</div>
<div class="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl flex-grow">
<span class="material-symbols-outlined mb-2">history_edu</span>
<h4 class="font-bold text-lg">Estructura Mítica</h4>
<p class="text-sm opacity-90">Dominio de arcos narrativos inspirados en la tradición oral andina.</p>
</div>
</div>
</div>
<p class="mt-8 text-xs font-medium uppercase tracking-[0.2em] opacity-70">Análisis Generado por CulturaStory AI v2.4</p>
</div>
<!-- Badges Section -->
<div class="bg-surface-container-high rounded-[2rem] p-8">
<h3 class="text-2xl font-headline font-bold text-primary mb-6">Insignias</h3>
<div class="grid grid-cols-2 gap-4">
<div class="flex flex-col items-center text-center p-4 bg-surface rounded-2xl">
<div class="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container mb-2">
<span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">public</span>
</div>
<span class="text-xs font-bold leading-tight">Narrador Regional</span>
</div>
<div class="flex flex-col items-center text-center p-4 bg-surface rounded-2xl">
<div class="w-16 h-16 rounded-full bg-primary-fixed-dim flex items-center justify-center text-on-primary-fixed mb-2">
<span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">mic</span>
</div>
<span class="text-xs font-bold leading-tight">Relato Oral</span>
</div>
<div class="flex flex-col items-center text-center p-4 bg-surface rounded-2xl">
<div class="w-16 h-16 rounded-full bg-tertiary-fixed-dim flex items-center justify-center text-on-tertiary-fixed-variant mb-2">
<span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">menu_book</span>
</div>
<span class="text-xs font-bold leading-tight">Autor Prolífico</span>
</div>
<div class="flex flex-col items-center text-center p-4 bg-surface rounded-2xl opacity-40">
<div class="w-16 h-16 rounded-full bg-outline-variant flex items-center justify-center text-on-surface-variant mb-2">
<span class="material-symbols-outlined text-3xl">lock</span>
</div>
<span class="text-xs font-bold leading-tight">Heredero Cultural</span>
</div>
</div>
</div>
</section>
<!-- Timeline: Actividad Creativa -->
<section class="mb-16">
<h3 class="text-3xl font-headline font-bold text-primary mb-8">Trayectoria Creativa</h3>
<div class="flex overflow-x-auto gap-8 pb-8 no-scrollbar -mx-4 px-4 snap-x">
<div class="flex-shrink-0 w-80 snap-center">
<div class="relative pl-8 border-l-2 border-primary/20 pb-4">
<div class="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-surface-bright"></div>
<p class="text-xs font-bold text-primary mb-1">HOY</p>
<div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/15">
<h4 class="font-bold mb-2">El Retorno de los Apus</h4>
<p class="text-sm text-on-surface-variant line-clamp-2">Inició el tercer capítulo utilizando diálogos en quechua y español.</p>
</div>
</div>
</div>
<div class="flex-shrink-0 w-80 snap-center">
<div class="relative pl-8 border-l-2 border-primary/20 pb-4">
<div class="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary/40 ring-4 ring-surface-bright"></div>
<p class="text-xs font-bold text-on-surface-variant mb-1">AYER</p>
<div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/15">
<h4 class="font-bold mb-2">Sesión de Oralidad</h4>
<p class="text-sm text-on-surface-variant line-clamp-2">Grabó 15 minutos de narración sobre las leyendas del Ausangate.</p>
</div>
</div>
</div>
<div class="flex-shrink-0 w-80 snap-center">
<div class="relative pl-8 border-l-2 border-primary/20 pb-4">
<div class="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary/40 ring-4 ring-surface-bright"></div>
<p class="text-xs font-bold text-on-surface-variant mb-1">12 OCT</p>
<div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/15">
<h4 class="font-bold mb-2">Narrativa Finalizada</h4>
<p class="text-sm text-on-surface-variant line-clamp-2">"El Viento y la Quena" alcanzó las 2,500 palabras.</p>
</div>
</div>
</div>
<div class="flex-shrink-0 w-80 snap-center">
<div class="relative pl-8 border-l-2 border-primary/20 pb-4">
<div class="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary/40 ring-4 ring-surface-bright"></div>
<p class="text-xs font-bold text-on-surface-variant mb-1">05 OCT</p>
<div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/15">
<h4 class="font-bold mb-2">Nuevo Logro</h4>
<p class="text-sm text-on-surface-variant line-clamp-2">Desbloqueó la insignia 'Narrador Regional'.</p>
</div>
</div>
</div>
</div>
</section>
<!-- Galería de Narrativas -->
<section>
<div class="flex justify-between items-end mb-8">
<div>
<h3 class="text-3xl font-headline font-bold text-primary leading-tight">Obras del Autor</h3>
<p class="text-on-surface-variant">Explora el universo creativo de Mateo</p>
</div>
<button class="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    Ver todas <span class="material-symbols-outlined">arrow_forward</span>
</button>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<!-- Card 1 -->
<div class="group bg-surface-container-low rounded-3xl overflow-hidden hover:shadow-xl transition-all border border-outline-variant/10">
<div class="h-48 overflow-hidden relative">
<img alt="Preview de IA" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Cinematic wide shot of majestic snowy Andean mountains under a clear blue sky, mystical and epic atmosphere" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmL_ogbv0tthKXhb5-vn9sIXpYquOA7pXncdrcdqWdlVsCqSJ8WAIeo8T1cHm_cC26_uE4uN9PGXnzVRxP9xTm0rmIKa6GElGvLGRLzUtK5hyW9CYcmyV0fluCleGk1Wd8xf-y4cn7169sda2yGks-pLXvwAu33rRRogW5LsrAImSZiheyGrF_3FPH5mXuh4L_pWA2TmNk2ezPwy0ei4MSdX2fucxTvzbNsQuIRc19Rdh5A976VhebAb2d98Ezx4eQlEdrU6nDeAI4"/>
<div class="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-tighter">Ficción</div>
</div>
<div class="p-6">
<h4 class="font-headline font-bold text-xl mb-2">El Viento y la Quena</h4>
<div class="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">schedule</span> 5 min</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">auto_stories</span> 2.5k pal.</span>
</div>
</div>
</div>
<!-- Card 2 -->
<div class="group bg-surface-container-low rounded-3xl overflow-hidden hover:shadow-xl transition-all border border-outline-variant/10">
<div class="h-48 overflow-hidden relative">
<img alt="Preview de IA" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Close up of traditional Peruvian textile patterns with vibrant reds, yellows, and oranges in soft lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNXSVWAmrzv2TJ2gCVbVoTq0sA_dEwJKz4-OrdkCUIvRs6mt5QRf4EbBySOc9U5cxwjNsUFCTfnpkxcyxrgRuwDAowOZQTx4M0TqgLcvWJImLhHBT1dg6BC6tzlyLJfoLgmwTdEbf7Yju1xWpTzPJp7V6S36qZhG6g6XkEaKbbu1zzk19kN_hDht-LyoJonqiB3mXvm3FOg4cBluzig8pTFOCEsDNNOORT18stBeW4DucEAowWvA20HVjfiHUfH26XykYZFYdC3rIb"/>
<div class="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-tighter">Tradición</div>
</div>
<div class="p-6">
<h4 class="font-headline font-bold text-xl mb-2">Hilos de la Memoria</h4>
<div class="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">schedule</span> 8 min</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">auto_stories</span> 4.1k pal.</span>
</div>
</div>
</div>
<!-- Card 3 -->
<div class="group bg-surface-container-low rounded-3xl overflow-hidden hover:shadow-xl transition-all border border-outline-variant/10">
<div class="h-48 overflow-hidden relative">
<img alt="Preview de IA" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Night sky over a dark valley with bright milky way and glowing stars, high-end digital art style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu1O5mTWjnidKkiMvDnlI8l1iMmCTwdhj3CBFMnSRSvtuzs7wr5xLwCvUGqO9ZPGKUKMQCKt-EP8QEdUG2yucYjv3VYfB7Ki6SUWSljLlikvNQrxZggCN58--0MQv_CJfDruBdp9xD_zzGWxdf1ni4IJ1-L9aUFiMTZ4aKJJoPnR0Gk_KCg3V48rqrDwPpNdPE_qT-kCV1LPQD8jatRelFfZrT76GNmSlG8rkmpWW13K8ESS0DRFrjMi_kakC_ki94pHzZT43U7Luo"/>
<div class="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-tighter">Mito</div>
</div>
<div class="p-6">
<h4 class="font-headline font-bold text-xl mb-2">Estrellas del Ausangate</h4>
<div class="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">schedule</span> 3 min</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">auto_stories</span> 1.2k pal.</span>
</div>
</div>
</div>
<!-- Card 4 -->
<div class="group bg-surface-container-low rounded-3xl overflow-hidden hover:shadow-xl transition-all border border-outline-variant/10">
<div class="h-48 overflow-hidden relative flex items-center justify-center bg-primary/5">
<span class="material-symbols-outlined text-5xl text-primary/20">add_circle</span>
</div>
<div class="p-6">
<h4 class="font-headline font-bold text-xl mb-2 text-primary/40 italic">Nueva Historia...</h4>
<div class="flex items-center gap-3 text-xs text-on-surface-variant font-medium opacity-40">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">schedule</span> -- min</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">auto_stories</span> -- pal.</span>
</div>
</div>
</div>
</div>
</section>
</main>
<!-- BottomNavBar (Mobile Only) -->
<nav class="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-6 pb-4 bg-[#fff9ed]/80 dark:bg-[#1a1614]/80 backdrop-blur-lg border-t border-[#99411c]/10 shadow-[0_-10px_40px_rgba(153,65,28,0.05)] rounded-t-2xl">
<a class="flex flex-col items-center justify-center text-[#6b5b4e] dark:text-[#eae2cd] px-4 py-1 hover:text-[#99411c]" href="#">
<span class="material-symbols-outlined">play_circle</span>
<span class="text-[10px] font-sans font-semibold uppercase">Player</span>
</a>
<a class="flex flex-col items-center justify-center text-[#6b5b4e] dark:text-[#eae2cd] px-4 py-1 hover:text-[#99411c]" href="#">
<span class="material-symbols-outlined">edit_note</span>
<span class="text-[10px] font-sans font-semibold uppercase">Editor</span>
</a>
<a class="flex flex-col items-center justify-center text-[#6b5b4e] dark:text-[#eae2cd] px-4 py-1 hover:text-[#99411c]" href="#">
<span class="material-symbols-outlined">auto_awesome</span>
<span class="text-[10px] font-sans font-semibold uppercase">Assistant</span>
</a>
<a class="flex flex-col items-center justify-center bg-[#09685b] text-white rounded-xl px-4 py-1 scale-95 duration-200" href="#">
<span class="material-symbols-outlined">menu_book</span>
<span class="text-[10px] font-sans font-semibold uppercase">Library</span>
</a>
</nav>
  `,
  styles: `
    :host { display: block; }
  `
})
export class PerfilCreativoEstudiante {}
