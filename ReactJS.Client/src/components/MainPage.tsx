import * as React from "react";
import * as ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import {DataProvider} from './DataProvider';
import { Jumbo } from "./Jumbo";
import { ManufacturerEditor } from "./ManufacturerEditor";
import { ManufacturerList } from "./ManufacturerList";


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
            manufacturer_id: ''
        };
    
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.toggleManufacturerEditor = this.toggleManufacturerEditor.bind(this);
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
           console.log(this.state);
            this.setState ({stateNumber: 1});
            this.setState ({manufacturersListOn: true});
            this.setState ({manufacturersEditorOn: false});
           
       }
       // Если 
       else if (this.state.stateNumber === 3) {
            console.log(this.state);
            this.setState ({stateNumber: 4});
           
        }
        // Если 
       else if (this.state.stateNumber === 4) {
            console.log(this.state);
            this.setState ({stateNumber: 3});
        }

    }
    
    public handleClick(e: React.MouseEvent<HTMLAnchorElement>): void {
        e.preventDefault();
        console.log('The link 1 was clicked.' + this.state.isToggleOn);

        if(this.state.isToggleOn) {
            this.setState ({isToggleOn: false});
        }
        else {
            this.setState ({isToggleOn: true});
        }
      }

    public render() {
        const showList = {
            'display': this.state.manufacturersListOn ? 'block' : 'none'
        };

        const showEditor = {
            'display': this.state.manufacturersEditorOn ? 'block' : 'none'
        };

        return (
        <div className="container">
           <Jumbo/>
           <div className="container-fluid">
                <div className="row">
                        <div className="col-sm-2 bg-light">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                <a className="nav-link" href="#" onClick={this.handleClick}>Link 1</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link" href="#">Link 2</a>
                                </li>    
                                <li className="nav-item">
                                <a className="nav-link disabled" href="#">Disabled</a>
                                </li>
                            </ul>                       
                        </div>
                        <div className="col-sm-10" id='list_editor_container'>
                            <ManufacturerList style={showList} 
                                    toggleEditor={this.toggleManufacturerEditor}/>
                            
                            <ManufacturerEditor style={showEditor} 
                                    object_id={this.state.manufacturer_id}
                                    manufacturer={DataProvider.getManufacturer(this.state.manufacturer_id)}
                                    toggleEditor={this.toggleManufacturerEditor} />                            

                        </div>
                </div>
            </div>          
        </div>
        )
    }
}