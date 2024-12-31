import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  getPortfolioData,
} from '../../store/portfolio/portfolio.action';
import { Observable } from 'rxjs';
import { IPortfolioDto } from '../../modals/portfolio.modal';
import {
  selectPortfolioData,
  selectPortfolioLoading,
} from '../../store/portfolio/portfolio.selector';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnInit {
  @ViewChild('fileInput', { static: false })
  inputRef: ElementRef<HTMLInputElement>;
  files: { file: File; previewUrl: string | ArrayBuffer | null }[] = [];
  loading$: Observable<boolean>;
  portfolioData$: Observable<IPortfolioDto[]>;

  multiple: boolean = true;
  options: { value: string; label: string }[] = [
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    { label: 'Three', value: 'three' },
  ];

  portfolioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.portfolioData$ = this.store.select(selectPortfolioData);
    this.loading$ = this.store.select(selectPortfolioLoading);

    this.store.dispatch(getPortfolioData());

    this.portfolioForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      descriptionTitle: ['', Validators.required],
      description: ['', Validators.required],
      projectImages: this.fb.array([], Validators.required),
      link: ['', [Validators.required, Validators.pattern(linkRegex)]],
    });
  }

  handleFileDrop(event: DragEvent) {
    if (event?.dataTransfer?.files?.length) {
      const fileList = Array.from(event.dataTransfer.files);
      this.addFiles(fileList);
    }
  }

  addFiles(files: File[] | FileList) {
    const formArray = this.portfolioForm.get('projectImages') as FormArray;
    const fileArray = Array.isArray(files) ? files : Array.from(files);

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.files.push({ file, previewUrl: e.target?.result });
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
    const formArray = this.portfolioForm.get('projectImages') as FormArray;
    formArray.removeAt(index);
    this.files.splice(index, 1);
  }

  onSubmit() {
    const payload = this.portfolioForm.value;
    console.log(payload);

    this.store.dispatch(addPortfolioData({ payload }));
  }
}
