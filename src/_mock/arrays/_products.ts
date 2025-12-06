//
import _mock from '../_mock';

// ----------------------------------------------------------------------

const PRODUCT_IMAGES = [
  '/assets/images/michel-pro-wood/vente/armoir.jpg',
  '/assets/images/michel-pro-wood/vente/chaise prmium en bois.JPG',
  '/assets/images/michel-pro-wood/vente/lit .JPG',
  '/assets/images/michel-pro-wood/vente/portail bois premium.jpg',
  '/assets/images/michel-pro-wood/vente/portail bois premium.JPG',
  '/assets/images/michel-pro-wood/vente/portail prmium.JPG',
  '/assets/images/michel-pro-wood/vente/table chaisse sale a manger.JPG',
  '/assets/images/michel-pro-wood/vente/table salon.JPG',
  '/assets/images/michel-pro-wood/vente/terase bois premium.jpg',
];

const REALIZATION_IMAGES = [
  '/assets/images/michel-pro-wood/realisation/armoir .JPG',
  '/assets/images/michel-pro-wood/realisation/canape salon prmium.JPG',
  '/assets/images/michel-pro-wood/realisation/canape salon.JPG',
  '/assets/images/michel-pro-wood/realisation/chaise salon.JPG',
  '/assets/images/michel-pro-wood/realisation/lit .JPG',
  '/assets/images/michel-pro-wood/realisation/table chaisse sale a manger.JPG',
  '/assets/images/michel-pro-wood/realisation/table salon.JPG',
];

const ALL_IMAGES = [...PRODUCT_IMAGES, ...REALIZATION_IMAGES];

const NAME = [
  'Armoire Design',
  'Chaise Premium Bois',
  'Lit Double Confort',
  'Portail Bois Massif',
  'Portail Premium',
  'Ensemble Salle à Manger',
  'Table de Salon Moderne',
  'Terrasse Bois Exotique',
  'Canapé Salon Premium',
  'Canapé Salon',
  'Chaise Salon',
  'Lit Suite Parentale',
  'Table à Manger Familiale',
  'Table Basse Design',
  'Bureau Professionnel',
  'Bibliothèque Murale',
  'Dressing Sur Mesure',
  'Cuisine Équipée',
  'Parquet Chêne',
  'Escalier Suspendu',
  'Pergola Bioclimatique',
  'Bardage Façade',
  'Porte Entrée Bois',
  'Fenêtre Bois',
];

const CATEGORIES = [
  'Mobilier',
  'Agencement',
  'Menuiserie Extérieure',
  'Menuiserie Intérieure',
  'Cuisine',
  'Salle de Bain',
  'Parquet',
  'Terrasse',
  'Escalier',
  'Rangement',
  'Décoration',
  'Jardin',
  'Bureau',
  'Chambre',
  'Salon',
  'Salle à Manger',
  'Entrée',
  'Extérieur',
  'Professionnel',
  'Sur Mesure',
  'Design',
  'Traditionnel',
  'Contemporain',
  'Rustique',
];

const DESCRIPTION = `
<p>Découvrez l'excellence du travail du bois avec nos créations uniques. Chaque pièce est conçue avec passion et expertise pour sublimer votre intérieur et extérieur.</p>

<ul>
  <li> Bois de qualité supérieure, sélectionné avec soin. </li>
  <li> Finitions artisanales irréprochables. </li>
  <li> Design sur mesure adapté à vos besoins. </li>
  <li> Durabilité et résistance garanties. </li>
  <li> Respect de l'environnement et gestion durable des forêts. </li>
</ul>

<p>Chez Wood Pro, nous transformons le bois en œuvres d'art fonctionnelles. Que ce soit pour votre mobilier, votre agencement intérieur ou vos aménagements extérieurs, nous mettons notre savoir-faire à votre service pour réaliser vos rêves.</p>
`;

// ----------------------------------------------------------------------

export const _productsTable = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  orderId: `#011120${index + 1}`,
  item: NAME[index],
  deliveryDate: _mock.time(index),
  price: _mock.number.price(index),
  status: ['Completed', 'To Process', 'Cancelled', 'Return'][index] || 'Completed',
}));

// ----------------------------------------------------------------------

export const _productsCarousel = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  title: NAME[index],
  caption: 'Qualité et Design Exceptionnels',
  coverImg: ALL_IMAGES[index % ALL_IMAGES.length],
  label: 'Offre Spéciale -20%',
}));

// ----------------------------------------------------------------------

export const _productsCompare = [
  'Chaise Premium Bois',
  'Chaise Salon',
  'Chaise Design',
].map((name, index) => ({
  id: _mock.id(index),
  name,
  price: _mock.number.price(index),
  rating: _mock.number.rating(index),
  coverImg: ALL_IMAGES[1],
  details: (index === 0 && [
    'Bois Massif',
    'Garantie 5 ans',
    'Finition Vernis',
    'Confort Optimal',
    'Livraison Incluse',
    '2023',
  ]) || ['Bois Massif', '', 'Finition Huilée', '', 'Livraison Incluse', '2023'],
}));

// ----------------------------------------------------------------------

export const _products = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  name: NAME[index],
  caption: 'Création Wood Pro',
  description: DESCRIPTION,
  coverImg: ALL_IMAGES[index % ALL_IMAGES.length],
  review: index * 2 + 40,
  category: CATEGORIES[index % CATEGORIES.length],
  sold: index * 2 + 40,
  inStock: 100,
  rating: _mock.number.rating(index),
  label: ['sale', 'new', 'sale', 'sale'][index] || '',
  price: _mock.number.price(index),
  priceSale:
    [
      _mock.number.price(1),
      _mock.number.price(2),
      _mock.number.price(3),
      _mock.number.price(4),
      _mock.number.price(5),
    ][index] || 0,
  images: [
    ALL_IMAGES[(index) % ALL_IMAGES.length],
    ALL_IMAGES[(index + 1) % ALL_IMAGES.length],
    ALL_IMAGES[(index + 2) % ALL_IMAGES.length],
    ALL_IMAGES[(index + 3) % ALL_IMAGES.length],
    ALL_IMAGES[(index + 4) % ALL_IMAGES.length],
    ALL_IMAGES[(index + 5) % ALL_IMAGES.length],
    ALL_IMAGES[(index + 6) % ALL_IMAGES.length],
    ALL_IMAGES[(index + 7) % ALL_IMAGES.length],
  ],
}));

