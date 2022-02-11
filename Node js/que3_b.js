const events = require('events');
const https = require('https');

var ee = new events.EventEmitter();


ee.on('message', () => {

    https.get('https://docs.microsoft.com/en-us/previous-versions/windows/desktop/ms762271(v=vs.85)', res => {
        res.setEncoding('utf-8');
        let body = '';
        res.on('data', data => { body += data });
        res.on('end', () => {
            console.log(body)
        })
    })
})

ee.emit('message')