//Può leggere il DOM, analizzare immagini, tabelle, etichette, landmark, ecc.
// Può inviare messaggi al background o al popup, ma non può direttamente aggiornare il popup

const htmlSource = document.documentElement.outerHTML;
const title = document.title || "pagina_senza_titolo";

chrome.runtime.sendMessage({
  action: "saveSource",
  data: htmlSource,
  title: title
});


