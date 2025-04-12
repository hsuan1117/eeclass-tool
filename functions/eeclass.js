function doWithCourseATag(item) {
    fetch(item.href).then(r => r.text()).then(res => {
        if (res.indexOf("修改我的作業") > -1) {
            // 已經繳交
            item.style.textDecoration = 'line-through'
            item.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;<span style='color: green;'>V</span>"
        } else {
            // 未繳交
            moment.locale('zh-tw');
            moment.relativeTimeThreshold('m', 60);
            moment.relativeTimeThreshold('h', 24+12); // 從 36 小時就不寫天了

            const hw_type = $(res).find(".app-course_homework-description dt").filter(function () {
                return $(this).text() === "類型";
            }).next("dd");
            if(hw_type.text() && hw_type.text().indexOf('分組') > -1) {
                item.innerHTML += '&nbsp;[分組]'
            }

            const dt = $(res).find(".app-course_homework-description dt").filter(function () {
                return $(this).text() === "繳交期限";
            });
            const dd = dt.next("dd");

            const time_original = dd.text()
            if (time_original) {
                const time = moment(time_original)
                if (time.hours() === 0 && time.minutes() === 0) {
                    time.set('hours', 23)
                    time.set('minutes', 59)
                    time.set('seconds', 59)
                }

                item.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;<span style='color: red;'>${time.fromNow()} X</span>`
            }


        }
    })
}

function showDateAfterHW() {
    document.querySelectorAll("#xbox2-inline > div.module.app-dashboard.app-dashboard-report > div.row > div:nth-child(1) > div.fs-list > ul > li .text-overflow>a").forEach((item) => {
        doWithCourseATag(item)
    })
}

function showDateAfterHWForLatestEvent() {
    console.log("showDateAfterHWForLatestEvent")
    $("#recentEventTable").find('a').each(function (i, item) {
        console.log(item)
        doWithCourseATag(item)
    })
}

function hideNoUseEEClass(){
    const mycourse = document.querySelector("#xbox2-inline > div.module.app-dashboard.app-dashboard-show > div > div.fs-block-body > div > ul")
    Array.from(mycourse.children).forEach((item) => {
        fetch(item.querySelector("a").href).then(r => r.text()).then(res => {
            if (res.indexOf("目前沒有公告") > -1 && res.indexOf("目前沒有即將到期的作業、問卷或測驗。") > -1) {
                item.style.display = "none"
            }
        })
    })
}
