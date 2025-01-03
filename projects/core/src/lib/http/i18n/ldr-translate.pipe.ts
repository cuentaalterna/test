import { Pipe, inject, type PipeTransform } from '@angular/core';
import { LdrTranslateService } from './ldr-translate.service';

@Pipe({
	name: 'translate',
	pure: false
})
export class LdrTranslatePipe implements PipeTransform {
	private translateSrv: LdrTranslateService = inject(LdrTranslateService);

	transform(key: string): string {
		return this.translateSrv.translate(key);
	}
}
