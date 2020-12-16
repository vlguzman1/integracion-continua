import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MomentModule } from 'ngx-moment';
import { NgxCurrencyModule } from "ngx-currency";
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { NgScrollbarModule } from 'ngx-scrollbar';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
};

import { SharedModule } from '@shared/shared.module';
import { HomepageRouting } from './homepage.routing';
import * as fromComponents from './components';
import * as fromServices from './services';

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    SharedModule,
  ],
})

export class HomepageModule { }
