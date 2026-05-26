export function numberToWords(num: number): string {
  const units = ['', 'UN', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'];
  const tens = ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISEIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE'];
  const tens2 = ['', '', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
  const hundreds = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];

  function convert(n: number): string {
    if (n === 0) return 'CERO';
    if (n === 100) return 'CIEN';
    
    let words = '';

    if (n >= 1000000) {
      const millions = Math.floor(n / 1000000);
      words += millions === 1 ? 'UN MILLON ' : convert(millions) + ' MILLONES ';
      n %= 1000000;
    }

    if (n >= 1000) {
      const thousands = Math.floor(n / 1000);
      if (thousands === 1) {
        words += 'MIL ';
      } else {
        words += convert(thousands) + ' MIL ';
      }
      n %= 1000;
    }

    if (n >= 100) {
      words += hundreds[Math.floor(n / 100)] + ' ';
      n %= 100;
    }

    if (n >= 20) {
      const t = Math.floor(n / 10);
      const u = n % 10;
      if (u > 0) {
        words += tens2[t] + ' Y ' + units[u];
      } else {
        words += tens2[t];
      }
    } else if (n >= 10) {
      words += tens[n - 10];
    } else if (n > 0) {
      words += units[n];
    }

    return words.trim();
  }

  return convert(Math.floor(num));
}
