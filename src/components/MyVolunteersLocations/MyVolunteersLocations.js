import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Grid, Card, Button, FormControl, Select, MenuItem, List, FormHelperText } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import RoomIcon from '@material-ui/icons/Room';
import FilterListIcon from '@material-ui/icons/FilterList';
import WarningIcon from '@material-ui/icons/Warning';

import GeoLocationItem from '../MyProjects/GeoLocationItem';

import { LOCATION_FILTER, DOWNLOAD_CSV } from '../MyProjects/MyProjectsConstants';
import { getUserTypeFromLocalStorage, getONGInfo, createAxiosCancelToken, getVolunteerLocationsByOrganization } from '../MyProjects/MyProjectsProvider';

export default class MyVolunteersLocations extends Component {
    constructor(props) {
        super(props)

        this.state = {
            axiosCancelTokenSource: createAxiosCancelToken(),
            kickOut: false,
            orgId: null,
            initialGeoLocations: [
                { volunteer: { name: 'Berta Esquivel', id: "5dc76b5ca6d3306ba4f724a7" }, date: '2019-11-19', coordinates: { lat: 14.636100, long: -90.523556 }, address: '1a Avenida A, Guatemala 01003, Guatemala' },
                { volunteer: { name: 'Caridad Quiros', id: "5dc76b5ca6d3306ba4f724a5" }, date: '2019-10-12', coordinates: { lat: 14.635459, long: -90.514853 }, address: '6A Av (Paseo de la Sexta) 440, Guatemala' },
                { volunteer: { name: 'Berta Esquivel', id: "5dc76b5ca6d3306ba4f724a7" }, date: '2019-11-15', coordinates: { lat: 14.631392, long: -90.523726 }, address: '19 Calle 21, Guatemala' }
            ],
            geoLocations: [
                { volunteer: { name: 'Berta Esquivel', id: "5dc76b5ca6d3306ba4f724a7" }, date: '2019-11-19', coordinates: { lat: 14.636100, long: -90.523556 }, address: '1a Avenida A, Guatemala 01003, Guatemala' },
                { volunteer: { name: 'Caridad Quiros', id: "5dc76b5ca6d3306ba4f724a5" }, date: '2019-10-12', coordinates: { lat: 14.635459, long: -90.514853 }, address: '6A Av (Paseo de la Sexta) 440, Guatemala' },
                { volunteer: { name: 'Berta Esquivel', id: "5dc76b5ca6d3306ba4f724a7" }, date: '2019-11-15', coordinates: { lat: 14.631392, long: -90.523726 }, address: '19 Calle 21, Guatemala' }
            ],

            locationsVolunteersSelector: null,
            locationsVolunteerSelectorSelected: "",

            datePickerOrigin: new Date(),
            datePickerEnd: new Date((new Date()).setDate((new Date()).getDate() + 1)),
        }
    }

    setVolunteersFromLocations = (geoLocations) => {                
        if (geoLocations.size !== null) {
            const volunteersIds = geoLocations.map(location => {
                return location.volunteer.id
            })            

            const uniqueVolunteersIds = [...new Set(volunteersIds)] 
            console.log(uniqueVolunteersIds)           
            const locationsVolunteersSelector = uniqueVolunteersIds.map(id => {
                let vol = null
                geoLocations.forEach(loc => {
                    if (loc.volunteer.id === id) {                        
                        vol = { id: id, name: loc.volunteer.name !== null ? loc.volunteer.name : id }
                    }
                })

                return vol
            })
            
            console.log('locationsVolunteersSelector', locationsVolunteersSelector)
            this.setState({ locationsVolunteersSelector })

        } else this.setState({ locationsVolunteersSelector: null })
    }

    handleOriginDateChange = (datePickerOrigin) => {
        console.log(datePickerOrigin.toISOString().substring(0, 10))        
        this.setState({ datePickerOrigin })
    }

    handleEndDateChange = (datePickerEnd) => {
        console.log(datePickerEnd.toISOString().substring(0, 10))
        this.setState({ datePickerEnd })
    }

    handleFilterLocations = () => {
        const { datePickerOrigin, datePickerEnd, axiosCancelTokenSource, orgId } = this.state
        console.log(datePickerOrigin, datePickerEnd)

        const start = datePickerOrigin.toISOString().substring(0, 10)
        const end = datePickerEnd.toISOString().substring(0, 10)
        
        this.setState({ geoLocations: [] })
        getVolunteerLocationsByOrganization(axiosCancelTokenSource, orgId, start, end)
            .then(geoLocations => {
                console.log('got geoLocations: ', geoLocations)

                const setGeoLocations = new Promise((resolve, reject) => {
                    this.setState({ geoLocations, initialGeoLocations: geoLocations })
                    resolve()
                })

                setGeoLocations.then(() => {
                    this.setVolunteersFromLocations(this.state.geoLocations)
                })

            }).catch(error => console.log(error))

    }

