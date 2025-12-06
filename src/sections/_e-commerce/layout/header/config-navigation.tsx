// _mock
import _mock from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import { MegaMenuItemProps } from 'src/components/mega-menu';

// MOCK DATA
// ----------------------------------------------------------------------

const PRODUCT_IMAGES = [
  '/assets/images/michel-pro-wood/vente/armoir.jpg',
  '/assets/images/michel-pro-wood/vente/chaise prmium en bois.JPG',
  '/assets/images/michel-pro-wood/vente/lit .JPG',
  '/assets/images/michel-pro-wood/vente/portail bois premium.jpg',
  '/assets/images/michel-pro-wood/vente/table chaisse sale a manger.JPG',
  '/assets/images/michel-pro-wood/vente/table salon.JPG',
];

const PRODUCT_NAMES = [
  'Armoire Design',
  'Chaise Premium',
  'Lit Double',
  'Portail Bois',
  'Salle à Manger',
  'Table Salon',
];

const PRODUCTS = [...Array(10)].map((_, index) => ({
  name: PRODUCT_NAMES[index % PRODUCT_NAMES.length],
  image: PRODUCT_IMAGES[index % PRODUCT_IMAGES.length],
  path: '#',
}));

const TAGS = [
  { name: 'Chaises', path: '#' },
  { name: 'Tables', path: '#' },
  { name: 'Lits', path: '#' },
  { name: 'Armoires', path: '#' },
  { name: 'Portes', path: '#' },
];

export const data: MegaMenuItemProps[] = [
  {
    path: '',
    title: 'Catégories',
    icon: <Iconify icon="carbon:menu" sx={{ width: 1, height: 1 }} />,
    products: PRODUCTS,
    tags: TAGS,
    children: [
      {
        subheader: 'Mobilier Intérieur',
        items: [
          { title: 'Salons', path: '#' },
          { title: 'Salles à manger', path: '#' },
          { title: 'Chambres', path: '#' },
          { title: 'Bureaux', path: '#' },
          { title: 'Rangements', path: '#' },
        ],
      },
      {
        subheader: 'Menuiserie & Agencement',
        items: [
          { title: 'Portes & Fenêtres', path: '#' },
          { title: 'Escaliers', path: '#' },
          { title: 'Parquets', path: '#' },
          { title: 'Cuisines', path: '#' },
          { title: 'Dressings', path: '#' },
        ],
      },
      {
        subheader: 'Extérieur',
        items: [
          { title: 'Terrasses', path: '#' },
          { title: 'Pergolas', path: '#' },
          { title: 'Bardages', path: '#' },
          { title: 'Portails', path: '#' },
          { title: 'Mobilier de Jardin', path: '#' },
        ],
      },
      {
        subheader: 'Collections',
        items: [
          { title: 'Prestige', path: '#' },
          { title: 'Contemporain', path: '#' },
          { title: 'Rustique', path: '#' },
          { title: 'Nouveautés', path: '#' },
          { title: 'Promotions', path: '#' },
        ],
      },
    ],
  },
  {
    path: '#',
    title: 'Suivi Colis',
    icon: <Iconify icon="carbon:delivery-parcel" sx={{ width: 1, height: 1 }} />,
  },
];
