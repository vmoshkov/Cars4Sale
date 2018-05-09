export interface IManufacturer {
    id: string,
    name: string,
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

/*
Object for keeping configurations
Configurations from config.json are loaded during initialization
*/
export class TConfig {
    constructor () {
        let url = "config.json"; // !!! HARDCODE !!!!
    
        fetch(url)
            .then(response => response.json())
            .then(config => {                
                    this.serverURL =config.server_url;
                    this.allManufacturersURLstr = config.get_all_manufacturers_command;
                    this.getManufacturerURLstr = config.get_manufacturer_command;
                    this.addManufacturerURLstr = config.add_manufacturer_command;
                    this.editManufacturerURLstr = config.edit_manufacturer_command;
                    this.deleteManufacturerURLstr = config.delete_manufacturer_command;
                })
            .catch(e => console.log(e));
    }

    public getServerURL(): string {
        return this.serverURL;
    }

    public getAllManufacturersURL(): string {
        return this.serverURL + this.allManufacturersURLstr;
    }

    public getManufacturerURL(): string {
        return this.serverURL + this.getManufacturerURLstr;
    }

    public addManufacturerURL(): string {
        return this.serverURL + this.addManufacturerURLstr;
    }

    public editManufacturerURL(): string {
        return this.serverURL + this.editManufacturerURLstr;
    }

    private serverURL: string = null;
    private allManufacturersURLstr: string = null;
    private getManufacturerURLstr: string = null;
    private addManufacturerURLstr: string = null;
    private editManufacturerURLstr: string = null;
    private deleteManufacturerURLstr: string = null;
}

export let globalConfig = new TConfig();