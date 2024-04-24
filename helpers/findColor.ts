import {colorMapping} from '@/helpers/colorMapping'

type ReturnWhat = 'dmc' | 'flossName' | 'hexCode' | 'all'
type InputWhat = 'dmc' | 'flossName' | 'hexCode'

export const findColor = (inputStr: string, inputWhat: InputWhat, returnWhat: ReturnWhat) => {
    const colorObj = colorMapping.find(color => (color[inputWhat] === inputStr))

    if (!colorObj) {
        return undefined
    }

    if (returnWhat === 'dmc') {
        return colorObj.dmc
    } else if (returnWhat === 'flossName') {
        return colorObj.flossName
    } else if (returnWhat === 'hexCode') {
        return colorObj.hexCode
    }
    return colorObj
}
