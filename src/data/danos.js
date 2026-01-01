// Random "daños" generator - each action has compatible objects
const DANOS = [
  { verbo: 'quebró', objetos: ['la porcelana', 'el florero', 'el espejo', 'las gafas', 'los platos', 'la taza favorita', 'el jarrón antiguo'] },
  { verbo: 'perdió', objetos: ['el control remoto', 'las gafas', 'el celular', 'las llaves', 'los aretes', 'la cartera', 'las chanclas'] },
  { verbo: 'derramó', objetos: ['el café', 'la sopa', 'el jugo', 'el chocolate', 'el tinto', 'la aguapanela', 'el caldo'] },
  { verbo: 'desordenó', objetos: ['las fotos', 'la ropa', 'las cobijas', 'los cajones', 'el armario', 'la cocina', 'los papeles'] },
  { verbo: 'manchó', objetos: ['el mantel', 'el vestido', 'la cobija', 'las cortinas', 'el sofá', 'la alfombra', 'el tapete'] },
  { verbo: 'escondió', objetos: ['el control remoto', 'el celular', 'las llaves', 'las gafas', 'los dulces', 'el chocolate', 'la billetera'] },
  { verbo: 'rayó', objetos: ['la mesa', 'el espejo', 'la pared', 'el piso', 'el mueble', 'la puerta', 'el carro'] },
  { verbo: 'mojó', objetos: ['el mantel', 'el vestido', 'la cobija', 'la almohada', 'el sofá', 'los zapatos', 'el celular'] },
  { verbo: 'quemó', objetos: ['el arroz', 'el mantel', 'la olla', 'las arepas', 'los fríjoles', 'el sancocho', 'la sartén'] },
  { verbo: 'descompuso', objetos: ['la licuadora', 'el televisor', 'el celular', 'el control remoto', 'la lavadora', 'el computador', 'la nevera'] },
];

const LUGARES = [
  'la sala', 'la cocina', 'la alcoba', 'el comedor',
  'el baño', 'el patio', 'el balcón', 'la terraza'
];

// Generate a random "daño"
export const generarDano = () => {
  const dano = DANOS[Math.floor(Math.random() * DANOS.length)];
  const objeto = dano.objetos[Math.floor(Math.random() * dano.objetos.length)];
  const lugar = LUGARES[Math.floor(Math.random() * LUGARES.length)];
  return { verbo: dano.verbo, objeto, lugar };
};
