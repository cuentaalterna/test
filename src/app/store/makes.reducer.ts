import { createReducer, on } from '@ngrx/store';
import {
    loadMakes,
    loadMakesSuccess,
    loadMakesFailure,
    selectMake,
    loadVehicleTypesForMake,
    loadVehicleTypesForMakeSuccess,
    loadVehicleTypesForMakeFailure,
    loadModelsForMake,
    loadModelsForMakeSuccess,
    loadModelsForMakeFailure,
} from './makes.actions';
import { Make } from '../make/models/make.model';
import { VehicleType } from '../make/models/vehicle-type';
import { VehicleModel } from '../make/models/vehicle';

export interface MakesState {
    makes: Make[];
    loading: boolean;
    error: string | null;

    selectedMake: Make | null;
    vehicleTypes: VehicleType[];
    models: VehicleModel[];

    loadingDetails: boolean;
}

export const initialMakesState: MakesState = {
    makes: [],
    loading: false,
    error: null,

    selectedMake: null,
    vehicleTypes: [],
    models: [],

    loadingDetails: false,
};

export const makesReducer = createReducer(
    initialMakesState,
    on(loadMakes, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(loadMakesSuccess, (state, { makes }) => ({
        ...state,
        loading: false,
        makes
    })),
    on(loadMakesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(selectMake, (state, { make }) => {
        if (state.selectedMake?.Make_ID !== make.Make_ID) {
            return {
                ...state,
                selectedMake: make,
                vehicleTypes: [],
                models: []
            };
        } else {
            return { ...state, selectedMake: make };
        }
    }),

    on(loadVehicleTypesForMake, (state) => ({
        ...state,
        loadingDetails: true,
        error: null
    })),
    on(loadVehicleTypesForMakeSuccess, (state, { vehicleTypes }) =>
    ({
        ...state,
        loadingDetails: false,
        vehicleTypes
    }))
    ,
    on(loadVehicleTypesForMakeFailure, (state, { error }) => ({
        ...state,
        loadingDetails: false,
        error
    })),

    on(loadModelsForMake, (state) => ({
        ...state,
        loadingDetails: true,
        error: null
    })),
    on(loadModelsForMakeSuccess, (state, { models }) => ({
        ...state,
        loadingDetails: false,
        models
    })),
    on(loadModelsForMakeFailure, (state, { error }) => ({
        ...state,
        loadingDetails: false,
        error
    })),
);
