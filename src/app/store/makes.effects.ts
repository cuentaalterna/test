// makes.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    loadMakes,
    loadMakesFailure,
    loadMakesSuccess,
    loadVehicleTypesForMake,
    loadVehicleTypesForMakeSuccess,
    loadVehicleTypesForMakeFailure,
    loadModelsForMake,
    loadModelsForMakeSuccess,
    loadModelsForMakeFailure
} from './makes.actions';
import { catchError, filter, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { MakeService } from '../make/make.service';
import { selectAllMakes, selectVehicleTypes } from './makes.selectors';
import { Store } from '@ngrx/store';
@Injectable()
export class MakesEffects {
    private actions$ = inject(Actions);
    private makeService = inject(MakeService);
    private store = inject(Store);

    /**
     * Effect to load the list of brands
     */
    loadMakes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadMakes),
            withLatestFrom(this.store.select(selectAllMakes)),
            filter(([action, makes]) => makes.length === 0),
            mergeMap(() =>
                this.makeService.getAllMakes().pipe(
                    map((makes) => loadMakesSuccess({ makes })),
                    catchError((error: unknown) => of(loadMakesFailure({ error: String(error) })))
                )
            )
        )
    );

    /**
     * Effect to load vehicle types of the brand (makeId)
     */
    loadVehicleTypesForMake$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadVehicleTypesForMake),
            withLatestFrom(this.store.select(selectVehicleTypes)),
            filter(([_, vehicleTypes]) => vehicleTypes.length === 0),
            mergeMap(([{ makeId }]) =>
                this.makeService.getVehicleTypesForMake(makeId).pipe(
                    map((vehicleTypes) => loadVehicleTypesForMakeSuccess({ makeId, vehicleTypes })),
                    catchError((error: unknown) =>
                        of(loadVehicleTypesForMakeFailure({ error: String(error) }))
                    )
                )
            )
        )
    );

    /**
     * Effect to load brand models (makeId)
     */
    loadModelsForMake$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadModelsForMake),
            mergeMap(({ makeId }) =>
                this.makeService.getModelsForMake(makeId).pipe(
                    map((models) => loadModelsForMakeSuccess({ makeId, models })),
                    catchError((error: unknown) =>
                        of(loadModelsForMakeFailure({ error: String(error) }))
                    )
                )
            )
        )
    );



}
