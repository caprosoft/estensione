//Mostra i risultati dell'analisi che avviene su content.js e si avvia all'avvio di index.html
// Manipola il DOM del popup, riceve dati, mostra risultati.

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('saveBtn');
  if (!button) {
    console.error('Pulsante non trovato');
    return;
  }

  button.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const html = document.documentElement.outerHTML;
        const title = document.title || "pagina_senza_titolo";

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        const filename = title.replace(/[\\/:*?"<>|]/g, "_").substring(0, 100) + ".html";

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
      }
    });
  });
});
