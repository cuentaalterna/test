import { MakesState } from './makes.reducer';
import {
    selectMakesState,
    selectAllMakes,
    selectLoading,
    selectError,
    selectSelectedMake,
    selectVehicleTypes,
    selectModels,
    selectLoadingDetails,
} from './makes.selectors';


describe('Makes Selectors', () => {
    const initialState: MakesState = {
        makes: [
            { Make_ID: 1, Make_Name: 'Toyota' },
            { Make_ID: 2, Make_Name: 'Honda' },
        ],
        loading: false,
        error: null,
        selectedMake: { Make_ID: 999, Make_Name: 'MockBrand' },
        vehicleTypes: [
            { VehicleTypeId: 10, VehicleTypeName: 'SUV' },
            { VehicleTypeId: 20, VehicleTypeName: 'Pickup' },
        ],
        models: [
            {
                Make_ID: 999,
                Make_Name: 'MockBrand',
                Model_ID: 123,
                Model_Name: 'MockModel'
            }
        ],
        loadingDetails: true,
    };

    it('selectMakesState should return the feature state', () => {
        const globalState = {
            makes: initialState,
        };

        const result = selectMakesState(globalState);
        expect(result).toBe(initialState);
    });

    it('selectAllMakes should return the array of makes', () => {
        const result = selectAllMakes.projector(initialState);
        expect(result.length).toBe(2);
        expect(result[0].Make_Name).toBe('Toyota');
    });

    it('selectLoading should return loading flag', () => {
        const result = selectLoading.projector(initialState);
        expect(result).toBeFalse();
    });

    it('selectError should return the error', () => {
        const result = selectError.projector(initialState);
        expect(result).toBeNull();
    });

    it('selectSelectedMake should return the selected make', () => {
        const result = selectSelectedMake.projector(initialState);
        expect(result).toEqual({ Make_ID: 999, Make_Name: 'MockBrand' });
    });

    it('selectVehicleTypes should return the array of vehicle types', () => {
        const result = selectVehicleTypes.projector(initialState);
        expect(result.length).toBe(2);
        expect(result[1].VehicleTypeName).toBe('Pickup');
    });

    it('selectModels should return the array of vehicle models', () => {
        const result = selectModels.projector(initialState);
        expect(result.length).toBe(1);
        expect(result[0].Model_Name).toBe('MockModel');
    });

    it('selectLoadingDetails should return the loadingDetails flag', () => {
        const result = selectLoadingDetails.projector(initialState);
        expect(result).toBeTrue();
    });
});
