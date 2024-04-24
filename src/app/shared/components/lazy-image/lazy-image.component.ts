import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {
  @Input()
  public src!: string;

  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;

  public onLoad(): void {
    this.hasLoaded = true;
  }

  ngOnInit(): void {
    if (!this.src) throw new Error('src attribute is required');
  }
}
