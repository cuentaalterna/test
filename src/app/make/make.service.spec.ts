import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MakeService } from './make.service';
import { Make } from './models/make.model';
import { VehicleModel } from './models/vehicle';
import { VehicleType } from './models/vehicle-type';

describe('MakeService', () => {
  let service: MakeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MakeService],
    });
    service = TestBed.inject(MakeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya request pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllMakes() should call correct endpoint and return data', () => {
    const mockResponse = {
      Count: 2,
      Message: 'Success',
      Results: [
        { Make_ID: 1, Make_Name: 'Make1' },
        { Make_ID: 2, Make_Name: 'Make2' },
      ],
    };

    service.getAllMakes().subscribe((makes) => {
      expect(makes.length).toBe(2);
      expect(makes[0].Make_Name).toBe('Make1');
    });

    const req = httpMock.expectOne('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });



  it('getVehicleTypesForMake() should call the correct endpoint and return data', () => {
    const mockResponse = {
      Count: 2,
      Message: 'Success',
      Results: [
        { VehicleTypeId: 101, VehicleTypeName: 'SUV' },
        { VehicleTypeId: 102, VehicleTypeName: 'Sedan' },
      ],
    };

    service.getVehicleTypesForMake(123).subscribe((vehicleTypes: VehicleType[]) => {
      expect(vehicleTypes.length).toBe(2);
      expect(vehicleTypes[0].VehicleTypeName).toBe('SUV');
      expect(vehicleTypes[1].VehicleTypeName).toBe('Sedan');
    });

    const req = httpMock.expectOne('https://vpic.nhtsa.dot.gov/api/vehicles/getvehicletypesformakeid/123?format=json');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('getModelsForMake() should call the correct endpoint and return data', () => {
    const mockResponse = {
      Count: 2,
      Message: 'Success',
      Results: [
        {
          Make_ID: 123,
          Make_Name: 'FakeMake',
          Model_ID: 1001,
          Model_Name: 'FakeModel1'
        },
        {
          Make_ID: 123,
          Make_Name: 'FakeMake',
          Model_ID: 1002,
          Model_Name: 'FakeModel2'
        },
      ],
    };

    service.getModelsForMake(123).subscribe((models: VehicleModel[]) => {
      expect(models.length).toBe(2);
      expect(models[0].Model_Name).toBe('FakeModel1');
      expect(models[1].Model_Name).toBe('FakeModel2');
    });

    const req = httpMock.expectOne('https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeid/123?format=json');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });


});
