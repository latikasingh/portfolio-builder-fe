import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { filter } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  currentChildRoute: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}

  get currentActiveTab() {
    return this.route.snapshot.firstChild.url[0].path.toString();
  }

  previewWebsite() {
    window.open(environment.APP_URL + '/portfolio', '_blank');
  }
}
