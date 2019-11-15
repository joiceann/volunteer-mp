export const OPEN_PROJECT = 'VIEW PROJECT'
export const LEAVE_PROJECT = 'LEAVE THIS PROJECT'
export const REMOVE_PROJECT = 'DELETE THIS PROJECT'
export const EDIT_PROJECT = 'MANAGE VOLUNTEERS'
export const EDIT_PROJECT_CLOSE = 'CLOSE MANAGING OPTIONS'
export const SAVE_CHANGES = 'SAVE CHANGES'
export const COORDINATOR_LABEL = 'COORDINATOR'
export const REMOVE_VOLUNTEER_DIALOG_TITLE = 'Removing volunteer'
export const REMOVE_VOLUNTEER_DIALOG_CONTENT = "Are you sure you want to remove this volunteer from this project? This action can't be undone."
export const REMOVE_VOLUNTEER_DIALOG_CANCEL_TEXT = 'No, keep this volunteer'
export const REMOVE_VOLUNTEER_DIALOG_ACCEPT_TEXT = 'Yes, remove this volunteer'
export const SERVER_ERROR = "We couldn't process your request at this time. Please try again in a few moments."

export const volunteerRemovalSuccess = (volunteerName, type) => {
    if (type === 'ONG') {
        return `Successfully removed ${volunteerName} from this project.`
    } else return `You have successfully opted out from this project.`
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