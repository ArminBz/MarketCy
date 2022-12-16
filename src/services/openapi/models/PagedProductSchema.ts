/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductSchema } from './ProductSchema';

export type PagedProductSchema = {
    items?: Array<ProductSchema>;
    count: number;
};

