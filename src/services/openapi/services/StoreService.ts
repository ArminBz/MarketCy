/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BasketSchema } from '../models/BasketSchema';
import type { Message } from '../models/Message';
import type { OrderSchema } from '../models/OrderSchema';
import type { PagedCategorySchema } from '../models/PagedCategorySchema';
import type { PagedStoreProductSchema } from '../models/PagedStoreProductSchema';
import type { PagedStoreSchema } from '../models/PagedStoreSchema';
import type { ProductSchema } from '../models/ProductSchema';
import type { StoreSchema } from '../models/StoreSchema';

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
     * Get stores
     * Get stores
     * @param page
     * @returns PagedStoreSchema OK
     * @throws ApiError
     */
    public static getStores(
        page: number = 1,
    ): CancelablePromise<PagedStoreSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/store/stores',
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
     * Get store
     * Get store
     * @param storeId
     * @returns StoreSchema OK
     * @throws ApiError
     */
    public static getStore(
        storeId: number,
    ): CancelablePromise<StoreSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/store/stores/{store_id}',
            path: {
                'store_id': storeId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Get products of store
     * Get products of store
     * @param storeId
     * @param categoryId
     * @param search
     * @param page
     * @returns PagedStoreProductSchema OK
     * @throws ApiError
     */
    public static getProducts(
        storeId: number,
        categoryId?: number,
        search?: string,
        page: number = 1,
    ): CancelablePromise<PagedStoreProductSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/store/products/{store_id}',
            path: {
                'store_id': storeId,
            },
            query: {
                'category_id': categoryId,
                'search': search,
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
     * @param storeId
     * @returns BasketSchema OK
     * @throws ApiError
     */
    public static getBasket(
        storeId: number,
    ): CancelablePromise<BasketSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/store/baskets/{store_id}',
            path: {
                'store_id': storeId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Update basket
     * Update basket
     * @param storeId
     * @param productId
     * @param quantity
     * @returns BasketSchema OK
     * @throws ApiError
     */
    public static updateBasket(
        storeId: number,
        productId: number,
        quantity: number,
    ): CancelablePromise<BasketSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/store/baskets/{store_id}/update_basket',
            path: {
                'store_id': storeId,
            },
            query: {
                'product_id': productId,
                'quantity': quantity,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Delete basket item
     * Delete basket item
     * @param storeId
     * @param productId
     * @returns BasketSchema OK
     * @throws ApiError
     */
    public static deleteBasketItem(
        storeId: number,
        productId: number,
    ): CancelablePromise<BasketSchema> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/store/baskets/{store_id}/delete_basket_item',
            path: {
                'store_id': storeId,
            },
            query: {
                'product_id': productId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Empty basket
     * Empty basket
     * @param storeId
     * @returns Message OK
     * @throws ApiError
     */
    public static emptyBasket(
        storeId: number,
    ): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/store/baskets/{store_id}/empty_basket',
            path: {
                'store_id': storeId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Checkout
     * Checkout
     * @param storeId
     * @param address
     * @param paymentMethod
     * @returns Message OK
     * @throws ApiError
     */
    public static checkout(
        storeId: number,
        address: string,
        paymentMethod: string,
    ): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/store/baskets/{store_id}/checkout',
            path: {
                'store_id': storeId,
            },
            query: {
                'address': address,
                'payment_method': paymentMethod,
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
     * @param barcode
     * @returns ProductSchema OK
     * @throws ApiError
     */
    public static adminGetProduct(
        barcode: string,
    ): CancelablePromise<ProductSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/store/admin/product',
            query: {
                'barcode': barcode,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Create product
     * Create product
     * @param formData
     * @returns Message OK
     * @throws ApiError
     */
    public static adminCreateProduct(
        formData: {
            barcode: number;
            price: number;
            discount_price?: number;
            available?: boolean;
        },
    ): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/store/admin/product',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Get orders
     * Get orders
     * @param status
     * @returns OrderSchema OK
     * @throws ApiError
     */
    public static adminGetOrders(
        status?: string,
    ): CancelablePromise<Array<OrderSchema>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/store/admin/orders',
            query: {
                'status': status,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Update order status
     * Update order status
     * @param orderId
     * @param status
     * @returns Message OK
     * @throws ApiError
     */
    public static adminUpdateOrderStatus(
        orderId: number,
        status: string,
    ): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/store/admin/orders/{order_id}/update_status',
            path: {
                'order_id': orderId,
            },
            query: {
                'status': status,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

}
