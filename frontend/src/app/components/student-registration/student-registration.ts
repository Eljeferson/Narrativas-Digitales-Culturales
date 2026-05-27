import { Component, inject, ViewChild, ElementRef, HostListener } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterStudentUseCase } from '../../core/application/auth/auth-use-cases';
import { SearchInstitutionsUseCase } from '../../core/application/institutions/institution.use-cases';
import { Institution } from '../../core/domain/models/institution.model';
import { User } from '../../core/domain/models/user.model';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [FormsModule],
  template: `
<main class="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-20 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
  
  <!-- Sidebar with logic and indicators -->
  <div class="w-full md:w-5/12 flex flex-col space-y-6 md:sticky md:top-24">
    <div class="flex items-center gap-3 mb-2">
      <img src="logo-cultura.png" alt="CulturaStory Logo" class="h-16 w-auto object-contain">
      <span class="text-2xl font-headline italic font-bold tracking-tight text-[#B59449]">Historia Cultural</span>
    </div>
    <div class="space-y-4">
      <h1 class="text-primary font-headline text-3xl md:text-5xl font-bold leading-tight">
        Inicia tu viaje como <span class="italic text-secondary">{{ registrationRole === 'teacher' ? 'Guia de Historias' : 'Tejedor de Historias' }}</span>
      </h1>
      <p class="text-on-surface-variant text-base md:text-lg leading-relaxed">
        Cada gran narrativa comienza con un autor. Cuéntanos un poco sobre ti para personalizar tu experiencia.
      </p>
    </div>
    
    <!-- Step Indicator for Desktop -->
    <div class="hidden md:flex flex-col space-y-2 mt-8">
      <div class="flex items-center gap-4 transition-all duration-300" [class.opacity-40]="currentStep < 1" [class.translate-x-2]="currentStep === 1">
        <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-2" 
             [class.bg-primary]="currentStep >= 1" [class.text-on-primary]="currentStep >= 1" [class.border-primary]="currentStep >= 1"
             [class.bg-surface-container]="currentStep < 1" [class.border-outline-variant]="currentStep < 1">1</div>
        <div class="flex flex-col">
          <span class="text-sm font-bold uppercase tracking-wider" [class.text-primary]="currentStep === 1">Datos Personales</span>
          <span class="text-xs text-on-surface-variant">Identidad básica</span>
        </div>
      </div>
      <div class="w-0.5 h-10 bg-outline-variant ml-5"></div>
      <div class="flex items-center gap-4 transition-all duration-300" [class.opacity-40]="currentStep < 2" [class.translate-x-2]="currentStep === 2">
        <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-2" 
             [class.bg-primary]="currentStep >= 2" [class.text-on-primary]="currentStep >= 2" [class.border-primary]="currentStep >= 2"
             [class.bg-surface-container]="currentStep < 2" [class.border-outline-variant]="currentStep < 2">2</div>
        <div class="flex flex-col">
          <span class="text-sm font-bold uppercase tracking-wider" [class.text-primary]="currentStep === 2">Entorno Educativo</span>
          <span class="text-xs text-on-surface-variant">Tu colegio</span>
        </div>
      </div>
      <div class="w-0.5 h-10 bg-outline-variant ml-5"></div>
      <div class="flex items-center gap-4 transition-all duration-300" [class.opacity-40]="currentStep < 3" [class.translate-x-2]="currentStep === 3">
        <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-2" 
             [class.bg-primary]="currentStep >= 3" [class.text-on-primary]="currentStep >= 3" [class.border-primary]="currentStep >= 3"
             [class.bg-surface-container]="currentStep < 3" [class.border-outline-variant]="currentStep < 3">3</div>
        <div class="flex flex-col">
          <span class="text-sm font-bold uppercase tracking-wider" [class.text-primary]="currentStep === 3">Cultura e Identidad</span>
          <span class="text-xs text-on-surface-variant">Tus raíces</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Form Container -->
  <div #formContainer class="w-full md:w-7/12 bg-surface-container-lowest p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-surface-variant/50 relative overflow-hidden min-h-[450px] flex flex-col">
    <div class="absolute top-0 right-0 opacity-5 p-4 pointer-events-none">
      <span class="material-symbols-outlined text-8xl text-primary rotate-12">texture</span>
    </div>

    <!-- Mobile Progress Bar -->
    <div class="md:hidden w-full bg-surface-container h-1.5 rounded-full mb-8 overflow-hidden">
      <div class="bg-primary h-full transition-all duration-700 ease-out" [style.width.%]="(currentStep / 3) * 100"></div>
    </div>
    
    <form (ngSubmit)="onSubmit()" class="flex-grow flex flex-col relative z-10">
      <div class="flex-grow space-y-8">
        
        <!-- STEP 1: Personal Info -->
        @if (currentStep === 1) {
          <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 class="text-xl md:text-2xl font-bold text-primary mb-2 flex items-center gap-2">
              <span class="material-symbols-outlined font-icon">person</span>
              Datos Personales
            </h2>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="group">
                <label class="block text-[10px] font-bold uppercase tracking-widest text-secondary/70 mb-1" for="firstname">Nombres</label>
                <input [(ngModel)]="firstName" name="firstname" 
                  [class.border-secondary]="showErrors && (!firstName.trim() || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(firstName))"
                  class="w-full bg-surface-variant/20 border-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 px-0 py-2.5 transition-all text-on-surface placeholder:text-on-surface-variant/40 font-medium" id="firstname" placeholder="Escribe tus nombres" type="text" required/>
                @if (showErrors && !firstName.trim()) {
                  <p class="text-[10px] text-secondary font-bold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <span class="material-symbols-outlined text-sm">priority_high</span>
                    Campo obligatorio
                  </p>
                } @else if (showErrors && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(firstName)) {
                  <p class="text-[10px] text-secondary font-bold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <span class="material-symbols-outlined text-sm">block</span>
                    Solo letras, por favor
                  </p>
                }
              </div>

              <div class="group">
                <label class="block text-[10px] font-bold uppercase tracking-widest text-secondary/70 mb-1" for="lastname">Apellidos</label>
                <input [(ngModel)]="lastName" name="lastname" 
                  [class.border-secondary]="showErrors && (!lastName.trim() || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(lastName))"
                  class="w-full bg-surface-variant/20 border-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 px-0 py-2.5 transition-all text-on-surface placeholder:text-on-surface-variant/40 font-medium" id="lastname" placeholder="Escribe tus apellidos" type="text" required/>
                @if (showErrors && !lastName.trim()) {
                  <p class="text-[10px] text-secondary font-bold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <span class="material-symbols-outlined text-sm">priority_high</span>
                    Campo obligatorio
                  </p>
                } @else if (showErrors && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(lastName)) {
                  <p class="text-[10px] text-secondary font-bold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <span class="material-symbols-outlined text-sm">block</span>
                    Solo letras, por favor
                  </p>
                }
              </div>
            </div>

            <div class="group">
              <label class="block text-[10px] font-bold uppercase tracking-widest text-secondary/70 mb-1" for="email">Correo Electrónico</label>
              <input [(ngModel)]="email" name="email" 
                [class.border-secondary]="showErrors && (!email.trim() || !email.includes('@'))"
                class="w-full bg-surface-variant/20 border-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 px-0 py-2.5 transition-all text-on-surface placeholder:text-on-surface-variant/40 font-medium" id="email" placeholder="ejemplo@correo.com" type="email" required/>
              @if (showErrors && !email.trim()) {
                <p class="text-[10px] text-secondary font-bold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                  <span class="material-symbols-outlined text-sm">priority_high</span>
                  Campo obligatorio
                </p>
              } @else if (showErrors && !email.includes('@')) {
                <p class="text-[10px] text-secondary font-bold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                  <span class="material-symbols-outlined text-sm">alternate_email</span>
                  Ingresa un correo con @
                </p>
              }
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="group">
                <label class="block text-[10px] font-bold uppercase tracking-widest text-secondary/70 mb-1" for="password">ContraseÃ±a</label>
                <input [(ngModel)]="password" name="password" 
                  [class.border-secondary]="showErrors && !isPasswordStrong()"
                  class="w-full bg-surface-variant/20 border-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 px-0 py-2.5 transition-all text-on-surface placeholder:text-on-surface-variant/40 font-medium" id="password" placeholder="MÃ­nimo 8 caracteres" type="password" required/>
                @if (showErrors && !password.trim()) {
                  <p class="text-[10px] text-secondary font-bold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <span class="material-symbols-outlined text-sm">priority_high</span>
                    Campo obligatorio
                  </p>
                } @else if (showErrors && !isPasswordStrong()) {
                  <p class="text-[10px] text-secondary font-bold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <span class="material-symbols-outlined text-sm">shield_lock</span>
                    Usa letras, nÃºmeros y un carÃ¡cter especial
                  </p>
                }
              </div>

              <div class="group">
                <label class="block text-[10px] font-bold uppercase tracking-widest text-secondary/70 mb-1" for="confirmPassword">Confirmar ContraseÃ±a</label>
                <input [(ngModel)]="confirmPassword" name="confirmPassword" 
                  [class.border-secondary]="showErrors && !passwordsMatch()"
                  class="w-full bg-surface-variant/20 border-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 px-0 py-2.5 transition-all text-on-surface placeholder:text-on-surface-variant/40 font-medium" id="confirmPassword" placeholder="Repite tu contraseÃ±a" type="password" required/>
                @if (showErrors && !confirmPassword.trim()) {
                  <p class="text-[10px] text-secondary font-bold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <span class="material-symbols-outlined text-sm">priority_high</span>
                    Confirma tu contraseÃ±a
                  </p>
                } @else if (showErrors && !passwordsMatch()) {
                  <p class="text-[10px] text-secondary font-bold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <span class="material-symbols-outlined text-sm">lock_reset</span>
                    Las contraseÃ±as no coinciden
                  </p>
                }
              </div>
            </div>
          </div>
        }

        <!-- STEP 2: Academic Info -->
        @if (currentStep === 2) {
          <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 class="text-xl md:text-2xl font-bold text-primary mb-2 flex items-center gap-2">
              <span class="material-symbols-outlined font-icon">school</span>
              Entorno Educativo
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <!-- Nivel Educativo -->
              <div class="group relative">
                <label class="block text-[10px] font-bold uppercase tracking-widest text-[#B59449] mb-1">Nivel Educativo</label>
                <div class="relative">
                  <div (click)="isLevelDropdownOpen = !isLevelDropdownOpen; $event.stopPropagation()" 
                    [class.border-secondary]="showErrors && !educationLevel"
                    class="w-full bg-white border-[1.5px] border-black rounded-[4px] px-4 py-2.5 cursor-pointer flex justify-between items-center transition-all h-[46px]">
                    <span class="font-medium" [class.text-on-surface-variant/40]="!educationLevel" [class.text-black]="educationLevel">
                      {{educationLevel || 'Selecciona nivel'}}
                    </span>
                    <span class="material-symbols-outlined text-black transition-transform duration-300" [class.rotate-180]="isLevelDropdownOpen">expand_more</span>
                  </div>

                  @if (isLevelDropdownOpen) {
                    <div class="absolute z-50 w-full mt-2 bg-white border border-[#E5D0C0] rounded-[20px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200" (click)="$event.stopPropagation()">
                      <ul class="max-h-60 overflow-y-auto py-3">
                        @for (level of ['Primaria', 'Secundaria']; track level) {
                          <li>
                            <button type="button" (click)="selectLevel(level)" class="w-full text-left px-6 py-3 hover:bg-[#FDF8F3] text-black font-bold text-base transition-all">
                              {{level}}
                            </button>
                          </li>
                        }
                      </ul>
                    </div>
                  }
                </div>
                @if (showErrors && !educationLevel) {
                  <p class="text-[10px] text-secondary font-bold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <span class="material-symbols-outlined text-sm">priority_high</span>
                    Selecciona tu nivel
                  </p>
                }
              </div>

              <!-- Grado / Año -->
              <div class="group relative">
                <label class="block text-[10px] font-bold uppercase tracking-widest text-[#B59449] mb-1">Grado / Año</label>
                <div class="relative">
                  <div (click)="educationLevel && (isGradeDropdownOpen = !isGradeDropdownOpen); $event.stopPropagation()" 
                    [class.opacity-30]="!educationLevel"
                    [class.border-secondary]="showErrors && !grade"
                    class="w-full bg-white border-[1.5px] border-black rounded-[4px] px-4 py-2.5 cursor-pointer flex justify-between items-center transition-all h-[46px]">
                    <span class="font-medium" [class.text-on-surface-variant/40]="!grade" [class.text-black]="grade">
                      {{grade || 'Selecciona grado'}}
                    </span>
                    <span class="material-symbols-outlined text-black transition-transform duration-300" [class.rotate-180]="isGradeDropdownOpen">expand_more</span>
                  </div>

                  @if (isGradeDropdownOpen) {
                    <div class="absolute z-50 w-full mt-2 bg-white border border-[#E5D0C0] rounded-[20px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200" (click)="$event.stopPropagation()">
                      <ul class="max-h-60 overflow-y-auto py-3">
                        @for (opt of getGradeOptions(); track opt) {
                          <li>
                            <button type="button" (click)="selectGrade(opt)" class="w-full text-left px-6 py-3 hover:bg-[#FDF8F3] text-black font-bold text-base transition-all">
                              {{opt}}
                            </button>
                          </li>
                        }
                      </ul>
                    </div>
                  }
                </div>
                @if (showErrors && !grade) {
                  <p class="text-[10px] text-secondary font-bold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <span class="material-symbols-outlined text-sm">priority_high</span>
                    Selecciona tu grado
                  </p>
                }
              </div>
            </div>
            <div class="group relative">
              <label class="block text-[10px] font-bold uppercase tracking-widest text-secondary/70 mb-1" for="institution">Institución Educativa</label>
              <div class="relative">
                <input [(ngModel)]="institution" name="institution" 
                  (ngModelChange)="searchInstitutions()"
                  (focus)="institution.trim().length >= 1 && (isInstitutionDropdownOpen = true)"
                  (click)="$event.stopPropagation()"
                  autocomplete="off"
                  [class.border-secondary]="showErrors && !institution.trim()"
                  class="w-full bg-surface-variant/20 border-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 px-0 py-2.5 transition-all text-on-surface placeholder:text-on-surface-variant/40 font-medium" id="institution" placeholder="Nombre de tu colegio o escuela" type="text" required/>
                
                @if (isInstitutionDropdownOpen && institutionSuggestions.length > 0) {
                  <div class="absolute z-50 w-full mt-1 bg-white border border-[#E5D0C0] rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <ul class="max-h-60 overflow-y-auto py-2">
                      @for (inst of institutionSuggestions; track inst.idInstitucion) {
                        <li>
                          <button type="button" (click)="selectInstitution(inst)" class="w-full text-left px-4 py-2.5 hover:bg-[#FDF8F3] text-black font-medium text-sm transition-all flex items-center gap-2">
                            <span class="material-symbols-outlined text-secondary text-base">school</span>
                            <div class="flex flex-col">
                              <span>{{inst.institucionEducativa}}</span>
                              <span class="text-[10px] text-on-surface-variant uppercase tracking-tighter opacity-70">{{inst.grado}}</span>
                            </div>
                          </button>
                        </li>
                      }
                    </ul>
                  </div>
                }
              </div>
              @if (showErrors && !institution.trim()) {
                <p class="text-[10px] text-secondary font-bold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                  <span class="material-symbols-outlined text-sm">priority_high</span>
                  Campo obligatorio
                </p>
              }
            </div>
          </div>
        }

        <!-- STEP 3: Cultural/Identity Info -->
        @if (currentStep === 3) {
          <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 class="text-xl md:text-2xl font-bold text-primary mb-2 flex items-center gap-2">
              <span class="material-symbols-outlined font-icon">diversity_3</span>
              Cultura e Identidad
            </h1>

            <!-- Avatar Selection Carousel -->
            <div class="group/carousel bg-surface-variant/5 p-4 sm:p-6 rounded-3xl border border-outline-variant/10 shadow-inner overflow-hidden relative">
              <label class="block text-[10px] font-bold uppercase tracking-widest text-secondary/70 mb-4 text-center">Escoge tu identidad de Autor</label>
              
              <div class="relative px-8">
                <!-- Navigation Buttons (More Discreet) -->
                <button type="button" (click)="scrollAvatars(-1)" class="absolute left-0 top-1/2 -translate-y-10 z-20 w-8 h-8 rounded-full bg-surface-container/40 text-secondary border border-outline-variant/20 flex items-center justify-center hover:bg-secondary hover:text-on-secondary transition-all opacity-40 group-hover/carousel:opacity-100">
                  <span class="material-symbols-outlined text-base">arrow_back_ios_new</span>
                </button>
                
                <button type="button" (click)="scrollAvatars(1)" class="absolute right-0 top-1/2 -translate-y-10 z-20 w-8 h-8 rounded-full bg-surface-container/40 text-secondary border border-outline-variant/20 flex items-center justify-center hover:bg-secondary hover:text-on-secondary transition-all opacity-40 group-hover/carousel:opacity-100">
                  <span class="material-symbols-outlined text-base">arrow_forward_ios</span>
                </button>

                <!-- Carousel Container -->
                <div #avatarScrollContainer class="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  @for (avatar of avatars; track avatar) {
                    <div class="flex-none w-[42%] sm:w-[30%] snap-center text-center">
                      <button type="button" (click)="fotoPerfilUrl = avatar" 
                        class="relative aspect-square w-full rounded-2xl overflow-hidden border-2 transition-all hover:scale-105 active:scale-95 shadow-sm flex items-center justify-center bg-surface-container"
                        [class.border-tertiary]="fotoPerfilUrl === avatar"
                        [class.border-transparent]="fotoPerfilUrl !== avatar"
                        [class.ring-4]="fotoPerfilUrl === avatar"
                        [class.ring-tertiary/10]="fotoPerfilUrl === avatar">
                        <img [src]="avatar" class="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all" alt="Avatar option">
                        @if (fotoPerfilUrl === avatar) {
                          <div class="absolute inset-0 bg-tertiary/20 flex items-center justify-center backdrop-blur-[1px]">
                            <div class="bg-surface-container-lowest/90 rounded-full p-1 shadow-sm border border-tertiary/20">
                              <span class="material-symbols-outlined text-tertiary text-2xl font-bold">check</span>
                            </div>
                          </div>
                        }
                      </button>
                    </div>
                  }
                </div>
              </div>

              @if (showErrors && !fotoPerfilUrl) {
                <p class="text-[10px] text-secondary font-bold mt-2 text-center italic animate-in fade-in slide-in-from-top-1 opacity-70">
                  Debes elegir un avatar para completar tu perfil
                </p>
              }
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <!-- Lengua Materna -->
              <div class="group relative">
                <label class="block text-[10px] font-bold uppercase tracking-widest text-[#B59449] mb-1">Lengua Materna</label>
                <div class="relative">
                  <div class="flex items-center w-full bg-white border-[1.5px] border-black rounded-[4px] h-[46px] overflow-hidden">
                    <input [(ngModel)]="motherTongue" 
                      (focus)="isLanguageDropdownOpen = true"
                      (input)="isLanguageDropdownOpen = true"
                      (click)="$event.stopPropagation()"
                      name="motherTongue" 
                      autocomplete="off"
                      [class.border-secondary]="showErrors && !motherTongue.trim()"
                      class="flex-grow bg-transparent border-0 focus:ring-0 px-4 py-2 text-black font-medium placeholder:text-on-surface-variant/40" id="motherTongue" placeholder="Castellano, Quechua..." type="text" required/>
                    
                    <button type="button" (click)="toggleLanguageDropdown($event)" class="px-3 flex items-center justify-center text-black">
                      <span class="material-symbols-outlined transition-transform duration-300" [class.rotate-180]="isLanguageDropdownOpen">expand_more</span>
                    </button>
                  </div>

                  @if (isLanguageDropdownOpen) {
                    <div class="absolute z-50 w-full mt-2 bg-white border border-[#E5D0C0] rounded-[20px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200" (click)="$event.stopPropagation()">
                      <ul class="max-h-60 overflow-y-auto py-4">
                        @for (lang of getFilteredLanguages(); track lang) {
                          <li>
                            <button type="button" (click)="selectLanguage(lang)" class="w-full text-left px-6 py-3 hover:bg-[#FDF8F3] text-black font-bold text-base transition-all">
                              {{lang}}
                            </button>
                          </li>
                        }
                        @if (getFilteredLanguages().length === 0) {
                          <li class="px-6 py-4 text-center">
                            <p class="text-xs text-on-surface-variant italic mb-1">No se encontró "{{motherTongue}}"</p>
                            <button type="button" (click)="isLanguageDropdownOpen = false" class="text-[10px] font-bold text-primary uppercase tracking-wider hover:underline">Mantener escrito</button>
                          </li>
                        }
                      </ul>
                    </div>
                  }
                </div>
                @if (showErrors && !motherTongue.trim()) {
                  <p class="text-[10px] text-secondary font-bold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <span class="material-symbols-outlined text-sm">priority_high</span>
                    Campo obligatorio
                  </p>
                }
              </div>

              <!-- Región Cultural -->
              <div class="group relative">
                <label class="block text-[10px] font-bold uppercase tracking-widest text-[#B59449] mb-1">Región Cultural</label>
                <div class="relative">
                  <div (click)="isRegionDropdownOpen = !isRegionDropdownOpen; $event.stopPropagation()" 
                    [class.border-secondary]="showErrors && !region"
                    class="w-full bg-white border-[1.5px] border-black rounded-[4px] px-4 py-2.5 cursor-pointer flex justify-between items-center transition-all h-[46px]">
                    <span class="font-medium" [class.text-on-surface-variant/40]="!region" [class.text-black]="region">
                      {{region || 'Selecciona región'}}
                    </span>
                    <span class="material-symbols-outlined text-black transition-transform duration-300" [class.rotate-180]="isRegionDropdownOpen">expand_more</span>
                  </div>

                  @if (isRegionDropdownOpen) {
                    <div class="absolute z-50 w-full mt-2 bg-white border border-[#E5D0C0] rounded-[20px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200" (click)="$event.stopPropagation()">
                      <ul class="max-h-60 overflow-y-auto py-4">
                        @for (reg of ['andina', 'amazónica', 'afroperuana', 'costeña']; track reg) {
                          <li>
                            <button type="button" (click)="selectRegion(reg)" class="w-full text-left px-6 py-3 hover:bg-[#FDF8F3] text-black font-bold text-base transition-all">
                              {{reg}}
                            </button>
                          </li>
                        }
                      </ul>
                    </div>
                  }
                </div>
                @if (showErrors && !region) {
                  <p class="text-[10px] text-secondary font-bold mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <span class="material-symbols-outlined text-sm">priority_high</span>
                    Campo obligatorio
                  </p>
                }
              </div>
            </div>

            <div class="group">
              <label class="block text-[10px] font-bold uppercase tracking-widest text-secondary/70 mb-1" for="bio">Biografía / Sobre ti</label>
              <textarea [(ngModel)]="bio" name="bio" rows="2" 
                (ngModelChange)="formatBio()"
                [class.border-secondary]="showErrors && !bio.trim()"
                class="w-full bg-surface-variant/20 border-0 border-b-2 border-outline-variant focus:border-tertiary focus:ring-0 px-0 py-2 transition-all text-on-surface placeholder:text-on-surface-variant/40 font-medium resize-none" id="bio" placeholder="Comparte un poco de tu historia..." required></textarea>
              <div class="flex justify-between items-center mt-1.5">
                <div>
                  @if (showErrors && !bio.trim()) {
                    <p class="text-[10px] text-secondary font-bold flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                      <span class="material-symbols-outlined text-sm">priority_high</span>
                      Campo obligatorio
                    </p>
                  }
                </div>
                <p class="text-[10px] font-bold uppercase tracking-widest transition-colors" 
                   [class.text-secondary]="getWordCount() >= 180"
                   [class.text-on-surface-variant/50]="getWordCount() < 180">
                  {{ getWordCount() }} / 200 palabras
                </p>
              </div>
            </div>
          </div>
        }
      </div>

      <div class="pt-8 md:pt-12 flex flex-col sm:flex-row gap-3 md:gap-4 items-center mt-auto">
        @if (currentStep > 1) {
          <button type="button" (click)="prevStep()" class="w-full sm:flex-1 bg-surface-container text-on-surface py-3.5 px-6 rounded-xl font-bold transition-all border border-outline-variant hover:bg-surface-variant flex items-center justify-center gap-2 group">
            <span class="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Anterior
          </button>
        }
        
        @if (currentStep < 3) {
          <button type="button" 
            (click)="nextStep()" 
            class="w-full sm:flex-[2] bg-primary text-on-primary py-3.5 px-6 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group">
            Siguiente Paso
            <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        } @else {
          <button 
            class="w-full sm:flex-[2] group relative bg-tertiary text-on-tertiary py-4 px-8 rounded-xl font-bold text-lg shadow-lg shadow-tertiary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 overflow-hidden" 
            type="submit">
            <span class="relative z-10">{{ registrationRole === 'teacher' ? 'Crear perfil docente' : 'Crear mi perfil' }}</span>
            <span class="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">auto_stories</span>
            <div class="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-all"></div>
          </button>
        }
      </div>
      
      <p class="text-center mt-6 text-on-surface-variant text-[10px] font-bold tracking-widest uppercase opacity-50">
        Paso {{currentStep}} de 3
      </p>
    </form>
  </div>
</main>
<div class="fixed bottom-0 left-0 w-full h-32 pointer-events-none overflow-hidden opacity-20 -z-10">
  <div class="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent"></div>
  <div class="flex justify-around items-end h-full">
    <span class="material-symbols-outlined text-8xl text-primary opacity-20 translate-y-8">landscape</span>
    <span class="material-symbols-outlined text-9xl text-primary opacity-20 translate-y-4">park</span>
    <span class="material-symbols-outlined text-8xl text-primary opacity-20 translate-y-8">water</span>
  </div>
</div>
  `,
  styles: `:host { display: block; }`
})
export class StudentRegistration {
  @ViewChild('formContainer') formContainer!: ElementRef;
  @ViewChild('avatarScrollContainer') avatarScrollContainer!: ElementRef;
  private registerUseCase = inject(RegisterStudentUseCase);
  private searchInstitutionsUseCase = inject(SearchInstitutionsUseCase);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentStep = 1;
  showErrors = false;
  registrationRole: 'student' | 'teacher' = 'student';

