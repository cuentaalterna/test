import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { LdrTranslatePipe, LdrTranslateService } from '@core';
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [MatButtonToggleModule, CommonModule, LdrTranslatePipe, MatIconModule, MatButtonModule, RouterLink]
})
export class HeaderComponent {

  private ldrTranslateService: LdrTranslateService = inject(LdrTranslateService);

  currentValue: string = '';

  isDetailPage = input<boolean>(false);

  constructor() {
    this.currentValue = this.ldrTranslateService.getCurrentKey();
  }

  /**
   * Change language
   * @param lang MatButtonToggleChange
   */
  changeLang(lang: MatButtonToggleChange) {
    this.ldrTranslateService.use(lang.value);
  }

}
