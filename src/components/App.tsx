import * as React from "react";

import { Jumbo } from "./Jumbo";
import { ManufacturerList } from "./ManufacturerList";


export class App extends React.Component<any, any> {
    
    constructor(props: any) {
        super(props);
        this.state = {isToggleOn: true};
    
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
      }
    
    handleClick(e: React.MouseEvent<HTMLAnchorElement>): void {
        e.preventDefault();
        console.log('The link 1 was clicked.' + this.state.isToggleOn);

        if(this.state.isToggleOn)
            this.setState ({isToggleOn: false});
        else
            this.setState ({isToggleOn: true});
      }

    render() {
        const showHide = {
            'display': this.state.isToggleOn ? 'block' : 'none'
        };

        console.log(showHide);

        return (
        <div className="container">
           <Jumbo/>
           <div className="container-fluid">
                <div className="row">
                        <div className="col-sm-2 bg-light">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                <a className="nav-link" href="#" onClick={this.handleClick}>Link 1</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link" href="#">Link 2</a>
                                </li>    
                                <li className="nav-item">
                                <a className="nav-link disabled" href="#">Disabled</a>
                                </li>
                            </ul>                       
                        </div>
                        <div className="col-sm-10"><ManufacturerList style={showHide}/></div>
                </div>
            </div>          
        </div>
        )
    }
}