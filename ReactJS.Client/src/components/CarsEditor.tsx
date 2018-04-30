import * as React from 'react';

import { IImage, ICar } from './Types';
import { Alert, FileInput, Intent, TextArea,  IToaster,  Position, Toaster  } from "@blueprintjs/core";
import { Classes, DateInput } from "@blueprintjs/datetime";
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import  {DataProvider} from './DataProvider';
import { ICON_LARGE } from '@blueprintjs/core/lib/esm/common/classes';

type TCarEditorState = {
    car: ICar
};

export class CarsEditor extends React.Component<any, TCarEditorState> {
    constructor (props: any) {
       super(props);  
       let newCar: ICar = DataProvider.getCar(props.object_id);
               
       this.state = {
            car: newCar       
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
        let newCar: ICar = DataProvider.getCar(nextProps.object_id);
        
        this.setState({car: newCar});
     }

     // Save handler
    public handleSave = (e: any) => {
        const AppToaster = Toaster.create({
            position: Position.TOP_RIGHT            
        });

        if (this.state.car.manufacturer===null) {
            AppToaster.show({ 
                icon: "hand", 
                intent: Intent.DANGER, 
                message: "Please specify manufacturer!",
                timeout: 2000 });

            return;
        }

        let newCar = 
            DataProvider.saveCar(this.state.car);

       // update state      
       this.setState({car : newCar});

    }

    // Обработчик отмены
    public handleCancel = (e: any) => {
        let emptyCar: ICar = {
            objectId: '',
            item_date: new Date(),
            manufacturer: null,
            model: "",
            car_year: "",
            description: "",
            car_prise: "",
            contact_person: "",
            contact_phone: "",
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
        updatedCar.item_date = date;
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
                        data: result,
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
        newState.car_prise= e.target.value;  
        this.setState({car: newState});
    }

    public handleChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let newState: ICar = this.state.car;
        newState.car_year = e.target.value;  
        this.setState({car: newState});
    }

    public handleChangeManufacturer = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let newState: ICar = this.state.car;
        newState.manufacturer.objectId = e.target.value;  
        newState.manufacturer.manufacturer = e.target.selectedOptions.item(0).text;
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
        newState.contact_person = e.target.value;  
        this.setState({car: newState});
    }

    public handleChangeContactNumber  = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newState: ICar = this.state.car;
        newState.contact_phone = e.target.value;  
        this.setState({car: newState});
    }

    public handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let newState: ICar = this.state.car;
        newState.description = e.target.value; 
        this.setState({car: newState});
    }
    
    public render() { 
        return  (
            
            <div className='container pt-card pt-elevation-3' style={this.props.style}>                   
                    <div className="row align-items-start">      
                        <div className="col">                                           
                             <label className="pt-label pt-inline">ID: 
                             <input type="text" required={true}  className="pt-input pt-disabled"
                                 value={this.state.car.objectId}/> 
                             </label>   
                        </div> 
                        <div className="col">
                            <label  className="pt-label pt-inline">Prise: 
                            <input type="text" className="pt-input" placeholder="Enter prise"
                                    value={this.state.car.car_prise} onChange={this.handleChangePrise} />
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
                                parseDate={str => new Date(str)}
                                placeholder={"DD/MM/YYYY"}
                                value={this.state.car.item_date}                                
                            />  
                        </div>                                                                   
                    </div>

                    <hr/>
                                                        
                    <div className="row align-items-start">
                        <div className="col">
                            <label className="pt-label pt-inline">
                                Manufacturer:
                                <div className="pt-select">
                                    {this.renderManufacturerDropdown()}
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
                                    value={this.state.car.contact_person} onChange={this.handleChangeContactPerson} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="pt-input-group">
                                <span className="pt-icon pt-icon-phone"></span>
                                <input type="text" className="pt-input" placeholder="Enter contact number"
                                    value={this.state.car.contact_phone} onChange={this.handleChangeContactNumber} />
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
            <select value={this.state.car.car_year} 
                    onChange={this.handleChangeYear} >
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
     // Renders manufacturers children
     // *
     private renderManufacturerDropdown(): JSX.Element {
        let outputJSX: JSX.Element;
       
        let selectedValue:string = this.state.car.manufacturer !== null ? this.state.car.manufacturer.objectId : '';

        let manufacturers = DataProvider.getAllManufacturers();

        outputJSX = (
            <select value={selectedValue} onChange={this.handleChangeManufacturer}>                                      
                {                     
                    manufacturers.map(
                    (manufacturer: any, i: number) => 
                        <option key={manufacturer.objectId} value={manufacturer.objectId}>{manufacturer.manufacturer}</option>
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