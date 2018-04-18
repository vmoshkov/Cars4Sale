import * as React from "react";

import ContextMenu from  'context-menu';
import 'context-menu/lib/styles.css';


export class ListNavmenu extends React.Component<any, any> {

    render() {
        return (     
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                     <a className="navbar-brand" href="#">
                         <img src="img/symbol_add.png" width="30" height="30" alt="Add new manufacturer"/>
                    </a>              
                </nav>    
               
            );
    }

}

export class ListTableRow extends React.Component<any, any> {
    constructor(props: any){
        super(props);

        // This binding is necessary to make `this` work in the callback
       this.handleOnContextMenu = this.handleOnContextMenu.bind(this);
    }
   
    static createNew():void {
        console.log("create new");
    }

    static open(id: string):void {
        console.log("open with id =" + id);
    }

    static delete(id: string):void{
        console.log("delete with id =" + id);
    }

    handleOnContextMenu(e: React.MouseEvent<HTMLTableRowElement>): void {
        e.preventDefault();
               
        //console.log(e.currentTarget);  

        const data: any = [
            [
                {label: 'Create new', onClick() { 
                    ListTableRow.createNew();                  
                }, id: this.props.data.id},
                {label: 'Edit', onClick() {  
                    ListTableRow.open(this.id); 
                }, id: this.props.data.id},
                {label: 'Delete', disabled: false, onClick() {
                    ListTableRow.delete(this.id); 
                }, id: this.props.data.id},
                {label: 'Sort by', submenu: [
                    [
                        {label: 'Name', onClick() { /** impl */ }},
                        {label: 'Date', onClick() { /** impl */ }},
                        {label: 'Size', onClick() { /** impl */ }},
                    ],
                ]},
            ]
        ];

        const handle = ContextMenu.showMenu(data);

    }

    render() {
       return (
            <tr className="d-flex" id={this.props.data.id} onContextMenu={this.handleOnContextMenu}>
                <td className="col-1">{this.props.data.id}</td>
                <td className="col-3">{this.props.data.manufacturer}</td>
                <td className="col-3">{this.props.data.country}</td>
            </tr>
       );
    }
 }

export class ManufacturerList extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.state =  {
            data: 
            [
               {
                  "id":1,
                  "manufacturer":"BMW",
                  "country":"Germany"
               },
               {
                  "id":2,
                  "manufacturer":"FORD",
                  "country":"USA"
               },
               {
                  "id":3,
                  "manufacturer":"Jaguar",
                  "country":"UK"
               }
            ]
         }
       console.log(props);       
    }

     /*
    componentDidUpdate - вызывается сразу после render. Не вызывается в момент первого render'а компонента.
    */
    componentDidMount() {
        // cast to HTMLElement 
       var htmlElem  = (document.getElementById('mufacturers_list_table') as  HTMLElement);
   
       ContextMenu.init(htmlElem);
    }  


    render() {
        console.log("from ManufacturerList render: ");
        console.log(this.state);
        return (
            <div className="container" style={this.state.displayListstyle}>                
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
                                (manufacturer: any, i: number) => <ListTableRow key = {i} data = {manufacturer} />)}                      
                    </tbody>
                </table>
                

                <div>
                </div>
            </div>
          
        )
    }

}