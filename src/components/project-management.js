import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProjects, projectLoading} from '../actions/projectActions';

class ProjectManagement extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchProjects('Hi');
    }
    render() {
        if(this.props.status) {
            return (<div> Loading.......</div>);
        } else {
            return (<div>
                        <p> Project Management {this.props.projectItems} </p>
                    </div>);
        }
    }
}
const mapStateToProps = (state) => {
    return {
        status:state.projectReducer.status,
        projectItems: state.projectReducer.projectItems
    }
}
const mapDispachToProps = (dispatch) => {
    return {
        fetchProjects: (url) => dispatch(fetchProjects(url))
    }
}
export default connect(mapStateToProps, mapDispachToProps) (ProjectManagement);