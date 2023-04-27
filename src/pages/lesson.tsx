import { Card, CardBody } from "grommet";
import React from "react";
import { Lesson } from "../db/types";
import Activity from "../activity";

type Props = {
  lesson: Lesson;
};

function LessonPage(props: Props): JSX.Element {
  const { lesson } = props;
  const { title, activity } = lesson;

  return (
    <Card fill background='light-1'>
      <CardBody pad='large' overflow='scroll'>
        <Activity activity={activity} />
      </CardBody>
    </Card>
  );
}

export default LessonPage;
