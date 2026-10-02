import React, { useEffect, useRef } from 'react';

/* Edit this object to personalize the story and add your own photos. */
const CONFIG = {
  her: 'Kanika',
  me: 'Rohit',
  music: '/images/audio.mp3',
  photos: Array.from({ length: 12 }, (_, i) => ({
    src: `/images/PHOTO_${String(i + 1).padStart(2, '0')}.png`,
    label: `PHOTO_${String(i + 1).padStart(2, '0')}`,
  })),
  intro: 'For Kanika, my favorite person.',
  s1: ['It started with a moment.', 'Then came a thousand little reasons to smile.', 'And somewhere along the way...', '...my heart found its home in you.'],
  timeline: [
    { date: 'THE DAY WE MET', title: 'Our First Conversation', text: 'I had no idea that one conversation would become the beginning of my favorite story.', photo: 0 },
    { date: 'OUR FIRST DATE', title: 'A Little More Us', text: 'Every moment beside you made the world feel softer, brighter, and a little more like home.', photo: 1 },
    { date: 'A DAY TO KEEP', title: 'That One Perfect Day', text: 'Nothing extraordinary had to happen. Being together was already everything.', photo: 2 },
    { date: 'MY FAVORITE MEMORY', title: 'Just You and Me', text: 'Of all the places I could be, my favorite will always be wherever you are.', photo: 3 },
    { date: 'WHEN I KNEW', title: 'The Day I Realized…', text: 'Somewhere in all our little moments, Kanika, you became my favorite part of every day.', photo: 4 },
  ],
  captions: ['One of my favorite days with you.', 'Your smile is still my favorite.', "I'd choose this moment again.", 'Always better together.'],
  words: [
    ['Kanika, your smile.', 22, 26, 5.4, 1],
    ['Your laugh is my favorite sound.', 74, 34, 4.6, 1],
    ['The way you make me feel at home.', 30, 66, 4.4, 1],
    ['All your lovely little things.', 70, 76, 3.6, 1],
    ['You make even ordinary days feel like something special.', 50, 50, 2.4, 1],
    ['smile', 50, 22, 17, 0],
    ['laugh', 52, 80, 15, 0],
    ['Kanika', 16, 52, 12, 0],
    ['always', 86, 56, 2, 2],
    ['yours', 12, 14, 1.6, 2],
    ['every day', 84, 12, 1.6, 2],
    ['quietly', 40, 88, 1.6, 2],
  ],
  room: [
    { photo: 5, date: 'A LITTLE MOMENT', text: 'The simplest moments become my favorites when I share them with you.' },
    { photo: 6, date: 'STILL ON MY MIND', text: 'No matter how busy the day gets, there is always room in my thoughts for you.' },
    { photo: 7, date: 'THAT LOOK', text: 'One look at you, and somehow everything feels right again.' },
    { photo: 8, date: 'AN ORDINARY DAY', text: 'With you, even an ordinary day finds a way to feel extraordinary.' },
    { photo: 9, date: 'THAT LAUGH', text: 'I hope life gives us a million more reasons to laugh together.' },
    { photo: 10, date: 'ONE TO KEEP', text: 'A little piece of us that I will carry with me, always.' },
    { photo: 11, date: 'JUST US', text: 'My favorite place is right here, making memories with you.' },
    { photo: 0, date: 'OUR BEGINNING', text: 'Every beautiful story has a beginning. I am grateful that ours is us.' },
  ],
  moments: [
    { n: '01', title: 'That day.', text: 'I may forget the little details, but I will never forget how happy I felt with you, Kanika.', photo: 2 },
    { n: '02', title: 'That laugh.', text: 'Your laugh has a way of making everything around me feel lighter. I could listen to it forever.', photo: 5 },
    { n: '03', title: 'That trip.', text: 'Wherever we go, the best part is getting to experience it by your side.', photo: 7 },
    { n: '04', title: 'That completely random moment.', text: 'The unplanned moments with you somehow become the ones I treasure most.', photo: 9 },
    { n: '05', title: 'That moment I wish I could pause.', text: 'If I could keep one feeling forever, it would be this: being here with you.', photo: 11 },
  ],
  letterTitle: 'A little something for Kanika.',
  letter:
    "Hey Kanika,\n\nI don't know if words could ever hold everything I feel for you...\n\nBut if I could save every moment we've shared,\nI'd keep this one.\n\nAnd this one.\n\nAnd this one too.\n\nBecause somewhere between all the laughs, the little things,\nand simply being together,\nyou became my favorite part of life.\n\nThank you for being you, and for making my world feel warmer just by being in it.\n\nAlways yours,\nRohit",
  finale: [
    'Some moments pass in a heartbeat.',
    'The love in them stays with us.',
    'Kanika, you are my favorite part of this story.',
    "Here's to every beautiful chapter still to come.",
  ],
  end: {
    title: 'Us.',
    chapter: 'Kanika & Rohit · Chapter One',
    replay: 'Replay our story ↗',
    again: 'Start again',
    foot: 'Made with all my love, for Kanika.',
  },
};

