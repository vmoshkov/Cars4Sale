import * as React from 'react';

import { IImage, ICar, IManufacturer } from './Types';
import { Alert, FileInput, Intent, TextArea,  IToaster,  Position, Toaster  } from "@blueprintjs/core";
import { Classes, DateInput } from "@blueprintjs/datetime";
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import  {DataProvider} from './DataProvider';
import { ICON_LARGE } from '@blueprintjs/core/lib/esm/common/classes';

type TCarEditorState = {
    car: ICar,
    manufacturersList: IManufacturer[];
};

export class CarsEditor extends React.Component<any, TCarEditorState> {
    constructor (props: any) {
       super(props);  
       let emptyManu: IManufacturer = {
            id: "0",                 
            name: "", 
            country: ""
       } 
       let newCar: ICar = {
                            id: '',
                            entryDate: new Date(),
                            manufacturer: emptyManu,
                            model: "",
                            year: "",
                            description: "",
                            prise: "",
                            contactPerson: "",
                            contactPhone: "",
                            images: []
                         }
               
       this.state = {
            car: newCar,
            manufacturersList: []    
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleChangeContactPerson = this.handleChangeContactPerson.bind(this);
        this.handleChangeContactNumber = this.handleChangeContactNumber.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeModel = this.handleChangeModel.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleChangeManufacturer = this.handleChangeManufacturer.bind(this);
        this.handleChangePrise = this.handleChangePrise.bind(this);
    }

    // Если поменялись свойства, значит надо перегрузить данные в редактор
    public componentWillReceiveProps(nextProps: any) {   
        let that = this;     
        
        // if editot is off we have nothing to do
        if (!nextProps.showCarsEditor)
            return;
        
        // refresh maufacturers from server
        let manufacturers: IManufacturer[] = null;
        new DataProvider().getAllManufacturers()
        .then ((list:IManufacturer[]) => { 
            this.setState({manufacturersList: list});
        })
        .catch(e => console.log(e));

        // if not defined, return
        if(typeof nextProps.object_id == "undefined")
            return;

        if(nextProps.object_id=="new") {
            let emptyManu: IManufacturer = {
                id: "0",                 
                name: "", 
                country: ""
            }

            let newObject: ICar = 
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
            
            that.setState({car: newObject});
            return;
        }

        // Send a request to the server for a car
        DataProvider.getCar(nextProps.object_id)
        .then ((value:ICar) => { 

            // value.entryDate seems to be not a valid JS date, so I need to convert it
            value.entryDate = new Date(new String(value.entryDate).toString());
             // images are to have base64 encoded string in data attribute...
             if (Array.isArray(value.images) && (value.images.length > 0)) {
                for (const img of value.images) {
                    // so need to convert to valid url string
                    img.data = "data:image/jpeg;base64," + img.data;
                }
            }

            that.setState({car: value});           
        })
        .catch(e => console.log(e));      
    }

    public componentDidMount() {
        new DataProvider().getAllManufacturers()
        .then ((list:IManufacturer[]) => { 
            this.setState({manufacturersList:  list});
        })
        .catch(e => console.log(e));
    }

     // Save handler
    public handleSave = (e: any) => {
        const AppToaster = Toaster.create({
            position: Position.TOP_RIGHT            
        });

        // validate required fields
        if ((this.state.car.manufacturer===null) || (Number(this.state.car.manufacturer.id) < 1)) {
            AppToaster.show({ 
                icon: "hand", 
                intent: Intent.DANGER, 
                message: "Please specify manufacturer!",
                timeout: 2000 });

            return;
        }

        if (isNaN(Number(this.state.car.prise))) {
            AppToaster.show({ 
                icon: "hand", 
                intent: Intent.DANGER, 
                message: "Please specify a correct prise!",
                timeout: 2000 });

            return;
        }

        if (Number(this.state.car.prise)< 1) {
            AppToaster.show({ 
                icon: "hand", 
                intent: Intent.DANGER, 
                message: "Please specify a correct prise!",
                timeout: 2000 });

            return;
        }

        if (Number(this.state.car.year)< 1980) {
            AppToaster.show({ 
                icon: "hand", 
                intent: Intent.DANGER, 
                message: "Please specify valid year!",
                timeout: 2000 });

            return;
        }

        
        DataProvider.saveCar(this.state.car)
            .then((jsonObject: ICar) => {

                // jsonObject.entryDate seems to be not a valid JS date, so I need to convert it
                jsonObject.entryDate = new Date(new String(jsonObject.entryDate).toString());
                // images are to have base64 encoded string in data attribute...
                if (Array.isArray(jsonObject.images) && (jsonObject.images.length > 0)) {
                    for (const img of jsonObject.images) {
                        // so need to convert to valid url string
                        img.data = "data:image/jpeg;base64," + img.data;
                    }
                }
                // update state      
                this.setState({car : jsonObject});

                console.log ("from save handler:");
                console.log (this.state.car);
            })
            .catch((e: Promise<any>) => {
                e.then (
                    msg => {
                        console.log(msg);
    
                        const AppToaster = Toaster.create({
                            position: Position.TOP_RIGHT            
                        });
    
                        AppToaster.show({ 
                            icon: "hand", 
                            intent: Intent.DANGER, 
                            message: msg,
                            timeout: 5000 });
                    }
                )
            });      

    }

    // Обработчик отмены
    public handleCancel = (e: any) => {
        let emptyManu: IManufacturer = {
            id: "0",                 
            name: "", 
            country: ""
        } 
        let emptyCar: ICar = {
            id: '',
            entryDate: new Date(),
            manufacturer: emptyManu,
            model: "",
            year: "",
            description: "",
            prise: "",
            contactPerson: "",
            contactPhone: "",
            images: []
        }
        // очищаю состояние         
         this.setState({car: emptyCar});

        // Затем вызываю обработчик из родителя чтобы переключить состояние
        this.props.toggleEditor("back to list from cancel");
    }

    // Обработчик выбора даты
    public handleDateChange = (date: Date) => {         
        
        let updatedCar = this.state.car;
        updatedCar.entryDate = date;
        this.setState({car : updatedCar});       
    }

     // Обработчик выбора файла     
    public handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void  {              
        let that: CarsEditor = this;
               
        const fl: FileList = event.target.files;

        if(fl.length > 0) {
            const file: File = fl[0];

            //try to load image to state as base64 encoded data
            let promise = new Promise(function(resolve, reject) {
                const fileReader = new FileReader(); 
                fileReader.onload = () => {
                    resolve(fileReader.result );
                }
                fileReader.readAsDataURL(file);
            })

            promise.then(function (result) { 
                let imageList = that.state.car.images;

                imageList.unshift(
                    {
                        filename: file.name,
                        data: result.toString(),
                        blob: file
                    }
                );
                let updatedCar = that.state.car;

                updatedCar.images = imageList;

                that.setState({
                    car : updatedCar
                });
             
                
            })
            // tslint:disable-next-line:only-arrow-functions
            .catch(function(error: any) {
                console.error(error);
            }); 

        }      
       
    }

    public handleChangePrise = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newState: ICar = this.state.car;
        newState.prise= e.target.value;  
        this.setState({car: newState});
    }

