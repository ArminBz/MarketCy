/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StoreProductSchema } from './StoreProductSchema';

export type OrderItemSchema = {
    id?: number;
    quantity?: number;
    price: number;
    total?: number;
    product: StoreProductSchema;
};

