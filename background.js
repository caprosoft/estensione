// In Manivest V3 si attiva solo su richiesta 
//Coordina la comunicazione tra script.js e popup + può usare APIs
// fa da ponte tra script e content

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Provaaa:", message);
  if (message.action === 'saveHtml') {
    const { html, title } = message;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const filename = titolo(title) + '.html';

    chrome.downloads.download({
      url,
      filename,
      saveAs: true
    });
  }
});

function titolo(name) {
  return name.replace(/[\\/:*?"<>|]/g, "_").substring(0, 100);
}
