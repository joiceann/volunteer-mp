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

const agesSelectorOptions = () => {
  const ages = []
  for (var i = 12; i < 76; i++) { ages.push(i) }
  return ages
}

const isFormComplete = (project) => {
  return project.address !== null && project.address !== '' &&
  project.minAge !== null && project.minAge !== '' && project.minAge !== NaN && project.minAge !== undefined &&
  project.startDate !== null && project.startDate !== '' &&
  project.finalDate !== null && project.finalDate !== '' &&
  project.startDateInscription !== null && project.startDateInscription !== '' &&
  project.finalDateInscription !== null && project.finalDateInscription !== '' &&
  project.description !== null && project.description !== '' &&
  project.lastUpdated !== null && project.lastUpdated !== '' &&
  project.name !== null && project.name !== '' &&
  project.state !== null && project.state !== '' && project.state !== NaN && project.state !== undefined &&
  project.type !== null && project.type !== '' && project.type !== NaN && project.type !== undefined &&
  project.news !== null && project.news !== '' &&
  project.photo !== null && project.photo.length > 0 
}

const EditProject = ({ open, project, title, edit, axiosCancelTokenSource, onClose, onSuccessfullClose }) => {
  const classes = useStyles();
  const [projectData, setProjectData] = useState({});

  console.log('project: ', project)
  console.log(projectData)

  const handleImageChange = (imageFile) => {
    console.log(imageFile)

    uploadImage(axiosCancelTokenSource, imageFile).then(response => {
      console.log(response)
      
      setProjectData({
        ...projectData,
        photo: [response.imageURL]
      })

    }).catch(error => console.log(error.response))

  }

  const createOrUpdateProject = () => {
    if (isFormComplete(projectData)) {      
      if (!edit) {
        // so we are creating
        getONGInfo(axiosCancelTokenSource).then(ongInfo => {
          const newProject = {}
  
          newProject.organizationInfo = {
            id: ongInfo._id,
            name: ongInfo.name
          }
  
          newProject.address = projectData.address
          newProject.minAge = projectData.minAge
          newProject.maxAge = projectData.maxAge
          newProject.startDate = projectData.startDate.toISOString().substring(0, 10)
          newProject.finalDate = projectData.finalDate.toISOString().substring(0, 10)
          newProject.startDateInscription = projectData.startDateInscription.toISOString().substring(0, 10)
          newProject.finalDateInscription = projectData.finalDateInscription.toISOString().substring(0, 10)
          newProject.description = projectData.description
          newProject.lastUpdated = (new Date()).toISOString().substring(0, 10)        
          newProject.name = projectData.name
          newProject.state = projectData.state
          newProject.type = projectData.type        
          newProject.news = projectData.news
          newProject.photo = projectData.photo                
  
          console.log('newProject will be: ', newProject)
          // console.log('newProject string will be: ', JSON.stringify(newProject))
  
          // first upload project image
          // uploadImage(axiosCancelTokenSource, projectData.photo[0]).then(response => {
          //   console.log(response)
          //   newProject.photo = [response.imageURL]
  
          //   createProject(axiosCancelTokenSource, newProject).then(response => {
          //     console.log(response)
          //     onSuccessfullClose()
          //   }).catch(error => {
          //     console.log(error.response.data)
          //   })
  
          // }).catch(error => console.log(error.response))
  
          createProject(axiosCancelTokenSource, newProject).then(response => {
            console.log(response)
            onSuccessfullClose()
          }).catch(error => {
            console.log(error.response.data)
            alert('We could not process this transaction by the moment. Please try again later')
          })
  
        })
      } else {
          getONGInfo(axiosCancelTokenSource).then(ongInfo => {
            const projectId = projectData._id
    
            const newProject = {}
    
            console.log('projectData is: ', projectData)
            newProject.organizationInfo = {
              id: ongInfo._id,
              name: ongInfo.name
            }
    
            // newProject._id = projectData._id
            newProject.address = projectData.address
            newProject.minAge = projectData.minAge
            newProject.maxAge = projectData.maxAge
            newProject.startDate = projectData.startDate.toISOString().substring(0, 10)
            newProject.finalDate = projectData.finalDate.toISOString().substring(0, 10)
            newProject.startDateInscription = projectData.startDateInscription.toISOString().substring(0, 10)
            newProject.finalDateInscription = projectData.finalDateInscription.toISOString().substring(0, 10)
            newProject.description = projectData.description
            newProject.lastUpdated = (new Date()).toISOString().substring(0, 10)        
            newProject.name = projectData.name
            newProject.state = projectData.state
            newProject.type = projectData.type        
            newProject.news = projectData.news
            newProject.photo = projectData.photo 
  
            console.log('ABOUT TO UPDATE: ', newProject)
    
            editProject(axiosCancelTokenSource, projectId, newProject).then(response => {
              console.log(response)
              onSuccessfullClose()
            }).catch(error => {
              console.log(error)
              alert('We could not process this transaction by the moment. Please try again later')
            })
  
          })
      }
    } else alert('Form is incomplete')
  }

  useEffect(() => {
    if (project != null) {
      console.log(project)

      const newProject = {...project}

      newProject.organizationInfo = {
        id: project.organizationInfo.id,
        name: project.organizationInfo.name
      }

      newProject.address = project.address
      newProject.minAge = project.minAge
      newProject.maxAge = project.maxAge
      newProject.startDate = new Date(project.startDate)
      newProject.finalDate = new Date(project.finalDate)
      newProject.startDateInscription = new Date(project.startDateInscription)
      newProject.finalDateInscription = new Date(project.finalDateInscription)
      newProject.description = project.description
      newProject.lastUpdated = new Date()       
      newProject.name = project.name
      newProject.state = project.state
      newProject.type = project.type        
      newProject.news = project.news
      newProject.photo = project.photo

      project = newProject

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
            imagePreviewUrl={projectData.photo ? projectData.photo[0] : null}
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
            <option value={4}>New</option>
            <option value={1}>Active</option>
            <option value={2}>Ended</option>
            <option value={3}>Canceled</option>
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
              mage: parseInt(e.target.value),
              minAge: parseInt(e.target.value),
              maxAge: parseInt(e.target.value),
            })}
            name="mage"
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'mage' }}
          >
            <option value="">Minimum age</option>
            {
              agesSelectorOptions().map((age, index) => {
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
                { value: 0, type: 'Health' },
                { value: 1, type: 'Education' },
                { value: 2, type: 'Environment' },
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
          value={projectData.description}
          onChange={(event) => setProjectData({
            ...projectData,
            desc: event.target.value,
            description: event.target.value,
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
              value={projectData.sdatei ? projectData.sdatei : projectData.startDateInscription}
              onChange={(date) => setProjectData({...projectData, sdatei: date, startDateInscription: date})}
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
              value={projectData.fdatei ? projectData.fdatei : projectData.finalDateInscription}
              onChange={(date) => setProjectData({...projectData, fdatei: date, finalDateInscription: date})}
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
              value={projectData.sdate ? projectData.sdate : projectData.startDate}
              onChange={(date) => setProjectData({...projectData, sdate: date, startDate: date})}
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
              value={projectData.fdate ? projectData.fdate : projectData.finalDate}
              onChange={(date) => setProjectData({...projectData, fdate: date, finalDate: date})}
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
