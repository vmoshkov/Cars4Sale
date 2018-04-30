import {IManufacturer, IImage, ICar} from './Types';

export class DataProvider {

    private static readonly data: IManufacturer[] =
    [
       {
          "objectId":"1",
          "manufacturer":"BMW",
          // tslint:disable-next-line:object-literal-sort-keys
          "country":"Germany"
       },
       {
          "objectId": "2",
          "manufacturer":"FORD",
          // tslint:disable-next-line:object-literal-sort-keys
          "country":"USA"
       },
       {
          "objectId":"3",
          "manufacturer":"Jaguar",
          // tslint:disable-next-line:object-literal-sort-keys
          "country":"UK"
       }
    ]

    private static readonly cars_data: ICar[] =
    [
        {
            objectId: "101",
            item_date: new Date(),
            manufacturer:  {
                "objectId":"3",
                "manufacturer":"Jaguar",
                // tslint:disable-next-line:object-literal-sort-keys
                "country":"UK"
             },
            model: "PACE-X",
            car_year: "2015",
            description: "I love it. But it's time to buy a new one",
            car_prise: "23.000",
            contact_person: "John Willsmith",
            contact_phone: "+44 205 88 22 43",
            images: []
        },
        {
            objectId: "102",
            item_date: new Date(),
            manufacturer:  {
                "objectId":"1",
                "manufacturer":"BMW",
                // tslint:disable-next-line:object-literal-sort-keys
                "country":"Germany"
             },
            model: "545",
            car_year: "2011",
            description: "Good, old but still powerfull car for someone who cares about prestige",
            car_prise: "19.000",
            contact_person: "Rayan O'Deniels",
            contact_phone: "+44 205 55 11 90",
            images: []
        },

        {
            objectId: "103",
            item_date: new Date(),
            manufacturer:  {
                "objectId":"3",
                "manufacturer":"Jaguar",
                // tslint:disable-next-line:object-literal-sort-keys
                "country":"UK"
             },
            model: "FX",
            car_year: "2017",
            description: "Doesn't fit to my perceptions. Just want to get rid of it. Very advantagous price for you. Please call.",
            car_prise: "49.999",
            contact_person: "Deborah Fitzgarret",
            contact_phone: "+44 112 000 36 81",
            images: []
        },
        {
            objectId: "104",
            item_date: new Date(),
            manufacturer: {
                "objectId": "2",
                "manufacturer":"FORD",
                // tslint:disable-next-line:object-literal-sort-keys
                "country":"USA"
             },
            model: "Focus",
            car_year: "2015",
            description: "Vihicle for daily usage.",
            car_prise: "12.500",
            contact_person: "Alex McAlberg",
            contact_phone: "+44 101 300 22 17",
            images: []
        }
        
    ]

    // tslint:disable-next-line:member-ordering
    public static getManufacturer(objId: string): IManufacturer {

        // tslint:disable-next-line:prefer-const
        let newManufacturer: IManufacturer = {
            objectId: objId, 
            // tslint:disable-next-line:object-literal-sort-keys
            manufacturer: "cannot load object", 
            country: 'cannot load object'
         }

         for (const element of DataProvider.data) {
            const elemId: number = parseInt(element.objectId,0);
            const objID: number = parseInt(objId,0);
           
            if (elemId===objID) {
                newManufacturer.objectId = element.objectId;
                newManufacturer.manufacturer = element.manufacturer;
                newManufacturer.country = element.country;
                break;
            }
         }      
            
        return newManufacturer;
    }

    public static getCar(objId: string): ICar {

        let newCar: ICar = {
            objectId: objId,
            item_date: new Date(),
            manufacturer: {
                "objectId":"0",
                "manufacturer":"",
                "country":""
             },
            model: "cannot load object",
            car_year: "cannot load object",
            description: "cannot load object",
            car_prise: "cannot load object",
            contact_person: "cannot load object",
            contact_phone: "cannot load object",
            images: []
        }

        if (objId==='new')
        {
            newCar.model='',
            newCar.car_year = "",
            newCar.description = "",
            newCar.car_prise = "0",
            newCar.contact_person = "",
            newCar.contact_phone = ""

            return newCar;
        }

        for (const element of DataProvider.cars_data) {
            const elemId: number = parseInt(element.objectId,0);
            const objID: number = parseInt(objId,0);
           
            if (elemId===objID) {
                return element;              
            }
         }  

        return newCar;
    }

    // tslint:disable-next-line:member-ordering
    public static getAllManufacturers(): IManufacturer[] {
        return DataProvider.data;
    }

    // tslint:disable-next-line:member-ordering
    public static getAllCars(): ICar[] {
        return DataProvider.cars_data;
    }

    // tslint:disable-next-line:member-ordering
    public static saveManufacturer(manufacturer: IManufacturer): IManufacturer {
        let manuObject: string = JSON.stringify(manufacturer);
        console.log (manuObject);
        if(manufacturer.objectId==="new") {
            manufacturer.objectId = Math.random().toString();
        }

        return manufacturer;
    }

     // tslint:disable-next-line:member-ordering
     public static saveCar(car: ICar): ICar {
        let carObject: string = JSON.stringify(car);
        console.log (carObject);
        if(car.objectId==="new") {
            car.objectId = Math.random().toString();
        }

        return car;
    }

    // tslint:disable-next-line:member-ordering
    public static deleteManufacturer(objectId: string){ 
        console.log ("delete manufacturer with id = " + objectId);
    }

    public static deleteCar(objectId: string){ 
        console.log ("delete car with id = " + objectId);
    }

   
    private static randomString(length: number): string {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    
    


    
}