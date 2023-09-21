// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BASE_URL: 'http://localhost:8080',
  firebase: {
    projectId: 'propertyforyou-b8d1b',
    appId: '1:694064706265:web:bbe473a939275a660284c8',
    storageBucket: 'propertyforyou-b8d1b.appspot.com',
    apiKey: 'AIzaSyCsh-QWXivS_Zf04hGn2u3LJWOcToTWXTw',
    authDomain: 'propertyforyou-b8d1b.firebaseapp.com',
    messagingSenderId: '694064706265',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
