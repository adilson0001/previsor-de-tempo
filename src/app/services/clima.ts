import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClimaService {
  constructor(private http: HttpClient) {}

  buscarClimaPorCidade(nomeCidade: string) {
    // 1. Endpoint de Geocodificação (Transforma nome em Lat/Lon)
    const urlGeo = `https://geocoding-api.open-meteo.com/v1/search?name=${nomeCidade}&count=1&language=pt&format=json`;

    return this.http.get<any>(urlGeo).pipe(
      switchMap(res => {
        const local = res.results[0]; // Pega o primeiro resultado
        // 2. Endpoint de Clima (Usa a Lat/Lon que acabou de chegar)
        const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${local.latitude}&longitude=${local.longitude}&current=temperature_2m`;
        
        return this.http.get<any>(urlClima);
      })
    );
  }
}