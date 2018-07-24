import React, {Component} from 'react';

class AddUser extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <form>
                <div class="form-group row">
                    <label for="firstName" className="col-2" >First Name: </label>
                    <div className="col-10">
                        <input type="text" className="form-control" id="firstName"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="lastName" className="col-2" >Last Name: </label>
                    <div className="col-10">
                        <input type="text" className="form-control" id="lastName"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="employeeID" className="col-2" >Employee ID: </label>
                    <div className="col-10">
                        <input type="text" className="form-control" id="employeeId"/>
                    </div>
                </div>
                <div class="form-group row">
                    <div className="col-8">
                    </div>
                    <div className="col-1">
                        <button type="button" className="btn btn-secondary"> Add</button>
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-secondary"> Reset</button>
                    </div>
                </div>
            </form>
        );
    }
}
export default AddUser;