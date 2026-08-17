const vowelCards = [...document.querySelectorAll('.vowel-card')];
const dropzones = [...document.querySelectorAll('.dropzone')];
const statusMessage = document.getElementById('statusMessage');
const resetButton = document.getElementById('resetButton');
const hebrewPool = document.getElementById('hebrewPool');
const lessonList = document.getElementById('lessonList');
const vowelsOption = document.getElementById('vowelsOption');
const vowelsView = document.getElementById('vowelsView');
const welcomeView = document.getElementById('welcomeView');
const lettersOption = document.getElementById('lettersOption');
const lettersView = document.getElementById('lettersView');
const letterCloud = document.getElementById('letterCloud');
const letterVowelOption = document.getElementById('letterVowelOption');
const letterVowelView = document.getElementById('letterVowelView');
const letterVowelList = document.getElementById('letterVowelList');
const syllableOption = document.getElementById('syllableOption');
const syllableView = document.getElementById('syllableView');
const syllableList = document.getElementById('syllableList');
const twoSyllableOption = document.getElementById('twoSyllableOption');
const twoSyllableView = document.getElementById('twoSyllableView');
const twoSyllableList = document.getElementById('twoSyllableList');
const celebration = document.getElementById('celebration');

let draggedCard = null;
let celebrationShown = false;
let mistakeMade = false;
let autoResetTimer = null;

dropzones.forEach((zone) => {
  zone.dataset.sound = zone.querySelector('.dropzone-label').textContent;
});

function zoneAccepts(zone, match) {
  return zone.dataset.accepts.split(' ').includes(match);
}

function cardName(card) {
  return card.getAttribute('aria-label').split('.')[0];
}

function celebrate() {
  if (celebrationShown) {
    return;
  }

  celebrationShown = true;
  celebration.innerHTML = '';

  const bursts = [
    { x: 10, y: 20, hue: 330, delay: 0 },
    { x: 30, y: 36, hue: 45, delay: 0.12 },
    { x: 50, y: 16, hue: 205, delay: 0.24 },
    { x: 72, y: 32, hue: 125, delay: 0.36 },
    { x: 90, y: 18, hue: 275, delay: 0.48 },
    { x: 18, y: 64, hue: 190, delay: 0.62 },
    { x: 42, y: 55, hue: 15, delay: 0.76 },
    { x: 62, y: 70, hue: 300, delay: 0.9 },
    { x: 84, y: 58, hue: 65, delay: 1.04 }
  ];

  bursts.forEach((burst) => {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.setProperty('--x', `${burst.x}%`);
    firework.style.setProperty('--y', `${burst.y}%`);

    for (let index = 0; index < 28; index += 1) {
      const spark = document.createElement('span');
      const angle = (Math.PI * 2 * index) / 28;
      const distance = 55 + (index % 4) * 15;
      spark.className = 'spark';
      spark.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
      spark.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
      spark.style.setProperty('--hue', `${burst.hue + index * 5}`);
      spark.style.setProperty('--delay', `${burst.delay}s`);
      firework.appendChild(spark);
    }

    celebration.appendChild(firework);
  });

  setTimeout(() => {
    celebration.innerHTML = '';
  }, 3200);
}

function setStatus(message) {
  statusMessage.textContent = message;
}

function openVowels() {
  vowelsOption.setAttribute('aria-selected', 'true');
  lettersOption.setAttribute('aria-selected', 'false');
  letterVowelOption.setAttribute('aria-selected', 'false');
  syllableOption.setAttribute('aria-selected', 'false');
  twoSyllableOption.setAttribute('aria-selected', 'false');
  welcomeView.hidden = true;
  lettersView.hidden = true;
  letterVowelView.hidden = true;
  syllableView.hidden = true;
  twoSyllableView.hidden = true;
  vowelsView.hidden = false;
  resetButton.hidden = false;
}

