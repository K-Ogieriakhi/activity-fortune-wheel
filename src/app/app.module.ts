import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RaffleDrumComponent } from "./components/raffle-drum/raffle-drum.component";
import { RaffleTicketComponent } from "./components/raffle-ticket/raffle-ticket.component";
import { PriceDialogComponent } from "./components/price-dialog/price-dialog.component";
import { DialogModule } from "@angular/cdk/dialog";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UILoaderModule } from "./ui-loader.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    RaffleDrumComponent,
    RaffleTicketComponent,
    PriceDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    DialogModule,
    FormsModule,
    HttpClientModule,
    UILoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
