const timer_setting = document.querySelector('.timer-setting');
const timer_toggle_button = document.getElementById('start-toggle');
const reset_button = document.getElementById('reset');
const hours_number = document.getElementById('hours-number');
const minutes_number = document.getElementById('minutes-number');
const seconds_number = document.getElementById('seconds-number');
const hours_slider = document.getElementById('hours-slider');
const minutes_slider = document.getElementById('minutes-slider');
const seconds_slider = document.getElementById('seconds-slider');
const scale_number = document.getElementById('scale-number');
const scale_slider = document.getElementById('scale-slider');
const close = document.getElementById('close');
const timer_close = document.getElementById('timer-close');
const timer = document.getElementById('timer');
const option_title = document.querySelector('.more-option-title');
const more_option = document.querySelector('.more-option');
const more_par = document.querySelector('.more-option-par');
const timer_position = document.querySelector('.timer-position');

let uivisible = true;
window.addEventListener('message', () => {
    if (uivisible) {
        this.document.body.style.display = 'flex';
        uivisible = false;
    } else {
        timer_setting.style.display = 'block';
    };
});

let timervisible = true;
timer_close.addEventListener('click', (e) => {
    timervisible = !timervisible;
    if (timervisible) {
        timer.style.display = 'block';
        timer_close.style.color = '#ffff';
    } else {
        timer.style.display = 'none';
        timer_close.style.color = '#525252';
    };
})

close.addEventListener('click', () => {
    timer_setting.style.display = 'none';
    NuiCb();
});

hours_slider.addEventListener('input', (e) => {
    hours_number.value = e.target.value;
    setTimerContent();
});
hours_number.addEventListener('input', (e) => {
    if (e.target.value > 23) {
        e.target.value = 23;
    } else if (e.target.value < 0) {
        e.target.value = 0;
    } else if (e.target.value === '') {
        e.target.value = 0;
    } else if (String(e.target.value).indexOf('0') == 0) {
        e.target.value = String(e.target.value).slice(1);
    };
    hours_slider.value = e.target.value;
    setTimerContent();
});

minutes_slider.addEventListener('input', (e) => {
    minutes_number.value = e.target.value;
    setTimerContent();
});
minutes_number.addEventListener('input', (e) => {
    if (e.target.value > 59) {
        e.target.value = 59;
    } else if (e.target.value < 0) {
        e.target.value = 0;
    } else if (e.target.value === '') {
        e.target.value = 0;
    } else if (String(e.target.value).indexOf('0') == 0) {
        e.target.value = String(e.target.value).slice(1);
    };
    minutes_slider.value = e.target.value;
    setTimerContent();
});

seconds_slider.addEventListener('input', (e) => {
    seconds_number.value = e.target.value;
    setTimerContent();
});
seconds_number.addEventListener('input', (e) => {
    if (e.target.value > 59) {
        e.target.value = 59;
    } else if (e.target.value < 0) {
        e.target.value = 0;
    } else if (e.target.value === '') {
        e.target.value = 0;
    } else if (String(e.target.value).indexOf('0') === 0) {
        e.target.value = String(e.target.value).slice(1);
    };
    seconds_slider.value = e.target.value;
    setTimerContent();
});

scale_slider.addEventListener('input', (e) => {
    scale_number.value = e.target.value;
    setTimerScale();
});
scale_number.addEventListener('input', (e) => {
    if (String(e.target.value).length > 4) {
        e.target.value = String(e.target.value).slice(0, -1);
    } else if (e.target.value > 1.2) {
        e.target.value = 1.2;
    } else if (String(e.target.value).length === 3 && e.target.value < 0.1) {
        e.target.value = 0.1;
    };
    scale_slider.value = e.target.value;
    setTimerScale();
});

function setTimerScale() {
    timer.style.transform = `scale(${scale_number.value})`;
};

function setTimerContent() {
    let strHours;
    let strMinutes;
    let strSeconds;

    if (('' + hours_number.value).length < 2) {
        strHours = '0' + hours_number.value;
    } else {
        strHours = hours_number.value;
    };
    if (('' + minutes_number.value).length < 2) {
        strMinutes = '0' + minutes_number.value;
    } else {
        strMinutes = minutes_number.value;
    };
    if (('' + seconds_number.value).length < 2) {
        strSeconds = '0' + seconds_number.value;
    } else {
        strSeconds = seconds_number.value;
    };
    timer.textContent = strHours + ':' + strMinutes + ':' + strSeconds;
};

