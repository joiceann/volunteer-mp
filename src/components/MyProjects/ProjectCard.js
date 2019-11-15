import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'

import './my_projects.css'
import * as consts from './MyProjectsConstants'

class ProjectCard extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render = () => {        
        const { project } = this.props
        return(
            <Fade in={true}>
                <Card className='project-card-wrapper'>
                    <img src={project.photo[0]} style={{ height: '100%' }}/>
                    <div onClick={() => this.props.onOpenProject(project)} className='project-name-container'>
                        <h3 className='project-name-text'>{consts.limitTextToCertainLength(project.name, 100)}</h3>
                        <p className='project-desc-text'>{consts.limitTextToCertainLength(project.desc, 55)}</p>
                    </div>
                    <Button onClick={() => this.props.onOpenProject(project)} variant='contained' className='projects-open-btn'>{consts.OPEN_PROJECT}</Button>
                </Card>
            </Fade>
        )
    }
}

export default ProjectCard