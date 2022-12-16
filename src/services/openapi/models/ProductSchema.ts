/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CategorySchema } from './CategorySchema';

export type ProductSchema = {
    name: string;
    category: CategorySchema;
    description?: string;
    id?: number;
    attributes?: any;
    thumb?: string;
};

