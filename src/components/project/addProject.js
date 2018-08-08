import React, {Component} from 'react';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
import  {Modal, Button} from 'react-bootstrap';
import moment from 'moment';
class AddProject extends Component  {
    constructor(props){
        super(props)
        this.state = {show:false};
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    

    handleClose = () => {
        this.setState({show:false})
    }

    handleShow = () => {
        this.setState({show:true})
    }

    render() {
        const { handleSubmit, resetProject, reset, isDateCheckSelected, projectName, projectId , defaultStartDate, defaultEndDate} = this.props;
        return (
            <div> 
                <h1> {projectId?'Edit Project':'Add Project'}  </h1>
                <br/>
                <br/>
                <form autoComplete="off" onSubmit={handleSubmit}> 
                <div className="form-group row">
                    <label htmlFor="projectName" className="col-2" >Project: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component={renderField} value={projectName} name="projectName" id="projectName"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="datecheck" className="col-2" ></label>
                    <label className="col-1">
                        <Field type="checkbox" component="input" name="datecheck" id="datecheck" />
                    </label>
                    <label className="col-2" style={{whiteSpace:'noWrap', textAlign:'left'}}>
                        Set Start and End Date <br/>
                    </label>
                    <div className='col-3'>
                        <Field type="date" className="form-control"  component={renderField} name="startDate" id="startDate" />
                    </div>
                    <div className='col-3'>
                        <Field type="date" className="form-control"  component={renderField} name="endDate" id="endDate" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="priority" className="col-2" >Priority: </label>
                    
                        <Field type="range" className="form-control col-10" component="input" name="priority" id="priority" min="1" max="30" step="1" value='0' />

                </div>
                <div className="form-group row">
                    <label htmlFor="employeeId" className="col-2 no-wrap" >Manager: </label>
                    <div className="col-8">
                        <Field type="text" className="form-control" component={renderField} name="managerId" id="managerId" />
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-default" onClick={this.handleShow}> Search </button>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-8">
                    </div>
                    <div className="col-2">
                        <button type="submit" className="btn btn-secondary"> {projectId?'Update':'Add'}</button>
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
    if(!values.projectName) {
        errors.projectName = 'Required';
    }
  
    if(!values.managerId) {
        errors.managerId = 'Required';
    }
    if(!values.startDate) {
        errors.startDate = 'Required';
    }
    if(!values.priority) {
        errors.priority = 'Required';
    }
    if(!values.endDate) {
        errors.endDate = 'Required';
    }
    if(values.startDate && values.endDate) {
       if(moment(values.startDate).isAfter(values.endDate)) {
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
    let startDate = moment().format('YYYY-MM-DD');
    let endDate = moment().add(1, 'days').format('YYYY-MM-DD');
    console.log(`start Date: ${startDate}`);

    return {
        initialValues:  Object.assign({}, state.projectReducer.projectFormData),
        enableReinitialize: true,
        projectId: state.projectReducer.projectFormData && state.projectReducer.projectFormData.id,
        defaultStartDate : isDateCheckSelected? startDate : '',
        defaultEndDate : isDateCheckSelected ? endDate : ''
    }
}



export default connect(mapStateToProps, null)(AddProject);


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