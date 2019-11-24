import React, { Component } from 'react'
import { createAxiosCancelToken, getAllProjects, getAllProjectsDummy, getUserTypeFromLocalStorage, getONGProjects, getUserProjects } from './MyProjectsProvider'
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
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Typography from '@material-ui/core/Typography'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import ViewListIcon from '@material-ui/icons/ViewList'
import { SearchBar, Fab } from '../CommonComponents';
import EditProject from '../Projects/EditProject';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class MyProjects extends Component {
    constructor(props) {
        super(props)

        this.state = {
            axiosCancelTokenSource: createAxiosCancelToken(),
            projects: null,
            initialProjects: null,
            showingProject: false,
            currentProject: null,
            userType: null,
            listView: true,

            showingCreateProject: false,
            openEditProject: false
        }

        this.onOpenProject = this.onOpenProject.bind(this)
        this.onEditProject = this.onEditProject.bind(this)
        this.toggleProjectModal = this.toggleProjectModal.bind(this)
        this.onHandleProjectUpdate = this.onHandleProjectUpdate.bind(this)
        this.onHandleRefreshProjects = this.onHandleRefreshProjects.bind(this)
        this.handleOnLocalSearch = this.handleOnLocalSearch.bind(this)
        this.onSuccessfullClose = this.onSuccessfullClose.bind(this)
    }

    onSuccessfullClose = () => {
        console.log('closing')
        const closingProjectDialog = new Promise((resolve, reject) => {
            this.setState({ showingCreateProject: false, currentProject: null, showingProject: false, openEditProject: false })
            resolve()
        })

        closingProjectDialog.then(() => {
            const clearProjects = new Promise((resolve, reject) => {
                this.setState({ projects: null })
                resolve('success')
            })
    
            clearProjects.then(() => {
                this.getProjectsAccordingToUserType()
            })
        })

    }

    onHandleRefreshProjects = () => {
        const clearProjects = new Promise((resolve, reject) => {
            this.setState({ projects: null })
            resolve('success')
        })

        clearProjects.then(() => {
            this.getProjectsAccordingToUserType()
        })
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

        this.setState({ projects: newProjects, initialProjects: newProjects })
    }

    onOpenProject = (project) => {
        console.log('project is', project)
        
        const setNewProject = new Promise((resolve, reject) => {
            this.setState({ currentProject: project })
            resolve()
        })

        setNewProject.then(() => { this.toggleProjectModal() })        
    }

    onEditProject = (project) => {
        const setNewProject = new Promise((resolve, reject) => {
            this.setState({ currentProject: project })
            resolve()
        })

        setNewProject.then(() => this.setState({ openEditProject: true }))
    }

    toggleProjectModal = () => {
        const { showingProject, currentProject } = this.state

        const cProject = showingProject === true ? null : currentProject

        this.setState({ showingProject: !showingProject, currentProject: cProject })
    }

    componentDidMount = () => {
        this.getProjectsAccordingToUserType()
    }

    changeProjectsView = () => {
        const setViewType = new Promise((resolve, reject) => {
            const { listView } = this.state
            this.setState({ listView: !listView, projects: null, initialProjects: null })
            resolve()
        })

        setViewType.then(() => {
            this.getProjectsAccordingToUserType()
        })
    }

    getProjectsAccordingToUserType = () => {
        const { axiosCancelTokenSource, listView } = this.state

        getUserTypeFromLocalStorage().then(userType => {
            const fetchedProjects = new Promise((resolve, reject) => {
                if (userType === '2') {
                    // this is an ONG
                    getONGProjects(axiosCancelTokenSource).then(projects => {
                        resolve(projects)
                    }).catch(error => reject(error))
                } else if (userType === '1') {
                    // this is a normal user

                    // UNCOMMENT THIS WHEN USER PROJECTS ENDPOINT WORKS
                    getUserProjects(axiosCancelTokenSource).then(projects => {
                        console.log('enrolled projects are: ', projects)
                        resolve(projects)
                    }).catch(error => reject(error))

                    // COMMENT THIS WHEN USER PROJECTS ENDPOINT WORKS
                    // getAllProjects(axiosCancelTokenSource).then(projects => {
                    //     resolve(projects)
                    // }).catch(error => reject(error))
                }
            })

            fetchedProjects.then(projects => {
                let fixedProjects = null

                if (listView) {
                    fixedProjects = projects
                } else {
                    fixedProjects = this.normalizeProjectsForGridPlacement(projects)  
                }

                console.log(fixedProjects)

                this.setState({ projects: fixedProjects, initialProjects: fixedProjects, userType })
            })
        })
    }

    // OLD PROJECT FETCHING

    // projectFetching = () => {
    //     const { axiosCancelTokenSource, listView } = this.state

    //     getAllProjects(axiosCancelTokenSource).then(projects => {
    //         console.log(projects)  
            
    //         let fixedProjects = null

    //         if (listView) {
    //             fixedProjects = projects
    //         } else {
    //             fixedProjects = this.normalizeProjectsForGridPlacement(projects)  
    //         }

    //         getUserTypeFromLocalStorage().then(userType => {
    //             this.setState({ projects: fixedProjects, userType })
    //         }).catch(error => {
    //             console.log(error)
    //         })
                        
    //     }).catch(error => {
    //         console.log(error)
    //     })
        
    //     // getAllProjectsDummy(axiosCancelTokenSource).then(projects => {
    //     //     const fixedProjects = this.normalizeProjectsForGridPlacement(projects)

    //     //     getUserTypeFromLocalStorage().then(userType => {
    //     //         this.setState({ projects: fixedProjects, userType })
    //     //     }).catch(error => {
    //     //         console.log(error)
    //     //     })
    //     // }).catch(error => {
    //     //     console.log(error)
    //     // })
    // }

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

    handleOnLocalSearch = (query) => {
        const { initialProjects } = this.state
        console.log(query)

        const projects = query !== '' ? initialProjects.filter(project => project.name.toLowerCase().includes(query.toLowerCase())) : initialProjects
        this.setState({ projects })
    }

    render = () => {
        console.log(this.state)
        const { axiosCancelTokenSource, projects, showingProject, currentProject, userType, listView, showingCreateProject, openEditProject } = this.state

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
                            onHandleRefreshProjects={this.onHandleRefreshProjects}
                        />
                    </Dialog>
                }

                {
                    currentProject &&
                    openEditProject && 
                    <Dialog TransitionComponent={Transition} maxWidth='xl' open={openEditProject} onClose={() => this.setState({ openEditProject: false })}>
                        <EditProject
                            axiosCancelTokenSource={axiosCancelTokenSource}
                            edit={true}
                            open={openEditProject}
                            onClose={() => this.setState({ openEditProject: false, currentProject: null })}
                            onSuccessfullClose={this.onSuccessfullClose}
                            onCompleteEditing={() => {}}
                            project={currentProject}
                            title='Edit Project'
                        />
                    </Dialog>
                }

                {
                    showingCreateProject &&
                    <Dialog TransitionComponent={Transition} maxWidth='xl' open={showingCreateProject} onClose={() => this.setState({ showingCreateProject: false })}>
                        <EditProject
                            axiosCancelTokenSource={axiosCancelTokenSource}
                            edit={false}
                            open={showingCreateProject}
                            onClose={() => this.setState({ showingCreateProject: false })}
                            onSuccessfullClose={this.onSuccessfullClose}
                            project={{
                                organizationInfo: {},
                                name: '',
                                description: '',
                                address: '',
                                finalDate: new Date(),
                                finalDateInscription: new Date(),
                                volunteers: [],
                                photo: [],
                                news: [],
                                state: undefined,
                                minAge: undefined,
                                maxAge: undefined,
                                startDate: new Date(),
                                startDateInscription: new Date()
                            }}
                            title='Create New Project'
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
                        <Grid item xs={userType === '2' ? 8 : 10} sm={userType === '2' ? 8 : 10} md={userType === '2' ? 8 : 10} lg={userType === '2' ? 8 : 10}>
                            <Typography variant="h3" className='josefin-bold' style={{ color: '#fff', marginBottom: 20 }}>
                                My projects
                            </Typography> 
                        </Grid>
                        <Grid style={{ flexDirection: 'row', justifyContent: 'flex-end' }} item xs={userType === '2' ? 4 : 2} sm={userType === '2' ? 4 : 2} md={userType === '2' ? 4 : 2} lg={userType === '2' ? 4 : 2} className='inner-grid'>
                            {
                                listView &&
                                <ViewModuleIcon className='icon-pointer' style={{ color: '#fff', fontSize: 50, marginTop: 0 }} onClick={() => this.changeProjectsView()} />
                            }
                            {
                                !listView &&
                                <ViewListIcon className='icon-pointer' style={{ color: '#fff', fontSize: 40, marginTop: 0 }} onClick={() => this.changeProjectsView()} />
                            }
                            {
                                userType === '2' &&
                                <Fab onClick={() => this.setState({ showingCreateProject: true })} />
                                // <AddCircleIcon className='icon-pointer' style={{ color: '#F0AD4E', fontSize: 40, marginTop: 0, marginLeft: 10 }} onClick={() => this.setState({ showingCreateProject: true })}/>
                            }
                        </Grid>
                    </Grid>
                }

                {
                    projects &&
                    <SearchBar                        
                        placeholder="Search in your projects"
                        value={undefined}
                        onChange={this.handleOnLocalSearch}
                    />
                }

                {
                    listView && projects &&
                    <List>
                        {
                            projects.map((project, index) => {
                                return(
                                    <ProjectListItem key={index} onEditProject={this.onEditProject} editOption={userType === '2' ? true : false} project={project} onOpenProject={this.onOpenProject} />
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
                                        <ProjectCard editOption={userType === '2' ? true : false} project={projectRow[0]} onOpenProject={this.onOpenProject}/>
                                    </Grid>
                                }
                                {
                                    projectRow[1] &&
                                    <Grid item xs={12} sm={12} md={6} lg={3} className='inner-grid'>
                                        <ProjectCard editOption={userType === '2' ? true : false} project={projectRow[1]} onOpenProject={this.onOpenProject}/>
                                    </Grid>
                                }
                                {
                                    projectRow[2] &&
                                    <Grid item xs={12} sm={12} md={6} lg={3} className='inner-grid'>
                                        <ProjectCard editOption={userType === '2' ? true : false} project={projectRow[2]} onOpenProject={this.onOpenProject}/>
                                    </Grid>
                                }
                                {
                                    projectRow[3] &&
                                    <Grid item xs={12} sm={12} md={6} lg={3} className='inner-grid'>
                                        <ProjectCard editOption={userType === '2' ? true : false} project={projectRow[3]} onOpenProject={this.onOpenProject}/>
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