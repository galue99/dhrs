import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

export default function FancySignature({ name }) {
  const [hash, setHash] = useState('');

  useEffect(() => {
    setHash(generateHash(name));
  }, [name]);

  const generateHash = (name) => {
    const date = new Date().toISOString();
    const systemId = window.navigator.userAgent;
    const rawString = `${name}-${date}-${systemId}`;

    // Función hash simplificada
    let hash = 0;
    for (let i = 0; i < rawString.length; i++) {
      const char = rawString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convertir a un entero de 32 bits
    }

    // Convertir el hash a hexadecimal
    let hexHash = Math.abs(hash).toString(16);

    // Ajustar la longitud a 16 caracteres (rellenar o truncar)
    if (hexHash.length < 16) {
      hexHash = hexHash.padStart(16, '0'); // Rellenar con ceros si es más corto
    } else if (hexHash.length > 16) {
      hexHash = hexHash.substring(0, 16); // Truncar si es más largo
    }

    return hexHash;
  }

  return (
    <div className="signature-container">
      <Typography variant="h6" className="">{name}</Typography>
      <Typography variant="h6" className="">Signature ID: {hash}</Typography>

      <p className="signature-name">{name}</p>
      <p className="signature-hash">Signature ID: {hash}</p>
    </div>
  );
}
