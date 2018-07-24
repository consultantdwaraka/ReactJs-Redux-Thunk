import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ProjectManagement from './project/project-management';
import TaskManagement from './task-management';
import UserManagement from './user/user-management';
import ViewTask from './view-task';

const Main = () => <div className="container">
                        <ul className="nav">
                            <li className="nav-item"> <a className="nav-link" href="/project"> Add Project </a></li>
                            <li className="nav-item"> <a className="nav-link" href="/task"> Add Task </a></li>
                            <li className="nav-item"> <a className="nav-link" href="/user"> Add User </a></li>
                            <li className="nav-item"> <a className="nav-link" href="/viewTask"> View Task </a></li>
                        </ul> 
                        <div style={{padding:'30px'}}></div>
                        <Switch>
                            <Route path="/project" component={ProjectManagement} />
                            <Route path="/task" component={TaskManagement} />
                            <Route path="/user" component={UserManagement} />
                            <Route path="/viewTask" component={ViewTask} />
                        </Switch>
                   </div>
export default Main;