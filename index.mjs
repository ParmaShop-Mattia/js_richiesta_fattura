document.addEventListener("DOMContentLoaded", function () {
  // Selezioniamo il form del carrello
  const cartForm = document.querySelector("form[action='/cart']");

  if (cartForm) {
    // Creiamo il campo "Desideri la fattura?"
    const invoiceFieldset = document.createElement("fieldset");
    invoiceFieldset.innerHTML = `
        <legend>Desideri la fattura?</legend>
        <label>
          <input type="radio" name="attributes[Desideri la fattura?]" value="No" checked>
          No
        </label>
        <label>
          <input type="radio" name="attributes[Desideri la fattura?]" value="Si">
          Sì
        </label>
        <div id="invoice-fields" style="display:none; margin-top: 10px;">
          <label>
            Ragione Sociale: <input type="text" name="attributes[Ragione Sociale]" required>
          </label>
          <label>
            Partita IVA: <input type="text" name="attributes[Partita IVA]" required>
          </label>
          <label id="sdi-code-label" style="display:none;">
            Codice SDI / PEC: <input type="text" name="attributes[Codice SDI / PEC]">
          </label>
        </div>
      `;

    // Aggiungiamo il campo al form
    cartForm.appendChild(invoiceFieldset);

    // Gestiamo la logica di mostrare/nascondere i campi
    cartForm.addEventListener("change", function (event) {
      if (event.target.name === "attributes[Desideri la fattura?]") {
        const showFields = event.target.value === "Si";
        document.getElementById("invoice-fields").style.display = showFields
          ? "block"
          : "none";

        // Mostrare Codice SDI / PEC solo per clienti italiani
        const country = document.documentElement.lang; // Usa il valore del tag <html lang="...">
        document.getElementById("sdi-code-label").style.display =
          showFields && country === "it" ? "block" : "none";
      }
    });
  }
});
