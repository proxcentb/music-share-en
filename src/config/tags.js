import { Emoji, Description } from './helpers';
import FeelsAmazingMan from '../assets/emojis/FeelsAmazingMan.png';
import FeelsHangMan from '../assets/emojis/FeelsHangMan.png';
import FeelsOkayMan from '../assets/emojis/FeelsOkayMan.png';
import SwoleDoge from '../assets/emojis/SwoleDoge.png';
import AYAYA from '../assets/emojis/AYAYA.png';
import wojakWithered from '../assets/emojis/wojakWithered.png';
import ChadYes from '../assets/emojis/ChadYes.png';
import EZY from '../assets/emojis/EZY.png';
import monkaMEGA from '../assets/emojis/monkaMEGA.png';
import roflanEbalo from '../assets/emojis/roflanEbalo.png';
import peepoGlad from '../assets/emojis/peepoGlad.png';
import TrollDespair from '../assets/emojis/TrollDespair.png';
import Trollge from '../assets/emojis/Trollge.png';

const rawTags = [
  {
    name: 'ⓘ',
    description: (
      <Description>
        I have left a note for these videos.
      </Description>
    ),
  },
  {
    name: 'instrumental',
    description: (
      <Description>
        Music without word, or the main focus is not on them. I have a lot of these.
      </Description>
    ),
  },
  {
    name: 'japanese',
    description: (
      <Description>
        Music with japanese words, mostly likely from osu! or anime, but not always.
      </Description>
    ),
  },
  {
    name: 'english',
    description: (
      <Description>
        Music with english words, just randomly run into it.
      </Description>
    ),
  },
  {
    name: 'russian',
    description: (
      <Description>
        Music with russian words.
      </Description>
    ),
  },
  {
    name: 'karaoke',
    description: (
      <Description>
        My friends and I sometimes go to karaoke, these songs are my choice. <br /> <Emoji src={FeelsAmazingMan} />
      </Description>
    ),
  },
  {
    name: 'sad',
    description: (
      <Description>
        Worsens sad moments... <br /> <Emoji src={FeelsHangMan} />
      </Description>
    ),
  },
  {
    name: 'happy',
    description: (
      <Description>
        Cheering me up! <br /> <Emoji src={FeelsOkayMan} />
      </Description>
    ),
  },
  {
    name: 'calm',
    description: (
      <Description>
        Sometimes want to listen to something calm to relax.
      </Description>
    ),
  },
  {
    name: 'active',
    description: (
      <Description>
        Often want to listen to these music; gives me energy! <br /> <Emoji src={SwoleDoge} />
      </Description>
    ),
  },
  {
    name: 'vocaloid',
    description: (
      <Description>
        Cute song and characters. <br /> <Emoji src={AYAYA} />
      </Description>
    ),
  },
  {
    name: 'rock',
    description: (
      <Description>
        Rock. A lot of rock.
      </Description>
    ),
  },
  {
    name: 'punk',
    description: (
      <Description>
        Friend of my hooked me on these... <br /> <Emoji src={wojakWithered} />
      </Description>
    ),
  },
  {
    name: 'metal',
    description: (
      <Description>
        I have a few of these, all of them are melodic metal.
      </Description>
    ),
  },
  {
    name: 'electronic',
    description: (
      <Description>
        This slaps! <br /> <Emoji src={ChadYes} />
      </Description>
    ),
  },
  {
    name: 'hardcore/speedcore',
    description: (
      <Description>
        This slaps <b>harder</b>. <br /> <Emoji src={ChadYes} />
      </Description>
    ),
  },
  {
    name: 'celtic',
    description: (
      <Description>
        Violin, flute, drums, bagpipes, harp ... Very pleasant to the ear. <br /> <Emoji src={FeelsOkayMan} />
      </Description>
    ),
  },
  {
    name: 'orchestral',
    description: (
      <Description>
        Mostly epic.
      </Description>
    ),
  },
  {
    name: 'classical',
    description: (
      <Description>
        Not only classics though. <br /> <Emoji src={EZY} />
      </Description>
    ),
  },
  {
    name: 'xi',
    description: (
      <Description>
        Electronic music artist, I enjoy his style.
      </Description>
    ),
  },
  {
    name: 'ICCD',
    description: (
      <Description>
        Imperial Circus Dead Decadence. Metal. <br /> <Emoji src={monkaMEGA} />
      </Description>
    ),
  },
  {
    name: 'akatsuki records',
    description: (
      <Description>
        Japanese band, unusual vocal. <br /> <Emoji src={roflanEbalo} />
      </Description>
    ),
  },
  {
    name: 'phyxinon',
    description: (
      <Description>
        He plays goooood!
      </Description>
    ),
  },
  {
    name: 'kalafina',
    description: (
      <Description>
        An already disbanded Japanese group founded by Yuuki Kajiura. I like a lot of their tracks.
      </Description>
    ),
  },
  {
    name: 'love solfege',
    description: (
      <Description>
        Unique style. Very cool! <br /> <Emoji src={peepoGlad} />
      </Description>
    ),
  },
  {
    name: 'yousei teikoku',
    description: (
      <Description>
        Japanese rock.
      </Description>
    ),
  },
  {
    name: 'yuki kajiura',
    description: (
      <Description>
        Musician and composer, I like a lot of her tracks.
      </Description>
    ),
  },
  {
    name: 'nomy',
    description: (
      <Description>
        A group of one person.
      </Description>
    ),
  },
  {
    name: 'rigël theatre',
    description: (
      <Description>
        Very nice voice and melody! One of my favorite bands.
      </Description>
    ),
  },
  {
    name: 'wagakki band',
    description: (
      <Description>
        Japanese folk rock.
      </Description>
    ),
  },
  {
    name: 'sky mubs',
    description: (
      <Description>
        A composer making epic music.
      </Description>
    ),
  },
  {
    name: 'infected mushrooms',
    description: (
      <Description>
        Unusual sound in their tracks is memorable!
      </Description>
    ),
  },
  {
    name: 'elysium',
    description: (
      <Description>
        Russian punk-rock group, they have a lot of cool tracks.
      </Description>
    ),
  },
  {
    name: 'korol i shut',
    description: (
      <Description>
        <Emoji src={Trollge} />
      </Description>
    ),
  },
  {
    name: 'egor letov',
    description: (
      <Description>
        <Emoji src={TrollDespair} />
      </Description>
    ),
  },
  {
    name: 'twilight force',
    description: (
      <Description>
        Very nice rock music!
      </Description>
    ),
  },
  {
    name: 'mittsies',
    description: (
      <Description>
        Learned about him from Helltaker game, very good electronic music!
      </Description>
    ),
  },
  {
    name: 'pornofilmy',
    description: (
      <Description>
        Russian punk-rock group, they have a lot of cool tracks.
      </Description>
    ),
  },
];

const random = (() => {
  let counter = 1;
  return () => (Math.cos(++counter * 17) + Math.sin(++counter * 4) + 2) / 4;
})()

const getRandomColor = () => `rgb(${[random(), random(), random()].map(v => Math.floor(v * 175 + 40)).join(', ')})`;

export const getModifiedTag = (tag) => {
  const { color, ...restProps } = tag;
  return {
    ...restProps,
    style: restProps.style ?? {
      color: 'white',
      backgroundColor: getRandomColor(),
    },
  };
}

export const tags = rawTags.map(getModifiedTag);
export const tagNames = tags.map(tag => tag.name);
export const getTagByName = (tagName) => tags.find(tag => tag.name === tagName);
