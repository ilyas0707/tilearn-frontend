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

const lessonId = "numbers";
const numberLesson = words.filter((el) => el.id === lessonId)[0].wordsMap;

// const directionKanji = new Map([
//   ["Түндүк", ["North"]],
//   ["Чыгыш", ["East"]],
//   ["Батыш", ["West"]],
//   ["Түштүк", ["South"]],
//   ["Сол", ["Left"]],
//   ["Оң", ["Right"]],
//   ["Жогоруда", ["Above"]],
//   ["Төмөндө", ["Below"]],
//   ["Ичинде", ["Inside"]],
//   ["Артта", ["Behind"]],
// ]);

// const adjectiveKanji = new Map([
//   ["Эски", ["Old"]],
//   ["Бийик", ["High"]],
//   ["Арзан", ["Cheap"]],
//   ["Чоң", ["Big"]],
//   ["Кичинекей", ["Small"]],
//   ["Көптөр", ["Many"]],
//   ["Жаңы", ["New"]],
//   ["Аз", ["Few"]],
//   ["Узун", ["Long"]],
//   ["Кыска", ["Short"]],
// ]);

// const verbKanji = new Map([
//   ["Баруу", ["Go"]],
//   ["Көрүү", ["See"]],
//   ["Айтуу", ["Say"]],
//   ["Ичүү", ["Drink"]],
//   ["Жолугушуу", ["Meet"]],
//   ["Үйрөнүү", ["Study", "Learn"]],
//   ["Эс алуу", ["Rest"]],
//   ["Сатып алуу", ["Buy"]],
//   ["Угуу", ["Listen"]],
//   ["Келүү", ["Come"]],
//   ["Сүйлөшүү", ["Talk"]],
//   ["Чыгуу", ["Leave"]],
//   ["Окуу", ["Read"]],
//   ["Жазуу", ["Write"]],
// ]);

// const timeKanji = new Map([
//   ["Күн", ["Day"]],
//   ["Ай", ["Month"]],
//   ["Түшкө маал", ["Noon"]],
//   ["Жарымы", ["Half"]],
//   ["Бөлүгү", ["Part"]],
//   ["Убакыт", ["Time"]],
//   ["Аралык", ["Interval"]],
//   ["Жума", ["Week"]],
//   ["Жыл", ["Year"]],
//   ["Азыр", ["Now"]],
//   ["Мурун", ["Before"]],
//   ["Ар бири", ["Each"]],
// ]);

// const personKanji = new Map([
//   ["Көз", ["Eye"]],
//   ["Ооз", ["Mouth"]],
//   ["Кулак", ["Ear"]],
//   ["Кол", ["Hand"]],
//   ["Бут", ["Foot"]],
// ]);

// const nounKanji = new Map([
//   ["水", ["Water"]],
//   ["火", ["Fire"]],
//   ["木", ["Tree"]],
//   ["天", ["Sky"]],
//   ["土", ["Earth"]],
//   ["花", ["Flower"]],
//   ["魚", ["Fish"]],
//   ["犬", ["Dog"]],
//   ["猫", ["Cat"]],
//   ["空", ["Sky", "Air"]],
//   ["山", ["Mountain"]],
//   ["川", ["River"]],
//   ["雨", ["Rain"]],
//   ["本", ["Book"]],
//   ["何", ["What"]],
//   ["立", ["Stand"]],
//   ["生", ["Life"]],
//   ["店", ["Shop"]],
//   ["外", ["Outside"]],
//   ["電", ["Electricity"]],
//   ["道", ["Road"]],
//   ["友", ["Friend"]],
//   ["名", ["Name"]],
//   ["金", ["Gold"]],
//   ["円", ["Circle", "Yen"]],
//   ["車", ["Car"]],
//   ["駅", ["Station"]],
//   ["気", ["Spirit", "Mind"]],
//   ["国", ["Country"]],
//   ["社", ["Company", "Shrine"]],
//   ["校", ["School"]],
//   ["語", ["Word"]],
// ]);

const allNumberLesson = [
  numberLesson,
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
  const group = sample(allNumberLesson);
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
  const randomPair = sequentialRandomizer(sample(allNumberLesson));
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

const numbers: Lesson = {
  id: "numbers",
  title: "Numbers",
  text: "Numbers are an essential part of our lives, and we use them in almost every aspect of our daily routine. From counting the number of steps we take to calculating our monthly expenses, numbers play a vital role in keeping us organized and on track.",
  points: 50,
  color: "#5fd3bc",
  activity: {
    generator: () =>
      shuffle([
        ...times(6).map(randomIdentifySymbolTask),
        ...times(6).map(randomMatchingTask),
        ...times(3).map(randomTranslateTask),
      ]),
  },
};

export default numbers;
