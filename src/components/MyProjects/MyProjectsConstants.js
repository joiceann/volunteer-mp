import React, { Component }  from 'react';
import en from './../../lang/en'
import es from './../../lang/es'
import counterpart from 'counterpart';
import translator from "counterpart"

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('es', es);
counterpart.setLocale(localStorage.getItem('lang'));


export const OPEN_PROJECT = translator.translate('viewProject')
export const LEAVE_PROJECT = translator.translate('leave')
export const ENROLL_TO_PROJECT = translator.translate('joinProject')
export const REMOVE_PROJECT = translator.translate('removeProject')
export const FINISH_PROJECT = translator.translate('finishProject')
export const EDIT_PROJECT = translator.translate('editProject')
export const EDIT_PROJECT_CLOSE = translator.translate('editProjectClose')
export const SAVE_CHANGES = translator.translate('saveChanges')
export const COORDINATOR_LABEL = translator.translate('coordinator')
export const REMOVE_VOLUNTEER_DIALOG_TITLE = translator.translate('removingVolunteer')
export const REMOVE_VOLUNTEER_DIALOG_CONTENT = translator.translate('REMOVE_VOLUNTEER_DIALOG_CONTENT')
export const REMOVE_VOLUNTEER_DIALOG_CANCEL_TEXT = translator.translate('REMOVE_VOLUNTEER_DIALOG_CANCEL_TEXT')
export const REMOVE_VOLUNTEER_DIALOG_ACCEPT_TEXT = translator.translate('REMOVE_VOLUNTEER_DIALOG_ACCEPT_TEXT')
export const SERVER_ERROR = translator.translate('SERVER_ERROR')
export const VOLUNTEER_ITEM_COORDINATOR_PLACEHOLDER = translator.translate('VOLUNTEER_ITEM_COORDINATOR_PLACEHOLDER')
export const VOLUNTEER_ITEM_ACCEPTED_VOLUNTEER = translator.translate('VOLUNTEER_ITEM_ACCEPTED_VOLUNTEER')
export const LEAVE_PROJECT_TEXT = translator.translate('LEAVE_PROJECT_TEXT')
export const LEAVE_PROJECT_TITLE = translator.translate('LEAVE_PROJECT_TITLE')
export const DIALOG_GENERIC_NO = translator.translate('DIALOG_GENERIC_NO')
export const DIALOG_GENERIC_YES = translator.translate('DIALOG_GENERIC_YES')
export const REMOVE_PROJECT_TEXT = translator.translate('REMOVE_PROJECT_TEXT')
export const REMOVE_PROJECT_TITLE = translator.translate('REMOVE_PROJECT_TITLE')
export const FINISH_PROJECT_TEXT = translator.translate('FINISH_PROJECT_TEXT')
export const FINISH_PROJECT_TITLE = translator.translate('FINISH_PROJECT_TITLE')
export const ENROLL_TITLE = translator.translate('ENROLL_TITLE')
export const ENROLL_TEXT = translator.translate('ENROLL_TEXT')
export const VOLUNTEER_COMMENTS_DIALOG_TITLE = translator.translate('VOLUNTEER_COMMENTS_DIALOG_TITLE')
export const VOLUNTEER_COMMENTS_DIALOG_OK = translator.translate('VOLUNTEER_COMMENTS_DIALOG_OK')
export const LOCATION_FILTER = translator.translate('LOCATION_FILTER')
export const DOWNLOAD_CSV = translator.translate('DOWNLOAD_CSV')
export const DOWNLOAD_CSV_USER_LIST =translator.translate('DOWNLOAD_CSV_USER_LIST')
export const ENROLL_TEXT_NOT_LOGGED = translator.translate('ENROLL_TEXT_NOT_LOGGED')

export const starsAverage = (evaluations) => {
    let sum = 0

    evaluations.forEach(evaluation => {
        sum += evaluation.stars
    })

    return sum / evaluations.length
}

export const volunteerRemovalSuccess = (volunteerName, type) => {
    if (type === 'ONG') {
        return `Successfully removed ${volunteerName} from this project.`
    } else return `You have successfully opted out from this project.`
}

export const volunteerEnroledSuccess = (volunteerName, type) => {
    if (type === 'ONG') {
        return `Successfully enroled ${volunteerName} from this project.`
    } else return `You have successfully enroled to this project.`
}

export const settingCoordinatorMessage = (volunteerName, type) => {
    return `Successfully ${type === true ? ' assigned' : ' removed'} coordinator role to ${volunteerName}.`
}

export const limitTextToCertainLength = (text, length) => {
    let newText = ''

    if (!(length >= text.length)) {
        for (var i = 0; i < length - 4; i++) {
            newText += text.charAt(i)
        }
    
        newText += ' ...'
    } else {
        newText = text
    }


    return newText
}
