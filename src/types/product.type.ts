export type TProduct = {

    measurements: {
        measurement_id: string,
        nickname: string,
        quantity: string,
        segment_id: null | string,
        discount: number,
        discount_max: null | number,
        price: number,
        price_min: null | number,
        mixname: string,
        InventoryUnits: string
    }[],
    product_id: string,
    product_name: string,
    product_icon: null | string,
    product_fixed: string

};


// export type TProduct = { id: number, title: string }
// export type TProduct = { measurements: [], product_id: number, product_name: string, product_icon: null | string }