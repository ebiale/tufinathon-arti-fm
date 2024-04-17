import axios from 'axios';
import { ArtiRequest } from '../models/arti-request.model';
import { ArtiResponse } from '../models/arti-response.model';

export async function getArti(request: ArtiRequest): Promise<ArtiResponse> {
  const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'http://172.29.150.12:5000/analyze_code';
  const response = await axios.post<ArtiResponse>(
    corsAnywhereUrl + apiUrl,
    request,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
}
