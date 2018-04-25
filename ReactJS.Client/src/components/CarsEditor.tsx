import * as React from 'react';

import { Classes, DateInput } from "@blueprintjs/datetime";
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

//import { Classes, DatePicker } from "@blueprintjs/datetime";
import  {DataProvider} from './DataProvider';


export class CarsEditor extends React.Component<any, any> {
    constructor (props: any) {
    super(props);  

        console.log("CarsEditor constructor: id =" + this.props.object_id);
        
        this.state = {
            car: {
                object_id: this.props.object_id,                
            }           
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.handleDateChange = this.handleDateChange.bind(this);

    }

    // Если поменялись свойства, значит надо перегрузить данные в редактор
    public componentWillReceiveProps(nextProps: any) {
        this.setState({
             car: {
                 object_id: nextProps.object_id, 
            }}            
         );
     }

     // Обработчик сохранения
    public handleSave = (e: any) => {
        // очищаю состояние         
       this.setState({car : {
                object_id: '',               
        }});

        // Затем вызываю обработчик из родителя чтобы переключить состояние
        this.props.toggleEditor("back to list");
    }

    // Обработчик отмены
    public handleCancel = (e: any) => {
        // очищаю состояние         
         this.setState({car : {
            object_id: '',          
        }});

        // Затем вызываю обработчик из родителя чтобы переключить состояние
        this.props.toggleEditor("back to list from cancel");
    }

    // Обработчик выбора даты
    public handleDateChange = (date: Date) => {              
         this.setState({car : {
            selectedItemDate: date,          
        }});       
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
                                 value={this.state.car.object_id}/> 
                             </td>
                         </tr> 
                         <tr>
                             <label>item_date:                         
                             </label>
                                                          
                            <DateInput
                                formatDate={date => {
                                    if(date!==null) {
                                       return date.toDateString();
                                    } 
                                    return new Date().toDateString();
                                    }
                                }
                                onChange={this.handleDateChange}
                                parseDate={str => new Date(str)}
                                placeholder={"M/D/YYYY"}
                                value={this.state.selectedItemDate}                                
                            />
                        </tr>                   
                         
                     </table>
                     <hr/>
                     <div className="text-right">
                         <button type="button" className="pt-button pt-intent-success" onClick={this.handleSave}>Save</button>
                         <button type="button" className="pt-button" onClick={this.handleCancel}>Cancel</button>
                     </div>
                
             </div>
         )
     }


}