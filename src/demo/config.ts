// ----------------------------------------------------------------------
// DEMO MODE — activé par NEXT_PUBLIC_DEMO=1.
// Aucune requête n'est envoyée à Supabase ni au backend. Les données sont
// fictives (src/demo/fixtures.ts) et les modifications vivent dans le
// navigateur du visiteur (localStorage).
// ----------------------------------------------------------------------

export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO === '1';

// Clé localStorage de la base démo (incrémenter la version pour forcer un re-seed).
export const DEMO_STORAGE_KEY = 'mpw-demo-db-v1';

// Identifiants admin de démonstration (authentification simulée).
export const DEMO_ADMIN = {
  email: 'admin@demo.michelprowood.com',
  password: 'demo1234',
  name: 'Admin Démo',
};

// Numéro de téléphone de démonstration pour « Mon Espace ».
export const DEMO_PHONE_DISPLAY = '690 00 00 00';
export const DEMO_PHONE = '690000000';

// Pré-remplissage du formulaire de commande (client fictif).
export const DEMO_CHECKOUT_PREFILL = {
  firstName: 'Aline',
  lastName: 'Tchoumi',
  emailAddress: 'aline.tchoumi@exemple.cm',
  phoneNumber: DEMO_PHONE,
  streetAddress: 'Quartier Tamdja, rue de la Pharmacie',
  city: 'Bafoussam',
  country: 'Cameroon',
  zipCode: 'BP 1024',
};
