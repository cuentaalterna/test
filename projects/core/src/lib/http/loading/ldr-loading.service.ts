import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LdrLoadingService {
	loading = signal(false);

	set(state: boolean) {
		this.loading.set(state);
	}

	isLoading() {
		return this.loading();
	}
}
