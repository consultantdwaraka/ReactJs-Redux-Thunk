import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { addUserAction } from '../../actions/userActions';

class AddUser extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { handleSubmit, reset, id } = this.props;
        return ( <div>
            <h1> {id? 'Edit User':'Add User'} </h1>
                    <br/>
                    <br/>
            <form autoComplete="off" onSubmit={handleSubmit}> 
                <div className="form-group row">
                    <label htmlFor="firstName" className="col-2" >First Name: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component={renderField} name="firstName" id="firstName" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="lastName" className="col-2" >Last Name: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component={renderField} name="lastName" id="lastName" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="employeeId" className="col-2 no-wrap" >Employee ID: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component={renderField} name="employeeId" id="employeeId" />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-8">
                    </div>
                    <div className="col-2">
                        <button type="submit" className="btn btn-secondary"> {id? 'Edit':'Add'}</button>
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-warning" onClick={reset}> Reset</button>
                    </div>
                </div>
            </form> </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialValues: state.userReducer.userFormData,
        enableReinitialize: true,
        id: state.userReducer.userFormData && state.userReducer.userFormData.id
    }

}

const validate = values => {
    const errors = {};
    if(!values.firstName) {
        errors.firstName = 'Required';
    }
  
    if(!values.lastName) {
        errors.lastName = 'Required';
    }
    if(!values.employeeId) {
        errors.employeeId = 'Required';
    }
    return errors;
}

AddUser = reduxForm({
    form: 'addUserForm',
    validate
})(AddUser);
export default connect(mapStateToProps, null)(AddUser);

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <div>
        <input className="form-control" {...input} type={type} />
        {touched &&
          (error && <div class="alert alert-danger">
          {error}
        </div>)}
    </div>
    )