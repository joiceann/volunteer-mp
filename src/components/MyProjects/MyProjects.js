import React, { Component } from 'react'
import { createAxiosCancelToken, getAllProjects, getAllProjectsDummy } from './MyProjectsProvider'
import ProjectCard from './ProjectCard'

import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import './my_projects.css'

class MyProjects extends Component {
    constructor(props) {
        super(props)

        this.state = {
            axiosCancelTokenSource: createAxiosCancelToken(),
            projects: null
        }
    }

    componentDidMount = () => {
        const { axiosCancelTokenSource } = this.state

        getAllProjects(axiosCancelTokenSource).then(projects => {
            console.log(projects)   
            const fixedProjects = this.normalizeProjectsForGridPlacement(projects)         
            this.setState({ projects: fixedProjects })
        }).catch(error => {
            console.log(error)
        })
        
        // getAllProjectsDummy(axiosCancelTokenSource).then(projects => {
        //     const fixedProjects = this.normalizeProjectsForGridPlacement(projects)         
        //     this.setState({ projects: fixedProjects })
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
        const { projects } = this.state

        return(
            <div className="wrapper-my-projects">
                {
                    !projects &&
                    <div className='wrapper-flex'>
                        <CircularProgress style={{ color: '#fff' }} />
                    </div>
                }
                {
                    projects &&
                    projects.map((projectRow, key) => {
                        return(
                            <Grid key={key} container className='projects-grid' spacing={2}>
                                {
                                    projectRow[0] &&
                                    <Grid item xs={12} sm={12} md={6} lg={3} className='inner-grid'>
                                        <ProjectCard project={projectRow[0]}/>
                                    </Grid>
                                }
                                {
                                    projectRow[1] &&
                                    <Grid item xs={12} sm={12} md={6} lg={3} className='inner-grid'>
                                        <ProjectCard project={projectRow[1]}/>
                                    </Grid>
                                }
                                {
                                    projectRow[2] &&
                                    <Grid item xs={12} sm={12} md={6} lg={3} className='inner-grid'>
                                        <ProjectCard project={projectRow[2]}/>
                                    </Grid>
                                }
                                {
                                    projectRow[3] &&
                                    <Grid item xs={12} sm={12} md={6} lg={3} className='inner-grid'>
                                        <ProjectCard project={projectRow[3]}/>
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