  // Lista de Avatares de Supabase
  avatars = [
    'https://cpvnxrrgwpprdzctjshz.supabase.co/storage/v1/object/public/Porfile/imagen1.jpg',
    'https://cpvnxrrgwpprdzctjshz.supabase.co/storage/v1/object/public/Porfile/imagen2.jpg',
    'https://cpvnxrrgwpprdzctjshz.supabase.co/storage/v1/object/public/Porfile/imagen3.jpg',
    'https://cpvnxrrgwpprdzctjshz.supabase.co/storage/v1/object/public/Porfile/imagen4.jpg',
    'https://cpvnxrrgwpprdzctjshz.supabase.co/storage/v1/object/public/Porfile/imagen5.jpg',
    'https://cpvnxrrgwpprdzctjshz.supabase.co/storage/v1/object/public/Porfile/imagen6.jpg',
    'https://cpvnxrrgwpprdzctjshz.supabase.co/storage/v1/object/public/Porfile/imagen7.jpg',
    'https://cpvnxrrgwpprdzctjshz.supabase.co/storage/v1/object/public/Porfile/imagen8.jpg',
    'https://cpvnxrrgwpprdzctjshz.supabase.co/storage/v1/object/public/Porfile/imagen9.jpg',
    'https://cpvnxrrgwpprdzctjshz.supabase.co/storage/v1/object/public/Porfile/imagen10.jpg',
    'https://cpvnxrrgwpprdzctjshz.supabase.co/storage/v1/object/public/Porfile/imagen11.jpg',
    'https://cpvnxrrgwpprdzctjshz.supabase.co/storage/v1/object/public/Porfile/imagen12.jpg',
    'https://cpvnxrrgwpprdzctjshz.supabase.co/storage/v1/object/public/Porfile/imagen13.jpg',
  ];

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  educationLevel = ''; // Primaria o Secundaria
  grade = '';
  region = '';
  institution = '';
  motherTongue = '';
  bio = '';
  fotoPerfilUrl = '';

