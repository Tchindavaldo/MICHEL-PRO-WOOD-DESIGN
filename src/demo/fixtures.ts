// ----------------------------------------------------------------------
// DEMO fixtures — fictitious data only (names, phones, amounts are invented).
// Amounts in FCFA. Used only when NEXT_PUBLIC_DEMO=1.
// ----------------------------------------------------------------------

import { DEMO_PHONE } from './config';

const IMG = '/assets/images/michel-pro-wood/vente';

export type DemoProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  image: string;
  active: boolean;
};

export type DemoOrderItem = { name: string; quantity: number; price: number };

export type DemoOrder = {
  id: string;
  ref: string;
  customer_name: string;
  customer_phone: string;
  city: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  delivery_status: string | null;
  payment_method: string;
  shipping_method: string;
  items: DemoOrderItem[];
  created_at: string;
};

export type DemoQuote = {
  id: string;
  ref: string;
  customer: string;
  phone: string;
  city: string;
  project: string;
  budget: number;
  status: 'nouveau' | 'envoyé' | 'accepté' | 'refusé';
  created_at: string;
};

export type DemoCustomer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  orders: number;
  spent: number;
  since: string;
};

export type DemoProject = {
  id: string;
  title: string;
  client: string;
  city: string;
  category: string;
  progress: number;
  amount: number;
  deadline: string;
  status: 'en cours' | 'livré' | 'en attente';
};

export type DemoTranche = { id: string; montant: number; date_echeance: string; statut: string; note: string | null };

export type DemoInscription = {
  id: string;
  type: 'stage' | 'formation';
  nom: string;
  phone: string;
  filiere: string;
  statut: string;
  created_at: string;
  tranches: DemoTranche[];
};

export type DemoDB = {
  products: DemoProduct[];
  orders: DemoOrder[];
  quotes: DemoQuote[];
  customers: DemoCustomer[];
  projects: DemoProject[];
  inscriptions: DemoInscription[];
};

// Dates relative to "now" so the demo always looks current.
const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString();
const inDays = (n: number) => new Date(Date.now() + n * 86400000).toISOString();

export const DEMO_MONTHLY_REVENUE = [
  { month: 'Mai', value: 3850000 },
  { month: 'Juin', value: 4320000 },
  { month: 'Juil.', value: 3980000 },
  { month: 'Août', value: 5140000 },
  { month: 'Sept.', value: 6210000 },
  { month: 'Oct.', value: 5470000 },
];

