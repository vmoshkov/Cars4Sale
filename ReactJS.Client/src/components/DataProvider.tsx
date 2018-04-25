export class DataProvider {

    private static readonly data: any =
    [
       {
          "id":1,
          "manufacturer":"BMW",
          // tslint:disable-next-line:object-literal-sort-keys
          "country":"Germany"
       },
       {
          "id":2,
          "manufacturer":"FORD",
          // tslint:disable-next-line:object-literal-sort-keys
          "country":"USA"
       },
       {
          "id":3,
          "manufacturer":"Jaguar",
          // tslint:disable-next-line:object-literal-sort-keys
          "country":"UK"
       }
    ]

    private static readonly cars_data: any =
    [
        {
            id: 101,
            entry_date: new Date(),
            manufacturer: "Jaguar",
            model: "PACE-X",
            car_year: 2015,
            description: "I love it. But it's time to buy a new one",
            prise: "23.000",
            contact_person: "John Willsmith",
            contact_phone: "+44 205 88 22 43"
        },
        {
            id: 102,
            entry_date: new Date(),
            manufacturer: "BMW",
            model: "545",
            car_year: 2011,
            description: "Good, old but still powerfull car for someone who cares about prestige",
            prise: "19.000",
            contact_person: "Rayan O'Deniels",
            contact_phone: "+44 205 55 11 90"
        },
        {
            id: 103,
            entry_date: new Date(),
            manufacturer: "Jaguar",
            model: "FX",
            car_year: 2017,
            description: "Doesn't fit to my perceptions. Just want to get rid of it. Very advantagous price for you. Please call.",
            prise: "49.999",
            contact_person: "Deborah Fitzgarret",
            contact_phone: "+44 112 000 36 81"
        },
        {
            id: 104,
            entry_date: new Date(),
            manufacturer: "FORD",
            model: "Focus",
            car_year: 2015,
            description: "Vihicle for daily usage.",
            prise: "12.500",
            contact_person: "Alex McAlberg",
            contact_phone: "+44 101 300 22 17"
        }
    ]

    // tslint:disable-next-line:member-ordering
    public static getManufacturer(objectId: string): any {

        // tslint:disable-next-line:prefer-const
        let newManufacturer: any = {
            object_id: objectId, 
            // tslint:disable-next-line:object-literal-sort-keys
            name: 'cannot load object', 
            country: 'cannot load object'
         }

         for (const element of DataProvider.data) {
            const elemId: number = parseInt(element.id,0);
            const objID: number = parseInt(objectId,0);
           
            if (elemId===objID) {
                newManufacturer.id = element.id;
                newManufacturer.name = element.manufacturer;
                newManufacturer.country = element.country;
                break;
            }
         }      
            
        return newManufacturer;
    }

    // tslint:disable-next-line:member-ordering
    public static getAllManufacturers() {
        return DataProvider.data;
    }

    // tslint:disable-next-line:member-ordering
    public static getAllCars() {
        return DataProvider.cars_data;
    }

    // tslint:disable-next-line:member-ordering
    public static saveManufacturer(manufacturer: any): void {
        let b = manufacturer;
        console.log (manufacturer);
        b = b;
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