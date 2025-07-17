 const form = document.getElementById("formTipoTicket");
    const lista = document.getElementById("listaTipos");

    const tiposTickets = JSON.parse(localStorage.getItem("tiposTickets")) || [];

    function renderLista() {
      lista.innerHTML = "";
      tiposTickets.forEach((tipo, index) => {
        const li = document.createElement("li");
        li.textContent = `${tipo.codigo} - ${tipo.descripcion} ($${tipo.valor})`;
        lista.appendChild(li);
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const codigo = document.getElementById("codigoTipo").value.trim();
      const descripcion = document.getElementById("descripcionTipo").value.trim();
      const valor = parseFloat(document.getElementById("valorTipo").value);

      if (!codigo || !descripcion || isNaN(valor)) return;

      tiposTickets.push({ codigo, descripcion, valor });
      localStorage.setItem("tiposTickets", JSON.stringify(tiposTickets));
      renderLista();
      form.reset();
    });

    renderLista();