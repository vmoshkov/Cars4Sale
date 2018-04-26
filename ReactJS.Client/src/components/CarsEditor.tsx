import * as React from 'react';

import { FileInput, Intent, TextArea } from "@blueprintjs/core";
import { Classes, DateInput } from "@blueprintjs/datetime";
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import  {DataProvider} from './DataProvider';


export class CarsEditor extends React.Component<any, any> {
    constructor (props: any) {
       super(props);  
       this.state = {
            car: {
                car_id: this.props.object_id,     
                images: [],
                item_date: null,
                car_prise: 0,
                contact_person: '',
                contact_phone: '',
                car_model: '',
                car_desc: '',
                car_year: 0,
                car_manufacturer: ''
            }           
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);

    }

    // Если поменялись свойства, значит надо перегрузить данные в редактор
    public componentWillReceiveProps(nextProps: any) {
        this.setState({
             car: {
                car_id: nextProps.object_id, 
                images: [],
                item_date: null,
                car_prise: 0,
                contact_person: '',
                contact_phone: '',
                car_model: '',
                car_desc: '',
                car_year: 0,
                car_manufacturer: ''                 
            }}            
         );
     }

     // Обработчик сохранения
    public handleSave = (e: any) => {
        // очищаю состояние         
       this.setState({car : {
            car_id: '',               
        }});

        // Затем вызываю обработчик из родителя чтобы переключить состояние
        this.props.toggleEditor("back to list");
    }

    // Обработчик отмены
    public handleCancel = (e: any) => {
        // очищаю состояние         
         this.setState({car : {
            car_id: '',          
        }});

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

                imageList.push(
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

                console.log(that.state.car.images);
                
            })
            // tslint:disable-next-line:only-arrow-functions
            .catch(function(error: any) {
                console.error(error);
            }); 

        }
        
       
    }
    
    public render() { 
        return  (
            
            <div className='container pt-card pt-elevation-3' style={this.props.style}>                   
                    <div className="row align-items-start">      
                        <div className="col">                                           
                             <label className="pt-label pt-inline">ID: 
                             <input type="text" required={true}  className="pt-input pt-disabled"
                                 value={this.state.car.car_id}/> 
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
                                <input className="pt-input" type="text" size={8} placeholder="Enter a model" dir="auto" />
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
                                <input type="text" className="pt-input" placeholder="Enter contact person" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="pt-input-group">
                                <span className="pt-icon pt-icon-phone"></span>
                                <input type="text" className="pt-input" placeholder="Enter contact number" />
                            </div>
                        </div>
                    </div>   
                    <br/>    
                            <Carousel showThumbs={false} >
                               {this.renderCarouselChildren()};                               
                            </Carousel>
                            <FileInput disabled={false} text="Choose file..." onInputChange={this.handleFileChange} />
                     <label className="pt-label">Description: </label>
                                <TextArea className="pt-fill" rows={7}/>
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
            <select>
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

        let manufacturers = DataProvider.getAllManufacturers();

        outputJSX = (
            <select>
                { manufacturers.map(
                    (manufacturer: any, i: number) => 
                        <option value={manufacturer.id}>{manufacturer.manufacturer}</option>
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
                            <img src={img.data} width='400' height="400" />
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