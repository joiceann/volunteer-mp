import React, {
  useState,
  useEffect,
} from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  NativeSelect,
  InputLabel,
  FormHelperText,
  FormControl  
} from '@material-ui/core';

import {
  TextField,
  ClearButton,
  DatePicker as MyDatePicker,
} from '../CommonComponents';
import{
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import colors from '../../colors';
import styled from 'styled-components';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { getONGInfo, createProject, uploadImage, editProject } from '../MyProjects/MyProjectsProvider';
import ImageUpload from '../MyProjects/ImageUpload';

const theme = createMuiTheme();

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CustomDialogTitle = styled(DialogTitle)`
  color: ${colors.main};
`

const Description = styled(TextField)`
  height: 100px;
  max-height: 100px;
`;

const DateComp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DatePicker = styled(MyDatePicker)`
  margin-right: ${theme.spacing(5)}px;
  margin-left: ${theme.spacing(5)}px;
`;

const EditProject = ({ open, project, title, edit, axiosCancelTokenSource, onClose, onSuccessfullClose }) => {
  const classes = useStyles();
  const [projectData, setProjectData] = useState({});

  console.log(projectData)

  const handleImageChange = (imageFile) => {
    console.log(imageFile)
    setProjectData({
      ...projectData,
      photo: [imageFile]
    })
  }

  const createOrUpdateProject = () => {
    if (!edit) {
      // so we are creating
      getONGInfo(axiosCancelTokenSource).then(ongInfo => {
        console.log(ongInfo)
        console.log(projectData)

        const newProject = {
          organid: ongInfo._id,
          lastupt: (new Date()).toISOString().substring(0, 10),
          ...projectData
        }

        delete newProject.organinfo

        newProject.fdate = projectData.fdate.toISOString().substring(0, 10)
        newProject.fdatei = projectData.fdatei.toISOString().substring(0, 10)
        newProject.sdate = projectData.sdate.toISOString().substring(0, 10)
        newProject.sdatei = projectData.sdatei.toISOString().substring(0, 10)

        console.log('newProject will be: ', newProject)

        // first upload project image
        // uploadImage(axiosCancelTokenSource, projectData.photo[0]).then(response => {
        //   console.log(response)
        // }).catch(error => console.log(error))

        createProject(axiosCancelTokenSource, newProject).then(response => {
          console.log(response)
          onSuccessfullClose()
        }).catch(error => {
          console.log(error)
        })

      })
    } else {
        const projectId = projectData._id

        const newProject = {
          ...projectData
        }

        delete newProject.lastupt
        delete newProject.volunteers
        delete newProject._v
        delete newProject._id

        delete newProject.organinfo
        newProject.organid = projectData.organinfo.id

        // console.log('to edit: ', newProject)

        editProject(axiosCancelTokenSource, projectId, newProject).then(response => {
          console.log(response)
          onSuccessfullClose()
        }).catch(error => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    if (project != null) {
      console.log(project)
      setProjectData(project);
    }
  }, [project]);
  return (
    <Dialog
      open={open}
      maxWidth="xl"
    >
      <CustomDialogTitle>
        {title}
      </CustomDialogTitle>
      <DialogContent>
        <div>
          <ImageUpload 
            handleImageChange={handleImageChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            label="Project Name"
            value={projectData.name}
            onChange={(event) => setProjectData({
              ...projectData,
              name: event.target.value,
            })
            }
            autoFocus
          />
        </div>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          required
          id="address"
          name="address"
          onChange={(event) => setProjectData({
            ...projectData,
            address: event.target.value,
          })
          }
          label="Project Location"
          value={projectData.address}
          autoFocus
        />

        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            autoFocus
            required
            style={{ marginTop: 8 }}
            native
            value={projectData.state}
            onChange={(e) => setProjectData({
              ...projectData,
              state: parseInt(e.target.value)
            })}
            name="state"
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'state' }}
          >
            <option value="">Project status</option>
            <option value={1}>ACTIVE</option>
            <option value={2}>INACTIVE</option>
            <option value={3}>RECRUITING</option>
          </Select>          
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            autoFocus
            required
            style={{ marginTop: 8 }}
            native
            value={projectData.mage}
            onChange={(e) => setProjectData({
              ...projectData,
              mage: parseInt(e.target.value)
            })}
            name="mage"
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'mage' }}
          >
            <option value="">Minimum age</option>
            {
              [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map((age, index) => {
                return(
                  <option key={index} value={age}>{age}</option>
                )
              })
            }                      
          </Select>          
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            autoFocus
            required
            style={{ marginTop: 8 }}
            native
            value={projectData.type}
            onChange={(e) => setProjectData({
              ...projectData,
              type: parseInt(e.target.value)
            })}
            name="type"
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'type' }}
          >
            <option value="">Project Type</option>
            {
              [
                { value: 1, type: 'Education' },
                { value: 2, type: 'Health' },
                { value: 3, type: 'Environment' },
              ].map((typeOption, index) => {
                return(
                  <option key={index} value={typeOption.value}>{typeOption.type}</option>
                )
              })
            }                      
          </Select>          
        </FormControl>

        <Description
          variant="outlined"
          margin="normal"
          fullWidth
          id="desc"
          name="dec"
          required
          value={projectData.desc}
          onChange={(event) => setProjectData({
            ...projectData,
            desc: event.target.value,
          })
          }
          multiline
          rows={4}
          rowsMax={4}
          label="Project Description"
          autoFocus
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateComp>
            <DatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="init-project"
              name="init-project"
              label="Enrolling Start Date"
              value={projectData.sdate}
              onChange={(date) => setProjectData({...projectData, sdate: date})}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <DatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="end-project"
              name="end-project"
              label="Enrolling End Date"
              value={projectData.sdatei}
              onChange={(date) => setProjectData({...projectData, sdatei: date})}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />

            <DatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="init-project"
              name="init-project"
              label="Start Date"
              value={projectData.fdate}
              onChange={(date) => setProjectData({...projectData, fdate: date})}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <DatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="end-project"
              name="end-project"
              label="Ending Date"
              value={projectData.fdatei}
              onChange={(date) => setProjectData({...projectData, fdatei: date})}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </DateComp>

        </MuiPickersUtilsProvider>

      </DialogContent>
      <DialogActions>
        <ClearButton onClick={() => onClose(false)} color="primary">
          Cancel
        </ClearButton>
        <ClearButton onClick={() => createOrUpdateProject()} color="primary" autoFocus>
          { edit === true ? 'Edit' : 'Create' } Project
        </ClearButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditProject;
