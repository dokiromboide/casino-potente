window.addEventListener('load', async () => {
  
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      // Pide acceso a las cuentas de MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error('El usuario rechazó la conexión a MetaMask');
      return;
    }
  } else {
    console.log('Por favor instala MetaMask para usar esta función');
    return;
  }

  // Reemplaza con la dirección de tu contrato desplegado
  const contractAddress = "TU_DIRECCION_DE_CONTRATO_AQUI";

  // Reemplaza con la ABI de tu contrato (cópiala desde Remix)
  const contractABI = [ 
    // Copia aquí la ABI completa
  ];

  // Conectar con el contrato
  const casinoContract = new web3.eth.Contract(contractABI, contractAddress);

  // Ejemplo: Mostrar en consola la cantidad de fichas emitidas (chipCounter)
  casinoContract.methods.chipCounter().call()
    .then(counter => {
      console.log("Fichas emitidas: " + counter);
    })
    .catch(err => console.error(err));

  // Ejemplo: Función para emitir una ficha (llamada desde un botón)
  document.getElementById('emitChipBtn').addEventListener('click', async () => {
    const accounts = await web3.eth.getAccounts();
    const operator = accounts[0]; // La cuenta conectada (operador)
    const recipient = document.getElementById('recipientAddress').value;
    const detalles = document.getElementById('ipDetails').value;

    casinoContract.methods.issueChip(recipient, detalles)
      .send({ from: operator })
      .then(receipt => {
        console.log('Ficha emitida:', receipt);
      })
      .catch(error => {
        console.error('Error al emitir ficha:', error);
      });
  });

  
});

