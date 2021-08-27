let result = []
const initData = () => {
    const targets = document.getElementsByClassName('opblock-summary-control')
    for (target of targets) {
        const method = target.getElementsByClassName('opblock-summary-method').item(0)?.textContent
        const path = target.getElementsByClassName('opblock-summary-path').item(0)?.textContent
        result.push({
            method,
            path
        })
    }

}
initData()

const getParams = (inputTarget) => {
    const params = inputTarget.getElementsByClassName('parameters-container')
        .item(0)?.getElementsByClassName('parameters').item(0)?.getElementsByTagName('tbody')
        .item(0)?.getElementsByTagName('tr')
    if (params && params.length > 0) {
        let outputParams = []
        for (const paramEle of params) {
            const isRequired = paramEle.getElementsByClassName('required').item(0) !== null
            const parameters = paramEle.getElementsByClassName('parameters-col_name').item(0)
            if (parameters) {
                const paramName = parameters.getElementsByClassName('parameter__name').item(0)?.textContent
                const paramType = parameters.getElementsByClassName('parameter__type').item(0)?.textContent
                const updateParamName = paramName.replaceAll('*', '').trim()
                outputParams.push({
                    name: updateParamName,
                    type: paramType,
                    required: isRequired
                })
            }
        }
        return outputParams
    }
    return []
}

const getBody = (inputTarget) => {
    const thisBody = inputTarget.getElementsByClassName('opblock-section-request-body').item(0)
    if (thisBody) {
        const isRequired = thisBody.getElementsByClassName('opblock-section-header').item(0)?.getElementsByClassName('required').item(0) !== null
        const languageJsonPart = thisBody.getElementsByClassName('opblock-description-wrapper').item(0)?.getElementsByClassName('language-json').item(0)
        if (languageJsonPart) {
            const jsonData = languageJsonPart.textContent
            if (jsonData) {
                return {
                    data: JSON.parse(jsonData),
                    required: isRequired
                }    
            }
            return {
                data: {},
                required: isRequired
            }
        }   
        return {}     
    }
    return {}
    
}

const getAllTheBody = () => {
    const targets = document.getElementsByClassName('opblock-body')    
    for (let idx = 0; idx < targets.length; idx++) {
        for (let resIdx = 0; resIdx < result.length; resIdx++) {
            if (idx === resIdx) {
                result[resIdx]['params'] = getParams(targets[idx])
                result[resIdx]['body'] = getBody(targets[idx])
            }
        }
    }
}
getAllTheBody()

console.log('result ',JSON.stringify(result, null, 2))
