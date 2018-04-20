import * as React from 'react';
import {DataProvider} from './DataProvider';


// В свойствах мы передаем id объекта(и признак, новый ли это объект)
interface IProps {
    object_id: string;
    is_new: boolean;
    style: string;
  }

  /*
interface Manufacturer {
    object_id: string;
    name: string;
    country: string;
}
*/

/*
Он должен
а) загружать в редактор объект по id, если не удалось загрузить сообщать об этом
б) понимать если это новый объект
в) поле id должно быть не редактируемое
*/
export class ManufacturerEditor extends React.Component<any, any> {
    constructor (props: any) {
        super(props);  

        console.log("ManufacturerEditor constructor: id =" + this.props.object_id);
        
        this.state = {
            manufacturer: {
                object_id: this.props.object_id, 
                // tslint:disable-next-line:object-literal-sort-keys
                name: this.props.manufacturer.name, 
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
                object_id: nextProps.manufacturer.object_id, 
                // tslint:disable-next-line:object-literal-sort-keys
                name: nextProps.manufacturer.object_id==='new' ? '' : nextProps.manufacturer.name, 
                country: nextProps.manufacturer.object_id==='new' ? '' : nextProps.manufacturer.country
            }}            
        );
    }
   
    public handleChangeManufacturer = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({manufacturer: {name: e.target.value}});
      }

    public handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({manufacturer: {country: e.target.value}});
      }

    // Обработчик сохранения
    public handleSave = (e: any) => {
        DataProvider.saveManufacturer (this.state);

       // очищаю состояние         
       this.setState({manufacturer : {
                object_id: '', 
                // tslint:disable-next-line:object-literal-sort-keys
                name: '', 
                country: '' 
        }});

        // Затем вызываю обработчик из родителя чтобы переключить состояние
        this.props.toggleEditor("back to list");
    }

    // Обработчик отмены
    public handleCancel = (e: any) => {
        // очищаю состояние         
         this.setState({manufacturer : {
            object_id: '', 
            // tslint:disable-next-line:object-literal-sort-keys
            name: '', 
            country: ''
        }});

        // Затем вызываю обработчик из родителя чтобы переключить состояние
        this.props.toggleEditor("back to list from cancel");
    }

    public render() { 
       return  (
            <div className='container' style={this.props.style}>
                <table>
                    <tr>
                        <label>id:</label><label>{this.props.object_id}</label>
                    </tr>
                    <tr>
                        <label>Manufacturer:  </label>
                        <input type="text" id="manufacturer" required={true} 
                            value={this.state.manufacturer.name} onChange={this.handleChangeManufacturer}/> 
                    </tr>
                    <tr>
                        <label>Country:</label>
                        <input type="text" id="country" required={true} 
                            value={this.state.manufacturer.country} onChange={this.handleChangeCountry}/>
                    </tr>
                </table>
                <hr/>
                <button onClick={this.handleSave}>Сохранить</button>
                <button onClick={this.handleCancel}>Отменить</button>
            </div>
        )
    }
}