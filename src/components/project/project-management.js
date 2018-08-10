import React, { Component } from 'react';
import { connect } from 'react-redux';
import {change} from 'redux-form'
import moment from 'moment';
import { fetchProjects, projectLoading, addProjectAction, clearProjectForm, editProjectAction, sortProjects } from '../../actions/projectActions';
import ListProject from './listProject';
import AddProject from './addProject';
import ModalContainer from '../modals/modal-management';

import { showModal } from '../../actions/modalActions';
import { fetchUsers } from '../../actions/userActions';

class ProjectManagement extends Component {
    constructor(props) {
        super(props);
        this.state = { filterBy: '' };
    }

    componentDidMount() {
        this.props.fetchProjects();
        this.props.fetchUsers();
        this.props.updateFormValue('priority', -1);
    }

    
    handleSubmit = (projectItem) => {

        this.props.addProject(projectItem);
    }

    resetForm = () => {
        this.props.resetProject();
    }
    filterProjects = (e) => {
        this.setState({ filterBy: e.target.value });
    }

    editProject = (projectItem) => {
        this.props.editProject(projectItem);
    }
    close = () => {
        this.props.hide();
    }


    sortRecords = (e) => {
        this.props.sortProjects(e.target.name);
    }


    showModalPopup = () => {
        this.props.showModalPopup({
            open: true,
            title: 'Select Manager',
            message: this.selectUsersComponent(this.props.userItems),
            close: this.close
        });
    }

    onDateSelect = (isCheckboxSelected) => {
        console.log('dfsdfdsf' + isCheckboxSelected);
        if(isCheckboxSelected === true) {
            let startDate = moment().format('YYYY-MM-DD');
            let endDate = moment().add(1, 'days').format('YYYY-MM-DD');
            this.props.updateFormValue('startDate',startDate);
            this.props.updateFormValue('endDate', endDate);
        } else {
            this.props.updateFormValue('startDate','');
            this.props.updateFormValue('endDate','');
        }
    }
  
    selectUsersComponent = (userItems) => {
        return userItems && userItems.map((userItem, index) => (
            <div className="row" key={index} style={{ padding: '5px' }}>

                <div className="col-12" style={{ borderBottomStyle: 'dotted' }}>
                    <div className="row">
                        <div className="col-8">
                            {`First Name: ${userItem.firstName}`}
                        </div>
                        <div className="col-4">
                            <button type="button" name={userItem.employeeId} className="btn btn-info" onClick={(e) => this.props.onSelect(e)}>Select</button>
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


    render() {
        const { projectItems } = this.props;
        return (<div className="container">

            <AddProject onSubmit={this.handleSubmit} resetProject={this.resetForm} handlePopup={this.showModalPopup} onDateAutoSelect = {this.onDateSelect} > </AddProject>
            <div className="row" style={{ borderTopStyle: 'solid', borderTopColor: '#030350' }}></div>
            <div className="row" style={{ padding: '10px', borderBottom: 'dotted' }}>
                <div className="col-3">
                    <input type="text" className="form-control" placeholder="Search.." onChange={(e) => this.filterProjects(e)} />
                </div>
                <div className="col-1">
                    Sort By:
                    </div>
                <div className="col-2">
                    <button type="button" name="startDate" className="btn btn-secondary" onClick={(e) => this.sortRecords(e)}> Start Date</button>
                </div>
                <div className="col-2">
                    <button type="button" name="endDate" className="btn btn-secondary" onClick={(e) => this.sortRecords(e)}> End Date</button>
                </div>
                <div className="col-2">
                    <button type="button" name="priority" className="btn btn-secondary" onClick={(e) => this.sortRecords(e)}> Priority</button>
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-secondary" onClick={(e) => this.sortRecords(e)}>Completed </button>
                </div>

            </div>
            {projectItems && projectItems.filter(projectItem => projectItem.projectName && projectItem.projectName.includes(this.state.filterBy) || this.state.filterBy === '').map(projectItem => <ListProject key={projectItem.id} projectItem={projectItem} editProject={this.editProject}> </ListProject>)}

            <ModalContainer></ModalContainer>
        </div>);

    }
}



const mapStateToProps = (state) => {
    return {
        status: state.projectReducer.status,
        projectItems: state.projectReducer.projectItems,
        error: state.projectReducer.error,
        userItems: state.userReducer.userItems
    }
}
const mapDispachToProps = (dispatch) => {
    return {
        addProject: (projectItem) => dispatch(addProjectAction(projectItem)),
        fetchProjects: (url) => dispatch(fetchProjects()),
        resetProject: () => dispatch(clearProjectForm()),
        editProject: (projectItem) => dispatch(editProjectAction(projectItem)),
        sortProjects: (sortByColumn) => dispatch(sortProjects(sortByColumn)),
        showModalPopup: (modalProps) => dispatch(showModal(modalProps)),
        fetchUsers: () => { dispatch(fetchUsers()) },
        onSelect: (event) => dispatch(change('addProjectForm','managerId', event.target.name)),
        updateFormValue : (field, value) => {dispatch(change('addProjectForm',field, value)), console.log('ddd:'+value)}
    }
}
export default connect(mapStateToProps, mapDispachToProps)(ProjectManagement);