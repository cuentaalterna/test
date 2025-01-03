// makes.actions.ts
import { createAction, props } from '@ngrx/store';
import { Make } from '../make/models/make.model';
import { VehicleType } from '../make/models/vehicle-type';
import { VehicleModel } from '../make/models/vehicle';

/**
 * Load list of brands
 */
export const loadMakes = createAction('[Make List] Load Makes');

export const loadMakesSuccess = createAction(
    '[Make List] Load Makes Success',
    props<{ makes: Make[] }>()
);
export const loadMakesFailure = createAction(
    '[Make List] Load Makes Failure',
    props<{ error: string }>()
);

/**
 * Select a brand (for example, by clicking on the list)
 */
export const selectMake = createAction(
    '[Make List] Select Make',
    props<{ make: Make }>()
);

/**
 * Load vehicle types for the selected brand
 */
export const loadVehicleTypesForMake = createAction(
    '[Make Detail] Load Vehicle Types For Make',
    props<{ makeId: number }>()
);
export const loadVehicleTypesForMakeSuccess = createAction(
    '[Make Detail] Load Vehicle Types For Make Success',
    props<{ makeId: number; vehicleTypes: VehicleType[] }>()
);
export const loadVehicleTypesForMakeFailure = createAction(
    '[Make Detail] Load Vehicle Types For Make Failure',
    props<{ error: string }>()
);

/**
 * Load models for the selected brand
 */
export const loadModelsForMake = createAction(
    '[Make Detail] Load Models For Make',
    props<{ makeId: number }>()
);
export const loadModelsForMakeSuccess = createAction(
    '[Make Detail] Load Models For Make Success',
    props<{ makeId: number; models: VehicleModel[] }>()
);
export const loadModelsForMakeFailure = createAction(
    '[Make Detail] Load Models For Make Failure',
    props<{ error: string }>()
);


