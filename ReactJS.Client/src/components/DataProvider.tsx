import {IManufacturer, IImage, ICar, TConfig, globalConfig} from './Types';

export class DataProvider {   

    private static readonly cars_data: ICar[] =
    [
        {
            id: "101",
            entryDate: new Date(),
            manufacturer:  {
                "id":"3",
                "name":"Jaguar",
                // tslint:disable-next-line:object-literal-sort-keys
                "country":"UK"
             },
            model: "PACE-X",
            year: "2015",
            description: "I love it. But it's time to buy a new one",
            prise: "23.000",
            contactPerson: "John Willsmith",
            contactPhone: "+44 205 88 22 43",
            images: []
        },
        {
            id: "102",
            entryDate: new Date(),
            manufacturer:  {
                "id":"1",
                "name":"BMW",
                // tslint:disable-next-line:object-literal-sort-keys
                "country":"Germany"
             },
            model: "545",
            year: "2011",
            description: "Good, old but still powerfull car for someone who cares about prestige",
            prise: "19.000",
            contactPerson: "Rayan O'Deniels",
            contactPhone: "+44 205 55 11 90",
            images: []
        },

        {
            id: "103",
            entryDate: new Date(),
            manufacturer:  {
                "id":"3",
                "name":"Jaguar",
                // tslint:disable-next-line:object-literal-sort-keys
                "country":"UK"
             },
            model: "FX",
            year: "2017",
            description: "Doesn't fit to my perceptions. Just want to get rid of it. Very advantagous price for you. Please call.",
            prise: "49.999",
            contactPerson: "Deborah Fitzgarret",
            contactPhone: "+44 112 000 36 81",
            images: []
        },
        {
            id: "104",
            entryDate: new Date(),
            manufacturer: {
                "id": "2",
                "name":"FORD",
                // tslint:disable-next-line:object-literal-sort-keys
                "country":"USA"
             },
            model: "Focus",
            year: "2015",
            description: "Vihicle for daily usage.",
            prise: "12.500",
            contactPerson: "Alex McAlberg",
            contactPhone: "+44 101 300 22 17",
            images: []
        }
        
    ]

    public getAllManufacturers(): Promise<any> {
        let url = globalConfig.getAllManufacturersURL();
        let serverList: IManufacturer[] = null;
        // good article about how to deal with CORS: https://m.alphasights.com/killing-cors-preflight-requests-on-a-react-spa-1f9b04aa5730
        return fetch(url)
            .then(response => { return response.json();})
            /*
            .then((list) => {                                          
                    let promise = new Promise(function(resolve, reject) {                          
                        resolve(list);
                    });

                    return promise;
                })
            */
            .catch(e => console.log(e));              
    }

    // tslint:disable-next-line:member-ordering
    public static getManufacturer(objId: string): Promise<any> {
        let url = globalConfig.getManufacturerURL() + objId;

        return fetch(url)
            .then(response => { if(response.ok) { return response.json();} else console.log(response)})
            .then(object => {
                let promise = new Promise(function(resolve, reject) {                          
                    resolve(object);
                });

                return promise;
            } )
            .catch(e => console.log(e));       
       
    }

    // tslint:disable-next-line:member-ordering
    public static saveManufacturer(manufacturer: IManufacturer): Promise<any> {
        let url:string = null;
        let objectStr = JSON.stringify(manufacturer);
        let json = JSON.parse(objectStr);       

        if(manufacturer.id=="new") {
            url = globalConfig.addManufacturerURL();
            delete json["id"]; // we need this because server doesn't expect id key for new objects            
        }
        else
            url = globalConfig.editManufacturerURL();         
        
       let saveRequest = fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            body: JSON.stringify(json)
        })
        .then(response => { if(response.ok) { return response.json();} 
            else {
                // need to return Promise with a error description here
                return Promise.reject(response.text());
            }
        })
         

        return saveRequest;      
    }

     // tslint:disable-next-line:member-ordering
     public static deleteManufacturer(objectId: string): Promise<any>{ 
        //pseudo manufacturer to pass to REST API
        let deletedObj: IManufacturer = {id:'', name:'', country: ''};
        let url:string = globalConfig.deleteManufaturerURL();

        deletedObj.id = objectId;

        let deleteRequest = fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            body: JSON.stringify(deletedObj)
        })
        .then(response => { if(response.ok) { return response.text();} 
            else {
                // need to return Promise with a error description here
                return Promise.reject(response.text());
            }
        })
        
        return deleteRequest;
    }


     // tslint:disable-next-line:member-ordering
    public static getAllCars(): Promise<any> {
        let url = globalConfig.getAllCarsURL();
        let serverList: ICar[] = null;

        let request = fetch(url)
        .then(response => { 
            return response.json();
        })       
        .catch(e => console.log(e)); 

        return request;
    }

    public static getCar(objId: string): ICar {

        let newCar: ICar = {
            id: objId,
            entryDate: new Date(),
            manufacturer: {
                "id":"0",
                "name":"",
                "country":""
             },
            model: "cannot load object",
            year: "cannot load object",
            description: "cannot load object",
            prise: "cannot load object",
            contactPerson: "cannot load object",
            contactPhone: "cannot load object",
            images: []
        }

        if (objId==='new')
        {
            newCar.model='',
            newCar.year = "",
            newCar.description = "",
            newCar.prise = "0",
            newCar.contactPerson = "",
            newCar.contactPhone = ""

            return newCar;
        }

        for (const element of DataProvider.cars_data) {
            const elemId: number = parseInt(element.id,0);
            const objID: number = parseInt(objId,0);
           
            if (elemId===objID) {
                return element;              
            }
         }  

        return newCar;
    }

   

    // tslint:disable-next-line:member-ordering
     public static saveCar(car: ICar): Promise<any> {
        let url:string = null;
        let carObject: string = JSON.stringify(car);
        let json = JSON.parse(carObject);
        
        if(car.id=="new") {
            url = globalConfig.addCarURL();
            delete json["id"]; // we need this because server doesn't expect id key for new objects            
        }
        else
            url = globalConfig.editCarURL();    


        console.log ('before savin a car:');
        console.log (json);       

        let saveRequest = fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            body: JSON.stringify(json)
        })
        .then(response => { if(response.ok) { return response.json();} 
            else {
                // need to return Promise with a error description here
                return Promise.reject(response.text());
            }
        })
         

        return saveRequest;       
    }

   

    public static deleteCar(objectId: string){ 
        console.log ("delete car with id = " + objectId);
    }
     
}