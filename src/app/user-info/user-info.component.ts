import { Component, OnInit } from '@angular/core';
import { UserInfoService } from './user-info.service';
import { UserInformation } from './user-info';
import { clone } from 'lodash';

@Component({
    selector: 'app-product',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.css']
})
export class ProductComponent implements OnInit {

    userInfo: UserInformation[] = [];
    userForm: Boolean = false;
    editUserForm: Boolean = false;
    isNewForm: boolean;
    newUser: any = {};
    editedUser: any = {};

    constructor(private _userInfoService: UserInfoService) { }

    ngOnInit() {
        this.getProducts();
    }

    getProducts() {
        this._userInfoService.getUserInfo().subscribe((userInfo) => {
            this.userInfo = userInfo;
        });
    }

    showEditProductForm(product: UserInformation) {
        if (!product) {
            this.userForm = false;
            return;
        }
        this.editUserForm = true;
        this.editedUser = clone(product);
    }

    showAddProductForm() {
        // resets form if edited product
        if (this.userInfo.length) {
            this.newUser = {};
        }
        this.userForm = true;
        this.isNewForm = true;
    }

    saveProduct(product: UserInformation) {
        if (this.isNewForm) {
            // add new product
            this._userInfoService.addUserData(product).subscribe((data: any) => {
                this._userInfoService.getUserInfo().subscribe((userInfo) => {
                    this.userInfo = userInfo;
                });
            } );
        }
        this.userForm = false;
    }

    updateProduct() {
        this._userInfoService.updateUserData(this.editedUser).subscribe((data: any) => {
            this._userInfoService.getUserInfo().subscribe((userInfo) => {
                this.userInfo = userInfo;
            });
        });

        this.editUserForm = false;
        this.editedUser = {};
    }

    removeProduct(userData: UserInformation) {
        this._userInfoService.deleteUserData(userData.id).subscribe(() => {
            this._userInfoService.getUserInfo().subscribe((userInfo) => {
                this.userInfo = userInfo;
            });
        });
    }

    cancelnewUser() {
        this.newUser = {};
        this.userForm = false;
    }

    cancelEdits() {
        this.editedUser = {};
        this.editUserForm = false;
    }


}
