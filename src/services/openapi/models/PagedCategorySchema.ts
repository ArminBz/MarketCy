/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CategorySchema } from './CategorySchema';

export type PagedCategorySchema = {
    items?: Array<CategorySchema>;
    count: number;
};

