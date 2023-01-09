/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductSchema } from './ProductSchema';

export type StoreProductSchema = {
    id?: number;
    price: number;
    discount_price?: number;
    product: ProductSchema;
};

