import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-bar',
  templateUrl: './searchbar.component.html'
})
export class SearchbarComponent {
  // Esto amarra el input con este nombre a la variable tagInput
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  public searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    if (newTag.trim().length === 0) {
      return;
    }

    this.gifsService.addToHistory(newTag);

    this.tagInput.nativeElement.value = '';
  }
}
