import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RegisterStudentUseCase } from '../../core/application/auth/auth-use-cases';
import { SearchInstitutionsUseCase } from '../../core/application/institutions/institution.use-cases';
import { StudentRegistration } from './student-registration';

describe('StudentRegistration', () => {
  let fixture: ComponentFixture<StudentRegistration>;
  let component: StudentRegistration;
  let registerUseCase: { execute: ReturnType<typeof vi.fn> };
  let searchInstitutionsUseCase: { execute: ReturnType<typeof vi.fn> };
  let router: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    registerUseCase = { execute: vi.fn() };
    searchInstitutionsUseCase = { execute: vi.fn() };
    router = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [StudentRegistration],
      providers: [
        { provide: RegisterStudentUseCase, useValue: registerUseCase },
        { provide: SearchInstitutionsUseCase, useValue: searchInstitutionsUseCase },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: () => 'student'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentRegistration);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  function fillValidStepOne() {
    component.firstName = 'Ana Maria';
    component.lastName = 'Quispe Paz';
    component.email = 'ana@cultura.edu';
    component.password = 'Clave-123';
    component.confirmPassword = 'Clave-123';
  }

  function fillValidProfile() {
    fillValidStepOne();
    component.educationLevel = 'Secundaria';
    component.grade = '5to de Secundaria';
    component.institution = 'Colegio Cultura Viva';
    component.motherTongue = 'Quechua';
    component.region = 'andina';
    component.bio = 'Comparto relatos de mi comunidad';
  }

  it('valida contrasena fuerte, confirmacion y nombres sin numeros', () => {
    component.currentStep = 1;
    component.firstName = 'Ana2';
    component.lastName = 'Quispe';
    component.email = 'ana@cultura.edu';
    component.password = 'simple';
    component.confirmPassword = 'otra';

    expect(component.isPasswordStrong()).toBe(false);
    expect(component.passwordsMatch()).toBe(false);
    expect(component.isStepValid()).toBe(false);

    component.firstName = 'Ana';
    component.password = 'Clave-123';
    component.confirmPassword = 'Clave-123';

    expect(component.isStepValid()).toBe(true);
  });

  it('calcula grados por nivel educativo y reinicia grado al cambiar nivel', () => {
    component.selectLevel('Primaria');

    expect(component.getGradeOptions()).toContain('6to de Primaria');

    component.selectGrade('6to de Primaria');
    component.selectLevel('Secundaria');

    expect(component.grade).toBe('');
    expect(component.getGradeOptions()).toContain('5to de Secundaria');
  });

  it('limita la biografia a 200 palabras para proteger el formulario', () => {
    component.bio = Array.from({ length: 210 }, (_, index) => `palabra${index}`).join(' ');

    component.formatBio();

    expect(component.getWordCount()).toBe(200);
  });

  it('busca y selecciona instituciones educativas desde sugerencias', () => {
    vi.useFakeTimers();
    searchInstitutionsUseCase.execute.mockReturnValue(of([
      {
        idInstitucion: 1,
        institucionEducativa: 'Colegio Cultura Viva',
        grado: '5to de Secundaria'
      }
    ]));

    component.institution = 'Cultura';
    component.educationLevel = 'Secundaria';
    component.searchInstitutions();

    expect(searchInstitutionsUseCase.execute).not.toHaveBeenCalled();

    vi.advanceTimersByTime(351);

    expect(searchInstitutionsUseCase.execute).toHaveBeenCalledWith('Cultura', 'Secundaria');
    expect(component.institutionSuggestions).toHaveLength(1);

    component.selectInstitution(component.institutionSuggestions[0]);

    expect(component.institution).toBe('Colegio Cultura Viva');
    vi.useRealTimers();
  });

  it('evita consultar instituciones con menos de dos caracteres', () => {
    component.institutionSuggestions = [
      { idInstitucion: 1, institucionEducativa: 'Colegio previo', grado: 'Secundaria' }
    ];
    component.isInstitutionDropdownOpen = true;
    component.institution = 'C';

    component.searchInstitutions();

    expect(searchInstitutionsUseCase.execute).not.toHaveBeenCalled();
    expect(component.institutionSuggestions).toEqual([]);
    expect(component.isInstitutionDropdownOpen).toBe(false);
  });

  it('no avanza de paso si faltan campos obligatorios', () => {
    component.currentStep = 1;

    component.nextStep();

    expect(component.currentStep).toBe(1);
    expect(component.showErrors).toBe(true);
  });

  it('registra estudiante con payload completo y vuelve al login', () => {
    registerUseCase.execute.mockReturnValue(of({ id: 'user-1', email: 'ana@cultura.edu' }));
    component.currentStep = 3;
    fillValidProfile();

    component.onSubmit();

    expect(registerUseCase.execute).toHaveBeenCalledWith(expect.objectContaining({
      email: 'ana@cultura.edu',
      rol: 'estudiante',
      nombreCompleto: 'Ana Maria Quispe Paz',
      grado: '5to de Secundaria',
      institucion: 'Colegio Cultura Viva',
      lenguaMaterna: 'Quechua',
      regionCultural: 'andina'
    }));
    expect(router.navigate).toHaveBeenCalledWith(['/'], { queryParams: { role: 'student' } });
  });

  it('mantiene al usuario en pantalla cuando el backend rechaza un registro duplicado', () => {
    vi.spyOn(window, 'alert').mockImplementation(() => undefined);
    registerUseCase.execute.mockReturnValue(throwError(() => ({ status: 409, error: { message: 'Correo ya esta registrado' } })));
    component.currentStep = 3;
    fillValidProfile();

    component.onSubmit();

    expect(router.navigate).not.toHaveBeenCalled();
  });
});
