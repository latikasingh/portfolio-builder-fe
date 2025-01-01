import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISkill } from '../../../modals/skills.modal';
import { Store } from '@ngrx/store';
import { selectWebsiteSkillData } from '../../../store/website/user/user.selector';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
  skillData$: Observable<ISkill>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.skillData$ = this.store.select(selectWebsiteSkillData);
  }
}