function openLetters() {
  const letters = [
    { glyph: 'א', name: 'Aleph' },
    { glyph: 'בּ', name: 'Bet' },
    { glyph: 'ב', name: 'Vet' },
    { glyph: 'ג', name: 'Gimel' },
    { glyph: 'ד', name: 'Dalet' },
    { glyph: 'ה', name: 'Hey' },
    { glyph: 'ו', name: 'Vav' },
    { glyph: 'ז', name: 'Zayin' },
    { glyph: 'ח', name: 'Chet' },
    { glyph: 'ט', name: 'Tet' },
    { glyph: 'י', name: 'Yod' },
    { glyph: 'כּ', name: 'Kaf' },
    { glyph: 'כ', name: 'Chaf' },
    { glyph: 'ךְ', name: 'Final Chaf' },
    { glyph: 'ל', name: 'Lamed' },
    { glyph: 'מ', name: 'Mem' },
    { glyph: 'ם', name: 'Final Mem' },
    { glyph: 'נ', name: 'Nun' },
    { glyph: 'ן', name: 'Final Nun' },
    { glyph: 'ס', name: 'Samech' },
    { glyph: 'ע', name: 'Ayin' },
    { glyph: 'פּ', name: 'Pey' },
    { glyph: 'פ', name: 'Fey' },
    { glyph: 'ף', name: 'Final Fey' },
    { glyph: 'צ', name: 'Tsadi' },
    { glyph: 'ץ', name: 'Final Tsadi' },
    { glyph: 'ק', name: 'Kuf' },
    { glyph: 'ר', name: 'Resh' },
    { glyph: 'שׁ', name: 'Shin' },
    { glyph: 'שׂ', name: 'Sin' },
    { glyph: 'ת', name: 'Tav' }
  ];

  letterCloud.innerHTML = '';
  letters.forEach((letter) => {
    const element = document.createElement('span');
    element.className = 'hebrew-letter';
    element.textContent = letter.glyph;
    element.setAttribute('aria-label', letter.name);
    element.title = letter.name;
    letterCloud.appendChild(element);
  });

  lettersOption.setAttribute('aria-selected', 'true');
  vowelsOption.setAttribute('aria-selected', 'false');
  letterVowelOption.setAttribute('aria-selected', 'false');
  syllableOption.setAttribute('aria-selected', 'false');
  twoSyllableOption.setAttribute('aria-selected', 'false');
  welcomeView.hidden = true;
  vowelsView.hidden = true;
  letterVowelView.hidden = true;
  syllableView.hidden = true;
  twoSyllableView.hidden = true;
  lettersView.hidden = false;
  resetButton.hidden = true;
}

function openLetterVowels() {
  const lines = [
    ['בַּ', 'גָּ', 'דֶּ', 'הֵ', 'וֹ', 'זִ'],
    ['חֻ', 'טַ', 'יָ', 'כֶּ', 'לֵ', 'מִ'],
    ['נֹ', 'סֻ', 'עַ', 'פֵּ', 'צִ', 'קָ'],
    ['רֶ', 'שָׁ', 'תֻּ', 'בֹּ', 'גֵּ', 'דִּ'],
    ['הֲ', 'וְ', 'זֶ', 'חָ', 'טֹ', 'יִ']
  ];

  letterVowelList.innerHTML = '';
  lines.forEach((letters, lineIndex) => {
    const line = document.createElement('div');
    line.className = 'word-line';
    const number = document.createElement('span');
    number.className = 'line-number';
    number.textContent = `${lineIndex + 1}.`;
    line.appendChild(number);

    letters.forEach((letter) => {
      const element = document.createElement('span');
      element.className = 'hebrew-word';
      element.lang = 'he';
      element.dir = 'rtl';
      element.textContent = letter;
      line.appendChild(element);
    });
    letterVowelList.appendChild(line);
  });

  letterVowelOption.setAttribute('aria-selected', 'true');
  vowelsOption.setAttribute('aria-selected', 'false');
  lettersOption.setAttribute('aria-selected', 'false');
  syllableOption.setAttribute('aria-selected', 'false');
  twoSyllableOption.setAttribute('aria-selected', 'false');
  welcomeView.hidden = true;
  vowelsView.hidden = true;
  lettersView.hidden = true;
  syllableView.hidden = true;
  twoSyllableView.hidden = true;
  letterVowelView.hidden = false;
  resetButton.hidden = true;
}