let interval;
let toggle = false;
let current_time;
let res_cur_time;
let res;

function ResetTimer() {
    let hours_time = String(Math.floor(res_cur_time / 3600));
    let minutes_time = String(Math.floor((res_cur_time % 3600) / 60));
    let seconds_time = String(Math.floor(((res_cur_time % 3600) % 60)));
    let hours_times = hours_time;
    let minutes_times = minutes_time;
    let seconds_times = seconds_time;
    if (hours_time.length < 2) {
        hours_times = '0' + hours_time;
    };
    if (minutes_time.length < 2) {
        minutes_times = '0' + minutes_time
    };
    if (seconds_time.length < 2) {
        seconds_times = '0' + seconds_time;
    };
    timer.textContent = hours_times + ':' + minutes_times + ':' + seconds_times;
    hours_number.value = hours_time;
    hours_slider.value = hours_time;
    minutes_number.value = minutes_time;
    minutes_slider.value = minutes_time;
    seconds_number.value = seconds_time;
    seconds_slider.value = seconds_time;
    timer_toggle_button.disabled = false;
    timer_close.disabled = false;
};

const audio = new Audio('sound.ogg');
audio.volume = 0.2;

reset_button.addEventListener('click', () => {
    if (res_cur_time === undefined) {
        hours_number.value = 0;
        hours_slider.value = 0;
        minutes_number.value = 3;
        minutes_slider.value = 3;
        seconds_number.value = 30;
        seconds_slider.value = 30;
        timer.textContent = '00:03:30';
    } else {
        ResetTimer();
        audio.pause();
        audio.currentTime = 0;
        clearTimeout(res);
    };
});

timer_toggle_button.addEventListener('click', () => {
    toggle = !toggle;
    res_cur_time = (Number(hours_number.value) * 3600) + (Number(minutes_number.value) * 60) + Number(seconds_number.value);
    current_time = (Number(hours_number.value) * 3600) + (Number(minutes_number.value) * 60) + Number(seconds_number.value);
    function TimerStart() {
        if (toggle) {
            current_time -= 1;
            let hours_time = String(Math.floor(current_time / 3600));
            let minutes_time = String(Math.floor((current_time % 3600) / 60));
            let seconds_time = String(Math.floor(((current_time % 3600) % 60)));
            if (hours_time.length < 2) {
                hours_time = '0' + hours_time;
            };
            if (minutes_time.length < 2) {
                minutes_time = '0' + minutes_time
            };
            if (seconds_time.length < 2) {
                seconds_time = '0' + seconds_time;
            };
            if (current_time < 1) {
                toggle = false;
                clearInterval(interval);
                reset_button.disabled = false;
                hours_number.disabled = false;
                hours_slider.disabled = false;
                minutes_number.disabled = false;
                minutes_slider.disabled = false;
                seconds_number.disabled = false;
                seconds_slider.disabled = false;
                timer_toggle_button.disabled = true;
                if (!timervisible) {
                    timervisible = true;
                    timer.style.display = 'block';
                    timer_close.style.color = '#ffff';
                }
                audio.play();
                res = setTimeout(() => {
                    ResetTimer();
                }, 4000);
            };
            timer.textContent = hours_time + ':' + minutes_time + ':' + seconds_time;
        };
    };
    if (toggle) {
        reset_button.disabled = true;
        hours_number.disabled = true;
        hours_slider.disabled = true;
        minutes_number.disabled = true;
        minutes_slider.disabled = true;
        seconds_number.disabled = true;
        seconds_slider.disabled = true;
        interval = setInterval(TimerStart, 1000);
    } else {
        reset_button.disabled = false;
        hours_number.disabled = false;
        hours_slider.disabled = false;
        minutes_number.disabled = false;
        minutes_slider.disabled = false;
        seconds_number.disabled = false;
        seconds_slider.disabled = false;
        clearInterval(interval);
    };
});

let option_open = false;
option_title.addEventListener('click', (e) => {
    option_open = !option_open;
    if (option_open) {
        more_option.style.display = 'block';
        more_par.style.paddingBottom = '10px';

    } else {
        more_option.style.display = 'none';
        more_par.style.paddingBottom = '';
    };
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        timer_setting.style.display = 'none';
        NuiCb();
    };
});

function NuiCb() {
    fetch(`https://${GetParentResourceName()}/closeUI`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({})
    }).then(resp => resp.json()).then(resp => console.log(resp));    
}
