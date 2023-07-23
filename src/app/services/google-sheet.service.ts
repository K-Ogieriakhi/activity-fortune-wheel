import { Injectable } from "@angular/core";
import { environment } from "../environments/environments";
import { BehaviorSubject } from "rxjs";
import { ClientStatus } from "../models/client.model";

declare var gapi: any;

@Injectable({
  providedIn: "root",
})
export class GoogleSheetService {
  private apiKey: string = environment.apiKey;
  private spreadsheetId: string = environment.spreadsheetId;
  public clientStatus$: BehaviorSubject<ClientStatus> =
    new BehaviorSubject<ClientStatus>({
      initializing: false,
      success: false,
      error: false,
    });

  constructor() {
    gapi.load("client", this.initClient.bind(this));
  }

  private initClient() {
    this.clientStatus$.next({
      initializing: true,
      success: false,
      error: false,
    });

    gapi.client
      .init({
        apiKey: this.apiKey,
        discoveryDocs: [
          "https://sheets.googleapis.com/$discovery/rest?version=v4",
        ],
      })
      .then(() => {
        this.clientStatus$.next({
          initializing: false,
          success: true,
          error: false,
        });
      })
      .catch(() => {
        this.clientStatus$.next({
          initializing: false,
          success: false,
          error: true,
        });
      });
  }

  /**
   *
   * @param range example range 'Sheet1!A1:B10'
   * @returns
   */
  public getSheetData(range: string): Promise<{
    result: {
      range: string;
      majorDimension: string;
      values: Array<Array<string>>;
    };
  }> {
    return gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range, // Change to your desired sheet name or range
      includeGridData: true,
    });
  }
}