function openSyllables() {
  const wordLines = [
    [
      { hebrew: 'דָּג', english: 'fish' }, { hebrew: 'יָם', english: 'sea' },
      { hebrew: 'יָד', english: 'hand' }, { hebrew: 'עֵץ', english: 'tree' },
      { hebrew: 'אוֹר', english: 'light' }
    ],
    [
      { hebrew: 'דֹּב', english: 'bear' }, { hebrew: 'סוּס', english: 'horse' },
      { hebrew: 'בֵּן', english: 'son' }, { hebrew: 'בַּת', english: 'daughter' },
      { hebrew: 'אָב', english: 'father' }
    ],
    [
      { hebrew: 'אֵם', english: 'mother' }, { hebrew: 'אָח', english: 'brother' },
      { hebrew: 'חַג', english: 'holiday' }, { hebrew: 'לֵב', english: 'heart' },
      { hebrew: 'חֹם', english: 'heat' }
    ],
    [
      { hebrew: 'קֹר', english: 'cold' }, { hebrew: 'שֵׁם', english: 'name' },
      { hebrew: 'שָׁם', english: 'there' }, { hebrew: 'כָּאן', english: 'here' },
      { hebrew: 'גַּן', english: 'garden' }
    ],
    [
      { hebrew: 'כּוֹס', english: 'cup' }, { hebrew: 'חֵץ', english: 'arrow' },
      { hebrew: 'קִיר', english: 'wall' }, { hebrew: 'שִׁיר', english: 'song' },
      { hebrew: 'עִיר', english: 'city' }
    ]
  ];

  syllableList.innerHTML = '';
  wordLines.forEach((words, lineIndex) => {
    const line = document.createElement('div');
    line.className = 'word-line';
    const number = document.createElement('span');
    number.className = 'line-number';
    number.textContent = `${lineIndex + 1}.`;
    line.appendChild(number);

    words.forEach((word) => {
      const element = document.createElement('span');
      element.className = 'hebrew-word';
      element.lang = 'he';
      element.dir = 'rtl';
      element.textContent = word.hebrew;
      element.setAttribute('aria-label', `${word.hebrew}, ${word.english}`);
      element.title = word.english;
      line.appendChild(element);
    });
    syllableList.appendChild(line);
  });

  syllableOption.setAttribute('aria-selected', 'true');
  vowelsOption.setAttribute('aria-selected', 'false');
  lettersOption.setAttribute('aria-selected', 'false');
  letterVowelOption.setAttribute('aria-selected', 'false');
  twoSyllableOption.setAttribute('aria-selected', 'false');
  welcomeView.hidden = true;
  vowelsView.hidden = true;
  lettersView.hidden = true;
  letterVowelView.hidden = true;
  twoSyllableView.hidden = true;
  syllableView.hidden = false;
  resetButton.hidden = true;
}

