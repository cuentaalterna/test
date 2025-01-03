import { Injectable } from '@angular/core';
import { LangKeys, OptionLangType, ResponseTranslateModel } from './models/ldr-translate-model';

import * as dataES from '../../../../../../public/i18n/es.json';
import * as dataEN from '../../../../../../public/i18n/en.json';

@Injectable({
	providedIn: 'root'
})
export class LdrTranslateService {
	private labels: ResponseTranslateModel = {} as ResponseTranslateModel;
	private currentKey: string = '';

	private optionLang: OptionLangType = {
		es: dataES,
		en: dataEN
	};

	public use(lang: LangKeys): void {
		this.currentKey = lang;
		this.labels = this.optionLang[lang ? lang : 'es'];
	}

	public getCurrentKey(): string {
		return this.currentKey;
	}

	public translate(key: string): string {
		const foundAppKey = this.labels[key];
		return foundAppKey ? foundAppKey : '*****ERROR DE TRADUCCIÓN*****';
	}
}
