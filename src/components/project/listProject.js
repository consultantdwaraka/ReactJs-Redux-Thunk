import React, {Component} from 'react';

class ListProject extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {projectItem, editProject} = this.props;
        const {id, projectName, tasks, startDate, endDate, completedTasks, priority} = projectItem;

        return (<div className="row" style={{padding:'5px', borderBottom:'dotted'}}>
                    
                    <div className="col-8">
                        <div className="row">
                            <div className="col-12">
                            {`Project: ${projectName ? projectName:''}`}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                {`No Of Tasks: ${tasks? tasks:''}`}
                            </div>
                            <div className="col-6">
                                {`Completed: ${completedTasks?completedTasks:''}`}
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-6">
                                {`Start Date: ${startDate ? startDate:'' }`}
                            </div>
                            <div className="col-6">
                                {`End Date: ${endDate ? endDate: ''}`}
                            </div>
                        </div>
                        
                    </div>

                    <div className="col-2">
                        <div className="row">
                            priority
                        </div>
                        <div className="row">
                            ${priority?priority:0}
                        </div>
                                
                    </div>

                    <div className="col-2">
                        <div className="row" style={{padding:'10px'}}>
                           <button type="button" className="btn btn-secondary" onClick={() => editProject(projectItem)}> Update </button>
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