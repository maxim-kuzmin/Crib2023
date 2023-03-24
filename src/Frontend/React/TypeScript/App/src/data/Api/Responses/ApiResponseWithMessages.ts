import {
  type ApiResponseDataWithMessages,
  type ApiResponseWithData
} from '../../../all';

export interface ApiResponseWithMessages extends ApiResponseWithData<ApiResponseDataWithMessages> {}
