let currentStep = 0;
const steps = document.querySelectorAll('.step');
const indicators = document.querySelectorAll('.progress-step');

const wizardData = {
  tiqueteras: [{ id: 1, nombre: "Tiquetera Julio" }],
  asignaciones: [],
  empleados: ["E001", "E002", "E003", "E004", "E005", "E006","E007", "E008", "E009", "E001", "E010", "E011", "E012", "E013", "E014","E015"],
  detallesGenerados: []
};

function updateWizard() {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === currentStep);
    indicators[i].classList.toggle('active', i <= currentStep);
  });
  if (currentStep === 1) cargarCombosTipoTickets();
  if (currentStep === 2) simularEmpleados();
  if (currentStep === 3) simularDetalleTickets();
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    updateWizard();
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    updateWizard();
  }
}

function cargarCombosTipoTickets() {
  const tipos = JSON.parse(localStorage.getItem("tiposTickets")) || [];
  const asignados = wizardData.asignaciones.map(a => a.codigo);
  const disponibles = tipos.filter(t => !asignados.includes(t.codigo));

  const comboTipos = document.getElementById("comboTipos");
  comboTipos.innerHTML = "";
  disponibles.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.codigo;
    opt.textContent = `${t.codigo} - ${t.descripcion}`;
    comboTipos.appendChild(opt);
  });
}

function asignarTipoATiquetera() {
  const tipo = document.getElementById("comboTipos").value;
  if (!tipo) return;
  const tipos = JSON.parse(localStorage.getItem("tiposTickets")) || [];
  const detalle = tipos.find(t => t.codigo === tipo);
  wizardData.asignaciones.push(detalle);
  cargarCombosTipoTickets();
  mostrarAsignaciones();
}

function mostrarAsignaciones() {
  const lista = document.getElementById("listaAsignaciones");
  lista.innerHTML = "";
  wizardData.asignaciones.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${t.codigo} - ${t.descripcion}`;
    lista.appendChild(li);
  });
}

function simularEmpleados() {
  const div = document.getElementById("empleadosGenerados");
  div.innerHTML = wizardData.empleados.map(e => `<div>🎫 Tiquetera generada para: <strong>${e}</strong></div>`).join("");
}

function simularDetalleTickets() {
  const div = document.getElementById("detalleGenerado");
  wizardData.detallesGenerados = wizardData.empleados.map(e => ({ empleado: e, tickets: wizardData.asignaciones }));
  div.innerHTML = wizardData.detallesGenerados.map(d => `<div>📄 Detalle generado para: <strong>${d.empleado}</strong></div>`).join("");
}

function finalizarProceso() {
  if (!wizardData.tiqueteras.length || !wizardData.asignaciones.length || !wizardData.detallesGenerados.length) {
    alert("Faltan datos por generar antes de finalizar.");
    return;
  }
  alert("🎉 Todo fue generado correctamente.");
}

updateWizard();