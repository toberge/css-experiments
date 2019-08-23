/*
let muchdata = [
    { sentence: 'I am very angry right now, my dear.' },
    { sentence: 'This is a wonderful day.' },
    { sentence: 'I am dying of laughter' }
];

for (let i = 0; i < muchdata.length; i++) {
    setTimeout(fetchMood(muchdata[i]), 5000 * (i+1));
    /!*let mood = moodString(fetchMood(muchdata[i]));
    console.log(`hello ${mood}`);*!/
}
*/

(function () {
"use strict";

/*const colors = [
    // '#2B3D51',
    '#502332',
    '#E74D3B',
    '#FBA446',
    '#DCD762',
    '#82C6B5'
];

const moods = [
    'terrible',
    'awful',
    'okay',
    'good',
    'magnificent'
];*/

const states = [
    { mood: 'terrible',     color: '#502332' },
    { mood: 'awful',        color: '#E74D3B' },
    { mood: 'okay',         color: '#FBA446' },
    { mood: 'good',         color: '#DCD762' },
    { mood: 'magnificent',  color: '#82C6B5' }
]; // TODO use this instead of the two arrays, maybe

// let mood = 0;

const url = 'http://bigdata.stud.iie.ntnu.no/sentiment/webresources/sentiment?api-key=Happy%21%21%21';
// api-key does not seem to be necessary after all, wow
// note that in urls ! is encoded as %21, Chrome compained but Firefox did not.

// encountered another error now, https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin
// seems like it's caused by the service being down and sending a response that does not include the correct CORS header(s)

const change = code => {
    if (code < 0 || code > 4) return;
    document.getElementById("sendme")
        .innerHTML = `You're feeling <strong>${states[code].mood}</strong> right now.`;
    document.getElementsByTagName("body").item(0)
        .style.backgroundColor = states[code].color;
};


const button = document.getElementById("sentence-button");
const input = document.getElementById("sentence-input");
console.log(button.innerText);

// thanks to https://stackoverflow.com/a/45650898
document.addEventListener("keyup", event => {
    if(event.key !== "Enter") return; // Use `.key` instead.
    button.click(); // Things you want to do.
    event.preventDefault(); // No need to `return false
});

button.addEventListener("click", evt => {
    let value = input.value;
    console.log(value);
    if (value === "") return;

    let data = {
        sentence: value
    };

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(response => {
        let moodCode = JSON.stringify(response);
        console.log('sentence was very:', moodCode);
        change(moodCode);
        //console.log("We have " + mood);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

let boxes = document.getElementsByClassName('debug-option');

    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        box.style.backgroundColor = states[i].color;
        box.addEventListener('click', evt => change(i));
    }



let errorField = document.getElementById("error");

fetch(url, {
    method: 'POST', // or 'PUT'
    header: new Headers({ //TODO check if this works now
        'Content-Type': 'application/json; charset=utf-8'
    }),
    body: JSON.stringify({
        sentence: 'I am very sad'
    })
}).then(res => {
    if (res.ok) return res.json();
    else throw new Error('Response was not okay');
})
.then(response => {
    errorField.innerText = 'The service is up & running';
    console.log('Test gave us ' + JSON.stringify(response));
})
.catch(error => {
    console.error('Error:', error);
    errorField.innerText = 'Servicen har litt vondt i magen atm';
});

})();
