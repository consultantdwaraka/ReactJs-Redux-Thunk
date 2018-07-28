import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProjects, projectLoading, addProjectAction} from '../../actions/projectActions';
import ListProject from './listProject';
import AddProject from './addProject';

class ProjectManagement extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchProjects();
    }
    handleSubmit = (projectItem)=> {
        this.props.addProject(projectItem);
    }
    render() {
        return (<div className="container">
            <AddProject onSubmit={this.handleSubmit}> </AddProject>
            <div className="container" style={{ borderTopStyle: 'solid', borderTopColor: '#030350' }}></div>
            {this.props.projectItems && this.props.projectItems.map(projectItem => <ListProject key={projectItem.id} projectItem={projectItem}> </ListProject>)}
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