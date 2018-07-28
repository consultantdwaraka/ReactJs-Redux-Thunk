import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { addTaskAction } from '../../actions/taskActions';

class AddTask extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form name="taskForm" autoComplete="off" onSubmit={handleSubmit}> 
                <div className="form-group row">
                    <label htmlFor="projectName" className="col-2" >Project Name: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component="input" name="projectName" id="projectName" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="taskName" className="col-2" >Task: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component="input" name="taskName" id="taskName" />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="priority" className="col-2" >Priority: </label>
                    <Field type="range" className="form-control col-10" component="input" name="priority" id="priority" min="0" max="30" step="1" />
                </div>

                <div className="form-group row">
                    <label htmlFor="projectName" className="col-2" >Parent Task: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component="input" name="parentTask" id="parentTask" />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="startDate" className="col-2 no-wrap" >Start Date: </label>
                    <div className="col-4">
                        <Field type="date" className="form-control" component="input" name="startDate" id="startDate" />
                    </div>
                    <label htmlFor="endDate" className="col-2 no-wrap" >End Date: </label>
                    <div className="col-4">
                        <Field type="date" className="form-control" component="input" name="endDate" id="endDate" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="projectName" className="col-2" >User: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component="input" name="userName" id="userName" />
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

AddTask = reduxForm({
    form: 'addTaskForm'
})(AddTask);
export default connect(mapStateToProps, null)(AddTask);