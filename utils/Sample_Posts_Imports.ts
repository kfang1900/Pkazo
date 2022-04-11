import { Artist, User } from '../obj/Artist';
import { Post } from '../obj/Post';
export const sample_artist: Artist = {
  name: 'James Jean',
  pfp: '/store_assets/img/user.png',
  cover: '/store_assets/img/profile-cover-banner.jpg',
  location: 'Los Angeles, CA',
  discipline: 'Painter',
  bio: 'In his large-scale paintings, James Jean depicts detailed cosmological worlds filled with allegorical and contemporary imagery. He incorporates elements of traditional Chinese and Japanese scroll paintings, Japanese woodblock prints, Renaissance portraiture, comic books, and anime into these complex compositions. As he experiments with such different styles and art historical genres, Jean diminishes the boundary between new and old, and between Eastern and Western artmaking.',
  posts: [],
  followers: [],
  following: [],
  education: [
    {
      school: 'Rhode Island School of Design',
      field: 'Graphic Design',
      start: 2007,
      end: 2011,
    },
  ],
  experience: [
    {
      company: 'Google',
      role: 'Software Engineer',
      start: 2007,
      end: 2011,
    },
  ],
  exhibitions: [
    { place: 'The Metropolitan Museum of Art', start: 2021, end: 2021 },
    { place: "My Mommy's House", start: 2020, end: 2020 },
    { place: 'The Museum of Modern Art', start: 2020, end: 2020 },
  ],
};
export const sample_users: { [key: string]: User | Artist } = {
  will: {
    name: 'William Sanger',
    pfp: '/assets/images/users/william_sanger.png',
  },
  tyler: { name: 'Tyler Wu', pfp: '/assets/images/users/tyler_wu.png' },
  jake: { name: 'Jake Hill', pfp: '/assets/images/users/jake_hill.png' },
  amanda: {
    name: 'Amanda Evans',
    pfp: '/assets/images/users/amanda_evans.png',
  },
  prashant: {
    name: 'Prashant Singh',
    pfp: '/assets/images/users/prashant_singh.png',
  },
};
export const sample_posts: Post[] = [
  {
    user: sample_artist,
    imgs: ['/post_assets/social.png'],
    comments: [
      {
        user: sample_users['will'],
        time: 1649652729000,
        comment: 'What a cute dog!',
      },
      {
        user: sample_users['tyler'],
        time: 1649648898000,
        comment: 'Precious. Wonderful photo and what a great name.',
      },
      {
        user: sample_users['jake'],
        time: 1649652729000,
        comment: 'Miso is my cats name too! 😸',
      },
      {
        user: sample_users['amanda'],
        time: 1649648898000,
        comment: 'So cute. He is the color of miso soup😍',
      },
      {
        user: sample_users['prashant'],
        time: 1649635209000,
        comment: 'So precious, paw prints on my heart!',
      },
    ],
    title: 'My dog Miso chilling',
    desc: "He's cute",
    info: { type: 'social', tags: ['surrealism', 'pastel', 'doggo'] },
  },
  {
    user: sample_artist,
    imgs: [
      '/assets/images/wip/img1.png',
      '/assets/images/wip/img2.png',
      '/assets/images/wip/img3.png',
      '/assets/images/wip/img4.png',
      '/assets/images/wip/img5.png',
      '/assets/images/wip/img6.png',
      '/assets/images/wip/img7.png',
      '/assets/images/wip/img8.png',
      '/assets/images/wip/img9.png',
    ],
    comments: [
      {
        user: sample_users['jake'],
        time: 1649652729000,
        comment: 'Super cool. Kinda creepy. I love it.',
      },
      {
        user: sample_users['amanda'],
        time: 1649648898000,
        comment: 'This is amazing! The red really adds to the painting.',
      },
      {
        user: sample_users['prashant'],
        time: 1649635209000,
        comment: 'Ugh! 😧 Your talent is out of our orbit. Seriously!',
      },
    ],
    title: 'Acrylic is Hard!',
    desc: 'This painting is finally coming together after I’ve been putting it off for quite a while. Acrylic is a tough medium that requires a lot of over-painting, something I’m not accustomed to as an oil painter.',
    info: {
      type: 'wip',
      workTitle: 'Jammer',
      media: 'Acrylic on Canvas',
      releaseDate: 'May',
      tags: ['surrealism', 'pastel', 'doggo'],
    },
  },
  {
    user: sample_artist,
    imgs: ['/assets/images/jammer.jpg'],
    comments: [
      {
        user: sample_users['jake'],
        time: 1649652729000,
        comment: 'Super cool. Kinda creepy. I love it.',
      },
      {
        user: sample_users['amanda'],
        time: 1649648898000,
        comment: 'This is amazing! The red really adds to the painting.',
      },
      {
        user: sample_users['prashant'],
        time: 1649635209000,
        comment: 'Ugh! 😧 Your talent is out of our orbit. Seriously!',
      },
    ],
    title: 'Jammer',
    desc: 'The girl emerges from the vessel of the mind, entwined in her own noodle-like hair. A forest of mushrooms casts a blanket of prismatic gradients.',
    info: {
      type: 'complete',
      media: 'Acrylic on Canvas',
      price: 1820,
    },
  },
];
