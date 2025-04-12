if (location.href.indexOf('oauth.ccxp.nthu.edu.tw') > -1) {
    oauth_autocheck()
} else if (location.href.indexOf('eeclass.nthu.edu.tw/dashboard/latestEvent') > -1) {
    showDateAfterHWForLatestEvent()
} else if (location.href.indexOf('eeclass.nthu.edu.tw/dashboard') > -1) {
    showDateAfterHW()
    hideNoUseEEClass()
}
