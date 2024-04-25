import {colorMapping} from '@/helpers/colorMapping'

type ReturnWhat = 'dmc' | 'flossName' | 'hexCode' | 'all'
type InputWhat = 'dmc' | 'flossName' | 'hexCode'

export const findColor = (inputStr: string|undefined, inputWhat: InputWhat, returnWhat: ReturnWhat): undefined | string => {
    if (!inputStr) {
        return undefined
    }

    const colorObj = colorMapping.find(color => (color[inputWhat] === inputStr))

    if (!colorObj || !['dmc','flossName','hexCode','all'].includes(returnWhat)) {
        return undefined
    }

    if (returnWhat === 'dmc') {
        return colorObj.dmc
    } else if (returnWhat === 'flossName') {
        return colorObj.flossName
    } else if (returnWhat === 'hexCode') {
        return colorObj.hexCode
    }
    return undefined
}
