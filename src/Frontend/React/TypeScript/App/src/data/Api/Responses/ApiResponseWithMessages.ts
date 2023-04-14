import { type ApiResponseWithData } from '../Response/ApiResponseWithData';
import { type ApiResponseDataWithMessages } from '../Response/Data';

export interface ApiResponseWithMessages extends ApiResponseWithData<ApiResponseDataWithMessages> {}