    public handleChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let newState: ICar = this.state.car;
        newState.year = e.target.value;  
        this.setState({car: newState});
    }

    public handleChangeManufacturer = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let newState: ICar = this.state.car;
        newState.manufacturer.id = e.target.value;  
        newState.manufacturer.name = e.target.selectedOptions.item(0).text;
        newState.manufacturer.country = '';
        this.setState({car: newState});
    }

    public handleChangeModel = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newState: ICar = this.state.car;
        newState.model = e.target.value;  
        this.setState({car: newState});
    }

    public handleChangeContactPerson = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newState: ICar = this.state.car;
        newState.contactPerson = e.target.value;  
        this.setState({car: newState});
    }

    public handleChangeContactNumber  = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newState: ICar = this.state.car;
        newState.contactPhone = e.target.value;  
        this.setState({car: newState});
    }

    public handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let newState: ICar = this.state.car;
        newState.description = e.target.value; 
        this.setState({car: newState});
    }
    
    public render() { 
        const selectedValue:string = this.state.car.manufacturer !== null ? this.state.car.manufacturer.id : '0';

        return  (
            
            <div className='container pt-card pt-elevation-3' style={this.props.style}>                   
                    <div className="row align-items-start">      
                        <div className="col">                                           
                             <label className="pt-label pt-inline">ID: 
                             <input type="text" required={true}  className="pt-input pt-disabled"
                                 value={this.state.car.id}/> 
                             </label>   
                        </div> 
                        <div className="col">
                            <label  className="pt-label pt-inline">Prise: 
                            <input type="text" className="pt-input" placeholder="Enter prise"
                                    pattern="[0-9]{6}"
                                    value={this.state.car.prise} onChange={this.handleChangePrise} />
                            </label>
                        </div>  
                        <div className="col justify-content-end text-right">
                             <label  className="pt-label pt-inline">Post date: </label>
                             <DateInput                              
                                formatDate={date => {
                                    if(date!==null) {                                        
                                        // JS date.getMonth() counts from 0 -> crazy developers!!!!
                                       return (date.getDate().toString() + "/" + (date.getMonth()+1).toString() + "/" + date.getFullYear().toString());
                                    } 
                                        return new Date().toDateString();
                                    }
                                }
                                onChange={this.handleDateChange}
                                parseDate={str => new Date(str) }                                
                                placeholder={"DD/MM/YYYY"}
                                value={this.state.car.entryDate}                                
                            />  
                        </div>                                                                   
                    </div>

                    <hr/>
                                                        
                    <div className="row align-items-start">
                        <div className="col">
                            <label className="pt-label pt-inline">
                                Manufacturer:
                                <div className="pt-select">
                                <select value={selectedValue} onChange={this.handleChangeManufacturer}>  
                                    <option key="0" value="0">not selected</option>                                    
                                    { (this.state.manufacturersList!=null) ?                   
                                    this.state.manufacturersList.map(
                                        (manufacturer: any, i: number) => 
                                            <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                                        ) : ""
                                    }
                                </select>
                                </div>
                            </label>
                        </div>
                        <div className="col">
                             <label className="pt-label pt-inline">
                                Model:
                                <input className="pt-input" type="text" size={8} placeholder="Enter a model" dir="auto" 
                                     value={this.state.car.model} onChange={this.handleChangeModel}/>
                            </label>
                        </div>
                        <div className="col">
                            <label className="pt-label pt-inline">
                                Year:
                                <div className="pt-select">
                                    {this.renderYearDropdown()}
                                </div>
                            </label>
                        </div>
                    </div>              
                    <div className="row align-items-start">
                        <div className="col">
                            <div className="pt-input-group">
                                 <span className="pt-icon pt-icon-person"></span>
                                <input type="text" className="pt-input" placeholder="Enter contact person"
                                    value={this.state.car.contactPerson} onChange={this.handleChangeContactPerson} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="pt-input-group">
                                <span className="pt-icon pt-icon-phone"></span>
                                <input type="text" className="pt-input" placeholder="Enter contact number"
                                    value={this.state.car.contactPhone} onChange={this.handleChangeContactNumber} />
                            </div>
                        </div>
                    </div>   
                    <br/>    
                            <Carousel showThumbs={false} >
                               {this.renderCarouselChildren()};                               
                            </Carousel>
                            <FileInput disabled={false} text="Choose file..." onInputChange={this.handleFileChange} />
                     <label className="pt-label">Description: </label>
                                <TextArea className="pt-fill" rows={7}
                                     value={this.state.car.description} onChange={this.handleChangeDescription}/>
                     <hr/>
                     <div className="text-right">
                         <button type="button" className="pt-button pt-intent-success" onClick={this.handleSave}>Save</button>
                         <button type="button" className="pt-button" onClick={this.handleCancel}>Cancel</button>
                     </div>
                
             </div>
         )
     }

     // *
     // Renders year dropdown children
     // *
     private renderYearDropdown(): JSX.Element {
        let outputJSX: JSX.Element;

        let years: number[] = new Array();

        let year = new Date().getFullYear();

        years.push(year);

        for(let i = 1; i<11; i++) {
                years.push(year-i);
        }

        outputJSX = (
            <select value={this.state.car.year} 
                    onChange={this.handleChangeYear} >
                     <option value="0">not selected</option>
                { years.map(
                    (year: number) => 
                        <option value={year}>{year}</option>
                    )
                }
            </select>
        )
       
        return outputJSX;
     }

     
     // *
     // Renders carousel children
     // *
     private renderCarouselChildren(): JSX.Element[] {
        let outputJSX: JSX.Element[] = new Array();

        if (Array.isArray(this.state.car.images) && (this.state.car.images.length > 0)) {
            
                for (const img of this.state.car.images) {
                    const element = (
                        <div>
                            <img src={img.data.toString()} width='400' height="400" />
                            <p className="legend">{img.filename}</p>
                        </div>
                    )
                   
                    outputJSX.push(element);
                }
                   
                return outputJSX;
        }     
        
        const noImages = (
            <div>
                <img src="img/no_image.png" width='600' height="400" />
                <p className="legend">No Images</p>
            </div>
        )
        
        outputJSX.push(noImages);       
      
        return outputJSX;
     }

}