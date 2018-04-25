import * as React from "react";

import { ContextMenuTarget, Menu, MenuItem } from "@blueprintjs/core";

import {DataProvider} from './DataProvider';
import {DeletionAlert} from './DeletionAlert';
 

// tslint:disable-next-line:max-classes-per-file
@ContextMenuTarget
export class ListTableRow extends React.Component<any, any> {
    
    constructor(props: any){
        super(props);

         // This binding is necessary to make `this` work in the callback
         this.handleDelete = this.handleDelete.bind(this); 
         this.handleEdit = this.handleEdit.bind(this);
         this.handleCreate = this.handleCreate.bind(this);         
       
    }
   
    public handleCreate(e: React.MouseEvent<HTMLElement>): void {
        console.log ("handle create called ");  
        this.props.editorCaller('new');     
     }

    public handleEdit(e: React.MouseEvent<HTMLElement>): void {
       console.log ("handle edit called with param " + this.props.data.id);
       this.props.editorCaller(this.props.data.id);          
    }
     
    public handleDelete(): void {
        this.props.deletionConfirmation(this.props.data.id);
    }

    public renderContextMenu() {
        // return a single element, or nothing to use default browser behavior
        return (
            <Menu>
                <MenuItem onClick={this.handleCreate} text="Create New" />
                <MenuItem onClick={this.handleEdit} text="Edit" />
                <MenuItem onClick={this.handleDelete} text="Delete" />
            </Menu>
        );
    }

    public render() {
       return (
            <tr className="d-flex" id={this.props.data.id}>
                <td className="col-1">{this.props.data.id}</td>
                <td className="col-3">{this.props.data.manufacturer}</td>
                <td className="col-3">{this.props.data.country}</td>
            </tr>
       );
    }
 }


// tslint:disable-next-line:max-classes-per-file
export class ManufacturerList extends React.Component<any, any> {
    constructor(props: any){
        super(props);
    
        this.state = {
            data: DataProvider.getAllManufacturers(),
            object2deleteId: "",
            onWarninPopup: false           
        };
        
        this.deletionConfirmation = this.deletionConfirmation.bind(this);              
    }

    public deletionConfirmation(objectID: string): void {
        console.log("Are you sure you want to delete manufacturer with id " + objectID);
        
        this.setState (
            {
                object2deleteId: objectID,
                onWarninPopup: !this.state.onWarninPopup // reverse value
            }
        );
    } 


    public render() {
        return (
            <div className="container" style={this.props.style}>                
                 <nav className="navbar navbar-expand-lg navbar-light bg-light">
                     <a className="navbar-brand" href="#">
                         <img src="img/symbol_add.png" width="30" height="30" 
                         alt="Add new manufacturer"
                         // tslint:disable-next-line:jsx-no-lambda
                         onClick={ () => {
                            this.props.toggleEditor("new");
                           }
                        }/>
                    </a>              
                </nav>    
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
                                   editorCaller={this.props.toggleEditor}
                                   deletionConfirmation={this.deletionConfirmation}/>)}    
                        <DeletionAlert
                            objectId2delete={this.state.object2deleteId} 
                            type={DeletionAlert.TypeManufacturer}
                            onWarninPopup={this.state.onWarninPopup}/>                     
                    </tbody>
                </table>    

               
            </div>
          
        )
    }

}