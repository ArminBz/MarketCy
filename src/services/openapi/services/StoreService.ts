/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BasketSchema } from '../models/BasketSchema';
import type { PagedCategorySchema } from '../models/PagedCategorySchema';
import type { PagedProductSchema } from '../models/PagedProductSchema';
import type { ProductSchema } from '../models/ProductSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StoreService {

    /**
     * Get categories
     * Get categories
     * @param page
     * @returns PagedCategorySchema OK
     * @throws ApiError
     */
    public static getCategories(
        page: number = 1,
    ): CancelablePromise<PagedCategorySchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/store/categories',
            query: {
                'page': page,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Get products
     * Get products
     * @param page
     * @returns PagedProductSchema OK
     * @throws ApiError
     */
    public static getProducts(
        page: number = 1,
    ): CancelablePromise<PagedProductSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/store/products',
            query: {
                'page': page,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Get product
     * Get product
     * @param productId
     * @returns ProductSchema OK
     * @throws ApiError
     */
    public static getProduct(
        productId: number,
    ): CancelablePromise<ProductSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/store/products/{product_id}',
            path: {
                'product_id': productId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Get basket
     * Get basket
     * @param productId
     * @returns BasketSchema OK
     * @throws ApiError
     */
    public static getBasket(
        productId: number,
    ): CancelablePromise<BasketSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/store/basket',
            query: {
                'product_id': productId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

}
