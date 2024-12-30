import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { percentageRegex } from '../../regex';
import { Observable, take } from 'rxjs';
import { ISkillDto } from '../../modals/skills.modal';
import { Store } from '@ngrx/store';
import {
  selectSkillsData,
  selectSkillsLoading,
} from '../../store/skills/skills.selector';
import {
  getSkillData,
  postSkillData,
  updateSkillData,
} from '../../store/skills/skills.action';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
  skillsForm: FormGroup;
  loading$: Observable<boolean>;
  skills$: Observable<ISkillDto>;
  editMode: boolean = false;
  skillId: string;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getSkillData());
    this.loading$ = this.store.select(selectSkillsLoading);
    this.skills$ = this.store.select(selectSkillsData);

    this.skillsForm = this.fb.group({
      description: ['', Validators.required],
      skills: this.fb.array([]),
    });
    this.initializeForm();

    this.skills$.pipe(take(2)).subscribe((skills) => {
      if (skills) {
        this.skillId = skills.id;
        this.editMode = true;
        this.skillsForm.patchValue({ description: skills.description });
        const skillsArray = this.skillsForm.get('skills') as FormArray;
        skillsArray.clear();
        skills.skills.forEach((skill) => {
          skillsArray.push(
            this.fb.group({
              name: [skill.name, Validators.required],
              percentage: [
                skill.percentage,
                [Validators.required, Validators.pattern(percentageRegex)],
              ],
            }),
          );
        });
      }
    });
  }

  get skillsArray() {
    return this.skillsForm.get('skills') as FormArray;
  }

  initializeForm() {
    const defaultSkills = Array.from({ length: 2 }, () =>
      this.fb.group({
        name: ['', Validators.required],
        percentage: [
          '',
          [Validators.required, Validators.pattern(percentageRegex)],
        ],
      }),
    );

    const skillsFormArray = this.skillsForm.get('skills') as FormArray;
    defaultSkills.forEach((skill) => skillsFormArray.push(skill));
    this.skillsForm.updateValueAndValidity();
  }

  addSkillField() {
    const control = this.fb.group({
      name: ['', Validators.required],
      percentage: [
        '',
        [Validators.required, Validators.pattern(percentageRegex)],
      ],
    });

    (<FormArray>this.skillsForm.get('skills')).push(control);
    this.skillsForm.updateValueAndValidity();
  }

  removeControl(index: number) {
    console.log(index);

    const formArray = this.skillsForm.get('skills') as FormArray;
    formArray.removeAt(index);
    this.skillsForm.updateValueAndValidity();
  }

  onSubmit() {
    const payload = this.skillsForm.value;
    if (this.editMode) {
      this.store.dispatch(updateSkillData({ payload, id: this.skillId }));
    } else {
      this.store.dispatch(postSkillData({ payload }));
    }
  }
}
