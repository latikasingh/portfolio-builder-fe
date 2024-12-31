import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';
import { PortfolioService } from '../../services/portfolio.service';
import {
  addPortfolioData,
  addPortfolioDataError,
  addPortfolioDataSuccess,
  deletePortfolioData,
  deletePortfolioDataError,
  deletePortfolioDataSuccess,
  getPortfolioData,
  getPortfolioDataError,
  getPortfolioDataSuccess,
  updatePortfolioData,
  updatePortfolioDataError,
  updatePortfolioDataSuccess,
} from './portfolio.action';

@Injectable()
export class PortfolioEffects {
  private actions$ = inject(Actions);
  private alertService = inject(AlertService);
  private portfolioService = inject(PortfolioService);

  addPortfolioData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPortfolioData),
      exhaustMap((props) =>
        this.portfolioService.addPortfolio(props.payload, props.images).pipe(
          map((response) => {
            this.alertService.displaySuccessToasts(
              'Portfolio data added successfully.',
            );
            return addPortfolioDataSuccess({ data: response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              addPortfolioDataError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  updatePortfolioData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePortfolioData),
      exhaustMap((props) =>
        this.portfolioService
          .updatePortfolio(props.payload, props.images, props.id)
          .pipe(
            map((response) => {
              this.alertService.displaySuccessToasts(
                'Portfolio data updated successfully.',
              );
              return updatePortfolioDataSuccess({ data: response });
            }),
            catchError((error) => {
              this.alertService.displayErrorToasts(error.error.message);

              return of(
                updatePortfolioDataError({
                  error: { message: error.message, statusCode: error.status },
                }),
              );
            }),
          ),
      ),
    ),
  );

  deletePortfolioData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePortfolioData),
      exhaustMap((props) =>
        this.portfolioService.deletePortfolio(props.id).pipe(
          map(() => {
            this.alertService.displaySuccessToasts(
              'Portfolio deleted successfully.',
            );
            return deletePortfolioDataSuccess({ id: props.id });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              deletePortfolioDataError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );

  getPortfolioData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPortfolioData),
      exhaustMap(() =>
        this.portfolioService.getPortfolio().pipe(
          map((response) => {
            return getPortfolioDataSuccess({ data: response });
          }),
          catchError((error) => {
            this.alertService.displayErrorToasts(error.error.message);

            return of(
              getPortfolioDataError({
                error: { message: error.message, statusCode: error.status },
              }),
            );
          }),
        ),
      ),
    ),
  );
}
