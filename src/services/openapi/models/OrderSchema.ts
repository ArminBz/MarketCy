/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderItemSchema } from './OrderItemSchema';

export type OrderSchema = {
    id?: number;
    payment_method?: string;
    address: string;
    status?: string;
    created_at: string;
    items?: Array<OrderItemSchema>;
    total?: number;
};

