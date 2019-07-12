(function(){

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
        });
    });
}

window.addEventListener('load', onload);

function onload(){
    var checkBox = document.getElementById('checkbox');
    checkBox.checked = JSON.parse(localStorage.getItem('holiday'));
    refreshTime();
}

var timeTable = {
    vokzalna:
    {
        workday:["05:40","05:54","06:06","06:18","06:29","06:40","06:51","06:59","07:05","07:11","07:17","07:24","07:31","07:38","07:45","07:52","08:00","08:08","08:17","08:25","08:32","08:40","08:49","08:57","09:07","09:18","09:29","09:40","09:51","10:02","10:13","10:29","10:45","11:01","11:17","11:33","11:44","12:05","12:21","12:37","12:53","13:09","13:25","13:41","13:57","14:13","14:29","14:46","14:59","15:10","15:21","15:32","15:43","15:54","16:05","16:16","16:27","16:38","16:49","17:00","17:11","17:22","17:33","17:44","17:55","18:06","18:17","18:28","18:39","18:49","19:01","19:12","19:21","19:37","19:53","20:09","20:25","20:41","20:57","21:13","21:29","21:45","22:01","22:17","22:33","22:49","23:05"],
        weekend:["05:40","05:58","06:14","06:30","06:46","07:02","07:18","07:34","07:50","08:06","08:22","08:38","08:54","09:10","09:26","09:42","09:58","10:14","10:30","10:46","11:02","11:18","11:34","11:50","12:06","12:22","12:38","12:54","13:10","13:26","13:42","13:58","14:14","14:30","14:46","15:02","15:18","15:35","15:51","16:08","16:24","16:41","16:57","17:13","17:29","17:45","18:01","18:17","18:33","18:49","19:05","19:21","19:37","19:53","20:09","20:25","20:41","20:57","21:13","21:29","21:45","22:01","22:17","22:33","22:49","23:05"]
    },
    pokrovska:
    {
        workday:["05:38","05:50","06:02","06:13","06:24","06:35","06:43","06:49","06:55","07:01","07:08","07:15","07:22","07:29","07:36","07:44","07:52","08:01","08:09","08:16","08:24","08:33","08:41","08:51","09:02","09:13","09:24","09:34","09:45","09:56","10:12","10:29","10:45","11:01","11:17","11:33","11:49","12:05","12:21","12:37","12:53","13:09","13:25","13:41","13:57","14:13","14:29","14:42","14:53","15:04","15:15","15:26","15:37","15:48","15:59","16:10","16:21","16:32","16:43","16:54","17:05","17:16","17:27","17:38","17:49","18:00","18:11","18:22","18:33","18:45","18:55","19:05","19:21","19:37","19:53","20:09","20:25","20:41","20:57","21:13","21:29","21:45","22:01","22:17","22:33","22:49","23:05"],
        weekend:["05:40","05:58","06:14","06:30","06:46","07:02","07:18","07:34","07:50","08:06","08:22","08:38","08:54","09:10","09:26","09:42","09:58","10:14","10:30","10:46","11:02","11:18","11:34","11:50","12:06","12:22","12:38","12:54","13:10","13:26","13:42","13:58","14:14","14:30","14:46","15:02","15:18","15:35","15:51","16:08","16:24","16:41","16:57","17:13","17:29","17:45","18:01","18:17","18:33","18:49","19:05","19:21","19:37","19:53","20:09","20:25","20:41","20:57","21:13","21:29","21:45","22:01","22:17","22:33","22:49","23:05"]
    }
}

function refreshTime() {
    var date = new Date()
    var time = date.toTimeString().split(':').slice(0,2).join(':');
    var holiday = JSON.parse(localStorage.getItem('holiday'));
    var isWork = !(holiday || date.getDay() == 6 || date.getDay() == 7);
    var vokzal = [];
    var pokrovska = [];
    if (isWork) {
        vokzal = getTime(timeTable.vokzalna.workday, time);
        pokrovska = getTime(timeTable.pokrovska.workday, time);        
    }
    else {
        vokzal = getTime(timeTable.vokzalna.weekend, time);
        pokrovska = getTime(timeTable.pokrovska.weekend, time);
    }
    update(vokzal.concat(pokrovska));
}

function update(array) {
        document.querySelectorAll('.time').forEach(function(elem, i) {
        elem.innerText = array[i] || '';
    });
}

function getTime(array, time) {
    var result = [];
    var count = 0;
    var first = true;
    for(i = 0; i < array.length && count < 3; i++) {
        if (array[i] > time) {
            if (first) {
                if (i > 0) {
                    result.push(array[i-1]);
                }
                else {
                    result.push('');
                }
                first = false;
                count++;
            }
            result.push(array[i]);
            count++;
        }
    }
    if (!result.length) {
        result = array.slice(0, 3);
    }
    return result
}

setInterval(refreshTime, 1000*60);

window.checkBoxClick = function() {
    var checkBox = document.getElementById('checkbox');
    localStorage.setItem('holiday', checkBox.checked);
    refreshTime();
}

})();

