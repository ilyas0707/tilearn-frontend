import { sample, shuffle, times, zip } from "lodash";
//'Ң ң, Ү ү, Ө ө'
import {
  Choice,
  IdentifySymbolTask,
  Lesson,
  MatchingTask,
  TranslateTask,
  TaskType,
} from "../types";
import { words } from "../words/words";

const lessonId = "directions";
const directionLesson = words.filter((el) => el.id === lessonId)[0].wordsMap;

const allDirectionLesson = [
  directionLesson,
  // directionKanji,
  // adjectiveKanji,
  // verbKanji,
  // timeKanji,
  // personKanji,
  // nounKanji,
];

type Translation = () => [string, string[]];

// function randomNumber() {
//   const twoToNine: [string, number][] = [
//     ["", 0],
//     ["эки", 2],
//     ["үч", 3],
//     ["төрт", 4],
//     ["беш", 5],
//     ["алты", 6],
//     ["жети", 7],
//     ["сегиз", 8],
//     ["тогуз", 9],
//   ];
//   const oneToNine: [string, number][] = [["一", 1], ...twoToNine];
//   const larges: [string, number][] = [
//     ["он", 10],
//     ["жүз", 100],
//     ,
//     ["миң", 1000],
//     ["он миң", 10000],
//   ];

//   return larges.reduce(
//     ([totalSymbol, totalNumber], [largeSymbol, largeNumber]) => {
//       if (sample([true, false])) {
//         const [symbol, number] = sample(twoToNine);
//         totalSymbol = [symbol, largeSymbol, totalSymbol].join("");
//         totalNumber = number * largeNumber + totalNumber;
//       }
//       return [totalSymbol, totalNumber];
//     },
//     sample(oneToNine)
//   );
// }

const translations: Translation[] = [
  // (price: [string, number] = randomNumber()) => [
  //   `That's ${price[0]} som.`,
  //   [`Бул ${price[0]} сом.`],
  // ],
  () => [
    `Set the age that I had for two years, and it fits well for three years.`,
    [`Эки жыл болгон жашымды коюп, үч жашка жакшы келет.`],
  ],
  () => [`There are five meters of path.`, [`Беш метр жолу бар.`]],
  () => [
    `After seven days, we started the corresponding cycle.`,
    [`Жети күндөн тийиштүү көчөгүн баштап кеттик.`],
  ],
];

function sequentialRandomizer<TElement>(collection: Iterable<TElement>) {
  const newSequence = () => shuffle(Array.from(collection));
  let sequence = newSequence();

  return () => {
    if (sequence.length == 0) {
      sequence = newSequence();
    }
    return sequence.pop();
  };
}

function randomIdentifySymbolTask(): IdentifySymbolTask {
  const group = sample(allDirectionLesson);
  const symbol = sample(Array.from(group.keys()));
  const groupExpectSymbol = Array.from(group).filter(
    ([key, _]) => key != symbol
  );
  const answer = sample(group.get(symbol));
  const choices = shuffle(
    times(3, () => {
      return { text: sample(groupExpectSymbol.pop()[1]) };
    }).concat([{ text: answer }])
  );

  const type = TaskType.IdentifySymbol;

  return { symbol, choices, answer, type };
}

function randomMatchingTask(): MatchingTask {
  const randomPair = sequentialRandomizer(sample(allDirectionLesson));
  const answers = new Map(
    times(5, () => {
      const [key, value] = randomPair();
      return [key, sample(value)];
    })
  );
  const choices = new Map(
    zip(
      shuffle(Array.from(answers.keys()).map((text) => ({ text } as Choice))),
      shuffle(Array.from(answers.values()).map((text) => ({ text } as Choice)))
    )
  );
  const type = TaskType.Matching;

  return { answers, choices, type };
}

function randomTranslateTask(): TranslateTask {
  const [text, answers] = sample(translations)();
  const type = TaskType.Translate;

  return { text, answers, type };
}

const directions: Lesson = {
  id: "directions",
  title: "Directions",
  text: "Direction words are terms that provide information about the relative position or location of something. These words are essential in describing and understanding spatial relationships.",
  points: 50,
  color: "#ffff80",
  activity: {
    generator: () =>
      shuffle([
        ...times(6).map(randomIdentifySymbolTask),
        ...times(6).map(randomMatchingTask),
        ...times(3).map(randomTranslateTask),
      ]),
  },
};

export default directions;
