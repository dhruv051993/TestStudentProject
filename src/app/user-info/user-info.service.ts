import { Injectable } from '@angular/core';
import { UserInformation } from './user-info';
import { findIndex } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserInfoService {

    constructor(private http: HttpClient) { }

    getUserInfo(): Observable<UserInformation[]> {
        return this.http.get<UserInformation[]>(environment.userUrl);
    }

    addUserData(product: UserInformation): Observable<UserInformation> {
        return this.http.post<UserInformation>(environment.userUrl, product);
    }

    updateUserData(userInfo: UserInformation): Observable<UserInformation> {
        const url = `${environment.userUrl}/${userInfo.id}`;
        return this.http.put<UserInformation>(url, userInfo);
    }

    deleteUserData(userId: number): Observable<{}> {
        const url = `${environment.userUrl}/${userId}`;

        return this.http.delete<UserInformation>(url);
    }
}
