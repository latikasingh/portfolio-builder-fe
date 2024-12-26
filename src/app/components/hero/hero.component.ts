import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import Typed from 'typed.js';
import { IUser } from '../../modals/user.modal';
import { selectAuthUser } from '../../store/auth/auth.selector';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  user$: Observable<IUser>;
  texts: string[] = ['Designer', 'Developer', 'Freelancer', 'Photographer'];

  constructor(private store: Store) {}

  ngOnInit() {
    this.createTypingEffect();
    this.user$ = this.store.select(selectAuthUser);
  }

  createTypingEffect() {
    const options = {
      strings: this.texts,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    };

    const typed = new Typed('.typed', options);
  }
}
