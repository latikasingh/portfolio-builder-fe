import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import Typed from 'typed.js';
import { IUser } from '../../modals/user.modal';
import { selectWebsiteUser } from '../../store/website/user/user.selector';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  user$: Observable<IUser>;
  texts: string[] = ['Designer', 'Developer'];

  constructor(private store: Store) {}

  ngOnInit() {
    this.user$ = this.store.select(selectWebsiteUser);

    this.user$.pipe(take(2)).subscribe((user) => {
      this.texts = user.tags;
      this.createTypingEffect();
    });
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
