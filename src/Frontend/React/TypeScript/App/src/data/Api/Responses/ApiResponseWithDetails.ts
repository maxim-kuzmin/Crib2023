import {
  type ApiResponseDataWithDetails,
  type ApiResponseWithData
} from '../../../all';

export interface ApiResponseWithDetails extends ApiResponseWithData<ApiResponseDataWithDetails> {}