  // Estados de dropdowns
  isLevelDropdownOpen = false;
  isGradeDropdownOpen = false;
  isRegionDropdownOpen = false;
  isLanguageDropdownOpen = false;
  isInstitutionDropdownOpen = false;
  languages = ['Castellano', 'Quechua', 'Aimara'];
  institutionSuggestions: Institution[] = [];
  private readonly passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  constructor() {
    const requestedRole = this.route.snapshot.queryParamMap.get('role');
    this.registrationRole = requestedRole === 'teacher' ? 'teacher' : 'student';
  }

  // Opciones de grados según el nivel
  getGradeOptions() {
    if (this.educationLevel === 'Primaria') {
      return ['1ro de Primaria', '2do de Primaria', '3er de Primaria', '4to de Primaria', '5to de Primaria', '6to de Primaria'];
    }
    if (this.educationLevel === 'Secundaria') {
      return ['1ro de Secundaria', '2do de Secundaria', '3er de Secundaria', '4to de Secundaria', '5to de Secundaria'];
    }
    return [];
  }

  // Lógica del dropdown de lenguas
  getFilteredLanguages() {
    if (!this.motherTongue.trim()) return this.languages;
    return this.languages.filter(l => 
      l.toLowerCase().includes(this.motherTongue.toLowerCase())
    );
  }

