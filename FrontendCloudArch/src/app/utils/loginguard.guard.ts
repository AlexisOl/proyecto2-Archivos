import { CanMatchFn } from '@angular/router';

export const loginguardGuard: CanMatchFn = (route, segments) => {
  return true;
};
