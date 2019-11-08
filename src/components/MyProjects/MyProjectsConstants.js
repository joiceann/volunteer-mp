export const OPEN_PROJECT = 'VIEW PROJECT'

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