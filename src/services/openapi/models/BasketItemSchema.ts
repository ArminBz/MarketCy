/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StoreProductSchema } from './StoreProductSchema';

export type BasketItemSchema = {
    id?: number;
    quantity?: number;
    store_product: StoreProductSchema;
    total_price: number;
};

