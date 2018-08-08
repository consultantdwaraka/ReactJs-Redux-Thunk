import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTasks, editTaskAction, endTaskAction, sortTasks } from '../../actions/taskActions';

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

    editTask = (taskItem) => {
        this.props.editTask(taskItem);
        this.props.history.push('/task');
    }

    endTask = (taskItem) => {
        this.props.endTask(taskItem);
    }

    sortRecords = (e) => {
        this.props.sortTasks(e.target.name);
    }

    render() {
        const { taskItems } = this.props;
        return (<div className="container">
                    <h1> View Task </h1>
                    <br/>
                    <br/>
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
                        <button type="button"  name="startDate" className="btn btn-secondary" onClick={(e)=> this.sortRecords(e)}> Start Date </button>
                    </div>
                    <div className="col-2">
                        <button type="button" name="endDate" className="btn btn-secondary" onClick={(e)=> this.sortRecords(e)}> End Date </button>
                    </div>
                    <div className="col-1" style= {{paddingRight:'2px'}}>
                         <button type="button" name="priority" className="btn btn-secondary" onClick={(e)=> this.sortRecords(e)}> Priority </button>
                    </div>
                    <div className="col-1">
                        <button type="button" name="completed" className="btn btn-secondary" onClick={(e)=> this.sortRecords(e)}> Completed </button>
                    </div>
             </div>
            {taskItems && taskItems.filter( taskItem => (taskItem.projectName && taskItem.projectName.includes(this.state.searchFilter) || this.state.searchFilter === '')).map(taskItem =>
                <div className="row" style={{borderBottom:'dotted', padding:'10px'}} key={taskItem.id}>
                    <div className="col-2">
                        <b> Task </b>
                        <div> {`${taskItem.taskName?taskItem.taskName:''}`} </div>
                    </div>
                    <div className="col-2">
                        <b> Parent </b>
                        <div> {`${taskItem.parentTaskDesc? taskItem.parentTaskDesc:''}`} </div>
                    </div>
                    <div className="col-2">
                        <b> Priority </b>
                        <div> {`${taskItem.priority?taskItem.priority:''}`} </div>
                    </div>
                    <div className="col-2">
                        <b> Start </b>
                        <div> {`${taskItem.startDate?taskItem.startDate:''}`} </div>
                    </div>
                    <div className="col-2">
                        <b> End </b>
                        <div> {`${taskItem.endDate?taskItem.endDate:''}`} </div>
                    </div>
                    <div className="col-1">
                         <button type="button" className="btn btn-secondary" disabled={taskItem.status === 'Completed'} onClick= {() => this.editTask(taskItem)}> Edit </button>
                    </div>
                    <div className="col-1">
                        <button type="button" className="btn btn-secondary" disabled={taskItem.status === 'Completed'} onClick= {() => this.endTask(taskItem)} > End Task </button>
                    </div>
                </div>
            )}
        </div>);
    }
}


const mapStateToProps = (state) => {
    console.log(`Task items: ${JSON.stringify(state.taskReducer.taskItems)}`);
    return {
        taskItems: state.taskReducer.taskItems || []
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchTasks: () => dispatch(fetchTasks()),
        editTask: (taskItem) => dispatch(editTaskAction(taskItem)),
        endTask: (taskItem) => dispatch(endTaskAction(taskItem)),
        sortTasks: (sortByColumn) => dispatch(sortTasks(sortByColumn)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTask);