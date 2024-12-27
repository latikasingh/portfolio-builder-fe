import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from '../../modals/user.modal';
import {
  selectAuthUser,
  selectAuthUserLoading,
} from '../../store/auth/auth.selector';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  @ViewChild('attachments') attachments: ElementRef;

  authUser$: Observable<IUser>;
  loading$: Observable<boolean>;
  userForm: FormGroup;
  selectedFile: File;
  fileList: File[] = [];
  listOfFiles: any[] = [];

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.authUser$ = this.store.select(selectAuthUser);
    this.loading$ = this.store.select(selectAuthUserLoading);
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tagInput: [''],
      tags: this.fb.array([], [Validators.required]),
      socialMedia: this.fb.array([
        this.fb.group({
          name: ['Twitter'],
          link: [''],
          icon: ['bi bi-twitter-x'],
        }),
        this.fb.group({
          name: ['Facebook'],
          link: [''],
          icon: ['bi bi-facebook'],
        }),
        this.fb.group({
          name: ['Instagram'],
          link: [''],
          icon: ['bi bi-instagram'],
        }),
        this.fb.group({
          name: ['LinkedIn'],
          link: [''],
          icon: ['bi bi-linkedin'],
        }),
      ]),
      coverImage: [null, [Validators.required]],
    });
  }

  get tags(): string[] {
    return this.userForm.get('tags').value;
  }

  get socialMediaControls() {
    return (this.userForm.get('socialMedia') as FormArray).controls;
  }

  onAddTag() {
    const tagInput = this.userForm.get('tagInput');
    const tagsArray = this.userForm.get('tags') as FormArray;

    if (tagInput && tagInput.value) {
      tagsArray.push(new FormControl(tagInput.value));
      tagInput.reset();
    }
  }

  onRemoveTag(index: number) {
    const tagsArray = this.userForm.get('tags') as FormArray;

    if ((tagsArray ?? []).length) {
      tagsArray.removeAt(index);
    } else {
      console.error('Tags is not a FormArray:', tagsArray);
    }
  }
  onFileChanged(event: any) {
    const files = event.target.files;
    const fileControl = this.userForm.get('coverImage') as FormControl;

    if (files?.length) {
      const fileArray = Array.from(files).map((file: any) => {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            this.listOfFiles.push(e.target.result as string); // Optional: Update preview list
          }
        };

        reader.readAsDataURL(file);
        return file; // Store the File object itself in the FormControl
      });

      // Update the FormControl with the file array
      fileControl.setValue(fileArray);
    }
  }

  onSubmit() {
    console.log(this.userForm.value);
  }
}
