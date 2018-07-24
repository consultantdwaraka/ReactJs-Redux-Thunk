import React, {Component} from 'react';

class ListUsers extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="row" style={{padding:'5px'}}>
                    <div className="col-12" style={{borderBottomStyle:'dotted'}}>
                        <div className="row">
                            <div className="col-8">
                                {this.props.userDetails.firstName}
                            </div>
                            <div className="col-4">
                                <button type="button" className="btn btn-secondary">Edit</button>
                            </div>
                        </div>
                        <div className="row" style={{paddingTop:'5px'}}>
                            <div className="col-8">
                                {this.props.userDetails.lastName}
                            </div>
                            <div className="col-4">
                                <button type="button" className="btn btn-secondary">Delete</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                {this.props.userDetails.employeeId}
                            </div>
                            <div className="col-4">
                                
                            </div>
                        </div>
                    </div>
                    
                </div>);
    }
}
export default ListUsers;