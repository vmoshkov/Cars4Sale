import * as React from "react";

export class AbstractElementList extends React.Component<any, any> {

    constructor(props: any){
        super(props);
        this.state = { showForm: false };
       console.log(props);
    }

    /*
    componentDidUpdate - вызывается сразу после render. Не вызывается в момент первого render'а компонента.
    */
    componentDidMount() {
        //console.log(this.props);
    }

    render() {
        console.log("from AbstractElementList render: ");
        console.log(this.props.style);
        return (
            <div className="container-fluid" style={this.props.style}>
                <div className="row">
                <table id="productSizes" className="table">
                    <thead>
                        <tr className="d-flex">
                            <th className="col-1">Size</th>
                            <th className="col-3">Bust</th>
                            <th className="col-3">Waist</th>
                            <th className="col-5">Hips</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="d-flex">
                            <td className="col-1">6</td>
                            <td className="col-3">79 - 81</td>
                            <td className="col-3">61 - 63</td>
                            <td className="col-5">89 - 91</td>
                        </tr>
                        <tr className="d-flex">
                            <td className="col-1">8</td>
                            <td className="col-3">84 - 86</td>
                            <td className="col-3">66 - 68</td>
                            <td className="col-5">94 - 96</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}