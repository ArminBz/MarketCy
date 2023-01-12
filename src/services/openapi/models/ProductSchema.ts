/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CategorySchema } from './CategorySchema';

export type ProductSchema = {
    name: string;
    category: CategorySchema;
    description?: string;
    attributes?: any;
    thumb?: string;
    price?: number;
    discount_price?: number;
    available?: boolean;
};

