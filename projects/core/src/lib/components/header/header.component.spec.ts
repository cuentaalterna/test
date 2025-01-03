import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { LdrTranslateService } from '@core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Creamos un mock
const mockTranslateService = jasmine.createSpyObj<LdrTranslateService>(
  'LdrTranslateService',
  ['getCurrentKey', 'use', 'translate']
);

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: any;

  beforeEach(async () => {
    mockTranslateService.getCurrentKey.and.returnValue('es');
    mockTranslateService.translate.and.returnValue('FakeText');

    await TestBed.configureTestingModule({

      imports: [
        HeaderComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: LdrTranslateService, useValue: mockTranslateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isDetailPage as false by default', () => {
    expect(component.isDetailPage()).toBeFalse();
  });

  it('should set currentValue from getCurrentKey()', () => {
    expect(component.currentValue).toBe('es');
    expect(mockTranslateService.getCurrentKey).toHaveBeenCalled();
  });

  it('should call translateService.use() on changeLang', () => {
    component.changeLang({ value: 'en' } as any);
    expect(mockTranslateService.use).toHaveBeenCalledWith('en');
  });
});
