import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

export default class ImageUpload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imageFile: null,
            imagePreviewUrl: this.props.imagePreviewUrl || null
        }

        this.handleImageChange = this.handleImageChange.bind(this)
    }

    handleImageChange = (e) => {
        e.preventDefault()

        const reader = new FileReader()
        const imageFile = e.target.files[0]

        reader.onloadend = () => {
            const imagePath = URL.createObjectURL(imageFile)            
            this.props.handleImageChange(imageFile)
            this.setState({ imageFile, imagePreviewUrl: reader.result })
        }

        reader.readAsDataURL(imageFile)
    }

    render = () => {
        const { imagePreviewUrl } = this.state

        return(
            <div className='inner-grid' style={{ width: '100%' }}>
                <h3 className='josefin-bold'>Project Image</h3>
                <Grid className='inner-grid' style={{ flexDirection: 'row' }} container spacing={2}>
                    {
                        imagePreviewUrl &&
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <img src={imagePreviewUrl} width={'100%'}/>                        
                        </Grid>
                    }
                    <Grid className='inner-grid' item xs={imagePreviewUrl ? 4 : 12} sm={imagePreviewUrl ? 4 : 12} md={imagePreviewUrl ? 4 : 12} lg={imagePreviewUrl ? 4 : 12}>
                        <input 
                            type='file'
                            onChange={this.handleImageChange}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}