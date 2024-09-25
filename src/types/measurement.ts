export type TMeasurement = {
    measurement_id: string,
    nickname: string,
    quantity: string,
    segment_id: string | null,
    discount: number,
    discount_max: number | null,
    price: number | null,
    price_min: number | null,
    mixname: string,
    InventoryUnits: string
}