const PHOTO_TONES = [
  ['#6e2a40', '#E2B48E'],
  ['#3b1428', '#E4708A'],
  ['#7a4a48', '#2a0f1c'],
  ['#4a1a32', '#f0c6b0'],
  ['#2d1020', '#c25a76'],
  ['#8a5a4a', '#3b1428'],
];

const PHOTOGRAPH_POSITIONS = [
  [-170, -60, 0],
  [150, 60, -520],
  [-120, 90, -1040],
  [190, -80, -1560],
  [-30, -30, -2080],
  [100, 100, -2600],
];
const PHOTO_LINE_POSITIONS = [[-300, -110], [-150, 90], [10, -100], [170, 100], [320, -90], [0, 0]];
const GALLERY_POSITIONS = [
  [-34, -18, -100, -6],
  [26, -24, -420, 5],
  [-12, 22, -700, -3],
  [38, 18, -950, 7],
  [-40, 10, -1200, 4],
  [8, -8, -1450, -5],
  [-24, -22, -1650, 3],
  [30, 6, -1900, -4],
  [-6, 26, -2100, 5],
];

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function lerp(from, to, amount) {
  return from + (to - from) * amount;
}

function smooth(value) {
  return value * value * (3 - 2 * value);
}

function fadeWindow(value, start, end) {
  return smooth(clamp((value - start) / 0.05)) * smooth(clamp((end - value) / 0.05));
}

function personalize(text) {
  return text.replace(/\{HER\}/g, CONFIG.her).replace(/\{ME\}/g, CONFIG.me);
}

function Photo({ index, className = '', style = {}, label }) {
  const photo = CONFIG.photos[index % CONFIG.photos.length];
  const tone = PHOTO_TONES[index % PHOTO_TONES.length];

  return (
    <div
      className={`ph ${className}`.trim()}
      style={{
        background: `linear-gradient(${140 + index * 23}deg,${tone[0]},${tone[1]})`,
        ...style,
      }}
    >
      {photo.src && <img loading="lazy" src={photo.src} alt={photo.label} />}
      {label && className === 'g' && (
        <div className="cap">{CONFIG.captions[(index - 3) % CONFIG.captions.length]}</div>
      )}
      <i>{label || photo.label}</i>
    </div>
  );
}

function Scene({ id, className = '', children }) {
  return (
    <section id={id} className={`sc ${className}`.trim()} aria-label={id}>
      {children}
    </section>
  );
}

function IntroScene() {
  return (
    <Scene id="s0">
      <div className="hero-photo" aria-hidden="true">
        <img src="/images/PHOTO_00.png" alt="" />
      </div>
      <svg id="hh" viewBox="-160 -130 320 290" aria-hidden="true">
        <path
          pathLength="1"
          d="M0,-25 C-55,-100 -160,-40 -100,40 C-70,80 -25,115 0,140 C25,115 70,80 100,40 C160,-40 55,-100 0,-25Z"
        />
      </svg>
      <div className="hero-line big">{personalize(CONFIG.intro)}</div>
    </Scene>
  );
}

function PhotographsScene({ mobile, scale }) {
  return (
    <Scene id="s1">
      <div className="world" id="w1">
        {PHOTOGRAPH_POSITIONS.map((_, index) => (
          <Photo key={index} index={index} style={{ '--w': 'min(240px,50vw)' }} />
        ))}
      </div>
      <svg
        id="lines"
        viewBox="-500 -300 1000 600"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 1000,
          height: 600,
          translate: '-50% -50%',
          scale,
          opacity: 0,
        }}
        aria-hidden="true"
      >
        <polyline
          fill="none"
          stroke="#E2B48E"
          strokeWidth="1"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 6px #E2B48E)' }}
        />
      </svg>
      {CONFIG.s1.map((line) => (
        <div className="ln big" key={line} style={{ top: mobile ? '80%' : '50%' }}>
          {line}
        </div>
      ))}
    </Scene>
  );
}

