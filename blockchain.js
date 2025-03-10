window.addEventListener("load", async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await ethereum.request({ method: "eth_requestAccounts" });

    const contractAddress = "TU_DIRECCION_DEL_CONTRATO"; // reemplaza
    const contractABI = TU_ABI_COMPLETA_AQUÍ; // pega aquí la ABI

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const accounts = await web3.eth.getAccounts();
    const currentAccount = accounts[0];

    // Emitir Ficha
    document.getElementById("emitChipBtn").onclick = async () => {
      const recipient = document.getElementById("recipientAddress").value;
      const details = document.getElementById("ipDetails").value;

      try {
        await contract.methods
          .issueChip(recipient, details)
          .send({ from: currentAccount });
        alert("Ficha emitida con éxito");
      } catch (err) {
        console.error(err);
        alert("Error al emitir ficha");
      }
    };

    // Usar Ficha
    document.getElementById("useChipBtn").onclick = async () => {
      const chipId = document.getElementById("chipId").value;
      try {
        await contract.methods.useChip(chipId).send({ from: currentAccount });
        alert("Ficha usada correctamente");
      } catch (err) {
        console.error(err);
        alert("Error al usar ficha");
      }
    };
  } else {
    alert("Por favor instala MetaMask");
  }
});
