import React from "react";
import { FlashcardArray } from "react-quizlet-flashcard";

export const WordPage = ({ words }) => {
  const cards = words.map(({ wordsMap }, i) =>
    Array.from(wordsMap, function (entry) {
      return {
        id: i,
        frontHTML: <p>{entry[1][0]}</p>,
        backHTML: <p>{entry[0]}</p>,
      };
    })
  );

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <FlashcardArray
        frontContentStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "40px",
        }}
        backContentStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "40px",
        }}
        cards={cards[0]}
      />
    </div>
  );
};
