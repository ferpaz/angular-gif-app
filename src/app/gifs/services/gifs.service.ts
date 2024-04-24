import { Injectable } from '@angular/core';

const giphyApiKey: string = 'hTdTbUeFdrH75AI2f72mvIGaGAx5Rtzl';

@Injectable({
  providedIn: 'root'   // Esto hace que este servicio esté disponible en toda la aplicación
})
export class GifsService {

  private _searchHistory: string[] = [
    'Spiderman',
    'Superman',
    'Batman',
    'Wonder',
    'Flash',
    'Ironman',
    'Hulk',
    'Thor',
    'Aquaman',
    'Green Lantern'
  ];

  constructor() { }

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
  }

  public clearHistory(): void {
    this._searchHistory = [];
  }
}
