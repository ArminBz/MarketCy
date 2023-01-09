/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductSchema } from './ProductSchema';

export type BasketItemSchema = {
    id?: number;
    quantity?: number;
    total_price?: number;
    store_product: ProductSchema;
};

