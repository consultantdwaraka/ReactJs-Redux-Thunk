import React, {Component} from 'react';

class ListProject extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const projectItem = this.props.projectItem;
        const {id, projectName, tasks, startDate, endDate, completedTasks, priority} = projectItem;

        return (<div className="row" style={{padding:'5px', borderBottom:'dotted'}}>
                    
                    <div className="col-8">
                        <div className="row">
                            <div className="col-12">
                            {`Project: ${projectName}`}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                {`No Of Tasks: ${tasks}`}
                            </div>
                            <div className="col-6">
                                {`Completed: ${completedTasks}`}
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-6">
                                {`Start Date: ${startDate}`}
                            </div>
                            <div className="col-6">
                                {`End Date: ${endDate}`}
                            </div>
                        </div>
                        
                    </div>

                    <div className="col-2">
                        <div className="row">
                            priority
                        </div>
                        <div className="row">
                            ${priority}
                        </div>
                                
                    </div>

                    <div className="col-2">
                        <div className="row" style={{padding:'10px'}}>
                           <button type="button" className="btn btn-secondary"> Update </button>
                        </div>
                        <div className="row">
                            <button type="button" className="btn btn-secondary"> Suspend </button>
                        </div>
                                
                    </div>
        
                </div>
        );
    }
}
export default ListProject;