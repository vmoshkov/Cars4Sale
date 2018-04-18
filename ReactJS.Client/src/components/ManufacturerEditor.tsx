import * as React from 'react';
import {DataProvider} from './DataProvider';


// В свойствах мы передаем id объекта(и признак, новый ли это объект)
interface IProps {
    object_id: string;
    is_new: boolean;
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
export class ManufacturerEditor extends React.Component<IProps, any> {
    constructor (props: IProps) {
        super(props);  
        
        this.state = {object_id: 'null', name: '', country: ''};
        this.handleChangeManufacturer = this.handleChangeManufacturer.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    public componentDidMount() {
        // если у нас существующий объект, то...
        if(!this.props.is_new) {
            // обновляю state данными с сервера
            this.setState(DataProvider.getManufacturer(this.props.object_id));
            
        }
    }

    public handleChangeManufacturer = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({name: e.target.value});
      }

    public handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({country: e.target.value});
      }

    // фактически мы передаем весь стейт
    public handleSave = (e: any) => {
        DataProvider.saveManufacturer (this.state);
    }


    public render() { 
       return  (
            <div className='container'>
                <table>
                    <tr>
                        <label>id:</label><label>{this.state.object_id}</label>
                    </tr>
                    <tr>
                        <label>Manufacturer:  </label>
                        <input type="text" id="manufacturer" required={true} value={this.state.name} onChange={this.handleChangeManufacturer}/> 
                    </tr>
                    <tr>
                        <label>Country:</label>
                        <input type="text" id="country" required={true} value={this.state.country} onChange={this.handleChangeCountry}/>
                    </tr>
                </table>
                <hr/>
                <button onClick={this.handleSave}>Сохранить</button><button>Отменить</button>
            </div>
        )
    }
}