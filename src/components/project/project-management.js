import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProjects, projectLoading} from '../../actions/projectActions';

class ProjectManagement extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchProjects('https://5b5561f3503d9200146886fb.mockapi.io/test/tests');
    }
    render() {
        if(this.props.status) {
            return (<div> Loading.......</div>);
        } else if(this.props.projectItems){
            return (<div>
                          {this.props.projectItems.map(data => <div> {data.id} </div>)} 
                    </div>);
        } else if(this.props.error){
            return (<div> Couldn't fetch data! </div>);
        } else {
            return (<div> Please wait!!</div>);
        }
    }
}
const mapStateToProps = (state) => {
    return {
        status:state.projectReducer.status,
        projectItems: state.projectReducer.projectItems,
        error: state.projectReducer.error
    }
}
const mapDispachToProps = (dispatch) => {
    return {
        fetchProjects: (url) => dispatch(fetchProjects(url))
    }
}
export default connect(mapStateToProps, mapDispachToProps) (ProjectManagement);