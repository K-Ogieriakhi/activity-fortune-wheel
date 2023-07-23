import { NgModule } from "@angular/core";
import {
  NgxUiLoaderConfig,
  NgxUiLoaderModule,
  POSITION,
  SPINNER,
} from "ngx-ui-loader";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#ffbf00",
  fgsColor: "#ffbf00",
  pbColor:"#ffbf00",
  bgsPosition: POSITION.centerCenter,
  bgsSize: 40,
  bgsType: SPINNER.ballSpinClockwise, // background spinner type
  fgsType: SPINNER.ballSpinClockwise, // foreground spinner type
  pbThickness: 5, // progress bar thickness
  minTime:2500,
  maxTime:5000,
};

@NgModule({
  imports: [NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)],
  exports: [NgxUiLoaderModule],
})
export class UILoaderModule {}
