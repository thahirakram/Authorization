import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, observable, Observable, from} from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import {environment as env} from '../environment';
@Injectable({ providedIn: 'root'})
export class AuthenticationService {
    
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }


    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${env.apiUrl}/login`, {username, password}).pipe(map(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return User;
        }))
    }


    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}