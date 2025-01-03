import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { VehicleModel } from '../models/vehicle';
import { selectModels, selectSelectedMake, selectVehicleTypes } from '../../store/makes.selectors';
import { loadModelsForMake, loadVehicleTypesForMake } from '../../store/makes.actions';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Make } from '../models/make.model';
import { VehicleType } from '../models/vehicle-type';
import { LdrTranslatePipe, HeaderComponent, LdrLoadingService } from '@core';

const modulesComponents = [CommonModule, MatCardModule, MatProgressSpinnerModule, HeaderComponent, LdrTranslatePipe,]

@Component({
  selector: 'app-make-detail',
  templateUrl: './make-detail.component.html',
  styleUrls: ['./make-detail.component.scss'],
  imports: modulesComponents,
})
export class MakeDetailComponent implements OnInit {

  make$!: Observable<Make | null>;

  vehicleTypes$!: Observable<VehicleType[]>;

  models$!: Observable<VehicleModel[]>;

  private store: Store = inject(Store);

  private route: ActivatedRoute = inject(ActivatedRoute);

  private ldrLoadingService: LdrLoadingService = inject(LdrLoadingService);

  ngOnInit(): void {
    /**
     * Show loading spinner
     */
    this.ldrLoadingService.set(true);

    /**
     * Get make id from route
     */
    const makeId = Number(this.route.snapshot.paramMap.get('id'));



    /**
     * Load vehicle types for make
     */
    this.store.dispatch(loadVehicleTypesForMake({ makeId }));

    /**
     * Load models for make
     */
    this.store.dispatch(loadModelsForMake({ makeId }));

    /**
      Get make selected to display title
    */
    this.make$ = this.store.select(selectSelectedMake);

    /**
     * Get vehicle types
     */
    this.vehicleTypes$ = this.store.select(selectVehicleTypes);

    /**
     * Get models
     */
    this.models$ = this.store.select(selectModels);

    /**
     *Get models ands Hide loading spinner when models are loaded
     */
    this.models$.subscribe(() => this.ldrLoadingService.set(false));

  }
}
