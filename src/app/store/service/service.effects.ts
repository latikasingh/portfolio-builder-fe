import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';
import { ServiceService } from '../../services/service.service';
import {
  addService,
  addServiceError,
  addServiceSuccess,
  getIcons,
  getIconsError,
  getIconsSuccess,
  getServiceData,
  getServiceDataError,
  getServiceDataSuccess,
  updateService,
  updateServiceError,
  updateServiceSuccess,
} from './service.action';

@Injectable()
export class ServiceEffects {
  private actions$ = inject(Actions);
  private alertService = inject(AlertService);
  private serviceService = inject(ServiceService);

  getServices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getServiceData),
      exhaustMap(() =>
        this.serviceService.getServiceData().pipe(
          map((response) => {
            return getServiceDataSuccess({ services: response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              getServiceDataError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  getIcons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getIcons),
      exhaustMap((props) =>
        this.serviceService.getIconsData(props.iconName).pipe(
          map((response) => {
            return getIconsSuccess({ icons: response.icons });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              getIconsError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  addService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addService),
      exhaustMap((props) =>
        this.serviceService.addService(props.payload).pipe(
          map((response) => {
            this.alertService.displaySuccessToasts(
              'Service data added successfully.',
            );
            return addServiceSuccess({ service: response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              addServiceError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  updateService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateService),
      exhaustMap((props) =>
        this.serviceService.updateService(props.payload, props.id).pipe(
          map((response) => {
            this.alertService.displaySuccessToasts(
              'Service data updated successfully.',
            );

            return updateServiceSuccess({ service: response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              updateServiceError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );
}
