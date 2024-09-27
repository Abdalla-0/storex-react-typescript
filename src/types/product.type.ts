import { TMeasurement } from "./measurement";
export type TProduct = {

    measurements: TMeasurement[],
    product_id: string,
    product_name: string,
    product_icon: null | string,
    product_fixed: string
    quantity?: number | undefined,
};



