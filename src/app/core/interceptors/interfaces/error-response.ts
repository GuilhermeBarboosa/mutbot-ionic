import { SnackType } from './../../../shared/services/snackbar.service';

export interface ErrorResponse {
  type: SnackType;
  description: string;
}
