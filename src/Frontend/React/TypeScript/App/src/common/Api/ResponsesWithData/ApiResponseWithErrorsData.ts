import { type ApiResponseWithData } from '../ApiResponseWithData';
import { type ApiResponseErrorsData } from '../ResponseData';

export interface ApiResponseWithErrorsData extends ApiResponseWithData<ApiResponseErrorsData> {}
