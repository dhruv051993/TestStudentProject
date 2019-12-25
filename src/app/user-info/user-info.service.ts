import { Injectable } from '@angular/core';
import { UserInformation } from './user-info';
// import { PRODUCT_ITEMS } from './product-data';
import { findIndex } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {
    // private pItems = [PRODUCT_ITEMS];
    private pItems = [];
    private userUrl = 'api/userData';

    constructor(private http: HttpClient) { }

    getUserInfo(): Observable<UserInformation[]> {
        return this.http.get<UserInformation[]>(this.userUrl);
    }

    addUserData(product: UserInformation): Observable<UserInformation> {
        return this.http.post<UserInformation>(this.userUrl, product);
    }

    updateUserData(userInfo: UserInformation): Observable<UserInformation> {
        const url = `${this.userUrl}/${userInfo.id}`;
        return this.http.put<UserInformation>(url, userInfo);
    }

    deleteUserData(userId: number): Observable<{}> {
        const url = `${this.userUrl}/${userId}`;

        return this.http.delete<UserInformation>(url);
    }
}
