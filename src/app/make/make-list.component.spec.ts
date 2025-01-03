import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { MakeListComponent } from './make-list.component';
import { LdrLoadingService } from '@core';
import { loadMakes, selectMake } from '../store/makes.actions';
import { Make } from './models/make.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const mockStore = {
  dispatch: jasmine.createSpy('dispatch'),
  select: jasmine.createSpy('select'),
};

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};

const mockLdrLoadingService = {
  set: jasmine.createSpy('set'),
};

describe('MakeListComponent', () => {
  let fixture: any;
  let component: MakeListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeListComponent, BrowserAnimationsModule],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: LdrLoadingService, useValue: mockLdrLoadingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MakeListComponent);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadMakes on ngOnInit', () => {
    mockStore.select.and.returnValue(of([]));

    fixture.detectChanges();
    expect(mockStore.dispatch).toHaveBeenCalledWith(loadMakes());
    expect(mockLdrLoadingService.set).toHaveBeenCalledWith(true);
  });

  it('should set loadingService to false when data arrives', () => {
    const mockMakes = [{ Make_ID: 1, Make_Name: 'Test Make' }] as Make[];
    mockStore.select.and.returnValue(of(mockMakes));

    fixture.detectChanges();
    expect(mockLdrLoadingService.set).toHaveBeenCalledWith(false);
    expect(component.filteredMakes().length).toBe(1);
    expect(component.filteredMakes()[0].Make_Name).toBe('Test Make');
  });

  it('should navigate on onSelectMake', () => {
    const make: Make = { Make_ID: 999, Make_Name: 'Mock Brand' };
    component.onSelectMake(make);
    expect(mockStore.dispatch).toHaveBeenCalledWith(selectMake({ make }));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/make', 999]);
  });
});
