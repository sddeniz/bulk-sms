import {Injectable, OnInit, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {ToastrService} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';
import * as firebase from 'firebase/app';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginResponsePayload} from '../../model/loginResponsePayload';
import {SignupResponseModel} from '../../model/SignupResponseModel';
import {Users} from '../../model/users';


export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
}
declare var require;
const Swal = require('sweetalert2')

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {
    public userData: any;
    public user: firebase.User;
    public showLoader = false;

    constructor(public afs: AngularFirestore,
                private httpClient: HttpClient,
                public afAuth: AngularFireAuth,
                public router: Router,
                public ngZone: NgZone,
                public toster: ToastrService,
                private cookieService: CookieService) {

        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                cookieService.set('user', JSON.stringify(this.userData));
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    // tslint:disable-next-line:contextual-lifecycle
    ngOnInit(): void {
    }


    // tslint:disable-next-line:typedef
    SendVerificationMail() {
        return this.afAuth.auth.currentUser.sendEmailVerification()
            .then(() => {
                this.router.navigate(['/auth/login']);
            });
    }

    // tslint:disable-next-line:typedef
    public signup(body) {
        this.httpClient.post<SignupResponseModel>(
            'http://localhost:8080/auth/signup',
            body
        ).subscribe(data => {
            Swal.fire('.ایمیلی جهت تایید برای شما ارسال شد')
        })
        ;
    }

    // tslint:disable-next-line:typedef
    public signin(email, password) {
        this.httpClient.post<any>(
            'http://localhost:8080/auth/login',

            {
                email,
                password,
            },
            {headers: new HttpHeaders({'Content-Type': 'application/json'})},
        ).subscribe(data => {
            this.router.navigate(['/home']);
            localStorage.setItem('token', data);
        })
        ;
    }

    // tslint:disable-next-line:typedef
    public sendSms(body) {
        this.httpClient.post<any>(
            'http://localhost:8080/api/sms/send',
            body
        ).subscribe(data => {
            Swal.fire('.ارسال پیامک با موفقیت انجام شد')

        })
        ;
    }

    public sendBatchFile(body) {
        this.httpClient.post<any>(
            'http://localhost:8080/api/sms/sendBatchFile', body).subscribe(data => {
            Swal.fire('.ارسال پیامک انبوه با موفقیت انجام شد')

        });
    }

    public getUsers() {
        return this.httpClient.get<Users>('http://localhost:8080/auth/users');
    }


    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        // tslint:disable-next-line:triple-equals
        return (user != null && user.emailVerified != false) ? true : false;
    }

}
