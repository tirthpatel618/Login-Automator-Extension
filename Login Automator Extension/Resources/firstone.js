var Imap = require('imap'),
    inspect = require('util').inspect;
const {simpleParser} = require('mailparser');

var imap = new Imap({
  user: 'EMAIL',
  password: 'PASSWORD',
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: {
    rejectUnauthorized: false
  }
});
let emailSubject;
let verificationCode

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}
imap.once('ready', function() {
    openInbox(function(err, box) {
        if (err) throw err;
        const emailID = box.messages.total;
        console.log(emailID);
        const email = imap.seq.fetch(11805, { bodies: '' });
        console.log('Fetching email');
        email.on('message', (msg, seqno) => {
            msg.on('body', (stream) => {
                simpleParser(stream, async (err, mail) => {
                    if (err) throw err;
                    // Extract and log the email subject
                    const emailSubject = mail.text;
                    console.log('type', typeof emailSubject);
                    console.log('Email Subject:', emailSubject);
                    const codeMatch = emailSubject.match(/\b\d{6}\b/);
                    if (codeMatch) {
                      const verificationCode = codeMatch[0];
                      console.log('Verification Code:', verificationCode);
                    } else {
                      console.log('Verification Code not found');
                    }
                    // Your code to extract and process the email content here
                    // Extract and log the email body
                    //const emailBody = mail.html;
                    //console.log('Email Body:', emailBody);
                });
            });
        });
        email.once('error', function(err) {
            console.log('Fetch error: ' + err);
        });
        email.once('end', function() {
            console.log('Done fetching all messages!');
            imap.end();
        });
    });
             
});

imap.once('error', function(err) {
    console.log(err);
});
  
imap.once('end', function() {
    console.log('Connection ended');
});
  
imap.connect();