function openTwoSyllables() {
  const wordLines = [
    [
      { hebrew: 'מֶלֶךְ', english: 'king' }, { hebrew: 'יֶלֶד', english: 'boy' },
      { hebrew: 'בַּיִת', english: 'house' }, { hebrew: 'חָלָב', english: 'milk' },
      { hebrew: 'בֹּקֶר', english: 'morning' }
    ],
    [
      { hebrew: 'כֶּלֶב', english: 'dog' }, { hebrew: 'דֶּגֶל', english: 'flag' },
      { hebrew: 'דָּבָר', english: 'thing' }, { hebrew: 'אִשָּׁה', english: 'woman' },
      { hebrew: 'מִטָּה', english: 'bed' }
    ],
    [
      { hebrew: 'גֶּשֶׁם', english: 'rain' }, { hebrew: 'לֶחֶם', english: 'bread' },
      { hebrew: 'חָבֵר', english: 'friend' }, { hebrew: 'קָרָא', english: 'read' },
      { hebrew: 'תּוֹרָה', english: 'Torah' }
    ],
    [
      { hebrew: 'חֶדֶר', english: 'room' }, { hebrew: 'אֶרֶץ', english: 'land' },
      { hebrew: 'רוּחַ', english: 'wind' }, { hebrew: 'חַלּוֹן', english: 'window' },
      { hebrew: 'מָטוֹס', english: 'airplane' }
    ],
    [
      { hebrew: 'דֶּלֶת', english: 'door' }, { hebrew: 'עֶרֶב', english: 'evening' },
      { hebrew: 'פֶּרַח', english: 'flower' }, { hebrew: 'סֵפֶר', english: 'book' },
      { hebrew: 'שֻׁלְחָן', english: 'table' }
    ]
  ];

  twoSyllableList.innerHTML = '';
  wordLines.forEach((words, lineIndex) => {
    const line = document.createElement('div');
    line.className = 'word-line';
    const number = document.createElement('span');
    number.className = 'line-number';
    number.textContent = `${lineIndex + 1}.`;
    line.appendChild(number);

    words.forEach((word) => {
      const element = document.createElement('span');
      element.className = 'hebrew-word';
      element.lang = 'he';
      element.dir = 'rtl';
      element.textContent = word.hebrew;
      element.setAttribute('aria-label', `${word.hebrew}, ${word.english}`);
      element.title = word.english;
      line.appendChild(element);
    });
    twoSyllableList.appendChild(line);
  });

  twoSyllableOption.setAttribute('aria-selected', 'true');
  vowelsOption.setAttribute('aria-selected', 'false');
  lettersOption.setAttribute('aria-selected', 'false');
  letterVowelOption.setAttribute('aria-selected', 'false');
  syllableOption.setAttribute('aria-selected', 'false');
  welcomeView.hidden = true;
  vowelsView.hidden = true;
  lettersView.hidden = true;
  letterVowelView.hidden = true;
  syllableView.hidden = true;
  twoSyllableView.hidden = false;
  resetButton.hidden = true;
}

function resetBoard() {
  if (autoResetTimer) {
    clearTimeout(autoResetTimer);
    autoResetTimer = null;
  }

  celebrationShown = false;
  mistakeMade = false;
  celebration.innerHTML = '';
  vowelCards.forEach((card) => {
    card.draggable = true;
    card.classList.remove('dragging');
    card.setAttribute('aria-label', `${card.dataset.name || cardName(card)}. Drag to the matching English sound.`);
    hebrewPool.appendChild(card);
  });

  dropzones.forEach((zone) => {
    zone.classList.remove('correct', 'incorrect', 'drop-over');
  });

  setStatus('Drag a Hebrew vowel onto its matching English sound.');
}

function handleDragStart(event) {
  draggedCard = event.currentTarget;
  draggedCard.classList.add('dragging');
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', draggedCard.dataset.match);
}

function handleDragEnd(event) {
  event.currentTarget.classList.remove('dragging');
  draggedCard = null;
  dropzones.forEach((zone) => zone.classList.remove('drop-over'));
}

