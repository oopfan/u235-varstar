import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, concatMap, tap } from 'rxjs/operators';

@Injectable()
export class LoadingService {
    private loadingSubject = new BehaviorSubject(false);
    loading = this.loadingSubject.asObservable();

    showLoadingUntilCompleted<T>(observable: Observable<T>): Observable<T> {
        return of(null).pipe(tap(() => this.loadingOn()), concatMap(() => observable), finalize(() => this.loadingOff()));
    }
    loadingOn() {
        this.loadingSubject.next(true);
    }
    loadingOff() {
        this.loadingSubject.next(false);
    }
}