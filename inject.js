if (location.href.indexOf('oauth.ccxp.nthu.edu.tw') > -1) {
    setTimeout(()=>document.querySelector("input[name='keep']").checked = true,0)
} else {
    document.querySelectorAll("#xbox2-inline > div.module.app-dashboard.app-dashboard-report > div.row > div:nth-child(1) > div.fs-list > ul > li .text-overflow>a").forEach((item) => {
        fetch(item.href).then(r => r.text()).then(res => {
            if (res.indexOf("修改我的作業") > -1) {
                item.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;<span style='color: green;'>V</span>"
            } else {
                const el = document.createElement('html')
                el.innerHTML = res
                moment.locale('zh-tw');
                const time = moment(el.querySelector("#xbox-inline > div.module.app-course_homework.app-course_homework-description > div > dl > dd:nth-child(6) > span").innerText)
                console.log(time.hours())
                if (time.hours() === 0 && time.minutes() === 0) {
                    time.set('hours', 23)
                    time.set('minutes', 59)
                    time.set('seconds', 59)
                }
                item.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;<span style='color: red;'>${time.fromNow()} X</span>`
            }

        })
    })

    const mycourse = document.querySelector("#xbox2-inline > div.module.app-dashboard.app-dashboard-show > div > div.fs-block-body > div > ul")
    Array.from(mycourse.children).forEach((item) => {
        fetch(item.querySelector("a").href).then(r => r.text()).then(res => {
				console.log(res)
            if (res.indexOf("目前沒有公告") > -1 && res.indexOf("目前沒有即將到期的作業、問卷或測驗。") > -1) {
                item.style.display = "none"
            } else {

            }
        })
    })
}
