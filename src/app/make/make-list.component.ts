import {
  Component,
  OnInit,
  signal,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Make } from './models/make.model';
import { selectAllMakes } from '../store/makes.selectors';
import { loadMakes, selectMake } from '../store/makes.actions';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LdrLoadingService, LdrTranslatePipe, HeaderComponent } from '@core';

const modulesComponents = [
  CommonModule,
  ScrollingModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatProgressSpinnerModule,
  LdrTranslatePipe,
  HeaderComponent
];

@Component({
  selector: 'app-make-list',
  templateUrl: './make-list.component.html',
  styleUrls: ['./make-list.component.scss'],
  imports: modulesComponents,
})
export class MakeListComponent implements OnInit {

  makes$!: Observable<Make[]>;

  filterText = signal<string>('');

  private ldrLoadingService: LdrLoadingService = inject(LdrLoadingService);

  private router: Router = inject(Router);

  private store: Store = inject(Store);

  private _makesSignal = signal<Make[]>([]);

  filteredMakes = computed(() => {
    const text = this.filterText().toLowerCase();
    return this._makesSignal().filter((mk) =>
      mk.Make_Name.toLowerCase().includes(text)
    );
  });


  ngOnInit(): void {
    // load spinner
    this.ldrLoadingService.set(true)

    // Initialize observables
    this.makes$ = this.store.select(selectAllMakes);

    // Load list of brands
    this.store.dispatch(loadMakes());

    // Pass the data to the signal (to filter with computed)
    this.makes$.subscribe((data) => {
      this._makesSignal.set(data);
      this.ldrLoadingService.set(false)
    });
  }

  /**
   * Select a brand
   * @param make 
   */
  onSelectMake(make: Make): void {
    this.store.dispatch(selectMake({ make }));
    this.router.navigate(['/make', make.Make_ID]);
  }
}
