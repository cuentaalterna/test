import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from './models/api-response';
import { VehicleModel } from './models/vehicle';
import { VehicleType } from './models/vehicle-type';
import { Make } from './models/make.model';

@Injectable({
  providedIn: 'root'
})
export class MakeService {

  private readonly baseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles';

  private http: HttpClient = inject(HttpClient);

  /**
   * Returns all "makes" using the getallmakes endpoint
   */
  getAllMakes(): Observable<Make[]> {
    return this.http.get<ApiResponse<Make>>(`${this.baseUrl}/getallmakes?format=json`).pipe(
      map((resp) => resp.Results)
    );
  }

  /**
   * Returns the make by id
   */
  getVehicleTypesForMake(makeId: number): Observable<VehicleType[]> {
    return this.http.get<ApiResponse<VehicleType>>(`${this.baseUrl}/getvehicletypesformakeid/${makeId}?format=json`).pipe(
      map((resp) => resp.Results)
    );
  }

  /**
   * Returns the models for the make
   */
  getModelsForMake(makeId: number): Observable<VehicleModel[]> {
    return this.http.get<ApiResponse<VehicleModel>>(`${this.baseUrl}/getmodelsformakeid/${makeId}?format=json`).pipe(
      map((resp) => resp.Results)
    );
  }

}
