import axios from 'axios';
import { ArtiRequest } from '../models/arti-request.model';
import { ArtiResponse } from '../models/arti-response.model';

export async function getArti(request: ArtiRequest): Promise<ArtiResponse> {
  const response = await axios.post<ArtiResponse>(
    'http://172.29.150.12:5000/analyze_code',
    request,
  );
  return response.data;
}
