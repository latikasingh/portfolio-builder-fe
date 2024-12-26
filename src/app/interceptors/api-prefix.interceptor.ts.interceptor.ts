import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export const apiPrefixInterceptorTsInterceptor: HttpInterceptorFn = (
  req,
  next,
) => {
  const baseUrl = environment.BASE_URL;

  if (!req.url.startsWith('http') && !req.url.startsWith(baseUrl)) {
    const apiReq = req.clone({ url: `${baseUrl}${req.url}` });
    return next(apiReq);
  }

  return next(req);
};
