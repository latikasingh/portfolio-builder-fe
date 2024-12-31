import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { debounceTime, map, Observable, of, startWith, Subject } from 'rxjs';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
    SpinnerComponent,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent implements OnInit, OnChanges {
  private inputSubject = new Subject<string>();
  @Input() control = new FormControl();
  @Input() placeholder: string = 'Select an option';
  @Input() data: { icon: string; value: string }[] = [];
  @Input() errors: { name: string; message: string }[] = [];
  @Input() isLoading: boolean;
  @Input() selectedIcon: string | null = null;

  @Output() valueChange = new EventEmitter<string>();
  @Output() iconChange = new EventEmitter<any>();

  filteredData: Observable<{ icon: string; value: string }[]>;

  constructor(private sanitizer: DomSanitizer) {
    this.inputSubject.pipe(debounceTime(300)).subscribe((value) => {
      this.valueChange.emit(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      console.log(changes['data']);

      this.filteredData = of(this.data);
    }
  }

  ngOnInit() {
    this.filteredData = this.control.valueChanges.pipe(
      startWith(''),
      map((value) =>
        this._filter(typeof value === 'string' ? value : value?.value || ''),
      ),
    );
  }

  onInputChange(ev: Event) {
    const val = (ev.target as HTMLInputElement).value ?? '';
    this.inputSubject.next(val);
  }

  private _filter(value: string): { icon: string; value: string }[] {
    const filterValue = this._normalizeValue(value);
    return this.data.filter((item) =>
      this._normalizeValue(item.value).includes(filterValue),
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  getSanitizedIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }

  onOptionSelected(selectedOption: { icon: string; value: string }) {
    this.control.setValue(selectedOption.value);
    this.selectedIcon = selectedOption.icon;
    this.iconChange.emit(selectedOption.icon);
  }
}
