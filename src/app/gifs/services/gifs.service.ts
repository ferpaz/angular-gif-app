import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, GiphyAPIResponse } from '../interfaces/gifs.interfaces';

const GiphyApiKey: string = 'hTdTbUeFdrH75AI2f72mvIGaGAx5Rtzl';
const GyphyApiUrl: string = 'https://api.giphy.com/v1/gifs'

@Injectable({
  providedIn: 'root'   // Esto hace que este servicio esté disponible en toda la aplicación
})
export class GifsService {

  // Es la lista de gifs que se muestra en la página cuando se hace una búsqueda
  // se dejo publica en lugar de hacer un getter, porque la lista es volatil y se actualiza con cada búsqueda
  public gifList: Gif[] = [];

  // Lista de tags de búsqueda que se han hecho
  private _searchHistory: string[] = [];

  constructor(private httpClient: HttpClient) {
    this.GetLocalStorage();

    if (this._searchHistory.length > 0) {
      this.searchQuery(this._searchHistory[0]);
    }
  }

  public get searchHistory(): string[] {
    // Ojo que los arreglos en JS van por referencia, entonces si devolvemos el arreglo directamente, se puede modificar desde afuera
    return [...this._searchHistory];
  }

  public addToHistory(tag: string): void {
    tag = tag.trim().toLowerCase();

    // Elimina el tag si ya existe en el historial
    if (this._searchHistory.includes(tag)) {
      this._searchHistory = this._searchHistory.filter((t) => t !== tag);
    }

    // Agrega el tag nuevo al principio del historial
    this._searchHistory.unshift(tag);
    this._searchHistory = this._searchHistory.slice(0, 10);

    // Guarda el tag en el LocalStorage
    this.saveLocalStorage();

    // Realiza la búsqueda
    this.searchQuery(tag);
  }

  public clearHistory(): void {
    this._searchHistory = [];
    this.cleanLocalStorage();
  }

  ///
  /// Realiza la búsqueda de gifs en la API de Giphy
  ///

  private searchQuery(q: string, limit: number = 10): void {
    const url: string = `${GyphyApiUrl}/search`;

    const params = new HttpParams()
      .set('api_key', GiphyApiKey)
      .set('q', q)
      .set('limit', limit);

    // el valor de retorno es un Observable, porque se puede emitir valores en el futuro
    this.httpClient.get<GiphyAPIResponse>(url, { params }).subscribe((response) => {
      if (response.meta.status == 200) {
        this.gifList = response.data;
        //console.log(`Respuesta de la API: ${response.pagination.total_count} gifs encontrados.  Se muestran ${response.pagination.count} gifs la página ${response.pagination.offset}.`);
      }
      else {
        console.error(`Error en la respuesta de la API: ${response.meta.msg}`);
      }
    });
  }

  ///
  /// Manejo del LocalStorage
  ///

  private GetLocalStorage(): void {
    this._searchHistory = [];

    if (!localStorage.getItem('searchHistory')) return;

    const history = localStorage.getItem('searchHistory');
    if (!history) return;

    this._searchHistory = JSON.parse(history);
  }

  private saveLocalStorage(): void {
    localStorage.setItem('searchHistory', JSON.stringify(this._searchHistory));
  }

  private cleanLocalStorage(): void {
    localStorage.removeItem('searchHistory');
  }
}
