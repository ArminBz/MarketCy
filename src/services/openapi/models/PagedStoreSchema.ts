/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StoreSchema } from './StoreSchema';

export type PagedStoreSchema = {
    items?: Array<StoreSchema>;
    count: number;
};

