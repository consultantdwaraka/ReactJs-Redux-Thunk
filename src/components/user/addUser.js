import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { addUserAction } from '../../actions/userActions';

class AddUser extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form autoComplete="off" onSubmit={handleSubmit}> 
                <div className="form-group row">
                    <label htmlFor="firstName" className="col-2" >First Name: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component="input" name="firstName" id="firstName" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="lastName" className="col-2" >Last Name: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component="input" name="lastName" id="lastName" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="employeeId" className="col-2 no-wrap" >Employee ID: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component="input" name="employeeId" id="employeeId" />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-8">
                    </div>
                    <div className="col-2">
                        <button type="submit" className="btn btn-secondary"> Add</button>
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-secondary"> Reset</button>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialValues: state.userReducer.userFormData,
        enableReinitialize: true
    }

}

AddUser = reduxForm({
    form: 'addUserForm'
})(AddUser);
export default connect(mapStateToProps, null)(AddUser);