function handleDrop(event) {
  event.preventDefault();
  const targetZone = event.currentTarget;
  if (!draggedCard) {
    return;
  }

  if (zoneAccepts(targetZone, draggedCard.dataset.match)) {
    targetZone.classList.add('correct');
    targetZone.classList.remove('incorrect');
    targetZone.querySelector('.matched-vowels').appendChild(draggedCard);
    draggedCard.draggable = false;
    draggedCard.classList.remove('dragging');
    draggedCard.dataset.name = cardName(draggedCard);
    draggedCard.setAttribute('aria-label', `Matched ${draggedCard.dataset.name}`);
    setStatus(`Nice! That vowel matches the ${targetZone.dataset.sound} sound.`);

    const remaining = vowelCards.filter((card) => card.draggable !== false).length;
    if (remaining === 0) {
      if (!mistakeMade) {
        setStatus('You matched all the Hebrew vowels! Great job!');
        celebrate();
      } else {
        setStatus('Round complete. Starting a new round...');
        autoResetTimer = setTimeout(resetBoard, 1500);
      }
    }
  } else {
    mistakeMade = true;
    draggedCard.classList.remove('dragging');
    targetZone.classList.remove('correct');
    targetZone.classList.add('incorrect');
    setStatus(`Not quite. Try again.`);
    setTimeout(() => targetZone.classList.remove('incorrect'), 500);
  }

  draggedCard = null;
}

vowelCards.forEach((card) => {
  card.addEventListener('dragstart', handleDragStart);
  card.addEventListener('dragend', handleDragEnd);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const match = card.dataset.match;
      const target = dropzones.find((zone) => zoneAccepts(zone, match));
      if (target && card.draggable !== false) {
        target.classList.add('correct');
        target.querySelector('.matched-vowels').appendChild(card);
        card.draggable = false;
        card.dataset.name = cardName(card);
        card.setAttribute('aria-label', `Matched ${card.dataset.name}`);
        setStatus(`Matched the ${target.dataset.sound} sound.`);

        const remaining = vowelCards.filter((item) => item.draggable !== false).length;
        if (remaining === 0) {
          if (!mistakeMade) {
            setStatus('You matched all the Hebrew vowels! Great job!');
            celebrate();
          } else {
            setStatus('Round complete. Starting a new round...');
            autoResetTimer = setTimeout(resetBoard, 1500);
          }
        }
      }
    }
  });
});

dropzones.forEach((zone) => {
  zone.addEventListener('dragover', (event) => {
    event.preventDefault();
    zone.classList.add('drop-over');
  });

  zone.addEventListener('dragleave', () => {
    zone.classList.remove('drop-over');
  });

  zone.addEventListener('drop', handleDrop);
});

resetButton.addEventListener('click', resetBoard);

vowelsOption.addEventListener('click', openVowels);
lettersOption.addEventListener('click', openLetters);
letterVowelOption.addEventListener('click', openLetterVowels);
syllableOption.addEventListener('click', openSyllables);
twoSyllableOption.addEventListener('click', openTwoSyllables);

lessonList.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    if (twoSyllableOption.getAttribute('aria-selected') === 'true') {
      openTwoSyllables();
    } else if (syllableOption.getAttribute('aria-selected') === 'true') {
      openSyllables();
    } else if (letterVowelOption.getAttribute('aria-selected') === 'true') {
      openLetterVowels();
    } else if (lettersOption.getAttribute('aria-selected') === 'true') {
      openLetters();
    } else {
      openVowels();
    }
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    if (vowelsOption.getAttribute('aria-selected') === 'true') {
      openLetters();
    } else if (lettersOption.getAttribute('aria-selected') === 'true') {
      openLetterVowels();
    } else if (letterVowelOption.getAttribute('aria-selected') === 'true') {
      openSyllables();
    } else if (syllableOption.getAttribute('aria-selected') === 'true') {
      openTwoSyllables();
    } else {
      openTwoSyllables();
    }
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (twoSyllableOption.getAttribute('aria-selected') === 'true') {
      openSyllables();
    } else if (syllableOption.getAttribute('aria-selected') === 'true') {
      openLetterVowels();
    } else if (letterVowelOption.getAttribute('aria-selected') === 'true') {
      openLetters();
    } else {
      openVowels();
    }
  }
});
