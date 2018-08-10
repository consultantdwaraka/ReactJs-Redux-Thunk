import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import ModalContainer from '../modals/modal-management';
import { fetchTasks } from '../../actions/taskActions';
import { fetchProjects } from '../../actions/projectActions';
import { showModal } from '../../actions/modalActions';
import { fetchUsers } from '../../actions/userActions';
import moment from 'moment';


class AddTask extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.updateFormValue('priority', 0);
        this.props.fetchTasks();
        this.props.fetchProjects();
        this.props.fetchUsers();
    }

    close = () => {
        this.props.hide();
    }


    showProjectModalPopup = () => {
        this.props.showProjectModalPopup({
            open: true,
            title: 'Select Project',
            message: this.selectProjectsComponent(this.props.projectItems),
            close: this.close
        });
    }

    showTaskModalPopup = () => {
        this.props.showProjectModalPopup({
            open: true,
            title: 'Select Parent Task',
            message: this.selectTasksComponent(this.props.taskItems),
            close: this.close
        });
    }

    showUsersModalPopup = () => {
        this.props.showProjectModalPopup({
            open: true,
            title: 'Select User',
            message: this.selectUsersComponent(this.props.userItems),
            close: this.close
        });
    }

    selectProjectsComponent = (projectItems) => {
        
        return projectItems && projectItems.map((projectItem, index) => (
            <div className="row" key={index} style={{ padding: '5px' }}>

                <div className="col-12" style={{ borderBottomStyle: 'dotted' }}>
                    <div className="row">
                        <div className="col-8">
                        {`Project Name: ${projectItem.projectName ? projectItem.projectName:''}`}
                        </div>
                        <div className="col-4">
                            <button type="button" name={projectItem.projectName} className="btn btn-info" onClick={(e) => this.props.updateFormValue('projectName', e.target.name)}>Select</button>
                        </div>
                    </div>
                </div>
            </div>
        ))
    };

    selectUsersComponent = (userItems) => {
        return userItems && userItems.map((userItem, index) => (
            <div className="row" key={index} style={{ padding: '5px' }}>

                <div className="col-12" style={{ borderBottomStyle: 'dotted' }}>
                    <div className="row">
                        <div className="col-8">
                            {`First Name: ${userItem.firstName}`}
                        </div>
                        <div className="col-4">
                            <button type="button" name={userItem.employeeId} className="btn btn-info" onClick={(e) => this.props.updateFormValue('userName', e.target.name)}>Select</button>
                        </div>
                    </div>
                    <div className="row" style={{ paddingTop: '5px' }}>
                        <div className="col-8">
                            {`Last Name: ${userItem.lastName}`}
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-8">
                            {`Employee Id: ${userItem.employeeId}`}
                        </div>
                        <div className="col-4">

                        </div>
                    </div>
                </div>
            </div>
        ))
    };

    selectTasksComponent = (taskItems) => {
        console.log(`tasks: ${JSON.stringify(taskItems)}`);
        return taskItems && taskItems.filter(taskItem => taskItem.parentTask === "true").map((taskItem, index) => (
            <div className="row" key={index} style={{ padding: '5px' }}>

                <div className="col-12" style={{ borderBottomStyle: 'dotted' }}>
                    <div className="row">
                        <div className="col-8">
                        {`Parent Task Name: ${taskItem.taskName ? taskItem.taskName:''}`}
                        </div>
                        <div className="col-4">
                            <button type="button" name={taskItem.taskName} className="btn btn-info" onClick={(e) => this.props.updateFormValue('parentTaskDesc', e.target.name)}>Select</button>
                        </div>
                    </div>
                </div>
            </div>
        ))
    };


    render() {
        const { handleSubmit, reset, taskId, isParentTask } = this.props;
        return (
            <div>
                 <h1> {taskId?'Edit Task':'Add Task'} </h1>
                    <br/>
                    <br/>
            <form  autoComplete="off" onSubmit={handleSubmit}> 
                <div className="form-group row">
                    <label htmlFor="projectName" className="col-2" >Project Name: </label>
                    <div className="col-9">
                        <Field type="text" className="form-control"  disabled={true} component={renderField} name="projectName" id="projectName" />
                    </div>
                    <div className="col-1">
                        <button type="button" className="btn btn-outline-primary" onClick={this.showProjectModalPopup} > Search </button>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="taskName" className="col-2" >Task: </label>
                    <div className="col-10">
                        <Field type="text" className="form-control" component={renderField} name="taskName" id="taskName" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-2"> </label>
                    <label className="col-1">
                        <Field type="checkbox" component={renderField} name="parentTask" id="parentTask" />
                    </label>
                    <label className="col-8" style={{whiteSpace:'noWrap', textAlign:'left'}}>
                        Parent task
                    </label>
                </div>

                <div className="form-group row">
                    <label htmlFor="priority" className="col-2" >Priority: </label>
                    <div className="col-10">
                        <Field type="range" className="form-control" disabled={isParentTask === true} component={renderField} name="priority" id="priority" min="0" max="30" step="1" />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="projectName" className="col-2" >Parent Task: </label>
                    <div className="col-9">
                        <Field type="text" className="form-control" disabled={true} component={renderField} name="parentTaskDesc" id="parentTaskDesc" />
                    </div>
                    <div className="col-1">
                        <button type="button" className="btn btn-outline-primary" disabled={isParentTask === true} onClick={this.showTaskModalPopup}> Search </button>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="startDate" className="col-2 no-wrap" >Start Date: </label>
                    <div className="col-4">
                        <Field type="date" className="form-control" disabled={isParentTask === true} component={renderField} name="startDate" id="startDate" />
                    </div>
                    <label htmlFor="endDate" className="col-2 no-wrap" >End Date: </label>
                    <div className="col-4">
                        <Field type="date" className="form-control" disabled={isParentTask === true} component={renderField} name="endDate" id="endDate" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="projectName" className="col-2" >User: </label>
                    <div className="col-9">
                        <Field type="text" className="form-control" disabled={true} component={renderField} name="userName" id="userName" />
                    </div>
                    <div className="col-1">
                        <button type="button" className="btn btn-outline-primary" disabled={isParentTask === true} onClick={this.showUsersModalPopup}> Search </button>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-8">
                    </div>
                    <div className="col-2">
                        <button type="submit" className="btn btn-secondary"> {taskId?'Edit Task':'Add Task'}</button>
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-warning" onClick={reset}> Reset</button>
                    </div>
                </div>
            </form> 
            <ModalContainer></ModalContainer>
            </div>
        );
    }
}

