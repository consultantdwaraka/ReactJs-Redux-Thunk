import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProjects, projectLoading, addProjectAction} from '../../actions/projectActions';
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
    filterProjects = (e) => {
        this.setState({filterBy: e.target.value});
    }
   
    render() {
        const {projectItems} = this.props;
        return (<div className="container">
            <AddProject onSubmit={this.handleSubmit}> </AddProject>
            <div className="row" style={{ borderTopStyle: 'solid', borderTopColor: '#030350' }}></div>
                <div className="row" style={{padding:'10px', borderBottom: 'dotted'}}>
                    <div className="col-3">
                        <input type="text" className="form-control" placeholder="Search.." onChange={(e) => this.filterProjects(e)}/>
                    </div>
                    <div className="col-1">
                        Sort By:
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-secondary"> Start Date</button>
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-secondary"> End Date</button>
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-secondary"> Priority</button>
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-secondary">Completed </button>
                    </div>
                
            </div>
            {projectItems && projectItems.filter(projectItem => projectItem.projectName.includes(this.state.filterBy) || this.state.filterBy ==='' ).map(projectItem => <ListProject key={projectItem.id} projectItem={projectItem}> </ListProject>)}
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
        fetchProjects: (url) => dispatch(fetchProjects())
    }
}
export default connect(mapStateToProps, mapDispachToProps) (ProjectManagement);