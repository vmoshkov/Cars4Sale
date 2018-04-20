import * as React from "react";

import ContextMenu from  'context-menu';
import 'context-menu/lib/styles.css';
import Popup from "reactjs-popup";
import EventEmitter from 'tiny-emitter';
import {DataProvider} from './DataProvider';

const emitter: EventEmitter = new EventEmitter();
 

export class ListNavmenu extends React.Component<any, any> {

    public render() {
        return (     
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                     <a className="navbar-brand" href="#">
                         <img src="img/symbol_add.png" width="30" height="30" alt="Add new manufacturer"/>
                    </a>              
                </nav>    
               
            );
    }

}

// tslint:disable-next-line:max-classes-per-file
export class ListTableRow extends React.Component<any, any> {
    
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
                        // TODO: выводить предупреждающее окно
                        emitter.emit('accept-delete-manufacturer', this.id);                        
                    }, 
                }            ]
        ];

        const handle = ContextMenu.showMenu(menuData);
    }

    public render() {
       return (
            <tr className="d-flex" id={this.props.data.id} onContextMenu={this.handleOnContextMenu}>
                <td className="col-1">{this.props.data.id}</td>
                <td className="col-3">{this.props.data.manufacturer}</td>
                <td className="col-3">{this.props.data.country}</td>
            </tr>
       );
    }
 }

/*
state:
     
*/
// tslint:disable-next-line:max-classes-per-file
export class ManufacturerList extends React.Component<any, any> {
    constructor(props: any){
        super(props);
    
        this.state = {
            data: DataProvider.getAllManufacturers(),
            onWarninPopup: false
        };
        
       console.log(props);       
    }

     /*
    componentDidUpdate - вызывается сразу после render. 
    Один раз в момент первого render'а компонента.
    */
    public componentDidMount() {
       // cast to HTMLElement 
       const htmlElem  = (document.getElementById('mufacturers_list_table') as  HTMLElement);
   
       ContextMenu.init(htmlElem);

       // Регистрирую обработчик события подтверждения удаления по контекстному меню
       emitter.on('accept-delete-manufacturer', (objectId:string) => {
            console.log("Are you sure you want to delete manufacturer with id " + objectId);
            if (this.state.onWarninPopup) {
                this.setState({onWarninPopup: false});
            } 
            else {
                this.setState({onWarninPopup: true});
            }
            DataProvider.deleteManufacturer(objectId);
       });
    }  


    public render() {
        return (
            <div className="container" style={this.props.style}>                
                <ListNavmenu/>
                <table id="mufacturers_list_table" className="table">
                    <thead>
                        <tr className="d-flex">
                            <th className="col-1">id</th>
                            <th className="col-3">Manufacturer</th>
                            <th className="col-3">Country</th>                            
                        </tr>
                    </thead>
                    <tbody>                     
                            {this.state.data.map(
                                (manufacturer: any, i: number) => 
                                    <ListTableRow key = {i} data = {manufacturer} 
                                          editorCaller={this.props.toggleEditor}/>)}    
                                          <Popup 
                                            open={this.state.onWarninPopup}
                                            modal="true"
                                            closeOnDocumentClick="true"
                                            onClose={ 
                                                // tslint:disable-next-line:jsx-no-lambda
                                                () => { 
                                                    console.log('closeing popup'); 
                                                    this.setState({onWarninPopup: false}) 
                                                } 
                                            } 
                                          >
                                            <span> Are you sure you want to delete this manufacture? </span>
                                            <br/> <hr/>
                                            <button
                                                className="button"
                                                onClick={
                                                    // tslint:disable-next-line:jsx-no-lambda
                                                    () => { console.log('closeing popup'); this.setState({onWarninPopup: false}) }
                                                }
                                            >
                                                Yes, sure!
                                            </button>
                                            <button
                                                className="button"
                                                onClick={
                                                    // tslint:disable-next-line:jsx-no-lambda
                                                    () => { console.log('closeing popup'); this.setState({onWarninPopup: false}) }
                                                }
                                            >
                                                Cancel my decision!
                                            </button>
                                        </Popup>                  
                    </tbody>
                </table>    

               
            </div>
          
        )
    }

}