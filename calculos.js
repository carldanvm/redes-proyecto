// Price table (includes nationalization cost for USA)
const prices = {
  tabiqueCajetin: { ven: 87.15, usa: 85.15 },
  tabiqueSinCajetin: { ven: 60.00, usa: 58.50 },
  conduit2: { ven: 30.00, usa: 31.20 },
  gabinete: { ven: 8100.00, usa: 7800.00 },
  puertas: { ven: 150.00, usa: 161.005 },
  cajetinesExternos: { ven: 27.00, usa: 24.999 },
  bolsaRj45: { ven: 75.00, usa: 78.00 },
  cableCat5eCon: { ven: 4.69, usa: 4.875 },
  carreteCat5e: { ven: 33.03, usa: 31.811 },
  carreteTelefonico: { ven: 39.76, usa: 38.285 }, 
  cableTelefonicoCon: { ven: 2.19, usa: 2.275 },
  bolsaTelefonicos: { ven: 31.25, usa: 32.50 }
};

const contractorPrices = {
  conduit: [
    { price: 10, speed: 3 }, // Sub 1
    { price: 7, speed: 1.5 } // Sub 2
  ],
  tabique: [
    { price: 15, speed: 5 }, // Sub 3
    { price: 10, speed: 3 }  // Sub 4
  ],
  cableado: [
    { utp: 12, telef: 7, utpOfi: 3, telefOfi: 2, utpDia: 7, telefDia: 6, utpOfiDia: 100, telefOfiDia: 100 }, // Sub 5
    { utp: 8, telef: 10, utpOfi: 2, telefOfi: 3, utpDia: 5, telefDia: 8, utpOfiDia: 100, telefOfiDia: 100 }   // Sub 6
  ],
  drywall: [
    { metro: 16, puerta: 70, speed: 6 }, // Sub 7
    { metro: 25, puerta: 50, speed: 9 }  // Sub 8
  ]
};

function getNumber(id) {
  const val = parseFloat(document.getElementById(id).value);
  return isNaN(val) ? 0 : val;
}

