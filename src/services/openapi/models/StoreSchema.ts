/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type StoreSchema = {
    id?: number;
    name: string;
    address?: string;
    whatsapp?: string;
    description?: string;
    /**
     * Minimum order in TL
     */
    min_order?: number;
    thumb?: string;
};

