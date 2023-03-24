import {
  type ApiResponseErrorsData,
  type ApiResponseWithData
} from '../../../all';

export interface ApiResponseWithErrorsData extends ApiResponseWithData<ApiResponseErrorsData> {}
