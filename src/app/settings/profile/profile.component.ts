import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take, filter } from 'rxjs';
import { IUser } from '../../modals/user.modal';
import {
  selectAuthUser,
  selectAuthUserLoading,
  selectUpdateLoading,
} from '../../store/auth/auth.selector';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { updateUser } from '../../store/auth/auth.action';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  @ViewChild('attachments') attachments: ElementRef;

  authUser$: Observable<IUser>;
  loading$: Observable<boolean>;
  updateLoading$: Observable<boolean>;
  userForm: FormGroup;
  selectedFile: File;
  fileList: File[] = [];
  listOfFiles: any[] = [];
  profileImage = '/assets/img/admin.png';
  editMode: boolean;
  userId: string;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.authUser$ = this.store.select(selectAuthUser);
    this.loading$ = this.store.select(selectAuthUserLoading);
    this.updateLoading$ = this.store.select(selectUpdateLoading);

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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
      profileImage: [null, [Validators.required]],
    });

    this.authUser$.pipe(take(2)).subscribe((user) => {
      if (user) {
        this.userId = user.id;
        this.editMode = true;
        this.profileImage = user.profileImage;
        this.userForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          coverImage: user.coverImage,
          profileImage: user.profileImage,
        });

        const tagsArray = this.userForm.get('tags') as FormArray;
        tagsArray.clear();
        user.tags.forEach((tag) => {
          tagsArray.push(this.fb.control(tag));
        });

        const socialMediaArray = this.userForm.get('socialMedia') as FormArray;
        socialMediaArray.clear();

        user.socialMedia.forEach((social) => {
          socialMediaArray.push(
            this.fb.group({
              name: [social.name],
              link: [social.link],
              icon: [social.icon],
            }),
          );
        });
      }
    });
  }

  get tags(): string[] {
    return this.userForm.get('tags').value;
  }

  get socialMediaControls() {
    return (this.userForm.get('socialMedia') as FormArray).controls;
  }

  onAddTag() {
    this.userForm.markAllAsTouched();
    const tagInput = this.userForm.get('tagInput');
    const tagsArray = this.userForm.get('tags') as FormArray;

    if (tagInput && tagInput.value) {
      tagsArray.push(new FormControl(tagInput.value));
      tagInput.reset();
    }
  }

  onRemoveTag(index: number) {
    this.userForm.markAllAsTouched();
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
            this.listOfFiles.push(e.target.result as string);
          }
        };

        reader.readAsDataURL(file);
        return file;
      });

      fileControl.setValue(fileArray);
    }
  }

  onProfileImageUpload(event: any) {
    const files = event.target.files;
    const fileControl = this.userForm.get('profileImage') as FormControl;

    if (files?.length) {
      const fileArray = Array.from(files).map((file: any) => {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            this.profileImage = e.target.result as string;
          }
        };

        reader.readAsDataURL(file);
        return file;
      });

      fileControl.setValue(fileArray);
    }
  }

  onSubmit() {
    const userData = { ...this.userForm.value };
    delete userData.tagInput;

    if (this.editMode) {
      this.store.dispatch(updateUser({ user: userData, id: this.userId }));
    }
  }
}