function calculate() {
  // Materiales
  let totalVen = 0;
  let totalUsa = 0;
  totalVen += getNumber('tabique-ven-cajetin') * prices.tabiqueCajetin.ven;
  totalUsa += getNumber('tabique-usa-cajetin') * prices.tabiqueCajetin.usa;
  totalVen += getNumber('tabique-ven-sin-cajetin') * prices.tabiqueSinCajetin.ven;
  totalUsa += getNumber('tabique-usa-sin-cajetin') * prices.tabiqueSinCajetin.usa;
  totalVen += getNumber('metros-conduit-2-ven') * prices.conduit2.ven;
  totalUsa += getNumber('metros-conduit-2-usa') * prices.conduit2.usa;
  totalVen += getNumber('gabinete-ven') * prices.gabinete.ven;
  totalUsa += getNumber('gabinete-usa') * prices.gabinete.usa;
  totalVen += getNumber('puertas-ven') * prices.puertas.ven;
  totalUsa += getNumber('puertas-usa') * prices.puertas.usa;
  totalVen += getNumber('cajetines-externos-ven') * prices.cajetinesExternos.ven;
  totalUsa += getNumber('cajetines-externos-usa') * prices.cajetinesExternos.usa;
  totalVen += getNumber('rj45-ven') * prices.bolsaRj45.ven;
  totalUsa += getNumber('rj45-usa') * prices.bolsaRj45.usa;
  totalVen += getNumber('cat5e-conectores-ven') * prices.cableCat5eCon.ven;
  totalUsa += getNumber('cat5e-conectores-usa') * prices.cableCat5eCon.usa;
  totalVen += getNumber('carrete-cat5e-sin-ven') * (prices.carreteCat5e.ven);
  totalUsa += getNumber('carrete-cat5e-sin-usa') * (prices.carreteCat5e.usa);
  totalVen += getNumber('carrete-tele-ven') * (prices.carreteTelefonico.ven);
  totalUsa += getNumber('carrete-tele-usa') * (prices.carreteTelefonico.usa);
  totalVen += getNumber('cable-tele-conectores-ven') * prices.cableTelefonicoCon.ven;
  totalUsa += getNumber('cable-tele-conectores-usa') * prices.cableTelefonicoCon.usa;
  totalVen += getNumber('bolsa-conectores-tele-ven') * prices.bolsaTelefonicos.ven;
  totalUsa += getNumber('bolsa-conectores-tele-usa') * prices.bolsaTelefonicos.usa;

  // Contratistas
  let totalContratistas = 0;
  let diasConduit = 0, diasTabique = 0, diasCableado = 0, diasDrywall = 0;

  // Conduit
  const metrosConduit1 = getNumber('conduit-sub1-cantidad');
  const metrosConduit2 = getNumber('conduit-sub2-cantidad');
  totalContratistas += metrosConduit1 * contractorPrices.conduit[0].price;
  totalContratistas += metrosConduit2 * contractorPrices.conduit[1].price;
  if (metrosConduit1 > 0) diasConduit = Math.ceil(metrosConduit1 / contractorPrices.conduit[0].speed);
  if (metrosConduit2 > 0) diasConduit += Math.ceil(metrosConduit2 / contractorPrices.conduit[1].speed);

  // Tabique
  const unidadesTabique3 = getNumber('tabique-sub3-cantidad');
  const unidadesTabique4 = getNumber('tabique-sub4-cantidad');
  totalContratistas += unidadesTabique3 * contractorPrices.tabique[0].price;
  totalContratistas += unidadesTabique4 * contractorPrices.tabique[1].price;
  if (unidadesTabique3 > 0) diasTabique = Math.ceil(unidadesTabique3 / contractorPrices.tabique[0].speed);
  if (unidadesTabique4 > 0) diasTabique += Math.ceil(unidadesTabique4 / contractorPrices.tabique[1].speed);

  // Cableado
  const utpSub5 = getNumber('cableado-utp-sub5');
  const telefSub5 = getNumber('cableado-telef-sub5');
  const utpSub6 = getNumber('cableado-utp-sub6');
  const telefSub6 = getNumber('cableado-telef-sub6');
  const utpOfiSub5 = getNumber('cableado-utp-ofi-sub5');
  const telefOfiSub5 = getNumber('cableado-telef-ofi-sub5');
  const utpOfiSub6 = getNumber('cableado-utp-ofi-sub6');
  const telefOfiSub6 = getNumber('cableado-telef-ofi-sub6');
  // Precios
  totalContratistas += utpSub5 * contractorPrices.cableado[0].utp;
  totalContratistas += telefSub5 * contractorPrices.cableado[0].telef;
  totalContratistas += utpSub6 * contractorPrices.cableado[1].utp;
  totalContratistas += telefSub6 * contractorPrices.cableado[1].telef;
  totalContratistas += utpOfiSub5 * contractorPrices.cableado[0].utpOfi;
  totalContratistas += telefOfiSub5 * contractorPrices.cableado[0].telefOfi;
  totalContratistas += utpOfiSub6 * contractorPrices.cableado[1].utpOfi;
  totalContratistas += telefOfiSub6 * contractorPrices.cableado[1].telefOfi;
  // Días
  let diasCableado5 = 0, diasCableado6 = 0;
  if (utpSub5 > 0 || telefSub5 > 0) {
    diasCableado5 = Math.ceil(utpSub5 / contractorPrices.cableado[0].utpDia) + Math.ceil(telefSub5 / contractorPrices.cableado[0].telefDia);
  }
  if (utpSub6 > 0 || telefSub6 > 0) {
    diasCableado6 = Math.ceil(utpSub6 / contractorPrices.cableado[1].utpDia) + Math.ceil(telefSub6 / contractorPrices.cableado[1].telefDia);
  }
  let diasCableadoOfi5 = 0, diasCableadoOfi6 = 0;
  if (utpOfiSub5 > 0 || telefOfiSub5 > 0) {
    diasCableadoOfi5 = Math.ceil(utpOfiSub5 / contractorPrices.cableado[0].utpOfiDia) + Math.ceil(telefOfiSub5 / contractorPrices.cableado[0].telefOfiDia);
  }
  if (utpOfiSub6 > 0 || telefOfiSub6 > 0) {
    diasCableadoOfi6 = Math.ceil(utpOfiSub6 / contractorPrices.cableado[1].utpOfiDia) + Math.ceil(telefOfiSub6 / contractorPrices.cableado[1].telefOfiDia);
  }
  diasCableado = diasCableado5 + diasCableado6 + diasCableadoOfi5 + diasCableadoOfi6;

  // Drywall
  const metrosDry7 = getNumber('drywall-metros-sub7');
  const puertasDry7 = getNumber('drywall-puertas-sub7');
  const metrosDry8 = getNumber('drywall-metros-sub8');
  const puertasDry8 = getNumber('drywall-puertas-sub8');
  totalContratistas += metrosDry7 * contractorPrices.drywall[0].metro + puertasDry7 * contractorPrices.drywall[0].puerta;
  totalContratistas += metrosDry8 * contractorPrices.drywall[1].metro + puertasDry8 * contractorPrices.drywall[1].puerta;
  if (metrosDry7 > 0) diasDrywall = Math.ceil(metrosDry7 / contractorPrices.drywall[0].speed);
  if (metrosDry8 > 0) diasDrywall += Math.ceil(metrosDry8 / contractorPrices.drywall[1].speed);

  const total = totalVen + totalUsa + totalContratistas;

  // Mostrar resultado
  document.getElementById('resultado').innerHTML = `
    <h3>Total Materiales: $${(totalVen + totalUsa).toFixed(2)}</h3>
    <h3>Total Contratistas: $${totalContratistas.toFixed(2)}</h3>
    <h4 class="mt-4">Tiempos estimados de trabajo de los contratistas:</h4>
    <ul>
      <li>Conduit: ${diasConduit} día(s)</li>
      <li>Tabique: ${diasTabique} día(s)</li>
      <li>Cableado: ${diasCableado} día(s)</li>
      <li>Drywall: ${diasDrywall} día(s)</li>
    </ul>
    <h4 class="mt-4">Total:</h4>
    <ul>
      <li>Total de la zona (no incluye el margen de ganancia, esta en dolares y es una sola Zona): $${total.toFixed(2)}</li>
    </ul>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('calcular').addEventListener('click', calculate);
});