    handleLocationsSelectorOnSelect = (e) => {
        const { initialGeoLocations } = this.state
        let geoLocations = initialGeoLocations

        if (e.target.value !== "") {
            geoLocations = initialGeoLocations.filter(location => location.volunteer.id === e.target.value)
        }

        this.setState({ locationsVolunteerSelectorSelected: e.target.value, geoLocations })
    }

    handleLocationsCSVDownload = () => {
        const { geoLocations } = this.state

        const rows = [['volunteer', 'date', 'latitude', 'longitude', 'address']]
        geoLocations.forEach(location => {
            const row = [location.volunteer.name || 'Anonymous', location.date, location.coordinates.lat, location.coordinates.long, location.address ]
            rows.push(row)
        })

        const csv = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n")
        var encodedUri = encodeURI(csv)
        var link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "locations.csv")
        document.body.appendChild(link)

        link.click()
    }

    componentDidMount = () => {
        const { axiosCancelTokenSource, datePickerOrigin, datePickerEnd } = this.state               
        getUserTypeFromLocalStorage().then(userType => {
            if (userType !== "2") {
                this.setState({ kickOut: true })
            } else {
                getONGInfo(axiosCancelTokenSource).then(ongInfo => {
                    console.log(ongInfo)
                    const orgId = ongInfo._id

                    const start = datePickerOrigin.toISOString().substring(0, 10)
                    const end = datePickerEnd.toISOString().substring(0, 10)

                    getVolunteerLocationsByOrganization(axiosCancelTokenSource, orgId, start, end)
                        .then(geoLocations => {
                            console.log('got geoLocations: ', geoLocations)

                            const setGeoLocations = new Promise((resolve, reject) => {
                                this.setState({ geoLocations, orgId, initialGeoLocations: geoLocations })
                                resolve()
                            })

                            setGeoLocations.then(() => {
                                this.setVolunteersFromLocations(this.state.geoLocations)
                            })

                        }).catch(error => console.log(error))
                })
            }
        })
    }

    render = () => {
        const {
            datePickerOrigin,
            datePickerEnd,
            locationsVolunteersSelector,
            locationsVolunteerSelectorSelected,
            geoLocations,
            kickOut
        } = this.state
        return(
            <div className="wrapper-my-projects">
                {
                    kickOut &&
                    <Redirect to={{ pathname: '/dashboard/my-projects' }} />
                }
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card style={{ width: '100%', paddingBottom: '2%' }}>
                        <h2 style={{ padding: '10%', paddingBottom: 0, paddingTop: '2%', textAlign: 'left', color: '#000' }} className='project-name-text'><RoomIcon /> Visited Locations</h2>
                        
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container spacing={2} style={{ paddingLeft: '10%', paddingRight: '10%', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <KeyboardDatePicker
                                        maxDate={new Date()}
                                        margin="normal"
                                        id="date-picker-origin"
                                        label="Fecha inicial"
                                        format="MM/dd/yyyy"
                                        value={datePickerOrigin}
                                        onChange={this.handleOriginDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <KeyboardDatePicker
                                        minDate={(new Date()).setDate((new Date()).getDate() + 1)}
                                        margin="normal"
                                        id="date-picker-end"
                                        label="Fecha final"
                                        format="MM/dd/yyyy"
                                        value={datePickerEnd}
                                        onChange={this.handleEndDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />                                    
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <Button onClick={() => this.handleFilterLocations()} variant='contained' className='projects-enroll-btn'><FilterListIcon className='icon-btn' />{LOCATION_FILTER}</Button>                                    
                                </Grid>
                            </Grid>
                        </MuiPickersUtilsProvider>

                        {                                
                            locationsVolunteersSelector &&
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                <FormControl style={{ width: '80%' }}>                                    
                                    <Select
                                        labelId="vol-select-label"
                                        id="vol-select"
                                        value={locationsVolunteerSelectorSelected}
                                        onChange={(e) => this.handleLocationsSelectorOnSelect(e)}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {
                                            locationsVolunteersSelector.map((volunteer, index) => {
                                                return(
                                                    <MenuItem key={index} value={volunteer.id}>{volunteer.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                    <FormHelperText>Filter by volunteer on this date range</FormHelperText>
                                </FormControl>

                                <Button style={{ width: '80%', marginTop: '2%' }} onClick={() => this.handleLocationsCSVDownload()} variant='contained' className='projects-enroll-btn'><FilterListIcon className='icon-btn' />{DOWNLOAD_CSV}</Button>
                            </div>

                        }
                        
                        <List style={{ maxHeight: 400, position: 'relative', overflow: 'auto' }}>
                            {
                                geoLocations.length > 0 &&
                                geoLocations.map((location, index) => {
                                    return(
                                        <GeoLocationItem key={index} location={location} />
                                    )
                                })
                            }
                            {
                                geoLocations.length === 0 &&
                                <h5 style={{ padding: '10%', paddingBottom: '5%', paddingTop: 0, textAlign: 'left', color: '#000' }}className='project-name-text'><WarningIcon style={{ fontSize: 14 }}/> No locations registered.</h5>
                            }
                        </List>
                    </Card>
                </Grid>
            </div>
        )
    }
}