import {useState, useEffect, useCallback} from "react";

import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

export default function FancySignature({ name }) {
  const [hash, setHash] = useState('');

  const generateHash = useCallback((name_signature) => {
    const date = new Date().toISOString();
    const systemId = window.navigator.userAgent;
    const rawString = `${name_signature}-${date}-${systemId}`;

    let new_hash = 0;
    // eslint-disable-next-line
    for (let i = 0; i < rawString.length; i++) {
      const char = rawString.charCodeAt(i);
      // eslint-disable-next-line no-bitwise
      new_hash = (new_hash << 5) - new_hash + char;
      // eslint-disable-next-line no-bitwise
      new_hash |= 0; // Convertir a un entero de 32 bits
    }

    let hexHash = Math.abs(new_hash).toString(16);

    if (hexHash.length < 16) {
      hexHash = hexHash.padStart(16, '0');
    } else if (hexHash.length > 16) {
      hexHash = hexHash.substring(0, 16);
    }

    return hexHash;
  }, []);

  useEffect(() => {
    setHash(generateHash(name));
  }, [name, generateHash]);

  return (
    <div className="signature-container">
      <Typography variant="h6" className="signature-name" sx={{ fontFamily: 'Great Vibes, cursive;' }}>{name}</Typography>
      <Typography variant="h6" className="signature-hash" sx={{ fontFamily: 'Courier New, Courier, monospace' }}>Signature ID: {hash}</Typography>

    </div>
  );
}

FancySignature.propTypes = {
  name: PropTypes.string,
};
