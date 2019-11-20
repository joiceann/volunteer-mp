export const OPEN_PROJECT = 'VIEW PROJECT'
export const LEAVE_PROJECT = 'LEAVE THIS PROJECT'
export const ENROLL_TO_PROJECT = 'I WANT TO BE PART!'
export const REMOVE_PROJECT = 'DELETE THIS PROJECT'
export const FINISH_PROJECT = 'FINISH THIS PROJECT'
export const EDIT_PROJECT = 'MANAGE VOLUNTEERS'
export const EDIT_PROJECT_CLOSE = 'CLOSE MANAGING OPTIONS'
export const SAVE_CHANGES = 'SAVE CHANGES'
export const COORDINATOR_LABEL = 'COORDINATOR'
export const REMOVE_VOLUNTEER_DIALOG_TITLE = 'Removing volunteer'
export const REMOVE_VOLUNTEER_DIALOG_CONTENT = "Are you sure you want to remove this volunteer from this project? This action can't be undone."
export const REMOVE_VOLUNTEER_DIALOG_CANCEL_TEXT = 'No, keep this volunteer'
export const REMOVE_VOLUNTEER_DIALOG_ACCEPT_TEXT = 'Yes, remove this volunteer'
export const SERVER_ERROR = "We couldn't process your request at this time. Please try again in a few moments."
export const VOLUNTEER_ITEM_COORDINATOR_PLACEHOLDER = 'COORDINATOR'
export const VOLUNTEER_ITEM_ACCEPTED_VOLUNTEER = 'ACCEPTED'
export const LEAVE_PROJECT_TEXT = "Are you sure you want to leave this project? If so, you would have to re-apply to this project and await for the organization's approval."
export const LEAVE_PROJECT_TITLE = 'Leaving this project'
export const DIALOG_GENERIC_NO = 'NO'
export const DIALOG_GENERIC_YES = ' YES'
export const REMOVE_PROJECT_TEXT = 'Are you sure you want to delete this project? This action cannot be undone.'
export const REMOVE_PROJECT_TITLE = 'Deleting project'
export const FINISH_PROJECT_TEXT = 'Are you sure you want to end this project? This action cannot be undone.'
export const FINISH_PROJECT_TITLE = 'Closing project'
export const ENROLL_TITLE = 'Enrolling to this project!'
export const ENROLL_TEXT = 'Are you sure you want to enroll to this project? If so, an application will be sent to the organization and you will have to wait for your approval before you can be a part of this project.'
export const VOLUNTEER_COMMENTS_DIALOG_TITLE = ' said this about your project'
export const VOLUNTEER_COMMENTS_DIALOG_OK = 'CLOSE'
export const LOCATION_FILTER = 'FILTER'
export const DOWNLOAD_CSV = 'Download CSV Report'
export const DOWNLOAD_CSV_USER_LIST ='Download volunteers list'

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