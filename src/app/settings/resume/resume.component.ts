import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  deleteResumeData,
  getResumeData,
  postResumeData,
  updateResumeData,
} from '../../store/resume/resume.action';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import {
  selectDeleteLoading,
  selectIsSuccess,
  selectResumeData,
  selectResumeLoading,
} from '../../store/resume/resume.selector';
import { IResumeDto } from '../../modals/resume.modal';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export class ResumeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  isModalOpen: boolean = false;
  resumeForm: FormGroup;
  editMode: boolean = false;
  loading$: Observable<boolean>;
  resumeData$: Observable<IResumeDto[]>;
  isSuccess$: Observable<boolean>;
  deleteLoader$: Observable<boolean>;
  selectedId: string;
  resumeData: IResumeDto[] = [];

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectResumeLoading);
    this.resumeData$ = this.store.select(selectResumeData);
    this.isSuccess$ = this.store.select(selectIsSuccess);
    this.deleteLoader$ = this.store.select(selectDeleteLoading);

    this.store.dispatch(getResumeData());

    this.resumeForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      description: ['', Validators.required],
      points: this.fb.array([]),
      startYear: [''],
      endYear: [''],
    });

    this.resumeData$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.resumeData = data;
    });
  }

  get pointsArray() {
    return this.resumeForm.get('points') as FormArray;
  }

  addPoint() {
    const pointsArray = this.resumeForm.get('points') as FormArray;
    const control = new FormControl('', Validators.required);
    pointsArray.push(control);
  }

  openModal() {
    this.isModalOpen = true;
  }

  removePoint(index: number) {
    const pointsArray = this.resumeForm.get('points') as FormArray;
    pointsArray.removeAt(index);
  }

  onClickSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        updateResumeData({
          payload: this.resumeForm.value,
          id: this.selectedId,
        }),
      );
    } else {
      this.store.dispatch(postResumeData({ payload: this.resumeForm.value }));
    }
    this.isSuccess$.pipe(take(2)).subscribe((success) => {
      if (success) {
        this.isModalOpen = false;
      }
    });
  }

  onCardClick() {
    console.log('card click');
  }

  deleteCard(id: string) {
    this.selectedId = id;
    this.store.dispatch(deleteResumeData({ id }));
  }
  editCard(id: string) {
    const resume = this.resumeData.find((data) => data.id === id);
    this.selectedId = id;
    this.resumeForm.patchValue({
      title: resume.title,
      subtitle: resume.subtitle,
      description: resume.description,
      startYear: resume.startYear,
      endYear: resume.endYear,
    });
    const pointsArr = this.resumeForm.get('points') as FormArray;
    pointsArr.clear();
    resume.points.forEach((point) => {
      pointsArr.push(new FormControl(point, Validators.required));
    });
    this.editMode = true;
    this.isModalOpen = true;
    this.resumeForm.markAsPristine();
  }

  onModalClose(isOpen: boolean) {
    this.editMode = false;
    this.isModalOpen = isOpen;
    this.resumeForm.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