export function createSeed(): DemoDB {
  return {
    products: [
      { id: 'p1', name: 'Salon complet en iroko (7 places)', category: 'Salon', price: 1250000, stock: 3, sold: 14, image: `${IMG}/table salon.JPG`, active: true },
      { id: 'p2', name: 'Table à manger 6 chaises en moabi', category: 'Salle à manger', price: 890000, stock: 5, sold: 22, image: `${IMG}/table chaisse sale a manger.JPG`, active: true },
      { id: 'p3', name: 'Lit 2 places en sapelli + chevets', category: 'Chambre', price: 480000, stock: 8, sold: 31, image: `${IMG}/lit .JPG`, active: true },
      { id: 'p4', name: 'Armoire 3 battants avec miroir', category: 'Chambre', price: 560000, stock: 4, sold: 17, image: `${IMG}/armoir.jpg`, active: true },
      { id: 'p5', name: 'Chaise premium sculptée (lot de 2)', category: 'Salle à manger', price: 145000, stock: 20, sold: 46, image: `${IMG}/chaise prmium en bois.JPG`, active: true },
      { id: 'p6', name: 'Portail battant en bois massif', category: 'Extérieur', price: 1650000, stock: 2, sold: 6, image: `${IMG}/portail bois premium.jpg`, active: true },
      { id: 'p7', name: 'Terrasse en lattes d\'azobé (m²)', category: 'Extérieur', price: 38000, stock: 120, sold: 210, image: `${IMG}/terase bois premium.jpg`, active: true },
      { id: 'p8', name: 'Portail coulissant premium', category: 'Extérieur', price: 1980000, stock: 0, sold: 3, image: `${IMG}/portail prmium.JPG`, active: false },
    ],
    orders: [
      { id: 'o1', ref: 'CMD-2610-0148', customer_name: 'Aline Tchoumi', customer_phone: DEMO_PHONE, city: 'Bafoussam', total_amount: 890000, status: 'processing', delivery_status: 'En fabrication', payment_method: 'Orange Money', shipping_method: 'Livraison atelier', items: [{ name: 'Table à manger 6 chaises en moabi', quantity: 1, price: 890000 }], created_at: daysAgo(2) },
      { id: 'o2', ref: 'CMD-2610-0147', customer_name: 'Jean-Paul Fotso', customer_phone: '677451203', city: 'Douala', total_amount: 1250000, status: 'shipped', delivery_status: 'En route vers Douala', payment_method: 'MTN Mobile Money', shipping_method: 'Transport inter-urbain', items: [{ name: 'Salon complet en iroko (7 places)', quantity: 1, price: 1250000 }], created_at: daysAgo(4) },
      { id: 'o3', ref: 'CMD-2610-0146', customer_name: 'Mireille Ngo Bassa', customer_phone: '699318842', city: 'Yaoundé', total_amount: 770000, status: 'delivered', delivery_status: 'Livrée', payment_method: 'Virement bancaire', shipping_method: 'Transport inter-urbain', items: [{ name: 'Lit 2 places en sapelli + chevets', quantity: 1, price: 480000 }, { name: 'Chaise premium sculptée (lot de 2)', quantity: 2, price: 145000 }], created_at: daysAgo(6) },
      { id: 'o4', ref: 'CMD-2610-0145', customer_name: 'Hôtel La Falaise Dschang', customer_phone: '655902117', city: 'Dschang', total_amount: 1520000, status: 'pending', delivery_status: null, payment_method: 'Espèces', shipping_method: 'Pose sur site', items: [{ name: 'Terrasse en lattes d\'azobé (m²)', quantity: 40, price: 38000 }], created_at: daysAgo(7) },
      { id: 'o5', ref: 'CMD-2609-0139', customer_name: 'Aline Tchoumi', customer_phone: DEMO_PHONE, city: 'Bafoussam', total_amount: 290000, status: 'delivered', delivery_status: 'Livrée', payment_method: 'Orange Money', shipping_method: 'Retrait atelier', items: [{ name: 'Chaise premium sculptée (lot de 2)', quantity: 2, price: 145000 }], created_at: daysAgo(23) },
      { id: 'o6', ref: 'CMD-2609-0136', customer_name: 'Samuel Kamga', customer_phone: '670224519', city: 'Bafoussam', total_amount: 560000, status: 'delivered', delivery_status: 'Livrée', payment_method: 'MTN Mobile Money', shipping_method: 'Livraison atelier', items: [{ name: 'Armoire 3 battants avec miroir', quantity: 1, price: 560000 }], created_at: daysAgo(27) },
      { id: 'o7', ref: 'CMD-2609-0131', customer_name: 'Brigitte Mbarga', customer_phone: '691774306', city: 'Bamenda', total_amount: 1650000, status: 'cancelled', delivery_status: null, payment_method: 'Virement bancaire', shipping_method: 'Pose sur site', items: [{ name: 'Portail battant en bois massif', quantity: 1, price: 1650000 }], created_at: daysAgo(34) },
    ],
    quotes: [
      { id: 'q1', ref: 'DEV-0412', customer: 'Clinique Saint-Luc Mbouda', phone: '677810455', city: 'Mbouda', project: 'Mobilier d\'accueil + 12 bureaux', budget: 4800000, status: 'nouveau', created_at: daysAgo(1) },
      { id: 'q2', ref: 'DEV-0411', customer: 'Eric Tagne', phone: '695127730', city: 'Bafoussam', project: 'Cuisine équipée en bois massif', budget: 2350000, status: 'envoyé', created_at: daysAgo(3) },
      { id: 'q3', ref: 'DEV-0409', customer: 'Collège Bilingue Les Bambous', phone: '650338214', city: 'Foumban', project: '60 tables-bancs scolaires', budget: 3600000, status: 'accepté', created_at: daysAgo(9) },
      { id: 'q4', ref: 'DEV-0406', customer: 'Nadège Ewane', phone: '698551062', city: 'Kribi', project: 'Dressing sur mesure 3 m', budget: 950000, status: 'refusé', created_at: daysAgo(16) },
    ],
    customers: [
      { id: 'c1', name: 'Aline Tchoumi', phone: '690 00 00 00', email: 'aline.tchoumi@exemple.cm', city: 'Bafoussam', orders: 2, spent: 1180000, since: daysAgo(120) },
      { id: 'c2', name: 'Jean-Paul Fotso', phone: '677 45 12 03', email: 'jp.fotso@exemple.cm', city: 'Douala', orders: 3, spent: 2390000, since: daysAgo(300) },
      { id: 'c3', name: 'Mireille Ngo Bassa', phone: '699 31 88 42', email: 'mireille.nb@exemple.cm', city: 'Yaoundé', orders: 1, spent: 770000, since: daysAgo(40) },
      { id: 'c4', name: 'Hôtel La Falaise Dschang', phone: '655 90 21 17', email: 'achats@lafalaise-exemple.cm', city: 'Dschang', orders: 4, spent: 6840000, since: daysAgo(410) },
      { id: 'c5', name: 'Samuel Kamga', phone: '670 22 45 19', email: 'samkamga@exemple.cm', city: 'Bafoussam', orders: 1, spent: 560000, since: daysAgo(60) },
      { id: 'c6', name: 'Brigitte Mbarga', phone: '691 77 43 06', email: 'b.mbarga@exemple.cm', city: 'Bamenda', orders: 2, spent: 935000, since: daysAgo(210) },
    ],
    projects: [
      { id: 'pr1', title: 'Aménagement réception Hôtel La Falaise', client: 'Hôtel La Falaise Dschang', city: 'Dschang', category: 'Hôtellerie', progress: 70, amount: 5200000, deadline: inDays(18), status: 'en cours' },
      { id: 'pr2', title: '60 tables-bancs scolaires', client: 'Collège Bilingue Les Bambous', city: 'Foumban', category: 'Scolaire', progress: 35, amount: 3600000, deadline: inDays(32), status: 'en cours' },
      { id: 'pr3', title: 'Plafond lambris villa Tamdja', client: 'Famille Nana', city: 'Bafoussam', category: 'Habitat', progress: 100, amount: 1850000, deadline: daysAgo(5), status: 'livré' },
      { id: 'pr4', title: 'Cuisine équipée en bois massif', client: 'Eric Tagne', city: 'Bafoussam', category: 'Habitat', progress: 0, amount: 2350000, deadline: inDays(45), status: 'en attente' },
    ],
    inscriptions: [
      {
        id: 'i1', type: 'formation', nom: 'Aline Tchoumi', phone: DEMO_PHONE, filiere: 'Menuiserie-ébénisterie (CQP, 12 mois)', statut: 'acceptée', created_at: daysAgo(75),
        tranches: [
          { id: 't1', montant: 75000, date_echeance: daysAgo(60), statut: 'payée', note: 'Frais d\'inscription' },
          { id: 't2', montant: 100000, date_echeance: daysAgo(10), statut: 'payée', note: '1re tranche' },
          { id: 't3', montant: 100000, date_echeance: inDays(20), statut: 'en attente', note: '2e tranche' },
          { id: 't4', montant: 100000, date_echeance: inDays(80), statut: 'en attente', note: '3e tranche' },
        ],
      },
      {
        id: 'i2', type: 'stage', nom: 'Kevin Tchoumi', phone: DEMO_PHONE, filiere: 'Stage vacances — initiation au tournage sur bois', statut: 'traitée', created_at: daysAgo(12),
        tranches: [{ id: 't5', montant: 35000, date_echeance: inDays(5), statut: 'en attente', note: 'Frais de stage' }],
      },
    ],
  };
}
