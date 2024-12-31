import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import {
  addService,
  getIcons,
  getServiceData,
  updateService,
} from '../../store/service/service.action';
import {
  selectServicesData,
  selectServicesIcons,
  selectServicesIconsLoading,
  selectServicesLoading,
} from '../../store/service/service.selector';
import { Icons, IServiceDto } from '../../modals/service.modal';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent {
  servicesForm: FormGroup;
  loading$: Observable<boolean>;
  iconsLoading$: Observable<boolean>;
  services$: Observable<IServiceDto>;
  icons$: Observable<Icons[]>;
  editMode: boolean = false;
  serviceId: string;
  selectedIndex: number = -1;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getServiceData());
    this.store.dispatch(getIcons({ iconName: 'programming' }));
    this.loading$ = this.store.select(selectServicesLoading);
    this.services$ = this.store.select(selectServicesData);
    this.icons$ = this.store.select(selectServicesIcons);
    this.iconsLoading$ = this.store.select(selectServicesIconsLoading);

    this.servicesForm = this.fb.group({
      description: ['', Validators.required],
      services: this.fb.array([]),
    });
    this.initializeForm();

    this.services$.pipe(take(2)).subscribe((data) => {
      if (data) {
        this.serviceId = data.id;
        this.editMode = true;
        this.servicesForm.patchValue({ description: data.description });
        const servicesArray = this.servicesForm.get('services') as FormArray;
        servicesArray.clear();
        data.services.forEach((service) => {
          servicesArray.push(
            this.fb.group({
              title: [service.title, Validators.required],
              description: [service.description, [Validators.required]],
              icon: [service.icon, [Validators.required]],
              svg: [service.svg ?? '', [Validators.required]],
            }),
          );
        });
      }
    });
  }

  get servicesArray() {
    return this.servicesForm.get('services') as FormArray;
  }

  onIconsChange(iconName: string, index: number) {
    this.selectedIndex = index;
    if (iconName) {
      this.store.dispatch(getIcons({ iconName }));
    } else {
      this.store.dispatch(getIcons({ iconName: 'programming' }));
    }
  }

  onIconSelect(ev: any, services: AbstractControl) {
    services.get('svg').setValue(ev);
  }

  initializeForm() {
    const defaultServices = Array.from({ length: 2 }, () =>
      this.fb.group({
        title: ['', Validators.required],
        description: ['', [Validators.required]],
        icon: ['', [Validators.required]],
        svg: ['', Validators.required],
      }),
    );

    const servicesFormArray = this.servicesForm.get('services') as FormArray;
    defaultServices.forEach((service) => servicesFormArray.push(service));
    this.servicesForm.updateValueAndValidity();
  }

  addServiceField() {
    const control = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      icon: ['', [Validators.required]],
      svg: ['', Validators.required],
    });

    (<FormArray>this.servicesForm.get('services')).push(control);
    this.servicesForm.updateValueAndValidity();
  }

  removeControl(index: number) {
    const formArray = this.servicesForm.get('services') as FormArray;
    formArray.removeAt(index);
    this.servicesForm.updateValueAndValidity();
  }

  onSubmit() {
    const payload = this.servicesForm.value;
    if (this.editMode) {
      this.store.dispatch(updateService({ payload, id: this.serviceId }));
    } else {
      this.store.dispatch(addService({ payload }));
    }
  }
}
