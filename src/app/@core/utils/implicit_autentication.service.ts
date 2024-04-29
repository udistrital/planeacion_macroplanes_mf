import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import {Md5} from 'ts-md5';
import Swal from 'sweetalert2';
import { delay, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, UserService, UserSubscriber } from '../models/usuario';
@Injectable({
    providedIn: 'root',
})

export class ImplicitAutenticationService {
    environment = environment.TOKEN;
    logoutUrl: any;
    params: any;
    payload: any;
    timeActiveAlert: number = 4000;
    isLogin = false;
    private timeLogoutBefore = 1000; // logout before in miliseconds
    private timeAlert = 300000; // alert in miliseconds 5 minutes

    private userSubject = new BehaviorSubject({} as UserSubscriber);
    public user$ = this.userSubject.asObservable();

    private menuSubject = new BehaviorSubject({});
    public menu$ = this.menuSubject.asObservable();

    private logoutSubject = new BehaviorSubject('');
    public logout$ = this.logoutSubject.asObservable();

    httpOptions: { headers: HttpHeaders; } | undefined;
    constructor(private httpClient: HttpClient) {
        this.init(this.environment);
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === 'visible') {
                const expires = this.setExpiresAt();
                this.autologout(expires as Date);
            }
        });
    }
    init(entorno: any): any {
        this.environment = entorno;
        const id_token = window.localStorage.getItem('id_token');

        if (id_token === null) {
            var params: any = {}, queryString = location.hash.substring(1), regex = /([^&=]+)=([^&]*)/g;
            let m;
            while (m = regex.exec(queryString)) {
                params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
            }
            // And send the token over to the server
            const req = new XMLHttpRequest();
            // consider using POST so query isn't logged
            const query = 'https://' + window.location.host + '?' + queryString;
            req.open('GET', query, true);
            if (!!params['id_token']) {
                //if token setear
                const id_token_array = (params['id_token']).split('.');
                const payload = JSON.parse(atob(id_token_array[1]));
                window.localStorage.setItem('access_token', params['access_token']);
                window.localStorage.setItem('expires_in', params['expires_in']);
                window.localStorage.setItem('state', params['state']);
                window.localStorage.setItem('id_token', params['id_token']);
                // this.userSubject.next({ user: payload });
                this.httpOptions = {
                    headers: new HttpHeaders({
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${params['access_token']}`,
                    }),
                };
                this.updateAuth(payload);
            } else {
                this.clearStorage();
            }
            req.onreadystatechange = function (e) {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        // window.location = params.state;
                    } else if (req.status === 400) {
                        window.alert('There was an error processing the token.');
                    } else {

                    }
                }
            };
        } else {
            const id_tokenString = window.localStorage.getItem('id_token');
            var id_token2 = null;
            if (id_tokenString !== null){
                id_token2 = id_tokenString.split('.')
                const payload = JSON.parse(atob(id_token2[1]));
                this.updateAuth(payload);
            }
        }
        this.autologout(this.setExpiresAt() as Date);
        this.clearUrl();
    }


    updateAuth(payload: User) {
        const user = localStorage.getItem('user');
        if (user) {
            this.userSubject.next(JSON.parse(atob(user)));
        } else {
            this.httpOptions = {
              headers: new HttpHeaders({
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              }),
            };
            this.httpClient
              .post<any>(
                this.environment.AUTENTICACION_MID,
                {
                  user: payload.email,
                },
                this.httpOptions
              )
              .pipe(retry(3))
              .subscribe({
                next: (res: UserService) => {
                  this.clearUrl();
                  localStorage.setItem(
                    'user',
                    btoa(
                      JSON.stringify({
                        ...{ user: payload },
                        ...{ userService: res },
                      })
                    )
                  );
                  this.userSubject.next({
                    ...{ user: payload },
                    ...{ userService: res },
                  });
                },
                error: (error) => console.error(error),
              });
            this.httpOptions = {
              headers: new HttpHeaders({
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              }),
            };
        }
    }

    public logout(action: string): void {
        const state = localStorage.getItem('state');
        const idToken = localStorage.getItem('id_token');
        if (!!state && !!idToken) {
            this.logoutUrl = this.environment.SIGN_OUT_URL;
            this.logoutUrl += '?id_token_hint=' + idToken;
            this.logoutUrl += '&post_logout_redirect_uri=' + this.environment.SIGN_OUT_REDIRECT_URL;
            this.logoutUrl += '&state=' + state;
            this.clearStorage();
            this.logoutSubject.next(action);
            window.location.replace(this.logoutUrl);
        }
    }

    public getRole() {
        const rolePromise = new Promise<string[]>((resolve, _) => {
            this.user$
            .subscribe(({ user, userService }) => {
                const roleUser = typeof user.role !== 'undefined' ? user.role : [];
                const roleUserService = typeof userService.role !== 'undefined' ? userService.role : [];
                const roles = (roleUser.concat(roleUserService)).filter((data) => (data.indexOf('/') === -1));
                resolve(roles);
            });
        });
        return rolePromise;
    }

    public clearUrl() {
        const clean_uri = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, clean_uri);
    }

    public setExpiresAt(): false | Date {
        const expiresAt = localStorage.getItem('expires_at');
        if (!expiresAt || expiresAt === 'Invalid Date') {
            const expiresAtDate = new Date();
            const expiresInString = window.localStorage.getItem('expires_in');
            const expiresIn = expiresInString !== null ? parseInt(expiresInString, 10) : 0;
            expiresAtDate.setSeconds(expiresAtDate.getSeconds() + expiresIn);
            window.localStorage.setItem('expires_at', new Date(expiresAtDate).toUTCString());
            return new Date(expiresAtDate);
        } else {
            return expiresAt === 'Invalid Date' ? false : new Date(expiresAt);
        }
    }

    autologout(expires: string | number | Date): void {
        if (expires) {
            this.isLogin = true;
            const expiresIn = ((new Date(expires)).getTime() - (new Date()).getTime());
            if (expiresIn < this.timeLogoutBefore) {
                this.clearStorage();
                this.logoutSubject.next('logout-auto-only-localstorage');
                location.reload();
            } else {
                const timerDelay = expiresIn > this.timeLogoutBefore ? expiresIn - this.timeLogoutBefore : this.timeLogoutBefore;
                if (!isNaN(expiresIn)) {
                    console.log(`%cFecha expiración: %c${new Date(expires)}`, 'color: blue', 'color: green');
                    of(null).pipe(delay(timerDelay - this.timeLogoutBefore)).subscribe((data) => {
                        this.logout('logout-auto');
                    });
                    if (this.timeAlert < timerDelay) {
                        of(null).pipe(delay(timerDelay - this.timeAlert)).subscribe((data) => {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'info',
                                title: `Su sesión se cerrará en ${this.timeAlert / 60000} minutos`,
                                showConfirmButton: false,
                                timer: this.timeActiveAlert
                            });
                        });
                    }
                }
            }
        }
    }

    public clearStorage() {
        this.isLogin = false;
        window.localStorage.clear();
        window.sessionStorage.clear();
    }

}
