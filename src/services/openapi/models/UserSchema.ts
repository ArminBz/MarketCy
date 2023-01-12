/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StoreSchema } from './StoreSchema';

export type UserSchema = {
    id?: number;
    first_name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
    store?: StoreSchema;
};

