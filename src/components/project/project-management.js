import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProjects, projectLoading, addProjectAction, clearProjectForm} from '../../actions/projectActions';
import ListProject from './listProject';
import AddProject from './addProject';

class ProjectManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {filterBy:''};
    }
    componentDidMount() {
        this.props.fetchProjects();
    }
    handleSubmit = (projectItem)=> {
        this.props.addProject(projectItem);
    }

    resetForm = () => {
        this.props.resetProject();
    }
    filterProjects = (e) => {
        this.setState({filterBy: e.target.value});
    }

    sortRecords = (e) => {
        let projects = this.props.projectItems.sort((prev, current) => prev.priority.localeCompare(current.priority) );
    }
   
    render() {
        const {projectItems} = this.props;
        return (<div className="container">
            <AddProject onSubmit={this.handleSubmit} resetProject={this.resetForm}> </AddProject>
            <div className="row" style={{ borderTopStyle: 'solid', borderTopColor: '#030350' }}></div>
                <div className="row" style={{padding:'10px', borderBottom: 'dotted'}}>
                    <div className="col-3">
                        <input type="text" className="form-control" placeholder="Search.." onChange={(e) => this.filterProjects(e)}/>
                    </div>
                    <div className="col-1">
                        Sort By:
                    </div>
                    <div className="col-2">
                        <button type="button" name="startDate" className="btn btn-secondary" onClick={(e)=> this.sortRecords(e)}> Start Date</button>
                    </div>
                    <div className="col-2">
                        <button type="button" name="endDate" className="btn btn-secondary" onClick={(e)=> this.sortRecords(e)}> End Date</button>
                    </div>
                    <div className="col-2">
                        <button type="button" name="priority" className="btn btn-secondary" onClick={(e)=> this.sortRecords(e)}> Priority</button>
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-secondary" onClick={(e)=> this.sortRecords(e)}>Completed </button>
                    </div>
                
            </div>
            {projectItems && projectItems.filter(projectItem => projectItem.projectName && projectItem.projectName.includes(this.state.filterBy) || this.state.filterBy ==='' ).map(projectItem => <ListProject key={projectItem.id} projectItem={projectItem}> </ListProject>)}
        </div>);

    }
}
const mapStateToProps = (state) => {
    return {
        status: state.projectReducer.status,
        projectItems: state.projectReducer.projectItems,
        error: state.projectReducer.error
    }
}
const mapDispachToProps = (dispatch) => { 
    return {
        addProject: (projectItem) => dispatch(addProjectAction(projectItem)),
        fetchProjects: (url) => dispatch(fetchProjects()),
        resetProject: () => dispatch(clearProjectForm())
    }
}
export default connect(mapStateToProps, mapDispachToProps) (ProjectManagement);