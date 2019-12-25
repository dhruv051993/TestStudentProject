import { Component, OnInit } from '@angular/core';
import { UserInfoService } from './user-info.service';
import { UserInformation } from './user-info';
import { clone } from 'lodash';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

    userInfo: UserInformation[];
    displayFormType: string;
    userForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private _userInfoService: UserInfoService
    ) { }

    ngOnInit() {
        this.createForm();
        this.getUserInfo();
    }

    createForm(): void {
        this.userForm = this.fb.group({
            id: [''],
            fName: ['', Validators.required],
            lName: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            phoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10,10}$')]],
            status: [true, Validators.required],
        });
    }

    getUserInfo() {
        this._userInfoService.getUserInfo().subscribe(userInfo => this.userInfo = userInfo);
    }

    displayInfoForm(userInfo?: UserInformation) {
        if (userInfo) {
            this.userForm.controls.id.setValue(userInfo.id);
            this.userForm.controls.fName.setValue(userInfo.fName);
            this.userForm.controls.lName.setValue(userInfo.lName);
            this.userForm.controls.email.setValue(userInfo.email);
            this.userForm.controls.phoneNo.setValue(userInfo.phoneNo);
            this.userForm.controls.status.setValue(userInfo.status === 'active' ? true : false);
            this.displayFormType = 'edit';
        } else {
            this.displayFormType = 'save';
        }
    }

    saveUserInfo() {
        const payload = this.userForm.getRawValue();
        delete payload.id;
        payload.status ? payload.status = 'active' : payload.status = 'inactive';
        this._userInfoService.addUserData(payload).subscribe((data: any) => {
            this.getUserInfo();
            this.cancel();
        });
    }

    updateUserInfo() {
        const payload = this.userForm.getRawValue();
        payload.status ? payload.status = 'active' : payload.status = 'inactive';
        this._userInfoService.updateUserData(payload).subscribe((data: any) => {
            this.getUserInfo();
            this.cancel();
        });
    }

    cancel() {
        this.displayFormType = undefined;
        this.createForm();
    }

    removeUserInfo(userData: UserInformation) {
        this._userInfoService.deleteUserData(userData.id).subscribe(() => this.getUserInfo());
    }

}
