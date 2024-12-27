import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getAboutData,
  postAboutData,
  updateAboutData,
} from '../../store/about/about.action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { phoneRegex } from '../../regex';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { IAboutDto } from '../../modals/about.modal';
import {
  selectUserAboutData,
  selectUserAboutLoading,
} from '../../store/about/about.selector';
import { IUser } from '../../modals/user.modal';
import { selectAuthUser } from '../../store/auth/auth.selector';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  aboutForm: FormGroup;
  aboutData$: Observable<IAboutDto>;
  authUser$: Observable<IUser>;
  loading$: Observable<boolean>;
  editMode: boolean = false;
  userId: string;

  freelancerOption: { label: string; value: string | boolean }[] = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ];

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.aboutData$ = this.store.select(selectUserAboutData);
    this.loading$ = this.store.select(selectUserAboutLoading);
    this.authUser$ = this.store.select(selectAuthUser);
  }

  ngOnInit(): void {
    this.store.dispatch(getAboutData());

    this.authUser$.pipe(take(2)).subscribe((user) => {
      this.userId = user.id;
    });

    this.aboutForm = this.fb.group({
      designation: ['', Validators.required],
      description: ['', [Validators.required]],
      designationDescription: ['', Validators.required],
      DOB: ['', Validators.required],
      age: ['', Validators.required],
      website: [''],
      degree: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(phoneRegex)]],
      city: ['', Validators.required],
      freelancer: [false, Validators.required],

      happyClient: [''],
      projects: [''],
      hoursOfSupports: [''],
      team: [''],
    });

    this.aboutData$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data) {
        this.editMode = true;
        this.aboutForm.patchValue({
          designation: data.designation,
          description: data.description,
          designationDescription: data.designationDescription,
          DOB: data.DOB,
          age: data.age,
          website: data.website,
          degree: data.website,
          phone: data.phone,
          city: data.city,
          freelancer: data.freelancer,

          happyClient: data.happyClient,
          projects: data.projects,
          hoursOfSupports: data.hoursOfSupports,
          team: data.team,
        });
      }
    });
  }

  onSubmit() {
    const aboutData = this.aboutForm.value;
    if (this.editMode) {
      this.store.dispatch(
        updateAboutData({ data: aboutData, id: this.userId }),
      );
    } else {
      this.store.dispatch(postAboutData({ data: aboutData }));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
