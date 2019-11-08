import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'

import './my_projects.css'
import * as consts from './MyProjectsConstants'

class ProjectCard extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render = () => {        
        return(
            <Card className='project-card-wrapper'>
                <img src={this.props.project.photo[0]} style={{ height: '100%' }}/>
                <div className='project-name-container'>
                    <h3 className='project-name-text'>{consts.limitTextToCertainLength(this.props.project.name, 100)}</h3>
                    <p className='project-desc-text'>{consts.limitTextToCertainLength(this.props.project.desc, 55)}</p>
                </div>
                <Button variant='contained' className='projects-open-btn'>{consts.OPEN_PROJECT}</Button>
            </Card>
        )
    }
}

export default ProjectCard