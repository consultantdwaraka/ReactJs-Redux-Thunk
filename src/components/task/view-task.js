import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../../actions/taskActions';
class ViewTask extends Component {

    constructor(props) {
        super(props);
        this.state = {searchFilter:''};
    }

    componentDidMount() {
        this.props.fetchTasks();
    }
    filterTasks = (e) => {
        this.setState({searchFilter:e.target.value});
    }

    render() {
        const { taskItems } = this.props;
        return (<div className="container">
             <div className="row" style={{borderBottom:'dotted', padding:'10px'}}>
                    <div className="col-1">
                        <label htmlFor="projectSerch"> Project: </label>
                    </div>
                    <div className="col-4">
                        <input type="text" className="form-control" style={{width:'80%'}} id="projectSerch" name="projectSerch"  onChange={ (e) => this.filterTasks(e)} />
                    </div>
                    <div className="col-1">
                        <button type="button" className="btn btn-gray"> Search </button>
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-secondary"> Start Date </button>
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-secondary"> End Date </button>
                    </div>
                    <div className="col-1" style= {{paddingRight:'2px'}}>
                         <button type="button" className="btn btn-secondary"> Priority </button>
                    </div>
                    <div className="col-1">
                        <button type="button" className="btn btn-secondary"> Completed </button>
                    </div>
             </div>
            {taskItems && taskItems.filter( taskItem => (taskItem.projectName && taskItem.projectName.includes(this.state.searchFilter) || this.state.searchFilter === '')).map(taskItem =>
                <div className="row" style={{borderBottom:'dotted', padding:'10px'}} key={taskItem.id}>
                    <div className="col-2">
                        <b> Task </b>
                        <div> {`${taskItem.taskName}`} </div>
                    </div>
                    <div className="col-2">
                        <b> Parent </b>
                        <div> {`${taskItem.taskName}`} </div>
                    </div>
                    <div className="col-2">
                        <b> Priority </b>
                        <div> {`${taskItem.priority}`} </div>
                    </div>
                    <div className="col-2">
                        <b> Start </b>
                        <div> {`${taskItem.startDate}`} </div>
                    </div>
                    <div className="col-2">
                        <b> End </b>
                        <div> {`${taskItem.endDate}`} </div>
                    </div>
                    <div className="col-1">
                         <button type="button" className="btn btn-secondary"> Edit </button>
                    </div>
                    <div className="col-1">
                        <button type="button" className="btn btn-secondary"> End Task </button>
                    </div>
                </div>
            )}
        </div>);
    }
}


const mapStateToProps = (state) => {
    return {
        taskItems: state.taskReducer.taskItems || []
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchTasks: () => dispatch(fetchTasks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTask);