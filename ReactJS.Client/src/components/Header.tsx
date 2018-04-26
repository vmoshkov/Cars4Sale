import * as React from "react";

import { Colors } from "@blueprintjs/core";

export class Header extends React.Component<any, any> {

    render() {
        return (
            <nav className="pt-navbar pt-dark">
                 <div className="pt-navbar-group">
                     <h2>React CarDesk Application</h2> 
                </div>               
            </nav>           
        )
    }
}