const formSelector = formValueSelector('addTaskForm');


const mapStateToProps = (state) => {
    const isParentTask = formSelector(state, 'parentTask');
    return {
        initialValues: state.taskReducer.taskFormData,
        enableReinitialize: true,
        taskId: state.taskReducer.taskFormData && state.taskReducer.taskFormData.id,
        isParentTask: isParentTask,
        taskItems: state.taskReducer.taskItems || [],
        projectItems: state.projectReducer.projectItems,
        userItems: state.userReducer.userItems
    }
}

const mapDispachToProps = (dispatch) => { 
    return {
        showProjectModalPopup : (modalProps) => dispatch(showModal(modalProps)),
        fetchTasks: () => dispatch(fetchTasks()),
        fetchProjects: () => dispatch(fetchProjects()),
        fetchUsers: () => { dispatch(fetchUsers()) },
        updateFormValue : (field, value) => dispatch(change('addTaskForm',field, value))
    }
}

const validate = values => {
    const errors = {};
    if(!values.projectName) {
        errors.projectName = 'Required';
    }
  

    if(!values.taskName) {
        errors.taskName = 'Required';
    }
  
    if (!values.parentTask) {
        if (!values.startDate) {
            errors.startDate = 'Required';
        }
        if (!values.endDate) {
            errors.endDate = 'Required';
        }
        if (!values.userName) {
            errors.userName = 'Required';
        }

        if (!values.priority) {
            errors.priority = 'Required';
        }
        if (!values.parentTaskDesc) {
            errors.parentTaskDesc = 'Required';
        }
        if(values.startDate && values.endDate) {
            if(moment(values.startDate).isAfter(values.endDate)) {
             errors.startDate = 'Start Date should be before the End Date';
            }
         }
    }

    

    return errors;
}

AddTask = reduxForm({
    form: 'addTaskForm',
    validate
})(AddTask);

const renderField = ({
    input,
    label,
    type,
    disabled,
    meta: { touched, error, warning }
  }) => (
    <div>
       {disabled &&  <input className="form-control" {...input} type={type} disabled/> }
       {!disabled &&  <input className="form-control" {...input} type={type}/> }
        {touched &&
          (error && <div class="alert alert-danger">
          {error}
        </div>)}
    </div>
    )

export default connect(mapStateToProps, mapDispachToProps)(AddTask);