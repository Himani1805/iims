import { Flex, Switch } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import PreTimeTable from "./admin/Academic/PreTimeTable";
import TTCourseList from "./admin/Academic/TTCourseList";
import StudyMaterialMapping from "./admin/Academic/StudyMaterialMapping";
import StudyMaterial from "./admin/Academic/StudyMaterial";
import ViewTimetable from "./admin/Academic/ViewTimetable";

export default function Redirect() {
  const url = useParams();
  let render = null;
  console.log(url.name);

  switch (url.name) {
    case "pretimetable":
      console.log("Hello", url.name);
      render = <PreTimeTable />;
      break;
    case "ttcourselist":
      render = <TTCourseList />;
      break;
    case "studymaterialmapping":
      render = <StudyMaterialMapping />;
      break;
    case "studymaterial":
      render = <StudyMaterial />;
      break;
    case "viewtimetable":
      render = <ViewTimetable />;
      break;
    case "viewtimetable":
      render = <ViewTimetable />;
      break;
    case "viewtimetable":
      render = <ViewTimetable />;
      break;
    case "viewtimetable":
      render = <ViewTimetable />;
      break;
    case "viewtimetable":
      render = <ViewTimetable />;
      break;
    case "viewtimetable":
      render = <ViewTimetable />;
      break;
    case "viewtimetable":
      render = <ViewTimetable />;
      break;
    case "viewtimetable":
      render = <ViewTimetable />;
      break;
    case "viewtimetable":
      render = <ViewTimetable />;
      break;
    case "viewtimetable":
      render = <ViewTimetable />;
      break;
    case "viewtimetable":
      render = <ViewTimetable />;
      break;
    case "viewtimetable":
      render = <ViewTimetable />;
      break;
    case "viewtimetable":
      render = <ViewTimetable />;
      break;
    case "viewtimetable":
      render = <ViewTimetable />;
      break;
    case "viewtimetable":
      render = <ViewTimetable />;
      break;
    case "viewtimetable":
      render = <ViewTimetable />;
      break;

    default:
      render = (
        <Flex>
          <h1>Not Found</h1>
        </Flex>
      );
      break;
  }
  return render;
}
