"use strict";

/*var ws= new WebSocket("ws://theURL");
ws.onmessage= event=> {
    console.log("WS event: " + event.data);
    document.getElementById("sendme").innerText = event.data.stringify();
};*/
// Manipuler HTML med innhold fra event.data};

/*const moodString = (response) => {
    switch (response) {
        case "0":
            return "terrible";
        case "1":
            return "awful";
        case "2":
            return "okay";
        case "3":
            return "good";
        case "4":
            return "magnificent";
        default:
            return "undefined";
    }
};

const url = 'http://bigdata.stud.iie.ntnu.no/sentiment/webresources/sentiment?api-key=Happy%21%21%21';
// api-key does not seem to be necessary after all, wow

const fetchMood = (data) => {

    // let mood = "defiantly bad";
    let mood = -1;

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(response => {
            mood = JSON.stringify(response);
            mood = moodString(JSON.stringify(response));
            console.log('Success:', mood);
            document.getElementById("sendme").innerHTML = `I'm feeling ${mood}.`;
            //console.log("We have " + mood);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    //return mood;
};

let muchdata = [
    { sentence: 'I am very angry right now, my dear.' },
    { sentence: 'This is a wonderful day.' },
    { sentence: 'I am dying of laughter' }
];

for (let i = 0; i < muchdata.length; i++) {
    setTimeout(fetchMood(muchdata[i]), 5000 * (i+1));
    /!*let mood = moodString(fetchMood(muchdata[i]));
    console.log(`hello ${mood}`);*!/
}*/


const colors = [
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
];

const url = 'http://bigdata.stud.iie.ntnu.no/sentiment/webresources/sentiment?api-key=Happy%21%21%21';
// api-key does not seem to be necessary after all, wow
// note that in urls ! is encoded as %21, Chrome compained but Firefox did not.

const change = code => {
    if (code < 0 || code > 4) return;
    document.getElementById("sendme")
        .innerHTML = `You're feeling <strong>${moods[code]}</strong> right now.`;
    document.getElementsByTagName("body").item(0)
        .style.backgroundColor = colors[code];
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


let errorField = document.getElementById("error");

fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify({
        sentence: 'I am very sad'
    })
}).then(res => res.json())
.then(response => {
    errorField.innerText = 'The service is up & running'
})
.catch(error => {
    console.error('Error:', error);
    errorField.innerText = 'Servicen har litt vondt i magen atm';
});
