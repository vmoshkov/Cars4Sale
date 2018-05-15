import * as React from "react";

import { IImage, ICar } from './Types';
import { ContextMenuTarget, Menu, MenuItem } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import {DataProvider} from './DataProvider';
import {DeletionAlert} from './DeletionAlert';

type TCarListState = {
    data: ICar[],
    object2deleteId: string,
    onWarninPopup: boolean
}

// tslint:disable-next-line:max-classes-per-file
@ContextMenuTarget
export class CarsListTableRow extends React.Component<any, any> {
    
    constructor(props: any){
        super(props);

        this.state = {
            picture: ""
        }
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
       console.log ("handle edit called with param " + this.props.data.objectId);  
       this.props.editorCaller(this.props.data.objectId);     
    }
     
    public handleDelete(): void {
        this.props.deletionConfirmation(this.props.data.objectId);
    }

    // Если поменялись свойства, значит надо перегрузить данные в редактор
    public componentWillReceiveProps(nextProps: any) {

        let that: CarsListTableRow = this;

        if(nextProps.data.images!==null && nextProps.data.images.length>0)
        {
            const mainImage: IImage = nextProps.data.images[0];
            that.setState({
                picture: mainImage.data,
            })

            return;
        }

        fetch("img/no_image.png")
            .then((resp) => {return resp.blob()}) // Transform the data into json
            // tslint:disable-next-line:only-arrow-functions
            .then(function (blob_data) {
                   let promise = new Promise(function(resolve, reject) {
                        const fileReader = new FileReader(); 
                        fileReader.onload = () => {
                            resolve(fileReader.result );
                        }
                        fileReader.readAsDataURL(blob_data);
                    })

                    return promise;           
                })
            .then(function (result) { 
                that.setState({
                    picture: result,
                })
                
            })
            // tslint:disable-next-line:only-arrow-functions
            .catch(function(error: any) {
                console.error(error);
            }); 

       
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
                <td className="col-2">{this.props.data.manufacturer.name}</td>
                <td className="col-1">{this.props.data.model}</td>                
                <td className="col-1">{this.props.data.prise}</td>
                <td className="col-2">{this.props.data.contactPerson}</td>
                <td className="col-2">{this.props.data.contactPhone}</td>
                <td className="col-4">
                   <img  height="50" width="50" src={this.state.picture} /></td>
            </tr>
       );
    }
 }



// tslint:disable-next-line:max-classes-per-file
export class CarsList extends React.Component<any, TCarListState> {
    constructor(props: any){
        super(props);
    
        this.state = {
            data: [],
            object2deleteId: "",
            onWarninPopup: false,            
        };
          
        this.deletionConfirmation = this.deletionConfirmation.bind(this); 
    }

    public deletionConfirmation(objectID: string): void {
        console.log("Are you sure you want to delete car with id " + objectID);
        
        this.setState (
            {
                object2deleteId: objectID,
                onWarninPopup: !this.state.onWarninPopup // reverse value
            }
        );
    }

    public componentDidMount() {
        let that = this;

        // Send a request to the server for a car list
        DataProvider.getAllCars()
        .then ((list:ICar[]) => { 
            that.setState ({data: list});         
        })
        .catch(e => console.log(e));
    }

    // Если поменялись свойства, значит надо перегрузить данные в редактор
    public componentWillReceiveProps(nextProps: any) {
        let that = this;

        if((nextProps.showCarList!==that.props.showCarList) && (nextProps.showCarList==true))
        {
            // Send a request to the server for a manu list
            DataProvider.getAllCars()
            .then ((list:ICar[]) => { 
                that.setState ({data: list});

                console.log (this.state.data);
            })
            .catch(e => console.log(e));
        }
     }

    public render() {
        return (
            <div className="container" style={this.props.style}>                
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                     <a className="navbar-brand" href="#">
                         <img src="img/symbol_add.png" width="30" height="30" 
                         alt="Add new cars for sale"
                         // tslint:disable-next-line:jsx-no-lambda
                         onClick={ () => {
                             this.props.toggleEditor("new");
                            }
                         }/>
                    </a>              
                </nav> 
                <table id="cars_list_table" className="table">
                    <thead>
                        <tr className="d-flex">
                            <th className="col-1">id</th>
                            <th className="col-2">Manufacturer</th>
                            <th className="col-1">Model</th>
                            <th className="col-1">Prise</th>
                            <th className="col-2">Contact person</th>
                            <th className="col-2">Phone</th>
                            <th className="col-4">Picture</th>                         
                        </tr>
                    </thead>
                    <tbody>                     
                        {this.state.data.map(
                            (singleCar: ICar, i: number) => 
                                <CarsListTableRow key = {i} data = {singleCar} 
                                   editorCaller={this.props.toggleEditor}
                                   deletionConfirmation={this.deletionConfirmation}/>)}   
                        <DeletionAlert
                            objectId2delete={this.state.object2deleteId} 
                            type={DeletionAlert.TypeCar}
                            onWarninPopup={this.state.onWarninPopup}/>                                            
                    </tbody>
                </table>    

               
            </div>
          
        )
    }

}

