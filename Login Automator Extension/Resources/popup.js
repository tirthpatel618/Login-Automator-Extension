browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
});

function replace_code(){
    console.log("button clicked")
    document.getElementById('popup_text').innerHTML = "GENERATED CODE";
    //js function to replace text
    console.log("replaced text")
}

