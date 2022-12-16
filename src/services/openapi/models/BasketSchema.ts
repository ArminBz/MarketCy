/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductSchema } from './ProductSchema';

export type BasketSchema = {
    id?: number;
    products?: Array<ProductSchema>;
};

