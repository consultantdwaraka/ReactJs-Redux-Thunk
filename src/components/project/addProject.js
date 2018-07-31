import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import  {Modal, Button} from 'react-bootstrap'
class AddProject extends Component  {
    constructor(props){
        super(props)
        this.state = {show:false};
        this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    }
    validate = values => {
        const errors = {};
        if(!values.projectName) {
            errors.projectName = 'Required';
        }
        return errors;
    }

    handleClose = () => {
        this.setState({show:false})
    }

    handleShow = () => {
        this.setState({show:true})
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div> <form autoComplete="off" onSubmit={handleSubmit}> 
                <div className="form-group row">
                    <label htmlFor="projectName" className="col-2" >Project: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component="input" name="projectName" id="projectName" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="datecheck" className="col-2" ></label>
                    <label className="col-4">
                        <Field type="checkbox" component="input" name="datecheck" id="datecheck" /> {' '} Set Start and End Date
                    </label>
                    <div className='col-3'>
                        <Field type="date" className="form-control" component="input" name="startDate" id="startDate" placeholder="Start Date"/>
                    </div>
                    <div className='col-3'>
                        <Field type="date" className="form-control" component="input" name="endDate" id="endDate" placeholder="End Date"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="priority" className="col-2" >Priority: </label>
                    <Field type="range" className="form-control col-10" component="input" name="priority" id="priority" min="0" max="30" step="1" />
                </div>
                <div className="form-group row">
                    <label htmlFor="employeeId" className="col-2 no-wrap" >Manager: </label>
                    <div className="col-8">
                        <Field type="text" className="form-control" component="input" name="managerId" id="managerId" />
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-default" onClick={this.handleShow}> Search </button>
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
                <div>
                </div>
        </div>
        );
    }
}

AddProject = reduxForm({
    form: 'addProjectForm',
    validate:this.validate
})(AddProject);

const mapStateToProps = (state) => {
    return {
        initialValues:  state.projectReducer.projectFormData,
        enableReinitialize: true
    }
}
export default connect(mapStateToProps, null)(AddProject);