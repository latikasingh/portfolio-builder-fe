import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { linkRegex } from '../../regex';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnInit {
  @ViewChild('fileInput', { static: false })
  inputRef: ElementRef<HTMLInputElement>;
  files: { file: File; previewUrl: string | ArrayBuffer | null }[] = [];

  multiple: boolean = true;
  options: { value: string; label: string }[] = [
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    { label: 'Three', value: 'three' },
  ];

  portfolioForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
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
    console.log(this.files);

    fileArray.forEach((file) => {
      formArray.push(
        this.fb.group({
          file: [file, Validators.required],
          fileName: [file.name, Validators.required],
          fileSize: [file.size, Validators.required],
        }),
      );
    });

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
    });
  }

  removeFile(index: number) {
    const formArray = this.portfolioForm.get('projectImages') as FormArray;
    formArray.removeAt(index);
    this.files.splice(index, 1);
  }

  onSubmit() {
    console.log(this.portfolioForm.value);
  }
}
