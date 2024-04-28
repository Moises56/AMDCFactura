import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Localidades, marketLocals } from '../../interfaces/localidades.interfaces'


export interface Market {
  id: string;
  nombre_mercado: string;
  direccion: string;
  latitud: string;
  longitud: string;
  fecha_creacion: string;
  fecha_modificacion: string;
}

export interface newMarket {
  nombre_mercado?: string;
  direccion?: string;
  latitud?: string;
  longitud?: string;
  fecha_creacion?: string;
  fecha_modificacion?: string;
}

type ApiResponse = { message: string, status: string, data: Market[] }
type ApiResponseL = { message: string, status: string, data: Localidades[] }


@Injectable({
  providedIn: 'root'
})
export class MercadoService {

  http = inject(HttpClient);
  

  constructor(
    // private http: HttpClient
  ) { }


  //* @Mercados

  // Get all markets
  getAll(): Promise<ApiResponse> {
    return firstValueFrom(
      this.http.get<ApiResponse>(`${environment.urlMarket}/markets`)
    )
  }

  // Create a new market
  newMarket(data: newMarket): Promise<ApiResponse> {
    // console.log(data);
    return firstValueFrom(
      this.http.post<ApiResponse>(`${environment.urlMarket}/newMarket`, data)
    )
  }

  // Delete a market
  deleteMarket(id: string): Promise<ApiResponse> {
    return firstValueFrom(
      this.http.delete<ApiResponse>(`${environment.urlMarket}/deleteMarket/${id}`)
    )
  }

  // Update a market
  updateMarket( data: any, id: string): Promise<ApiResponse> {
    console.log(data);
    console.log(id);
    return firstValueFrom(
      this.http.put<ApiResponse>(`${environment.urlMarket}/updateMarket/${id}`, data)
    )
  }

  // Get a single market
  getMarket(id: string): Promise<Market> {
    return firstValueFrom(
      this.http.get<Market>(`${environment.urlMarket}/market/${id}`)
    )
  }

  //* @Locales

  // Get all locals
  getAllLocals(): Promise<ApiResponseL> {
    return firstValueFrom(
      this.http.get<ApiResponseL>(`${environment.urlMarket}/localidades`)
    )
  }

  // get market locals
  getMarketLocals(id: string): Promise<ApiResponseL> {
    return firstValueFrom(
      this.http.get<ApiResponseL>(`${environment.urlMarket}/marketsByLocalidad/${id}`)
    )
  }






}
