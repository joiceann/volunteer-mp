import React, { Component } from 'react'
import { createAxiosCancelToken, getAllProjects, getAllProjectsDummy, getUserTypeFromLocalStorage } from './MyProjectsProvider'
import ProjectCard from './ProjectCard'

import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Modal from '@material-ui/core/Modal'
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List'
import './my_projects.css'
import ProjectModal from './ProjectModal';
import ProjectListItem from './ProjectListItem';
import Typography from '@material-ui/core/Typography'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import ViewListIcon from '@material-ui/icons/ViewList'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class MyProjects extends Component {
    constructor(props) {
        super(props)

        this.state = {
            axiosCancelTokenSource: createAxiosCancelToken(),
            projects: null,
            showingProject: false,
            currentProject: null,
            userType: null,
            listView: true
        }

        this.onOpenProject = this.onOpenProject.bind(this)
        this.toggleProjectModal = this.toggleProjectModal.bind(this)
        this.onHandleProjectUpdate = this.onHandleProjectUpdate.bind(this)
    }

    onHandleProjectUpdate = (project, optingOut = false) => {
        const { projects } = this.state
        let newProjects = null

        if (!optingOut) {
            console.log('entered optingOut false', project)
            newProjects = projects.map(p => {
                if (p._id !== project._id) {
                    return p
                } else return project
            })
        } else {
            newProjects = projects.filter(p => p._id !== project._id)
        }

        this.setState({ projects: newProjects })
    }

    onOpenProject = (project) => {
        console.log('project is', project)
        
        const setNewProject = new Promise((resolve, reject) => {
            this.setState({ currentProject: project })
            resolve()
        })

        setNewProject.then(() => { this.toggleProjectModal() })        
    }

    toggleProjectModal = () => {
        const { showingProject, currentProject } = this.state

        const cProject = showingProject === true ? null : currentProject

        this.setState({ showingProject: !showingProject, currentProject: cProject })
    }

    componentDidMount = () => {
        this.projectFetching()
    }

    changeProjectsView = () => {
        const setViewType = new Promise((resolve, reject) => {
            const { listView } = this.state
            this.setState({ listView: !listView, projects: null })
            resolve()
        })

        setViewType.then(() => {
            this.projectFetching()
        })
    }

    projectFetching = () => {
        const { axiosCancelTokenSource, listView } = this.state

        getAllProjects(axiosCancelTokenSource).then(projects => {
            console.log(projects)  
            
            let fixedProjects = null

            if (listView) {
                fixedProjects = projects
            } else {
                fixedProjects = this.normalizeProjectsForGridPlacement(projects)  
            }

            getUserTypeFromLocalStorage().then(userType => {
                this.setState({ projects: fixedProjects, userType })
            }).catch(error => {
                console.log(error)
            })
                        
        }).catch(error => {
            console.log(error)
        })
        
        // getAllProjectsDummy(axiosCancelTokenSource).then(projects => {
        //     const fixedProjects = this.normalizeProjectsForGridPlacement(projects)

        //     getUserTypeFromLocalStorage().then(userType => {
        //         this.setState({ projects: fixedProjects, userType })
        //     }).catch(error => {
        //         console.log(error)
        //     })
        // }).catch(error => {
        //     console.log(error)
        // })
    }

    normalizeProjectsForGridPlacement = (projects) => {
        let fixedProjects = []
        let gridRow = []

        for (var i = 0; i < projects.length; i++) {
            var j = i + 1

            gridRow.push(projects[i])

            if (j % 4 === 0) {
                fixedProjects.push(gridRow)
                gridRow = []
            }
        }

        if (gridRow.length > 0) { fixedProjects.push(gridRow) }

        return fixedProjects
    }

    componentWillUnmount = () => {
        const { axiosCancelTokenSource } = this.state

        // cancel all concurrent subscriptions
        axiosCancelTokenSource.cancel()
    }

    render = () => {
        console.log(this.state)
        const { projects, showingProject, currentProject, userType, listView } = this.state

        return(
            <div className="wrapper-my-projects">
                {
                    currentProject &&
                    <Dialog TransitionComponent={Transition} fullScreen open={showingProject} onClose={this.toggleProjectModal}>
                        <ProjectModal 
                            userType={userType} 
                            project={currentProject} 
                            onClose={this.toggleProjectModal}
                            onHandleProjectUpdate={this.onHandleProjectUpdate}
                        />
                    </Dialog>
                }
                {
                    !projects &&
                    <div className='wrapper-flex'>
                        <CircularProgress style={{ color: '#fff' }} />
                    </div>
                }

                {
                    projects &&
                    <Grid container className='projects-grid' spacing={2}>
                        <Grid item xs={10} sm={10} md={10} lg={10}>
                            <Typography variant="h3" className='josefin-bold' style={{ color: '#fff', marginBottom: 20 }}>
                                My projects
                            </Typography> 
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='inner-grid'>
                            {
                                listView &&
                                <ViewModuleIcon className='icon-pointer' style={{ color: '#fff', fontSize: 50, marginTop: 0 }} onClick={() => this.changeProjectsView()} />
                            }
                            {
                                !listView &&
                                <ViewListIcon className='icon-pointer' style={{ color: '#fff', fontSize: 40, marginTop: 0 }} onClick={() => this.changeProjectsView()} />
                            }
                        </Grid>
                    </Grid>
                }

                {
                    listView && projects &&
                    <List>
                        {
                            projects.map((project, index) => {
                                return(
                                    <ProjectListItem key={index} project={project} onOpenProject={this.onOpenProject} />
                                )
                            })
                        }
                    </List>
                }
                {
                    !listView && projects &&
                    projects.map((projectRow, key) => {
                        return(
                            <Grid key={key} container className='projects-grid' spacing={2}>
                                {
                                    projectRow[0] &&
                                    <Grid item xs={12} sm={12} md={6} lg={3} className='inner-grid'>
                                        <ProjectCard project={projectRow[0]} onOpenProject={this.onOpenProject}/>
                                    </Grid>
                                }
                                {
                                    projectRow[1] &&
                                    <Grid item xs={12} sm={12} md={6} lg={3} className='inner-grid'>
                                        <ProjectCard project={projectRow[1]} onOpenProject={this.onOpenProject}/>
                                    </Grid>
                                }
                                {
                                    projectRow[2] &&
                                    <Grid item xs={12} sm={12} md={6} lg={3} className='inner-grid'>
                                        <ProjectCard project={projectRow[2]} onOpenProject={this.onOpenProject}/>
                                    </Grid>
                                }
                                {
                                    projectRow[3] &&
                                    <Grid item xs={12} sm={12} md={6} lg={3} className='inner-grid'>
                                        <ProjectCard project={projectRow[3]} onOpenProject={this.onOpenProject}/>
                                    </Grid>
                                }
                            </Grid>                        
                        )
                    })
                }
            </div>
        )
    }
}

export default MyProjects