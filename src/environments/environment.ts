// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'dev',
  firebase: {
    config: {
      apiKey: "AIzaSyAPmg3go2TNSwqZYBysAj-qV9OGFwML-Z8",
      authDomain: "edificacion-app-d20d9.firebaseapp.com",
      projectId: "edificacion-app-d20d9",
      storageBucket: "edificacion-app-d20d9.appspot.com",
      messagingSenderId: "778179419714",
      appId: "1:778179419714:web:242643af819dc6fb8217db"
    }
  },
  url: 'http://localhost:5555/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
