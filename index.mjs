console.log("Lo script è stato caricato ed eseguito");
document.addEventListener("DOMContentLoaded", function () {
  // Attendi che il contenitore del carrello sia presente nel DOM
  const checkCartReady = setInterval(() => {
    const cartForm = document.querySelector(
      "form[action='/cart'], .cart-items"
    );
    if (cartForm) {
      clearInterval(checkCartReady);

      // Aggiungi i tuoi campi personalizzati
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
      cartForm.appendChild(invoiceFieldset);

      // Gestisci la visibilità dei campi dinamicamente
      cartForm.addEventListener("change", function (event) {
        if (event.target.name === "attributes[Desideri la fattura?]") {
          const showFields = event.target.value === "Si";
          document.getElementById("invoice-fields").style.display = showFields
            ? "block"
            : "none";

          // Mostra il campo SDI solo per clienti italiani
          const country = document.documentElement.lang;
          document.getElementById("sdi-code-label").style.display =
            showFields && country === "it" ? "block" : "none";
        }
      });
    }
  }, 500);
});
