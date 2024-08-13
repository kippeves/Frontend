import { HttpInterceptorFn } from '@angular/common/http';

/*
    Lägger till JWT-token vid utgående API-anrop
*/

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("localUser");
  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
  return next(clonedReq);
};
