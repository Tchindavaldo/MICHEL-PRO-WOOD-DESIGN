import _mock from '../_mock';

// ----------------------------------------------------------------------

const users = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  avatarUrl: _mock.image.avatar(index),
}));

export const _reviews = [
  {
    id: _mock.id(0),
    name: users[0].name,
    avatarUrl: users[0].avatarUrl,
    message: 'Excellente qualité de bois ! J\'ai commandé une armoire en chêne massif et je suis impressionné par le travail artisanal. Les finitions sont impeccables et le design correspond parfaitement à mes attentes. Livraison rapide et professionnelle.',
    postedAt: _mock.time(1),
    users: [users[0], users[1], users[2]],
    rating: 5,
    helpful: 32,
    replyComment: [
      {
        id: _mock.id(1),
        userId: users[1].id,
        message: 'Merci pour votre retour ! Nous sommes ravis que notre armoire vous plaise.',
        postedAt: _mock.time(2),
      },
    ],
  },
  {
    id: _mock.id(4),
    name: users[4].name,
    avatarUrl: users[4].avatarUrl,
    message: 'Très satisfait de ma table à manger. Le bois est de qualité premium et la finition vernie est magnifique. L\'équipe Wood Pro a été très professionnelle du début à la fin. Je recommande vivement !',
    postedAt: _mock.time(5),
    users: [users[5], users[6], users[7]],
    rating: 5,
    helpful: 18,
    replyComment: [],
  },
  {
    id: _mock.id(7),
    name: users[8].name,
    avatarUrl: users[8].avatarUrl,
    message: 'Beau travail sur mon ensemble de salon. Le design est élégant et le bois de qualité. Petit bémol sur le délai de livraison qui a été légèrement plus long que prévu, mais le résultat en vaut la peine.',
    postedAt: _mock.time(9),
    rating: 4,
    helpful: 10,
    users: [],
    replyComment: [],
  },
  {
    id: _mock.id(8),
    name: users[9].name,
    avatarUrl: users[9].avatarUrl,
    message: 'Je suis absolument ravie de mes chaises en bois premium ! Elles sont confortables, robustes et apportent une touche d\'élégance à ma salle à manger. Le service client est également excellent.',
    postedAt: _mock.time(10),
    rating: 5,
    helpful: 25,
    users: [],
    replyComment: [],
  },
  {
    id: _mock.id(9),
    name: users[10].name,
    avatarUrl: users[10].avatarUrl,
    message: 'Produit de qualité exceptionnelle. Le lit en bois massif que j\'ai acheté est magnifique et très solide. L\'essence de noyer choisie donne un rendu vraiment haut de gamme. Merci Wood Pro !',
    postedAt: _mock.time(11),
    rating: 5,
    helpful: 15,
    users: [],
    replyComment: [],
  },
  {
    id: _mock.id(10),
    name: users[11].name,
    avatarUrl: users[11].avatarUrl,
    message: 'Bon rapport qualité-prix pour mon portail en bois. Installation facile et le bois résiste bien aux intempéries. Je suis content de mon achat.',
    postedAt: _mock.time(12),
    rating: 4.5,
    helpful: 8,
    users: [],
    replyComment: [],
  },
];
