import * as React from 'react';
import {IManufacturer} from './Types';
import {DataProvider} from './DataProvider';


type TManufacturerEditorState = {
    manufacturer: IManufacturer
};

/*
Он должен
а) загружать в редактор объект по id, если не удалось загрузить сообщать об этом
б) понимать если это новый объект
в) поле id должно быть не редактируемое
*/
export class ManufacturerEditor extends React.Component<any, TManufacturerEditorState> {
    constructor (props: any) {
        super(props);  

        console.log("ManufacturerEditor constructor: id =" + this.props.object_id);
        
        this.state = {
            manufacturer: {
                objectId: this.props.object_id, 
                // tslint:disable-next-line:object-literal-sort-keys
                manufacturer: this.props.manufacturer.name, 
                country: this.props.manufacturer.country
            }           
        };
        this.handleChangeManufacturer = this.handleChangeManufacturer.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }


    // Если поменялись свойства, значит надо перегрузить данные в редактор
    public componentWillReceiveProps(nextProps: any) {
       this.setState({
            manufacturer: {
                objectId: nextProps.object_id, 
                // tslint:disable-next-line:object-literal-sort-keys
                manufacturer: nextProps.object_id==='new' ? '' : nextProps.manufacturer.manufacturer, 
                country: nextProps.object_id==='new' ? '' : nextProps.manufacturer.country
            }}            
        );
    }
   
    public handleChangeManufacturer = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newState: IManufacturer = this.state.manufacturer;
        newState.manufacturer = e.target.value;        
        this.setState({manufacturer: newState});
      }

    public handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newState: IManufacturer = this.state.manufacturer;
        newState.country = e.target.value;  
        this.setState({manufacturer: newState});
      }

    // Save handler
    public handleSave = (e: any) => {
        let newManu: IManufacturer = 
            DataProvider.saveManufacturer (this.state.manufacturer);

       // update state        
       this.setState({manufacturer : newManu});
    }

    // Обработчик отмены
    public handleCancel = (e: any) => {
        // очищаю состояние         
         this.setState({manufacturer : {
            objectId: '', 
            // tslint:disable-next-line:object-literal-sort-keys
            manufacturer: '', 
            country: ''
        }});

        // Затем вызываю обработчик из родителя чтобы переключить состояние
        this.props.toggleEditor("back to list from cancel");
    }

    public render() { 
       return  (
            <div className='container pt-card pt-elevation-3' style={this.props.style}>               
                     <table>  
                        <tr>
                            <td className="w-20 text-left">
                                <label>ID: </label>
                            </td>
                            <td className="text-left">
                            <input type="text" required={true}  className="pt-input pt-disabled"
                                value={this.state.manufacturer.objectId}/> 
                            </td>
                        </tr>                     
                        <tr>
                            <td className="w-20 text-left">
                                <label>Manufacturer: </label>
                            </td>
                            <td className="text-left">
                            <input type="text" id="manufacturer" required={true}  className="pt-input"
                                value={this.state.manufacturer.manufacturer} onChange={this.handleChangeManufacturer}/> 
                            </td>
                        </tr>
                        <tr>
                            <td className="w-20 text-left">
                                <label>Country: </label>
                            </td>
                            <td className="text-left">
                            <input type="text" id="country" required={true} className="pt-input"
                                value={this.state.manufacturer.country} onChange={this.handleChangeCountry}/>
                            </td>
                        </tr>
                    </table>
                    <hr/>
                    <div className="text-right">
                        <button type="button" className="pt-button pt-intent-success" onClick={this.handleSave}>Save</button>
                        <button type="button" className="pt-button" onClick={this.handleCancel}>Close</button>
                    </div>
               
            </div>
        )
    }
}