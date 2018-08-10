import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';
class AddProject extends Component {
    constructor(props) {
        super(props)
        this.state = { show: false };
        
    }


    
    checkboxValue(e) {
        setTimeout(() => {
            this.props.onDateAutoSelect(this.props.isDateCheckSelected);
        }, 1000 / 1000);
    }
    render() {
        const { handleSubmit, resetProject, reset, isDateCheckSelected, projectName, projectId, defaultStartDate, defaultEndDate, handlePopup } = this.props;
        return (
            <div>
                <h1> {projectId ? 'Edit Project' : 'Add Project'}  </h1>
                <br />
                <br />
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="projectName" className="col-2" >Project: </label>
                        <div className="col-10">
                            <Field type="text" className="form-control" disabled={projectId ? true : false} component={renderField} name="projectName" id="projectName" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="datecheck" className="col-2" ></label>
                        <label className="col-1">
                            <Field type="checkbox" component="input" name="datecheck" id="datecheck" onChange={(e) => this.checkboxValue(e)} />
                        </label>
                        <label className="col-2" style={{ whiteSpace: 'noWrap', textAlign: 'left' }}>
                            Set Start and End Date <br />
                        </label>
                        <div className='col-3'>
                            <Field type="date" className="form-control" disabled={isDateCheckSelected ? true : false} component={renderField} name="startDate" id="startDate" />
                        </div>
                        <div className='col-3'>
                            <Field type="date" className="form-control" disabled={isDateCheckSelected ? true : false} component={renderField} name="endDate" id="endDate" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="priority" className="col-2" >Priority: </label>
                        <div className="col-10">
                            <Field type="range" className="form-control col-10" component={renderField} name="priority" id="priority" min="1" max="30" step="1" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="employeeId" className="col-2 no-wrap" >Manager: </label>
                        <div className="col-8">
                            <Field type="text" className="form-control" disabled={true} component={renderField} name="managerId" id="managerId" />
                        </div>
                        <div className="col-2">
                            <button type="button" className="btn btn-primary" onClick={handlePopup}> Search </button>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-8">
                        </div>
                        <div className="col-2">
                            <button type="submit" className="btn btn-secondary"> {projectId ? 'Update' : 'Add'}</button>
                        </div>
                        <div className="col-2">
                            <button type="button" className="btn btn-secondary" onClick={reset}> Reset</button>
                        </div>
                    </div>
                </form>
                <div>
                </div>
            </div>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.projectName) {
        errors.projectName = 'Required';
    }

    if (!values.managerId) {
        errors.managerId = 'Required';
    }
    if (!values.startDate) {
        errors.startDate = 'Required';
    }
    if (!values.priority) {
        errors.priority = 'Required';
    }
    if (!values.endDate) {
        errors.endDate = 'Required';
    }
    if (values.startDate && values.endDate) {
        if (moment(values.startDate).isAfter(values.endDate)) {
            errors.startDate = 'Start Date should be before the End Date';
        }
    }
    return errors;
}

AddProject = reduxForm({
    form: 'addProjectForm',
    validate
})(AddProject);

const formSelector = formValueSelector('addProjectForm');

const mapStateToProps = (state) => {
    const isDateCheckSelected = formSelector(state, 'datecheck');
    let startDateValue = moment().format('YYYY-MM-DD');
    let endDate = moment().add(1, 'days').format('YYYY-MM-DD');

    return {
        initialValues: Object.assign({}, state.projectReducer.projectFormData),
        enableReinitialize: true,
        projectId: state.projectReducer.projectFormData && state.projectReducer.projectFormData.id,
        isDateCheckSelected
    }
}

export default connect(mapStateToProps, null)(AddProject);

const renderField = ({
    input,
    label,
    type,
    disabled,
    meta: { touched, error, warning }
}) => (
        <div>
            {disabled && <input className="form-control" {...input} type={type} disabled />}
            {!disabled && <input className="form-control" {...input} type={type} />}
            {touched &&
                (error && <div className="alert alert-danger">
                    {error}
                </div>)}
        </div>
    )