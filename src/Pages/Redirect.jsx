import { Flex, Switch } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import PreTimeTable from "./admin/Academic/PreTimeTable";
import TTCourseList from "./admin/Academic/TTCourseList";
import StudyMaterialMapping from "./admin/Academic/StudyMaterialMapping";
import StudyMaterial from "./admin/Academic/StudyMaterial";
import ViewTimetable from "./admin/Academic/ViewTimetable";
import TimeTable from "./admin/Academic/TimeTable";
import StudentAttendanceRegister from "./admin/Academic/StudentAttendanceRegister";
import SessionPlan from "./admin/Academic/SessionPlan";
import SchoolTimeTable from "./admin/Academic/SchoolTimeTable";
import SetUpSchoolReport from "./admin/Academic/SetUpSchoolReport";
import TutCourseBatches from "./admin/Academic/TutCourseBatches";
import CourseBatches from "./admin/Academic/CourseBatches";
import CourseFeedbackQuestion from "./admin/Academic/CourseFeedbackQuestion";
import SlowFastLearner from "./admin/Academic/SlowFastLearner";
import RoomTimeTable from "./admin/Academic/RoomTimeTable";
import AlternativeArrangement from "./admin/Academic/AlternativeArrangement";
import SyllabusTopicList from "./admin/Academic/SyllabusTopicList";
import CourseAssignment from "./admin/Academic/CourseAssignment";
import BulkAttendance from "./admin/Academic/BulkAttendance";
import ParmarshPortal from "./admin/Administrator/ParamarshPortal";
import QuizBytePortal from "./admin/Administrator/QuizBytePortal";
import PhysicalSurveillanceReport from "./admin/Administrator/PhysicalSurveillanceReport";
import SlotMaster from "./admin/Administrator/SlotMaster";
import RoomAssignment from "./admin/Administrator/RoomAssignment";
import FacultyLoadReport from "./admin/Administrator/FacultyLoadReport";
import AcademicReport from "./admin/Administrator/AcademicReport";
import HolidayMaster from "./admin/Administrator/HolidayMaster";
import MethodologyActivities from "./admin/Administrator/MethodologyActivities";
import TimeTableReport from "./admin/Administrator/TimeTableReport";
import AttendanceNotTakenReport from "./admin/Administrator/AttendanceNotTakenReport";
import AcademicCalendar from "./admin/Administrator/AcademicCalendar";
import AttendanceApprovalCases from "./admin/Administrator/AttendanceApprovalCases";
import ProgramSemesterSections from "./admin/Administrator/ProgramSemesterSections";
import IPAddress from "./admin/Administrator/IPAddress";
import StudentEventAttendance from "./admin/Administrator/StudentEventAttendance";
import AttendanceRemarks from "./admin/Administrator/AttendanceRemarks";
import FacultySlotReport from "./admin/Administrator/FacultySlotReport";
import HelpSupport from "./admin/Administrator/HelpSupport";
import CourseSlotAssignment from "./admin/Administrator/CourseSlotAssignment";
import QuestionBankDashboard from "./admin/Administrator/QuestionBankDashboard";
import BtlKeywords from "./admin/Administrator/BtlKeywords";
import MyInOut from "./admin/Administrator/MyInOut";
import History from "./admin/Administrator/History";
import AllowedMyIP from "./admin/Administrator/AllowedMyIP";
import CreateTicket from "./admin/Administrator/CreateTicket";
import Sop from "./admin/Administrator/Sop";
import Help from "./admin/Administrator/Help";


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
    case "timetable":
      render = <TimeTable />;
      break;
    case "studentattendanceregister":
      render = <StudentAttendanceRegister />;
      break;
    case "sessionplan":
      render = <SessionPlan />;
      break;
    case "schooltimetable":
      render = <SchoolTimeTable />;
      break;
    case "setupschoolreport":
      render = <SetUpSchoolReport />;
      break;
    case "tutcoursebatches":
      render = <TutCourseBatches />;
      break;
    case "coursebatches":
      render = <CourseBatches />;
      break;
    case "coursefeedbackquestion":
      render = <CourseFeedbackQuestion />;
      break;
    case "slowfastlearner":
      render = <SlowFastLearner />;
      break;
    case "roomtimetable":
      render = <RoomTimeTable />;
      break;
    case "alternativearrangement":
      render = <AlternativeArrangement />;
      break;
    case "syllabustopiclist":
      render = <SyllabusTopicList />;
      break;
    case "courseassignment":
      render = <CourseAssignment />;
      break;
    case "bulkattendance":
      render = <BulkAttendance />;
      break;

    case "paramarshportal":
      render = <ParmarshPortal />;
      break;
    case "quizbyteportal":
      render = <QuizBytePortal />;
      break;
    case "physicalsurveillancereport":
      render = <PhysicalSurveillanceReport />;
      break;
    case "slotmaster":
      render = <SlotMaster />;
      break;
    case "roomassignment":
      render = <RoomAssignment />;
      break;
    case "facultyloadreport":
      render = <FacultyLoadReport />;
      break;
    case "academicereport":
      render = <AcademicReport />;
      break;
    case "holidaymaster":
      render = <HolidayMaster />;
      break;
    case "methodologyactivities":
      render = <MethodologyActivities />;
      break;
    case "timetablereport":
      render = <TimeTableReport />;
      break;
    case "attendancenottakenreport":
      render = <AttendanceNotTakenReport />;
      break;
    case "academiccalender":
      render = <AcademicCalendar />;
      break;
    case "attendanceapprovalcases":
      render = <AttendanceApprovalCases />;
      break;
    case "programsemestersections":
      render = <ProgramSemesterSections />;
      break;
    case "ipaddress":
      render = <IPAddress />;
      break;
    case "studenteventattendance":
      render = <StudentEventAttendance />;
      break;
    case "attendanceremarks":
      render = <AttendanceRemarks />;
      break;
    case "facultyslotreport":
      render = <FacultySlotReport />;
      break;

    case "helpsupport":
      render = <HelpSupport />;
      break;
    case "courseslotassignment":
      render = <CourseSlotAssignment />;
      break;
    case "questionbankdashboard":
      render = <QuestionBankDashboard />;
      break;
    case "btlkeywords":
      render = <BtlKeywords />;
      break;
    case "myinout":
      render = <MyInOut />;
      break;
    case "history":
      render = <History />;
      break;
    case "allowedmyip":
      render = <AllowedMyIP />;
      break;
    case "createticket":
      render = <CreateTicket />;
      break;
    case "sop":
      render = <Sop />;
      break;
    case "help":
      render = <Help />;
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
