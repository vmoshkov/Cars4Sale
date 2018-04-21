import * as React from "react";
import Popup from "reactjs-popup";

import {DataProvider} from './DataProvider';


export class DeletionWarnMessager extends React.Component<any, any> {
    static TypeManufacturer: string = "manufacturer";
    static TypeCar: string = "car";

    constructor (props: any) {
        super(props); 
        
        this.state = {
            objectType : "",
            objectId2delete: "",
            open: false,
            message: ""
        }

        this.handleSave = this.handleSave.bind(this);
    }

    // Если поменялись свойства, значит надо открывать предупреждение
    public componentWillReceiveProps(nextProps: any) {
        let msg:string = "";

        console.log(nextProps);

        if (this.props.type===DeletionWarnMessager.TypeManufacturer) {
            msg = "  Are you sure you want to delete manufacturer with id: " + nextProps.objectId2delete +  "? ";
        }
        else if(this.props.type===DeletionWarnMessager.TypeCar) {
            msg = "  Are you sure you want to delete car with id: " + nextProps.objectId2delete +  "? ";
        }

        // if this.props.onWarninPopup has changed we must open dialog 
        // it happens only within certain circumstances.
        // else we don't show alert
        this.setState( {
            objectType : nextProps.type,
            objectId2delete: nextProps.objectId2delete,
            open: ((this.props.onWarninPopup != nextProps.onWarninPopup) ? true : false ),
            message: msg
        } );
    }

    public handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        // launch deletion function
        if (this.props.type===DeletionWarnMessager.TypeManufacturer) {
            DataProvider.deleteManufacturer(this.state.objectId2delete);
        }
        else if (this.props.type===DeletionWarnMessager.TypeCar) {
            DataProvider.deleteCar(this.state.objectId2delete);
        }
        console.log('closeing popup'); 
        this.setState({open: false}) 
    }

    public render() {
        return (     
                
            <Popup 
                className="modal-dialog"
                open={this.state.open}
                modal="true"
                closeOnDocumentClick="true"
                onClose={ 
                    // tslint:disable-next-line:jsx-no-lambda
                    () => this.setState({open: false})  
                } 
            >
            <div className="modal-content alert-danger">
                <div className="modal-body" >
                {this.state.message}
                </div>
                    <div className="modal-footer">
                        <button
                        className="btn btn-warning"
                        onClick={this.handleSave}
                        >
                            Yes, please!
                        </button>
                        <button
                        className="btn btn-primary"
                        onClick={
                            // tslint:disable-next-line:jsx-no-lambda
                            () => this.setState({open: false}) 
                        }
                        >
                            Cancel it.
                        </button>
                    </div>                
            </div>
            </Popup>            
               
        ); // return
    }
}