import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class CustomDialog extends Component {
    constructor(props) {
        super(props) 

        this.state = {}
    }

    render = () => {
        return(
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ color: '#13293d' }} onClick={this.props.onClose} color="primary">
                        {this.props.cancelText}
                    </Button>
                    <Button style={{ color: '#13293d' }} onClick={this.props.onAccept} color="primary" autoFocus>
                        {this.props.acceptText}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}