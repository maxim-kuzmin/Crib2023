import { type ApiResponseWithData } from '../Response/ApiResponseWithData';
import { type ApiResponseDataWithDetails } from '../Response/Data';

export interface ApiResponseWithDetails extends ApiResponseWithData<ApiResponseDataWithDetails> {}
