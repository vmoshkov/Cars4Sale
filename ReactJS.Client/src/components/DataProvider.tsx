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

            console.log (elemId===objID);
            
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
    public static saveManufacturer(manufacturer: any): void {
        let b = manufacturer;
        console.log (manufacturer);
        b = b;
    }

    // tslint:disable-next-line:member-ordering
    public static deleteManufacturer(objectId: string){ 
        console.log ("delete manufacturer with id = " + objectId);
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