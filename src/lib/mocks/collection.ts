import { Collection } from '../types/collection';

export const collections: Collection[] = [
  {
    id: '1',
    name: 'First collection',
    media: [
      {
        id: 1,
        coverImage: {
          large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-CXtrrkMpJ8Zq.png',
        },
        title: {
          userPreferred: 'Cowboy Bebop',
        },
      },
      {
        id: 5,
        coverImage: {
          large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx5-NozHwXWdNLCz.jpg',
        },
        title: {
          userPreferred: 'Cowboy Bebop: Tengoku no Tobira',
        },

      },
      {
        id: 6,
        coverImage: {
          large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx6-Zzun7PHNNgPt.jpg',
        },
        title: {
          userPreferred: 'TRIGUN',
        },
      },
    ],
  },
  {
    id: '2',
    name: 'Second collection',
    media: [
      {
        id: 1,
        coverImage: {
          large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx7-6uh1fPvbgS9t.png',

        },

        title: {
          userPreferred: 'Witch Hunter ROBIN',

        },

      },
      {
        id: 8,
        coverImage: {
          large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b8-ReS3TwSgrDDi.jpg',

        },

        title: {
          userPreferred: 'Bouken Ou Beet',

        },

      },
      {
        id: 15,
        coverImage: {
          large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx15-A4F2t0TgWoi4.png',

        },

        title: {
          userPreferred: 'Eyeshield 21',

        },

      },
    ],
  },
];