function TimelineScene({ mobile }) {
  return (
    <Scene id="s2">
      <div className="glow" id="gl2" />
      <div className="world" id="w2">
        {CONFIG.timeline.map((memory, index) => {
          const x = (index % 2 ? 1 : -1) * (mobile ? 30 : 300);
          const y = (index - 2) * (mobile ? 20 : 50);

          return (
            <div
              className="card"
              key={memory.date}
              style={{
                position: 'absolute',
                transform: `translate3d(${x}px,${y}px,${-index * 950}px) rotateY(${-x * 0.03}deg)`,
              }}
            >
              <Photo index={memory.photo} />
              <div className="tx">
                <div className="sm">{memory.date}</div>
                <h3>{memory.title}</h3>
                <p>{memory.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Scene>
  );
}

function GalleryScene({ mobile }) {
  return (
    <Scene id="s3">
      <div className="world gal" id="w3">
        {GALLERY_POSITIONS.map(([x, y, z, rotation], index) => (
          <Photo
            key={index}
            index={index + 3}
            className="g"
            style={{
              '--x': `${x * (mobile ? 0.55 : 1)}vw`,
              '--y': `${y}vh`,
              '--z': `${z}px`,
              '--r': `${rotation}deg`,
              '--w': `min(${index % 3 ? 220 : 300}px,44vw)`,
            }}
            label={CONFIG.photos[(index + 3) % CONFIG.photos.length].label}
          >
            {CONFIG.captions[index % CONFIG.captions.length]}
          </Photo>
        ))}
      </div>
    </Scene>
  );
}

function WordsScene({ mobile }) {
  return (
    <Scene id="s4">
      {CONFIG.words.map(([text, , , size, level], index) => (
        <div
          className="w"
          key={`${text}-${index}`}
          style={{
            fontSize: `${size}vw`,
            ...(level === 0 ? { fontStyle: 'italic' } : {}),
            ...(mobile && size < 9
              ? {
                  fontSize: `${Math.max(size * 1.9, 3.6)}vw`,
                  whiteSpace: 'normal',
                  width: '60vw',
                  textAlign: 'center',
                }
              : {}),
          }}
        >
          {text}
        </div>
      ))}
      <div
        className="w big"
        id="you"
        style={{ left: '50%', top: '50%', fontSize: 'clamp(90px,20vw,280px)', opacity: 0 }}
      >
        You.
      </div>
    </Scene>
  );
}

function RoomScene({ mobile }) {
  const halfWidth = mobile ? 240 : 470;

  return (
    <Scene id="s5">
      <div className="world" id="w5">
        <div className="wall" style={{ transform: `translate3d(${-halfWidth}px,0,-1800px) rotateY(90deg)` }}>
          {CONFIG.room.filter((_, index) => index % 2 === 0).map((memory, index) => (
            <RoomFrame key={memory.date} memory={memory} mobile={mobile} left={500 + index * 520} />
          ))}
        </div>
        <div className="wall" style={{ transform: `translate3d(${halfWidth}px,0,-1800px) rotateY(-90deg)` }}>
          {CONFIG.room.filter((_, index) => index % 2 === 1).map((memory, index) => (
            <RoomFrame key={memory.date} memory={memory} mobile={mobile} left={3240 - index * 520} />
          ))}
        </div>
        <div
          className="floor"
          style={{
            left: -halfWidth,
            width: halfWidth * 2,
            transform: 'translate3d(0,400px,-1800px) rotateX(90deg)',
          }}
        />
        <div
          className="ceil"
          style={{
            left: -halfWidth,
            width: halfWidth * 2,
            transform: 'translate3d(0,-400px,-1800px) rotateX(-90deg)',
          }}
        />
      </div>
      <div className="vig" />
    </Scene>
  );
}

function RoomFrame({ memory, mobile, left }) {
  return (
    <div className="fr" style={{ left }}>
      <Photo index={memory.photo} style={{ '--w': `${mobile ? 150 : 220}px` }} />
      <div className="t" style={{ top: mobile ? 150 : 175 }}>
        <div className="sm">{memory.date}</div>
        <p>{memory.text}</p>
      </div>
    </div>
  );
}

function MomentsScene({ mobile }) {
  return (
    <Scene id="s6">
      {CONFIG.moments.map((memory, index) => {
        const leftAligned = index % 2 === 0;

        return (
          <div className="mm" key={memory.n}>
            <div className="n" style={{ [leftAligned ? 'right' : 'left']: '6vw' }}>
              {memory.n}
            </div>
            <Photo
              index={memory.photo}
              style={{
                [leftAligned ? 'right' : 'left']: mobile ? 0 : '12vw',
              }}
            />
            <div
              className="t"
              style={{
                [leftAligned ? 'left' : 'right']: '9vw',
                ...(leftAligned ? {} : { textAlign: 'right' }),
              }}
            >
              <div className="sm">Memory {memory.n}</div>
              <h2 className="big" style={{ fontSize: 'clamp(34px,5vw,76px)', maxWidth: mobile ? '80vw' : '38vw' }}>
                {memory.title}
              </h2>
              <p style={leftAligned ? undefined : { marginLeft: 'auto' }}>{memory.text}</p>
            </div>
          </div>
        );
      })}
    </Scene>
  );
}

function LetterScene() {
  return (
    <Scene id="s7">
      <div className="lt">
        <div className="sm">{CONFIG.letterTitle}</div>
        <div className="b">
          <span className="v" />
          <span className="cur" />
          <span className="h" />
        </div>
      </div>
    </Scene>
  );
}

function FinaleScene() {
  return (
    <Scene id="s8">
      <canvas id="fin" />
      {CONFIG.finale.map((line) => (
        <div className="fb big" key={line} style={{ fontSize: 'clamp(30px,5vw,70px)' }}>
          {line}
        </div>
      ))}
      <div id="end">
        <div className="big">{CONFIG.end.title}</div>
        <div className="sm" style={{ marginTop: 10 }}>{CONFIG.end.chapter}</div>
        <div>
          <button className="btn" id="rp" type="button">{CONFIG.end.replay}</button>
          <button className="btn" id="ag" type="button">{CONFIG.end.again}</button>
        </div>
        <div className="foot">{personalize(CONFIG.end.foot)}</div>
      </div>
    </Scene>
  );
}

export default function App() {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const root = document.documentElement;
    if (!stage) return undefined;

    const query = (selector, context = stage) => context.querySelector(selector);
    const queryAll = (selector, context = stage) => [...context.querySelectorAll(selector)];
    const mobile = window.innerWidth < 720 || window.matchMedia('(pointer:coarse)').matches;
    const scale = Math.min(1, window.innerWidth / 1000);
    const scenes = queryAll('.sc').map((element, index) => ({
      element,
      weight: [0.05, 0.1, 0.15, 0.12, 0.12, 0.13, 0.13, 0.08, 0.13][index],
      update: null,
    }));
    const totalWeight = scenes.reduce((total, scene) => total + scene.weight, 0);
    let accumulated = 0;
    scenes.forEach((scene) => {
      scene.start = accumulated / totalWeight;
      accumulated += scene.weight;
      scene.end = accumulated / totalWeight;
    });

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollProgress = 0;
    let velocity = 0;
    let activeScene = -1;
    let unlocked = false;
    let introStart = 0;
    let isSoundOn = false;
    let audioContext;
    let masterGain;
    let musicAudio;
    let animationFrame;
    let timers = [];

    const introScene = query('#s0');
    const heart = query('#hh');

    const clearIntroTimers = () => {
      timers.forEach(window.clearTimeout);
      timers = [];
    };

    const unlockStory = () => {
      if (unlocked) return;
      unlocked = true;
      clearIntroTimers();
      heart.classList.add('d');
      document.body.classList.remove('lock');
    };

    const startIntro = () => {
      unlocked = false;
      window.scrollTo(0, 0);
      document.body.classList.add('lock');
      heart.classList.remove('d');
      introStart = performance.now();
      clearIntroTimers();
      timers = [
        [800, () => heart.classList.add('d')],
        [12800, unlockStory],
      ].map(([delay, callback]) => window.setTimeout(callback, delay));
    };

    const photoScene = query('#s1');
    const photoWorld = query('#w1');
    const polyline = query('#lines polyline');
    scenes[1].update = (progress) => {
      const converge = smooth(clamp((progress - 0.72) / 0.22));
      const camera = lerp(progress / 0.72 * 2900 * clamp(progress / 0.72), 0, converge);
      photoWorld.style.transform = `translateZ(${camera}px) rotateY(${mouseX * 5}deg) rotateX(${-mouseY * 3}deg)`;
      queryAll('#w1 > .ph').forEach((photo, index) => {
        const position = PHOTOGRAPH_POSITIONS[index];
        const depth = position[2] + camera;
        const opacity = clamp((depth + 2400) / 700) * clamp((380 - depth) / 300);
        const x = lerp(position[0] * (scale + 0.3), PHOTO_LINE_POSITIONS[index][0] * scale, converge);
        const y = lerp(position[1] * (scale + 0.3), PHOTO_LINE_POSITIONS[index][1] * scale, converge);
        const z = lerp(position[2], 0, converge);
        photo.style.transform = `translate3d(${x}px,${y}px,${z}px) rotateY(${lerp(position[0] * 0.12, 0, converge)}deg) rotateZ(${lerp(index % 2 ? 4 : -5, index * 2 - 5, converge)}deg) scale(${lerp(1, 0.62, converge)})`;
        photo.style.opacity = lerp(opacity, 1, converge);
      });
      const lines = query('#lines');
      lines.style.opacity = String(converge);
      polyline.setAttribute('points', PHOTO_LINE_POSITIONS.slice(0, 5).map((point) => point.join(',')).join(' '));
      const windows = [[0.06, 0.26], [0.3, 0.48], [0.5, 0.68], [0.8, 3]];
      queryAll('.ln', photoScene).forEach((line, index) => {
        line.style.opacity = String(fadeWindow(progress, ...windows[index]));
      });
    };

    const timeline = query('#w2');
    const timelineGlow = query('#gl2');
    scenes[2].update = (progress) => {
      const camera = progress * (CONFIG.timeline.length - 1) * 950;
      timeline.style.transform = `translateZ(${camera}px) rotateY(${mouseX * -6}deg) rotateX(${mouseY * 3}deg)`;
      let focus = 0;
      queryAll('.card', timeline).forEach((card, index) => {
        const depth = -index * 950 + camera;
        const cardFocus = clamp(1 - Math.abs(depth) / 700);
        focus = Math.max(focus, cardFocus);
        card.style.opacity = depth > 380 ? '0' : String(clamp(1.15 - Math.abs(depth < 0 ? depth * 0.6 : depth) / 1900));
        const photo = query('.ph', card);
        photo.style.filter = `blur(${Math.abs(depth) * 0.006}px)`;
        photo.style.scale = String(1 + cardFocus * 0.1);
        query('.tx', card).style.opacity = String(cardFocus ** 3);
      });
      timelineGlow.style.opacity = String(focus);
    };

    const gallery = query('#w3');
    scenes[3].update = (progress) => {
      const camera = progress * 2400;
      gallery.style.transform = `translateZ(${camera}px) rotateY(${mouseX * 7}deg) rotateX(${-mouseY * 4}deg)`;
      queryAll('.g', gallery).forEach((photo, index) => {
        const depth = GALLERY_POSITIONS[index][2] + camera;
        photo.style.opacity = String(clamp((depth + 2300) / 800) * clamp((500 - depth) / 300));
      });
    };

    const words = query('#s4');
    scenes[4].update = (progress) => {
      const converge = smooth(clamp((progress - 0.72) / 0.2));
      queryAll('.w', words).forEach((word, index) => {
        if (index >= CONFIG.words.length) return;
        const [text, originalX, originalY, , level] = CONFIG.words[index];
        const appearance = smooth(clamp((progress - (index / CONFIG.words.length) * 0.62) / 0.1));
        const baseOpacity = level === 0 ? 0.1 : level === 2 ? 0.35 : 1;
        const x = lerp(originalX, 50, converge) + mouseX * (3 - level) * -1.6 * (1 - converge);
        const y = lerp(originalY, 50, converge) + mouseY * (3 - level) * -1.2 * (1 - converge);
        word.style.left = `${x}%`;
        word.style.top = `${y}%`;
        word.style.opacity = String(appearance * baseOpacity * (1 - converge));
        word.style.transform = `scale(${1 + progress * (level === 0 ? 0.25 : 0)})`;
      });
      query('#you').style.opacity = String(smooth(clamp((progress - 0.86) / 0.1)));
    };

    const room = query('#w5');
    scenes[5].update = (progress) => {
      room.style.transform = `translateZ(${progress * 1750}px) rotateY(${mouseX * 5}deg) rotateX(${-mouseY * 2}deg)`;
    };

    const moments = query('#s6');
    scenes[6].update = (progress) => {
      queryAll('.mm', moments).forEach((moment, index) => {
        const distance = progress * CONFIG.moments.length - index - 0.5;
        const focus = clamp(1.2 - Math.abs(distance) * 2.4);
        moment.style.opacity = String(focus);
        moment.style.visibility = focus > 0 ? 'visible' : 'hidden';
        const photo = query('.ph', moment);
        photo.style.transform = `translateY(${distance * -80}px) scale(${1.25 - 0.25 * focus}) rotate(${distance * 3}deg)`;
        photo.style.clipPath = `inset(${(1 - focus) * 30}% 0 ${(1 - focus) * 30}% 0)`;
        query('.t', moment).style.transform = `translate(${distance * -40}px,0)`;
      });
    };

    const letter = personalize(CONFIG.letter);
    const letterScene = query('#s7');
    const letterLayout = query('.lt', letterScene);
    const letterTitle = query('.sm', letterLayout);
    const letterBody = query('.b', letterLayout);
    const defaultLetterFontSize = Number.parseFloat(window.getComputedStyle(letterBody).fontSize);
    const fitLetter = () => {
      letterBody.style.maxHeight = '';
      letterBody.style.overflowY = '';
      let fontSize = defaultLetterFontSize;
      const layoutStyle = window.getComputedStyle(letterLayout);
      const titleStyle = window.getComputedStyle(letterTitle);
      const availableHeight = letterLayout.clientHeight
        - Number.parseFloat(layoutStyle.paddingTop)
        - Number.parseFloat(layoutStyle.paddingBottom)
        - letterTitle.getBoundingClientRect().height
        - Number.parseFloat(titleStyle.marginBottom);

      letterBody.style.fontSize = `${fontSize}px`;
      while (letterBody.scrollHeight > availableHeight && fontSize > 14) {
        fontSize = Math.max(14, fontSize * 0.92);
        letterBody.style.fontSize = `${fontSize}px`;
      }
      if (letterBody.scrollHeight > availableHeight) {
        letterBody.style.maxHeight = `${Math.max(0, availableHeight)}px`;
        letterBody.style.overflowY = 'auto';
      }
    };
    scenes[7].update = (progress) => {
      const length = Math.floor(clamp((progress - 0.08) / 0.72) * letter.length);
      query('.v', letterBody).textContent = letter.slice(0, length);
      query('.h', letterBody).textContent = letter.slice(length);
    };
    fitLetter();
    window.addEventListener('resize', fitLetter);
    document.fonts.ready.then(fitLetter);

    const finalCanvas = query('#fin');
    const finalContext = finalCanvas.getContext('2d');
    if (!finalContext) throw new Error('The browser could not create the finale canvas context.');
    const particles = Array.from({ length: mobile ? 110 : 240 }, (_, index) => ({
      angle: Math.random() * 6.28,
      radius: 0.35 + Math.random() * 0.9,
      speed: (Math.random() - 0.5) * 0.25,
      size: 6 + Math.random() * 10,
      orbit: (index / (mobile ? 110 : 240)) * 6.283,
      color: index % 3,
    }));
    const particleColors = ['rgba(226,180,142,', 'rgba(228,112,138,', 'rgba(251,239,233,'];
    scenes[8].update = (progress) => {
      const width = finalCanvas.width = window.innerWidth;
      const height = finalCanvas.height = window.innerHeight;
      const unit = Math.min(width, height * 1.4) * 0.36;
      const zoom = lerp(2.1, 1, smooth(clamp(progress / 0.3)));
      const converge = smooth(clamp((progress - 0.3) / 0.22));
      const fade = smooth(clamp((progress - 0.9) / 0.1));
      finalContext.clearRect(0, 0, width, height);
      const time = performance.now() / 1000;
      particles.forEach((particle) => {
        const angle = particle.angle + time * particle.speed;
        const orbitX = Math.cos(angle) * particle.radius * unit * 1.6 * zoom;
        const orbitY = Math.sin(angle) * particle.radius * unit * zoom;
        const sine = Math.sin(particle.orbit);
        const divisor = 1 + sine * sine;
        const heartX = Math.cos(particle.orbit) / divisor * unit * 1.55;
        const heartY = Math.sin(particle.orbit) * Math.cos(particle.orbit) / divisor * unit * 1.9;
        const x = width / 2 + lerp(orbitX, heartX, converge);
        const y = height / 2 + lerp(orbitY, heartY, converge);
        const size = particle.size * (mobile ? 0.7 : 1) * lerp(zoom, 1, converge) * (1 - fade * 0.55);
        finalContext.fillStyle = `${particleColors[particle.color]}${0.55 * (1 - fade * 0.6)})`;
        finalContext.save();
        finalContext.translate(x, y);
        finalContext.rotate(angle + converge * 0.3);
        finalContext.fillRect(-size / 2, -size * 0.62, size, size * 1.24);
        finalContext.restore();
      });
      const windows = [[0.4, 0.5], [0.52, 0.62], [0.64, 0.78], [0.8, 0.9]];
      queryAll('.fb', query('#s8')).forEach((line, index) => {
        line.style.opacity = String(fadeWindow(progress, ...windows[index]));
      });
      const end = query('#end');
      end.style.opacity = String(smooth(clamp((progress - 0.92) / 0.08)));
      end.classList.toggle('on', progress > 0.95);
    };

    const particleCanvas = query('#fx');
    const particleContext = particleCanvas.getContext('2d');
    if (!particleContext) throw new Error('The browser could not create the background canvas context.');
    const particleCount = mobile ? 40 : 110;
    const backgroundParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      depth: Math.random() * 0.9 + 0.1,
      size: Math.random() * 6,
    }));
    const heartCount = mobile ? 24 : 52;
    const floatingHearts = Array.from({ length: heartCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      depth: Math.random(),
      phase: Math.random() * 6.28,
      color: Math.random(),
    }));
    const heartColors = [[228, 112, 138], [251, 239, 233], [226, 180, 142], [200, 70, 100]];
    const drawHeart = (context, size) => {
      context.beginPath();
      context.moveTo(0, 0.95 * size);
      context.bezierCurveTo(-1.25 * size, 0.1 * size, -0.7 * size, -0.95 * size, 0, -0.35 * size);
      context.bezierCurveTo(0.7 * size, -0.95 * size, 1.25 * size, 0.1 * size, 0, 0.95 * size);
      context.fill();
    };

    const drawFloatingHearts = (width, height) => {
      const opacity = (0.12 + 0.88 * clamp(1 - scrollProgress * 14)) * clamp((performance.now() - introStart) / 2500);
      if (opacity < 0.02) return;
      floatingHearts.forEach((heartParticle) => {
        heartParticle.y -= 0.0006 + heartParticle.depth * 0.0011 + Math.abs(velocity) * 0.8 * heartParticle.depth;
        if (heartParticle.y < -0.1) {
          heartParticle.y = 1.1;
          heartParticle.x = Math.random();
        }
        heartParticle.phase += 0.012;
        const size = (6 + heartParticle.depth * 18) * (mobile ? 0.8 : 1);
        const color = heartColors[Math.floor(heartParticle.color * 4)];
        particleContext.save();
        particleContext.translate(
          (heartParticle.x + Math.sin(heartParticle.phase) * 0.025 * heartParticle.depth - mouseX * 0.05 * heartParticle.depth) * width,
          heartParticle.y * height,
        );
        particleContext.rotate(Math.sin(heartParticle.phase) * 0.35);
        particleContext.globalAlpha = opacity * (0.25 + 0.6 * heartParticle.depth);
        particleContext.fillStyle = `rgb(${color.join(',')})`;
        drawHeart(particleContext, size);
        particleContext.restore();
      });
    };

    const startSynth = () => {
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextConstructor) throw new Error('Web Audio is not supported by this browser.');
      audioContext = new AudioContextConstructor();
      masterGain = audioContext.createGain();
      masterGain.gain.value = 0;
      masterGain.connect(audioContext.destination);
      const filter = audioContext.createBiquadFilter();
      filter.frequency.value = 650;
      filter.connect(masterGain);
      [110, 164.81, 220, 277.18, 329.63].forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        oscillator.type = index % 2 ? 'sine' : 'triangle';
        oscillator.frequency.value = frequency;
        oscillator.detune.value = (index - 2) * 5;
        const gain = audioContext.createGain();
        gain.gain.value = 0.06;
        const lfo = audioContext.createOscillator();
        lfo.frequency.value = 0.05 + index * 0.03;
        const lfoGain = audioContext.createGain();
        lfoGain.gain.value = 0.04;
        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);
        oscillator.connect(gain);
        gain.connect(filter);
        oscillator.start();
        lfo.start();
      });
    };

    const playAmbientTick = () => {
      if (!isSoundOn || !audioContext) return;
      const buffer = audioContext.createBuffer(1, 2205, 44100);
      const data = buffer.getChannelData(0);
      for (let index = 0; index < data.length; index += 1) {
        data[index] = (Math.random() * 2 - 1) * (1 - index / data.length) ** 3;
      }
      const source = audioContext.createBufferSource();
      const gain = audioContext.createGain();
      gain.gain.value = 0.05;
      source.buffer = buffer;
      source.connect(gain);
      gain.connect(audioContext.destination);
      source.start();
    };

    const soundButton = query('#snd');
    const getMusicAudio = () => {
      if (!musicAudio) {
        musicAudio = new Audio(CONFIG.music);
        musicAudio.loop = true;
        musicAudio.preload = 'auto';
      }
      return musicAudio;
    };
    const startMusic = async () => {
      if (!CONFIG.music || isSoundOn) return;
      isSoundOn = true;
      try {
        await getMusicAudio().play();
        soundButton.textContent = 'SOUND — ON';
      } catch (error) {
        isSoundOn = false;
        if (error.name === 'NotAllowedError') {
          soundButton.textContent = 'SOUND — TAP TO PLAY';
          return;
        }
        soundButton.textContent = 'SOUND — OFF';
        console.error('Unable to play story audio.', error);
      }
    };
    const toggleSound = async () => {
      isSoundOn = !isSoundOn;
      if (CONFIG.music) {
        const audio = getMusicAudio();
        if (isSoundOn) {
          await audio.play();
        } else {
          audio.pause();
        }
      } else {
        if (!audioContext) startSynth();
        await audioContext.resume();
        masterGain.gain.cancelScheduledValues(0);
        masterGain.gain.linearRampToValueAtTime(isSoundOn ? 0.5 : 0, audioContext.currentTime + 2);
      }
      soundButton.textContent = `SOUND — ${isSoundOn ? 'ON' : 'OFF'}`;
    };

    const moveMouse = (event) => {
      targetMouseX = event.clientX / window.innerWidth - 0.5;
      targetMouseY = event.clientY / window.innerHeight - 0.5;
      queryAll('.btn').forEach((button) => {
        const bounds = button.getBoundingClientRect();
        const x = event.clientX - (bounds.left + bounds.width / 2);
        const y = event.clientY - (bounds.top + bounds.height / 2);
        if (Math.hypot(x, y) < 110) {
          button.style.transform = `translate(${x * 0.25}px,${y * 0.35}px)`;
        } else {
          button.style.transform = '';
        }
      });
    };
    const onWheel = () => {
      if (!unlocked && timers.length && performance.now() > 2000) unlockStory();
    };
    const onTouchStart = () => {
      startMusic();
      if (!unlocked && performance.now() > 2000) unlockStory();
    };
    const onFirstInteraction = (event) => {
      if (event.target instanceof Element && event.target.closest('#snd')) return;
      startMusic();
    };
    const replay = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const startAgain = () => {
      window.scrollTo(0, 0);
      startIntro();
      scrollProgress = 0;
    };
    const onSoundClick = () => {
      toggleSound().catch((error) => {
        isSoundOn = false;
        soundButton.textContent = 'SOUND — OFF';
        console.error('Unable to play story audio.', error);
      });
    };
    const onReplayClick = replay;
    const onAgainClick = startAgain;

    const introProgress = (progress) => {
      heart.style.scale = String(1 + progress * 4);
    };
    scenes[0].update = introProgress;
    startIntro();
    startMusic();
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('pointerdown', onFirstInteraction, { passive: true });
    window.addEventListener('mousemove', moveMouse);
    soundButton.addEventListener('click', onSoundClick);
    query('#rp').addEventListener('click', onReplayClick);
    query('#ag').addEventListener('click', onAgainClick);

    const animate = () => {
      const maxScroll = root.scrollHeight - window.innerHeight;
      const targetProgress = clamp(window.scrollY / maxScroll);
      const previousProgress = scrollProgress;
      scrollProgress = lerp(scrollProgress, targetProgress, 0.07);
      velocity = lerp(velocity, scrollProgress - previousProgress, 0.2);
      mouseX = lerp(mouseX, targetMouseX, 0.05);
      mouseY = lerp(mouseY, targetMouseY, 0.05);

      scenes.forEach((scene, index) => {
        const progress = (scrollProgress - scene.start) / (scene.end - scene.start);
        const opacity = index === 0
          ? clamp((1.05 - progress) / 0.1)
          : index === scenes.length - 1
            ? clamp((progress + 0.05) / 0.1)
            : clamp(Math.min(progress + 0.05, 1.05 - progress) / 0.1);
        scene.element.style.opacity = String(opacity);
        scene.element.style.visibility = opacity > 0 ? 'visible' : 'hidden';
        scene.element.classList.toggle('on', opacity > 0.5);
        if (opacity > 0 && scene.update) scene.update(clamp(progress));
        if (opacity >= 0.5 && activeScene !== index) {
          if (activeScene >= 0) playAmbientTick();
          activeScene = index;
          query('#pg').textContent = `${String(index).padStart(2, '0')} / 08`;
        }
      });
      query('#bar i').style.height = `${scrollProgress * 100}%`;
      const width = particleCanvas.width = window.innerWidth;
      const height = particleCanvas.height = window.innerHeight;
      particleContext.clearRect(0, 0, width, height);
      backgroundParticles.forEach((particle) => {
        particle.y = (particle.y - 0.0002 * particle.depth + 1 + velocity * -6 * particle.depth) % 1;
        particle.size += 0.01;
        const x = (particle.x + Math.sin(particle.size) * 0.01 - mouseX * 0.03 * particle.depth) * width;
        const y = particle.y * height;
        particleContext.strokeStyle = `rgba(${particle.depth > 0.5 ? '226,180,142' : '251,239,233'},${0.12 + particle.depth * 0.4})`;
        particleContext.lineWidth = particle.depth * 1.6;
        particleContext.beginPath();
        particleContext.moveTo(x, y);
        particleContext.lineTo(x, y + Math.abs(velocity) * height * 14 * particle.depth + 0.01);
        particleContext.stroke();
      });
      drawFloatingHearts(width, height);
      animationFrame = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      clearIntroTimers();
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('resize', fitLetter);
      soundButton.removeEventListener('click', onSoundClick);
      query('#rp').removeEventListener('click', onReplayClick);
      query('#ag').removeEventListener('click', onAgainClick);
      musicAudio?.pause();
      audioContext?.close();
      document.body.classList.remove('lock');
    };
  }, []);

  const mobile = typeof window !== 'undefined'
    && (window.innerWidth < 720 || window.matchMedia('(pointer:coarse)').matches);
  const scale = typeof window !== 'undefined' ? Math.min(1, window.innerWidth / 1000) : 1;

  return (
    <>
      <main id="stage" ref={stageRef}>
        <canvas id="fx" />
        <IntroScene />
        <PhotographsScene mobile={mobile} scale={scale} />
        <TimelineScene mobile={mobile} />
        <GalleryScene mobile={mobile} />
        <WordsScene mobile={mobile} />
        <RoomScene mobile={mobile} />
        <MomentsScene mobile={mobile} />
        <LetterScene />
        <FinaleScene />
        <div className="ui" id="pg">00 / 08</div>
        <div id="bar"><i /></div>
        <button className="ui" id="snd" type="button">SOUND — OFF</button>
      </main>
      <div className="spacer" aria-hidden="true" />
    </>
  );
}
