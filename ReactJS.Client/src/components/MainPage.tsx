import * as React from "react";
import * as ReactDOM from 'react-dom';

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import { DataProvider } from './DataProvider';
import { Header } from "./Header";
import { ManufacturerEditor } from "./ManufacturerEditor";
import { ManufacturerList } from "./ManufacturerList";
import { CarsEditor } from "./CarsEditor";
import { CarsList } from "./CarsList";


/*
state
    stateNumber: 1 | 2 | 3 | 4
    manufacturersListOn: true | false
    manufacturersEditorOn: true | false
    carsListOn: true | false
    carsEditorOn: true | false
    manufacturer_id: string
    car_id: string 
*/
export class MainPage extends React.Component<any, any> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            stateNumber: 1,
            // tslint:disable-next-line:object-literal-sort-keys
            manufacturersListOn: true,
            // tslint:disable-next-line:object-literal-sort-keys
            manufacturersEditorOn: false,
            carsListOn: false,
            carsEditorOn: false,
            manufacturer_id: '',
            cars_id: ''
        };
    
        // This binding is necessary to make `this` work in the callback
        this.toggleManufacturersList = this.toggleManufacturersList.bind(this);
        this.toggleManufacturerEditor = this.toggleManufacturerEditor.bind(this);
        this.toggleCarsList = this.toggleCarsList.bind(this);
        this.toggleCarsEditor = this.toggleCarsEditor.bind(this);
    }

    public toggleManufacturerEditor(manufacturerID: any): void {
       // Если редактор мануфактуреров выключен и лист включен
       if(this.state.stateNumber === 1)
       {
           console.log(this.state);
            this.setState ({stateNumber: 2});
            this.setState ({manufacturersListOn: false});
            this.setState ({manufacturersEditorOn: true});

            // Так же тут надо установить параметры с которыми будем открывать редактор
            this.setState ({manufacturer_id: manufacturerID});
       }
       // Если редактор мануфактуреров включен и лист выключен
       else if (this.state.stateNumber === 2) {
            this.setState ({stateNumber: 1});
            this.setState ({manufacturersListOn: true});
            this.setState ({manufacturersEditorOn: false});
           
       }
       // Если 
       else if (this.state.stateNumber === 3) {           
            this.setState ({stateNumber: 4});
           
        }
        // Если 
       else if (this.state.stateNumber === 4) {
            console.log(this.state);
            this.setState ({stateNumber: 3});
        }

    }
    
    public toggleManufacturersList(e: React.MouseEvent<HTMLAnchorElement>): void {
        e.preventDefault();      

        this.setState ({stateNumber: 1});
        this.setState ({
            manufacturersListOn: true, 
            manufacturersEditorOn: false,
            carsListOn: false,
            carsEditorOn: false,
        });
        
    }

    public toggleCarsList(e: React.MouseEvent<HTMLAnchorElement>): void {
        e.preventDefault();      

        this.setState ({stateNumber: 3});
        this.setState ({
            manufacturersListOn: false, 
            manufacturersEditorOn: false,
            carsListOn: true,
            carsEditorOn: false,
        });
        
    }

    public toggleCarsEditor(carID: any): void {      
        // Если редактор выключен и лист включен
       if(this.state.stateNumber === 3)
       {
            this.setState ({stateNumber: 4});
            this.setState ({
                manufacturersListOn: false, 
                manufacturersEditorOn: false,
                carsListOn: false,
                carsEditorOn: true,
            });

            // Так же тут надо установить параметры с которыми будем открывать редактор
            this.setState ({car_id: carID});
        }
        // Если редактор включен и лист выключен
       else if (this.state.stateNumber === 4) {
            this.setState ({stateNumber: 3});
            this.setState ({carsListOn: true});
            this.setState ({carsEditorOn: false});
        
        }
        
    }

    public render() {
        const showManufacturersList = {
            'display': this.state.manufacturersListOn ? 'block' : 'none'
        };

        const showManufacturersEditor = {
            'display': this.state.manufacturersEditorOn ? 'block' : 'none'
        };

        const showCarsList = {
            'display': this.state.carsListOn ? 'block' : 'none'
        };

        const showCarsEditor = {
            'display': this.state.carsEditorOn ? 'block' : 'none'
        };
        
        return (
            
        <div className="container">
            <Header/>
           <div className="container-fluid">
                <div className="row">
                        <div className="col-2 bg-light">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                <a className="nav-link" href="#" onClick={this.toggleManufacturersList}>Manufacturers</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link" href="#" onClick={this.toggleCarsList}>Cars for sale</a>
                                </li>                                   
                            </ul>                       
                        </div>
                        <div className="col-10" id='list_editor_container'>
                            <ManufacturerList style={showManufacturersList} 
                                    toggleEditor={this.toggleManufacturerEditor}/>
                            
                            <ManufacturerEditor style={showManufacturersEditor} 
                                    object_id={this.state.manufacturer_id}
                                    manufacturer={DataProvider.getManufacturer(this.state.manufacturer_id)}
                                    toggleEditor={this.toggleManufacturerEditor} /> 

                            <CarsList style={showCarsList} 
                                    toggleEditor={this.toggleCarsEditor} />     

                            <CarsEditor style={showCarsEditor} 
                                        object_id={this.state.car_id}
                                        toggleEditor={this.toggleCarsEditor} />                       
                            
                        </div>
                </div>
            </div>          
        </div>
        )
    }
}