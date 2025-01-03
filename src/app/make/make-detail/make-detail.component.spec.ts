import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadModelsForMake, loadVehicleTypesForMake } from '../../store/makes.actions';
import { MakeDetailComponent } from './make-detail.component';
import { LdrLoadingService } from '../../../../projects/core/src/lib/http/loading/ldr-loading.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: (key: string) => {
        if (key === 'id') {
          return '123';
        };
        return null;
      },
    },
  },
};

const mockStore = {
  dispatch: jasmine.createSpy('dispatch'),
  select: jasmine.createSpy('select'),
};

const mockLdrLoadingService = {
  set: jasmine.createSpy('set'),
};

describe('MakeDetailComponent', () => {
  let fixture: any;
  let component: MakeDetailComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeDetailComponent, BrowserAnimationsModule], // Standalone
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: LdrLoadingService, useValue: mockLdrLoadingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MakeDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch actions on ngOnInit', () => {
    mockStore.select.and.returnValue(of(false));

    fixture.detectChanges();
    expect(mockLdrLoadingService.set).toHaveBeenCalledWith(true);

    expect(mockStore.dispatch).toHaveBeenCalledWith(loadVehicleTypesForMake({ makeId: 123 }));
    expect(mockStore.dispatch).toHaveBeenCalledWith(loadModelsForMake({ makeId: 123 }));
  });

  it('should call ldrLoadingService.set(false) when loadingDetails$ emits', () => {

    mockStore.select.and.returnValue(of(false));

    fixture.detectChanges();
    expect(mockLdrLoadingService.set).toHaveBeenCalledWith(false);
  });
});
