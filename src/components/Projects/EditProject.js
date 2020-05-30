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
  FormControl,
  Typography
} from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import {
  TextField,
  ClearButton,
  DatePicker as MyDatePicker,
} from '../CommonComponents';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

import colors from '../../colors';
import styled from 'styled-components';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { getONGInfo, createProject, uploadImage, editProject } from '../MyProjects/MyProjectsProvider';
import ImageUpload from '../MyProjects/ImageUpload';
import en from './../../lang/en'
import es from './../../lang/es'
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import translator from "counterpart"
import { Height } from '@material-ui/icons';

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('es', es);
counterpart.setLocale(localStorage.getItem('lang'));
const projectStatus = translator.translate("projectStatus");
const newOpt = translator.translate('new');
const active = translator.translate('active');
const ended = translator.translate('ended');
const canceled = translator.translate('canceled');
const projectType = translator.translate('projectType');
const health = translator.translate('health');
const environment = translator.translate('environment');
const education = translator.translate('education');
const minimumAge = translator.translate('minimumAge');

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
  height: 100%;
  max-height: 100%;
`;

const DateComp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DatePicker = styled(KeyboardDatePicker)`
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
  const [address, setAddress] = React.useState("");
  const [activities, setActivities] = React.useState("");
  const [locationDesc, setLocationDesc] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

  console.log('project: ', project)
  console.log(projectData)

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };


  const handleImageChange = (imageFile, index) => {
    console.log(imageFile)

    uploadImage(axiosCancelTokenSource, imageFile).then(response => {
      console.log(response)
      let photos = projectData.photo
      photos[index]= response.imageURL
      setProjectData({
        ...projectData,
        photo: photos
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
          newProject.aboutLocation = projectData.aboutLocation
          newProject.activities = projectData.activities

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
          newProject.aboutLocation = projectData.aboutLocation
          newProject.activities = projectData.activities

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

      const newProject = { ...project }

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
      newProject.aboutLocation = project.aboutLocation
      newProject.activities = project.activities

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
        {/*
          <div style={{ width: '10px', height: '5px', display: 'inline' }}>

          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <p>Latitude: {coordinates.lat}</p>
                <p>Longitude: {coordinates.lng}</p>

                <input {...getInputProps({ placeholder: "Type address" })} />

                <div>
                  {loading ? <div>...loading</div> : null}

                  {suggestions.map(suggestion => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
                  */
        }

        <Paper
          style={{
            justifyContent: 'center',
            display: 'flex'
          }}>
          <Grid container spacing={3}
            style={{
              width: '80%'
            }}
          >
            <Grid item xs={12}>
              <ImageUpload
                handleImageChange={handleImageChange}
                imagePreviewUrl={projectData.photo ? projectData.photo[0] : null}
                index={0}
                title={true}
              />

            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                name="name"
                label={<Translate content='projectName' />}
                value={projectData.name}
                onChange={(event) => setProjectData({
                  ...projectData,
                  name: event.target.value,
                })
                }
                autoFocus
              />
            </Grid>
            <Grid item xs={6}
              style={{
                display: 'flex'
              }}
            >
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
                  <option value="">{projectStatus}</option>
                  <option value={4}>{newOpt}</option>
                  <option value={1}>{active}</option>
                  <option value={2}>{ended}</option>
                  <option value={3}>{canceled}</option>
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
                  <option value="">{minimumAge}</option>
                  {
                    agesSelectorOptions().map((age, index) => {
                      return (
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
                  <option value="">{projectType}</option>
                  {
                    [
                      { value: 0, type: health },
                      { value: 1, type: education },
                      { value: 2, type: environment },
                    ].map((typeOption, index) => {
                      return (
                        <option key={index} value={typeOption.value}>{typeOption.type}</option>
                      )
                    })
                  }
                </Select>
              </FormControl>

            </Grid>
            <Grid item xs={6}>
              <TextField
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
                rows={6}
                label={<Translate content='projectDescription' />}
                autoFocus
                style={{marginBottom:'20px'}}
              />
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                required
                id="activities"
                name="activities"
                onChange={(event) => setProjectData({
                  ...projectData,
                  activities: event.target.value,
                })
                }
                label="Actividades que realizarán los voluntarios"
                value={projectData.activities}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={6}>
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
                style={{marginBottom:'20px'}}
              />
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                required
                id="aboutLoc"
                name="aboutLoc"
                onChange={(event) => setProjectData({
                  ...projectData,
                  aboutLocation: event.target.value,
                })
                }
                label="Acerca de la ubicación"
                value={projectData.aboutLocation}
                multiline
                rows={9}
              />
            </Grid>
            <Grid item xs={12} style={{marginBottom:'60px'}}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateComp>
                  <DatePicker
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="init-project"
                    name="init-project"
                    label={<Translate content='enrollingStart' />}
                    value={projectData.sdatei ? projectData.sdatei : projectData.startDateInscription}
                    onChange={(date) => setProjectData({ ...projectData, sdatei: date, startDateInscription: date })}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <DatePicker
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="end-project"
                    name="end-project"
                    label={<Translate content='enrollingEnd' />}
                    value={projectData.fdatei ? projectData.fdatei : projectData.finalDateInscription}
                    onChange={(date) => setProjectData({ ...projectData, fdatei: date, finalDateInscription: date })}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />

                  <DatePicker
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="init-project"
                    name="init-project"
                    label={<Translate content='startDate' />}
                    value={projectData.sdate ? projectData.sdate : projectData.startDate}
                    onChange={(date) => setProjectData({ ...projectData, sdate: date, startDate: date })}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <DatePicker
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="end-project"
                    name="end-project"
                    label={<Translate content='endDate' />}
                    value={projectData.fdate ? projectData.fdate : projectData.finalDate}
                    onChange={(date) => setProjectData({ ...projectData, fdate: date, finalDate: date })}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </DateComp>

              </MuiPickersUtilsProvider>

            </Grid>

            <Grid item xs={12} >
              <Typography variant='subtitle1' className='josefin-bold'>
                Location Image
              </Typography>
              <ImageUpload
                handleImageChange={handleImageChange}
                imagePreviewUrl={projectData.photo ? projectData.photo[1] : null}
                index={1}
              />
            </Grid>
            <Grid item xs={6} >
              <Typography variant='subtitle1' className='josefin-bold'>
                Project Images
              </Typography>
              <ImageUpload
                handleImageChange={handleImageChange}
                imagePreviewUrl={projectData.photo ? projectData.photo[2] : null}
                index={2}
              />
              <ImageUpload
                handleImageChange={handleImageChange}
                imagePreviewUrl={projectData.photo ? projectData.photo[3] : null}
                index={3}
              />
              <ImageUpload
                handleImageChange={handleImageChange}
                imagePreviewUrl={projectData.photo ? projectData.photo[4] : null}
                index={4}
              />
              <ImageUpload
                handleImageChange={handleImageChange}
                imagePreviewUrl={projectData.photo ? projectData.photo[5] : null}
                index={5}
              />
            </Grid>
            <Grid item xs={6} >
              <Typography variant='subtitle1' className='josefin-bold'>
                Project Images
              </Typography>
              <ImageUpload
                handleImageChange={handleImageChange}
                imagePreviewUrl={projectData.photo ? projectData.photo[6] : null}
                index={6}
              />
              <ImageUpload
                handleImageChange={handleImageChange}
                imagePreviewUrl={projectData.photo ? projectData.photo[7] : null}
                index={7}
              />
              <ImageUpload
                handleImageChange={handleImageChange}
                imagePreviewUrl={projectData.photo ? projectData.photo[8] : null}
                index={8}
              />
              <ImageUpload
                handleImageChange={handleImageChange}
                imagePreviewUrl={projectData.photo ? projectData.photo[9] : null}
                index={9}
              />
            </Grid>
          </Grid>

        </Paper>




      </DialogContent>
      <DialogActions>
        <ClearButton onClick={() => onClose(false)} color="primary">
          <Translate content='cancel' />
        </ClearButton>
        <ClearButton onClick={() => createOrUpdateProject()} color="primary" autoFocus>
          {edit === true ? <Translate content='editP' /> : <Translate content='createP' />}
        </ClearButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditProject;
