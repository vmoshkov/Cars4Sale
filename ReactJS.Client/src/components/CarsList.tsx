import * as React from "react";

import ContextMenu from  'context-menu';
import 'context-menu/lib/styles.css';
import Popup from "reactjs-popup";
import EventEmitter from 'tiny-emitter';
import {DataProvider} from './DataProvider';
import {DeletionWarnMessager} from './DeletionWarnMessager';

const emitter: EventEmitter = new EventEmitter();
 

export class CarsListNavmenu extends React.Component<any, any> {

    public render() {
        return (     
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                     <a className="navbar-brand" href="#">
                         <img src="img/symbol_add.png" width="30" height="30" alt="Add new cars for sale"/>
                    </a>              
                </nav>    
               
            );
    }

}

export class CarsListTableRow extends React.Component<any, any> {
    
    constructor(props: any){
        super(props);

        // This binding is necessary to make `this` work in the callback
       this.handleOnContextMenu = this.handleOnContextMenu.bind(this);       
       
    }
   
    public handleOnContextMenu(e: React.MouseEvent<HTMLTableRowElement>): void {
        e.preventDefault();        
               
        // menu data
        const menuData: any = [
            [
                {
                    id: this.props.data.id,
                    // tslint:disable-next-line:object-literal-sort-keys
                    handler: this.props.editorCaller,
                    label: 'Create new', 
                    onClick() { 
                        this.handler('new');                  
                    }, 
                },
                {
                    id: this.props.data.id,
                    // tslint:disable-next-line:object-literal-sort-keys
                    handler: this.props.editorCaller,
                    label: 'Edit', 
                    onClick() {  
                        this.handler(this.id);
                    }, 
                },
                {
                    id: this.props.data.id,
                    // tslint:disable-next-line:object-literal-sort-keys
                    handler: this.props.editorCaller,
                    label: 'Delete', 
                    disabled: false, 
                    onClick() {
                        emitter.emit('accept-delete-car', this.id);                        
                    }, 
                }            ]
        ];

        const handle = ContextMenu.showMenu(menuData);
    }

    public render() {
       return (
            <tr className="d-flex" id={this.props.data.id} onContextMenu={this.handleOnContextMenu}>
                <td className="col-1">{this.props.data.id}</td>
                <td className="col-2">{this.props.data.manufacturer}</td>
                <td className="col-2">{this.props.data.model}</td>                
                <td className="col-1">{this.props.data.prise}</td>
                <td className="col-3">{this.props.data.contact_person}</td>
                <td className="col-3">{this.props.data.contact_phone}</td>
                <td className="col-3">{this.props.data.image}</td>
            </tr>
       );
    }
 }



// tslint:disable-next-line:max-classes-per-file
export class CarsList extends React.Component<any, any> {
    constructor(props: any){
        super(props);
    
        this.state = {
            data: DataProvider.getAllCars(),
            onWarninPopup: false,
            object2deleteId: ""
        };
        
       console.log(props);       
    }

     /*
    componentDidUpdate - вызывается сразу после render. 
    Один раз в момент первого render'а компонента.
    */
    public componentDidMount() {
       // cast to HTMLElement 
       const htmlElem  = (document.getElementById('cars_list_table') as  HTMLElement);
   
       ContextMenu.init(htmlElem);

       // Регистрирую обработчик события подтверждения удаления по контекстному меню
       emitter.on('accept-delete-car', (objectId:string) => {
            console.log("Are you sure you want to delete a car with id " + objectId);
            this.setState(
                    {
                        onWarninPopup: !this.state.onWarninPopup, // reverse value
                        object2deleteId: objectId
                    }
            );                      
       });
    }  


    public render() {
        return (
            <div className="container" style={this.props.style}>                
                <CarsListNavmenu/>
                <table id="cars_list_table" className="table">
                    <thead>
                        <tr className="d-flex">
                            <th className="col-1">id</th>
                            <td className="col-2">Manufacturer</td>
                            <td className="col-2">Model</td>
                            <td className="col-1">Prise</td>
                            <td className="col-3">Contact person</td>
                            <td className="col-3">Phone</td>
                            <td className="col-3">Picture</td>                         
                        </tr>
                    </thead>
                    <tbody>                     
                        {this.state.data.map(
                            (singleCar: any, i: number) => 
                                <CarsListTableRow key = {i} data = {singleCar} 
                                   editorCaller={this.props.toggleEditor}/>)}    
                        <DeletionWarnMessager 
                            objectId2delete={this.state.object2deleteId} 
                            type={DeletionWarnMessager.TypeCar}
                            onWarninPopup={this.state.onWarninPopup}/>                       
                    </tbody>
                </table>    

               
            </div>
          
        )
    }

}

