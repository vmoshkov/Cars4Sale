import {IManufacturer, IImage, ICar, TConfig, globalConfig} from './Types';

export class DataProvider {     

    public getAllManufacturers(): Promise<any> {
        let url = globalConfig.getAllManufacturersURL();
        let serverList: IManufacturer[] = null;
        // good article about how to deal with CORS: https://m.alphasights.com/killing-cors-preflight-requests-on-a-react-spa-1f9b04aa5730
        return fetch(url)
            .then(response => { return response.json();})           
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
        .then((response: Response) => { if(response.ok) { return response.text();} 
            else {
                // need to return Promise with a error description here
                return Promise.reject(response.text());
            }
        })
        .catch((e) => {           
            // need to return Promise with a error description here
            return Promise.reject(e);
        });
        
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

    public static getCar(objId: string): Promise<any> {

        let url = globalConfig.getCarURL() + objId;

        let getRequest = fetch(url)
            .then(response => { if(response.ok) { return response.json();} else console.log(response)})
            .catch(e => console.log(e)); 

       
        return getRequest;
    }

    // tslint:disable-next-line:member-ordering
     public static saveCar(car: ICar): Promise<any> {
        let url:string = null;

        //hack
         // images when saved are to have base64 encoded string in data attribute...
         if (Array.isArray(car.images) && (car.images.length > 0)) {
            for (const img of car.images) {
                // so need to convert it from url string to just a base64 string
                var parts = img.data.split(";base64,");                
                var base64 = parts[1];

                img.data = base64;      
                
            }
        }     

        let carObject: string = JSON.stringify(car);
        let json = JSON.parse(carObject);
        
        if(car.id=="new") {
            url = globalConfig.addCarURL();
            delete json["id"]; // we need this because server doesn't expect id key for new objects            
        }
        else
            url = globalConfig.editCarURL();          

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
        });         

        return saveRequest;       
    }

    public static deleteCar(objectId: string): Promise<any>{ 
       //pseudo car to pass to REST API
       let emptyManu: IManufacturer = {
                    id: "",                 
                    name: "", 
                    country: ""
            }
       let deletedObj: ICar = 
            {
                id: 'new',
                entryDate: new Date(),
                manufacturer: emptyManu,
                model: "",
                year: "",
                description: "",
                prise: "",
                contactPerson: "",
                contactPhone: "",
                images: []
            };
       let url:string = globalConfig.deleteCarURL();

       deletedObj.id = objectId;

        let deleteRequest = fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            body: JSON.stringify(deletedObj)
        })
        .then(response => { 
            if(response.ok) { 
                return response.text();
            } 
            else {
                // need to return Promise with a error description here
                return Promise.reject(response.text());
            }
        })
        .catch(e => {
            // need to return Promise with a error description here
            return Promise.reject(e);
        });
        
        return deleteRequest;
    }    
}