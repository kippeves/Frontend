import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';


export const RefreshGuard: CanDeactivateFn<ComponentCanDeactivate> = a => {
  return a.canDeactivate() ? true : false
}

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}