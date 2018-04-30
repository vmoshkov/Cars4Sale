export interface IManufacturer {
    objectId: string,
    manufacturer: string,
    country: string
}

export interface IImage {
    filename: string,
    data: object,
    blob: object
}

export interface ICar {
    objectId: string,
    item_date: Date,
    manufacturer: IManufacturer,
    model: string,
    car_year: string,
    description: string,
    car_prise: string,
    contact_person: string,
    contact_phone: string,
    images:  IImage[]
}