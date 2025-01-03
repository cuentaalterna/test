import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MakesState } from './makes.reducer';

export const selectMakesState = createFeatureSelector<MakesState>('makes');

export const selectAllMakes = createSelector(
    selectMakesState,
    (state) => state.makes
);

export const selectLoading = createSelector(
    selectMakesState,
    (state) => state.loading
);

export const selectError = createSelector(
    selectMakesState,
    (state) => state.error
);

export const selectSelectedMake = createSelector(
    selectMakesState,
    (state) => state.selectedMake
);

export const selectVehicleTypes = createSelector(
    selectMakesState,
    (state) => state.vehicleTypes
);

export const selectModels = createSelector(
    selectMakesState,
    (state) => state.models
);

export const selectLoadingDetails = createSelector(
    selectMakesState,
    (state) => state.loadingDetails
);
