const clickAllOfTheSummaryControl = () => {
    const targets = document.getElementsByClassName('opblock-summary-control')
    for (target of targets) {
        target.click()
    }

}
clickAllOfTheSummaryControl()