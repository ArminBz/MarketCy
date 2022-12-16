/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginOutSchema } from '../models/LoginOutSchema';
import type { Message } from '../models/Message';
import type { UserSchema } from '../models/UserSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Login or Signup
     * Login or Signup
     * @param formData
     * @returns Message OK
     * @throws ApiError
     */
    public static login(
        formData: {
            phone: string;
        },
    ): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

    /**
     * OTP
     * OTP
     * @param formData
     * @returns LoginOutSchema OK
     * @throws ApiError
     */
    public static otp(
        formData: {
            phone: string;
            code: string;
        },
    ): CancelablePromise<LoginOutSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/otp',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Get current user
     * Get current user
     * @returns UserSchema OK
     * @throws ApiError
     */
    public static getMe(): CancelablePromise<UserSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/users/me',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Update current user
     * Update current user
     * @param formData
     * @returns UserSchema OK
     * @throws ApiError
     */
    public static updateMe(
        formData: {
            first_name?: string;
            last_name?: string;
            email?: string;
        },
    ): CancelablePromise<UserSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/me',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

}
