import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { linkRegex } from '../../regex';
import { Store } from '@ngrx/store';
import {
  addPortfolioData,
  deletePortfolioData,
  getPortfolioData,
  updatePortfolioData,
} from '../../store/portfolio/portfolio.action';
import { Observable, Subject, take } from 'rxjs';
import { IPortfolioDto } from '../../modals/portfolio.modal';
import {
  selectPortfolioData,
  selectPortfolioDeleteLoading,
  selectPortfolioGetLoading,
  selectPortfolioLoading,
} from '../../store/portfolio/portfolio.selector';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  @ViewChild('fileInput', { static: false })
  inputRef: ElementRef<HTMLInputElement>;
  addPortfolioData: boolean = false;
  files: any[] = [];
  getLoading$: Observable<boolean>;
  loading$: Observable<boolean>;
  portfolioData$: Observable<IPortfolioDto[]>;
  portfolioData: IPortfolioDto[];
  deleteLoading$: Observable<boolean>;

  multiple: boolean = true;
  isEditMode: boolean = false;
  portfolioId: string = '';
  options: { value: string; label: string }[] = [
    { label: 'App', value: 'app' },
    { label: 'Product', value: 'product' },
    { label: 'Branding', value: 'branding' },
    { label: 'Books', value: 'books' },
  ];

  portfolioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.portfolioData$ = this.store.select(selectPortfolioData);
    this.getLoading$ = this.store.select(selectPortfolioGetLoading);
    this.loading$ = this.store.select(selectPortfolioLoading);
    this.deleteLoading$ = this.store.select(selectPortfolioDeleteLoading);

    this.store.dispatch(getPortfolioData());

    this.portfolioForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      descriptionTitle: ['', Validators.required],
      description: ['', Validators.required],
      projectImages: this.fb.array([], Validators.required),
      link: ['', [Validators.required, Validators.pattern(linkRegex)]],
    });

    this.portfolioData$.pipe().subscribe((data) => {
      this.portfolioData = data;
    });
  }

  toggleForm() {
    this.addPortfolioData = !this.addPortfolioData;
  }

  handleFileDrop(event: DragEvent) {
    this.portfolioForm.markAsDirty();
    if (event?.dataTransfer?.files?.length) {
      const fileList = Array.from(event.dataTransfer.files);
      this.addFiles(fileList);
    }
  }

  addFiles(files: File[] | FileList) {
    this.portfolioForm.markAsDirty();
    const formArray = this.portfolioForm.get('projectImages') as FormArray;
    const fileArray = Array.isArray(files) ? files : Array.from(files);

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.files = [...this.files, { file, previewUrl: e.target?.result }];
      };
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else {
        this.files.push({ file, previewUrl: null });
      }
      formArray.push(new FormControl(file, Validators.required));
    });
  }

  removeFile(index: number) {
    this.portfolioForm.markAsDirty();
    const formArray = this.portfolioForm.get('projectImages') as FormArray;
    formArray.removeAt(index);
    this.files = this.files.filter((_, i) => i !== index);
  }

  onSubmit() {
    const payload = this.portfolioForm.value;
    const images = payload.projectImages;
    delete payload.projectImages;

    if (this.isEditMode) {
      this.store.dispatch(
        updatePortfolioData({ payload, images, id: this.portfolioId }),
      );
    } else {
      this.store.dispatch(addPortfolioData({ payload, images }));
    }

    this.loading$.pipe(take(2)).subscribe((loading) => {
      if (!loading) {
        this.isEditMode = false;
        this.portfolioId = '';
        this.toggleForm();
        this.portfolioForm.reset();
      }
    });
  }

  deletePortfolio(id: string) {
    this.portfolioId = id;
    this.store.dispatch(deletePortfolioData({ id }));

    this.deleteLoading$.pipe(take(2)).subscribe((loading) => {
      if (!loading) {
        this.portfolioId = '';
      }
    });
  }

  editPortfolio(id: string) {
    this.isEditMode = true;
    const editData = (this.portfolioData ?? []).find((data) => data.id === id);
    this.portfolioId = editData.id;
    this.portfolioForm.patchValue({
      type: editData.type,
      name: editData.name,
      descriptionTitle: editData.descriptionTitle,
      description: editData.description,
      link: editData.link,
    });
    const formArray = this.portfolioForm.get('projectImages') as FormArray;
    formArray.clear();
    editData.projectImages.forEach((file) => {
      formArray.push(new FormControl(file, Validators.required));
    });
    this.files = editData.projectImages;

    this.toggleForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