  // Métodos de selección
  selectLevel(level: string) {
    this.educationLevel = level;
    this.grade = '';
    this.isLevelDropdownOpen = false;
  }

  selectGrade(grade: string) {
    this.grade = grade;
    this.isGradeDropdownOpen = false;
  }

  selectRegion(region: string) {
    this.region = region;
    this.isRegionDropdownOpen = false;
  }

  selectLanguage(lang: string) {
    this.motherTongue = lang;
    this.isLanguageDropdownOpen = false;
  }

  toggleLanguageDropdown(event: Event) {
    event.stopPropagation();
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  @HostListener('document:click')
  closeDropdowns() {
    this.isLevelDropdownOpen = false;
    this.isGradeDropdownOpen = false;
    this.isRegionDropdownOpen = false;
    this.isLanguageDropdownOpen = false;
    this.isInstitutionDropdownOpen = false;
  }

  // Lógica de búsqueda de instituciones
  searchInstitutions() {
    if (this.institution.trim().length < 1) {
      this.institutionSuggestions = [];
      this.isInstitutionDropdownOpen = false;
      return;
    }

    this.searchInstitutionsUseCase.execute(this.institution, this.educationLevel).subscribe({
      next: (suggestions) => {
        this.institutionSuggestions = suggestions;
        this.isInstitutionDropdownOpen = suggestions.length > 0;
      },
      error: (err) => {
        console.error('Error buscando instituciones:', err);
        this.isInstitutionDropdownOpen = false;
      }
    });
  }

  selectInstitution(inst: Institution) {
    this.institution = inst.institucionEducativa;
    this.isInstitutionDropdownOpen = false;
  }

  formatBio() {
    if (!this.bio) return;

    // Capitalizar cada palabra
    const words = this.bio.split(' ');
    this.bio = words.map(word => {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    }).join(' ');

    // Limitar a 200 palabras
    const wordList = this.bio.trim().split(/\s+/);
    if (wordList.length > 200) {
      this.bio = wordList.slice(0, 200).join(' ');
    }
  }

  getWordCount(): number {
    if (!this.bio.trim()) return 0;
    return this.bio.trim().split(/\s+/).length;
  }

  isPasswordStrong(): boolean {
    return this.passwordPattern.test(this.password);
  }

  passwordsMatch(): boolean {
    return !!this.password && this.password === this.confirmPassword;
  }

  isStepValid(): boolean {
    const lettersOnly = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    
    if (this.currentStep === 1) {
      return !!this.firstName.trim() && lettersOnly.test(this.firstName) &&
             !!this.lastName.trim() && lettersOnly.test(this.lastName) &&
             !!this.email.trim() && this.email.includes('@') &&
             this.isPasswordStrong() &&
             this.passwordsMatch();
    }
    if (this.currentStep === 2) {
      return !!this.educationLevel && !!this.grade && !!this.institution.trim();
    }
    if (this.currentStep === 3) {
      return !!this.motherTongue.trim() && !!this.region && !!this.bio.trim();
    }
    return true;
  }

  nextStep() {
    this.showErrors = true;
    if (this.isStepValid() && this.currentStep < 3) {
      this.currentStep++;
      this.showErrors = false;
      this.scrollToFormTop();
    }
  }

  prevStep() {
    this.currentStep--;
    this.showErrors = false;
    this.scrollToFormTop();
  }

  private scrollToFormTop() {
    if (this.formContainer) {
      this.formContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollAvatars(direction: number) {
    if (this.avatarScrollContainer) {
      const container = this.avatarScrollContainer.nativeElement;
      const scrollAmount = container.clientWidth * 0.8;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      let newScroll = container.scrollLeft + (direction * scrollAmount);
      
      // Lógica de Bucle: Si llegamos al final, volvemos al inicio y viceversa
      if (direction > 0 && container.scrollLeft >= maxScroll - 5) {
        newScroll = 0;
      } else if (direction < 0 && container.scrollLeft <= 5) {
        newScroll = maxScroll;
      }
      
      container.scrollTo({ left: newScroll, behavior: 'smooth' });
    }
  }

  private getRegistrationErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const backendMessage = error.error?.message;

      if (error.status === 409) {
        return backendMessage || 'Ese correo ya esta registrado. Inicia sesion o usa otro correo.';
      }

      if (typeof backendMessage === 'string' && backendMessage.toLowerCase().includes('correo ya esta registrado')) {
        return backendMessage;
      }
    }

    return 'Hubo un error al registrar el perfil. Por favor intenta de nuevo.';
  }

  onSubmit() {
    this.showErrors = true;
    if (!this.isStepValid()) return;

    const fullName = `${this.firstName} ${this.lastName}`.trim();
    console.log(`[StudentRegistration] Registrando a ${fullName}`);

    // Construimos el payload exactamente como lo solicita el backend
    const user: Partial<User> = {
      email: this.email,
      password: this.password,
      rol: this.registrationRole === 'teacher' ? 'docente' : 'estudiante',
      nombreCompleto: fullName,
      grado: this.grade, // El grado ya incluye el nivel (ej: "1ro de Primaria")
      institucion: this.institution,
      lenguaMaterna: this.motherTongue,
      regionCultural: this.region,
      bio: this.bio,
      fotoPerfilUrl: this.fotoPerfilUrl,
      narrativasPublicadas: 0
    };

    console.log('[StudentRegistration] Payload:', JSON.stringify(user, null, 2));

    this.registerUseCase.execute(user).subscribe({
      next: (saved) => {
        console.log('Usuario registrado con éxito:', saved);
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        this.router.navigate(['/'], { queryParams: { role: this.registrationRole } });
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert(this.getRegistrationErrorMessage(err));
      }
    });
  }
}
