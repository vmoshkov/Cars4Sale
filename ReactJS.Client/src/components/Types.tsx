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
    id: string,
    entryDate: Date,
    manufacturer: IManufacturer,
    model: string,
    year: string,
    description: string,
    prise: string,
    contactPerson: string,
    contactPhone: string,
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
                    this.allCarsURLstr = config.get_all_cars_command;
                    this.addCarURLstr = config.add_car_command;
                    this.editCarURLstr = config.edit_car_command;
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

    public deleteManufaturerURL(): string {
        return this.serverURL + this.deleteManufacturerURLstr; 
    }

    public getAllCarsURL(): string {
        return this.serverURL + this.allCarsURLstr;
    }

    public addCarURL(): string {
        return this.serverURL + this.addCarURLstr;
    }

    public editCarURL(): string {
        return this.serverURL + this.editCarURLstr;
    }

    private serverURL: string = null;
    private allManufacturersURLstr: string = null;
    private getManufacturerURLstr: string = null;
    private addManufacturerURLstr: string = null;
    private editManufacturerURLstr: string = null;
    private deleteManufacturerURLstr: string = null;
    private allCarsURLstr: string = null;
    private addCarURLstr: string = null;
    private editCarURLstr: string = null;
}

export let globalConfig = new TConfig();