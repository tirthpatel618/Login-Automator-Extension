console.log("Code: ", browser);
console.log('popupppp');
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
    console.log(request.code);
    document.getElementById('popup_message').innerHTML = request.code;
});

