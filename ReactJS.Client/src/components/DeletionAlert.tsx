import * as React from "react";

import { Alert, Button, Intent, IToaster,  Position, Toaster } from "@blueprintjs/core";

import {DataProvider} from './DataProvider';

export class DeletionAlert extends React.Component<any, any> {
    public static TypeManufacturer: string = "manufacturer";
    public static TypeCar: string = "car";

    constructor (props: any) {
        super(props); 
        
        this.state = {
            isOpen: false,
            message: "",
            objectId2delete: "",
            objectType : "",           
                       
        }        
    }

    // Если поменялись свойства, значит надо открывать предупреждение
    public componentWillReceiveProps(nextProps: any) {
        let msg:string = "";       

        if (this.props.type===DeletionAlert.TypeManufacturer) {
            msg = "  Are you sure you want to delete manufacturer with id: " + nextProps.objectId2delete +  "? ";
        }
        else if(this.props.type===DeletionAlert.TypeCar) {
            msg = "  Are you sure you want to delete car with id: " + nextProps.objectId2delete +  "? ";
        }

        // if this.props.onWarninPopup has changed we must open dialog 
        // it happens only within certain circumstances.
        // else we don't show alert
        this.setState( {
            isOpen: ((this.props.onWarninPopup != nextProps.onWarninPopup) ? true : false ),
            message: msg,
            objectId2delete: nextProps.objectId2delete,
            objectType : nextProps.type,              
        } );
    }

    public render() {
        return (  
            <div>
                <Alert
                    className={this.props.themeName}
                    cancelButtonText="Cancel"
                    confirmButtonText="Yes, do it!"
                    icon="trash"
                    intent={Intent.DANGER}
                    isOpen={this.state.isOpen}
                    onCancel={this.handleMoveCancel}
                    onConfirm={this.handleMoveConfirm}                >
                    <p>
                       {this.state.message}                      
                    </p>
                </Alert>
               
            </div>            
        )
    }

    private handleMoveConfirm = () => {
        this.setState({ isOpen: false }); 

        const AppToaster = Toaster.create({
            position: Position.TOP_RIGHT            
        });

        let thePromise: Promise<any> = null;
        
        // launch deletion function
        if (this.props.type===DeletionAlert.TypeManufacturer) {
            thePromise = DataProvider.deleteManufacturer(this.state.objectId2delete);
        }
        else if (this.props.type===DeletionAlert.TypeCar) {
            DataProvider.deleteCar(this.state.objectId2delete);
        }

        thePromise.then(text=>{
            AppToaster.show({ 
                icon: "hand", 
                intent: Intent.SUCCESS, 
                message: "Object with id={" + this.state.objectId2delete + "} deleted",
                timeout: 2000 });
        })
        .catch(e => {
            AppToaster.show({ 
                icon: "hand", 
                intent: Intent.DANGER, 
                message: e,
                timeout: 2000 });
        })

        
    };

    private handleMoveCancel = () => this.setState({ isOpen: false });
}