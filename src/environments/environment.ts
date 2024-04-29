// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appname: 'PLANEACION',
  PLANES_CRUD: 'http://pruebasapi2.intranetoas.udistrital.edu.co:8523/',
  PLANEACION_ARBOL_MID: 'http://pruebasapi.intranetoas.udistrital.edu.co:8550/v1/',
  PARAMETROS_SERVICE: 'http://pruebasapi.intranetoas.udistrital.edu.co:8510/v1/',
  GESTOR_DOCUMENTAL_MID: 'http://pruebasapi2.intranetoas.udistrital.edu.co:8199/v1/',
  TOKEN: {
    AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
    CLIENTE_ID: 'e36v1MPQk2jbz9KM4SmKhk8Cyw0a',
    RESPONSE_TYPE: 'id_token token',
    SCOPE: 'openid email',
    REDIRECT_URL: 'http://localhost:4200/',
    SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
    SIGN_OUT_REDIRECT_URL: 'http://localhost:4200/',
    AUTENTICACION_MID: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/autenticacion_mid/v1/token/userRol',
  },
}
