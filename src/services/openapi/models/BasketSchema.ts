/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BasketItemSchema } from './BasketItemSchema';

export type BasketSchema = {
    id?: number;
    items?: Array<BasketItemSchema>;
    total_price?: number;
};

