import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardComponent } from './components/card/card.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { SearchbarComponent } from './components/searchbar/searchbar.component';


@NgModule({
  declarations: [
    CardComponent,
    CardListComponent,
    HomePageComponent,
    SearchbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class GifsModule { }
