const mesasDisponibles = 5;  

function verificarDisponibilidad(mesasSolicitadas) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mesasSolicitadas <= mesasDisponibles) {
        resolve(`Si, hay ${mesasSolicitadas} mesa(s) disponibles.`);
      } else {
        reject("Lo siento, no hay suficientes mesas disponibles.");
      }
    }, 2000); 
  });
}


function enviarConfirmacionReserva(nombreCliente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) { 
        resolve(`Correo de confirmación enviado a ${nombreCliente}.`);
      } else {
        reject("Error en el envío del correo de confirmación.");
      }
    }, 1500);  
  });
}


async function hacerReserva(nombreCliente, mesasSolicitadas) {
  try {
    console.log("Verificando disponibilidad de mesas...");
    const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);
    console.log(disponibilidad);

    console.log("Enviando confirmación de reserva...");
    const confirmacion = await enviarConfirmacionReserva(nombreCliente);
    console.log(confirmacion);
    
  } catch (error) {
    console.log("Error:", error); 
  }
}


hacerReserva("Juan Pérez", 3);  
hacerReserva("María López", 6); 
hacerReserva("Carlos Gómez", 2); 
