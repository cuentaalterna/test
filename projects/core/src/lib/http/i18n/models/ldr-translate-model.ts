export interface ResponseTranslateModel {
	[key: string]: string;
}

export type LangKeys = 'es' | 'en';
export type OptionLangType = { [K in LangKeys]: ResponseTranslateModel };
