import { capitalize, getRandomEmoji } from './utils.js';

export function getResult(p1, p2) {
  let gameResult;
  if (RPSChoices[p1.objectName] && RPSChoices[p1.objectName][p2.objectName]) {
    // o1 wins
    gameResult = {
      win: p1,
      lose: p2,
      verb: RPSChoices[p1.objectName][p2.objectName],
    };
  } else if (
    RPSChoices[p2.objectName] &&
    RPSChoices[p2.objectName][p1.objectName]
  ) {
    // o2 wins
    gameResult = {
      win: p2,
      lose: p1,
      verb: RPSChoices[p2.objectName][p1.objectName],
    };
  } else {
    // tie -- win/lose don't
    gameResult = { win: p1, lose: p2, verb: 'tie' };
  }

  return formatResult(gameResult);
}

function formatResult(result) {
  const { win, lose, verb } = result;
  return verb === 'tie'
    ? `<@${win.id}> e <@${lose.id}> empataram com **${win.objectName}**`
    : `**${win.objectName}** de <@${win.id}> ${verb} **${lose.objectName}** de <@${lose.id}>! ${getRandomEmoji()}`;
}

// this is just to figure out winner + verb
const RPSChoices = {
  pedra: {
    description: 'sedimentar, ígnea ou talvez até metamórfica',
    virus: 'espera pacientemente até vencer',
    computador: 'esmaga',
    tesoura: 'quebra',
  },
  cowboy: {
    description: 'yee-haw~',
    tesoura: 'guarda',
    wumpus: 'laça',
    pedra: 'chuta com a biqueira de aço a',
  },
  tesoura: {
    description: 'cuidado! arestas afiadas!!',
    papel: 'corta',
    computador: 'corta o cabo do',
    virus: 'corta o DNA do',
  },
  virus: {
    description: 'mutação genética, malware, ou algo entre os dois',
    cowboy: 'infecta',
    computador: 'corrompe',
    wumpus: 'infecta',
  },
  computador: {
    description: 'bip bop bip bzzrrhggggg',
    cowboy: 'sobrecarrega',
    papel: 'desinstala o firmware do',
    wumpus: 'deleta os arquivos do',
  },
  wumpus: {
    description: 'o mascote roxo do Discord',
    papel: 'desenha uma imagem no',
    pedra: 'pinta um rostinho fofo na',
    tesoura: 'admira o próprio reflexo na',
  },
  papel: {
    description: 'versátil e icônico',
    virus: 'ignora',
    cowboy: 'faz um corte no dedo do',
    pedra: 'cobre',
  },
};

export function getRPSChoices() {
  return Object.keys(RPSChoices);
}

// Function to fetch shuffled options for select menu
export function getShuffledOptions() {
  const allChoices = getRPSChoices();
  const options = [];

  for (let c of allChoices) {
    // Formatted for select menus
    // https://discord.com/developers/docs/components/reference#string-select-select-option-structure
    options.push({
      label: capitalize(c),
      value: c.toLowerCase(),
      description: RPSChoices[c]['description'],
    });
  }

  return options.sort(() => Math.random() - 0.5);
}
