// src/utils/GoogleAPI.ts
import { gapi } from 'gapi-script';

export const CLIENT_ID = '77177789412-ksoqlsc8qa43g107cgaek08339nedf4p.apps.googleusercontent.com';
export const API_KEY = 'AIzaSyBeTSIrgeKtYQ6PrMr56SH0FY9-dkpnkSc';
export const SCOPES = 'https://www.googleapis.com/auth/calendar.events';
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

export const initGoogleAPI = () => {
    return new Promise<void>((resolve, reject) => {
        gapi.load("client:auth2", async () => {
            try {
                await gapi.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES,
                });
                resolve();
            } catch (error) {
                console.error("GAPI Init Error", error);
                reject(error);
            }
        });
    });
};