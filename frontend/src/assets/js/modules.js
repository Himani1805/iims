import { academic } from "./Academic";
import { admin } from "./Admin";

export const ACADEMIC_FIELD_KEYS = [
  "Institution",
  "School",
  "Department",
  "AcademicYear",
  "ProgrammeType",
  "Programme",
  "Semester",
  "Section",
];

const EXTRA = {
  notes: { key: "Notes", label: "Notes", type: "text" },
  title: { key: "Title", label: "Title", type: "text" },
  link: { key: "Link", label: "Resource Link", type: "text" },
  faculty: { key: "Faculty", label: "Faculty Name", type: "text" },
  course: { key: "Course", label: "Course Code", type: "text" },
  room: { key: "Room", label: "Room", type: "text" },
  day: { key: "Day", label: "Day", type: "text" },
  slot: { key: "Slot", label: "Slot / Time", type: "text" },
  date: { key: "Date", label: "Date", type: "date" },
  status: { key: "Status", label: "Status", type: "text" },
  student: { key: "Student", label: "Student Name", type: "text" },
  subject: { key: "Subject", label: "Subject", type: "text" },
  priority: { key: "Priority", label: "Priority", type: "text" },
  description: { key: "Description", label: "Description", type: "textarea" },
  ip: { key: "IPAddress", label: "IP Address", type: "text" },
  holiday: { key: "HolidayName", label: "Holiday Name", type: "text" },
  activity: { key: "Activity", label: "Activity", type: "text" },
  keyword: { key: "Keyword", label: "Keyword", type: "text" },
  question: { key: "Question", label: "Question", type: "textarea" },
};

const NO_ACADEMIC = new Set([
  "createticket",
  "helpsupport",
  "help",
  "ipaddress",
  "allowedmyip",
  "btlkeywords",
  "holidaymaster",
  "myinout",
  "history",
  "sop",
  "paramarshportal",
  "quizbyteportal",
]);

function extrasFor(key) {
  if (
    [
      "pretimetable",
      "timetable",
      "viewtimetable",
      "schooltimetable",
      "roomtimetable",
      "slotmaster",
      "courseslotassignment",
      "roomassignment",
    ].includes(key)
  ) {
    return [EXTRA.faculty, EXTRA.course, EXTRA.day, EXTRA.slot, EXTRA.room, EXTRA.notes];
  }
  if (
    ["studymaterial", "studymaterialmapping", "sessionplan", "syllabustopiclist"].includes(key)
  ) {
    return [EXTRA.title, EXTRA.link, EXTRA.course, EXTRA.notes];
  }
  if (
    [
      "studentattendanceregister",
      "bulkattendance",
      "studenteventattendance",
      "attendanceremarks",
      "attendancenottakenreport",
      "attendanceapprovalcases",
    ].includes(key)
  ) {
    return [EXTRA.student, EXTRA.date, EXTRA.status, EXTRA.notes];
  }
  if (
    [
      "ttcourselist",
      "courseassignment",
      "coursebatches",
      "tutcoursebatches",
      "slowfastlearner",
      "facultyloadreport",
      "facultyslotreport",
    ].includes(key)
  ) {
    return [EXTRA.faculty, EXTRA.course, EXTRA.notes];
  }
  if (key === "holidaymaster" || key === "academiccalender") {
    return [EXTRA.holiday, EXTRA.date, EXTRA.notes];
  }
  if (key === "createticket" || key === "helpsupport" || key === "help") {
    return [EXTRA.subject, EXTRA.priority, EXTRA.description];
  }
  if (key === "ipaddress" || key === "allowedmyip") {
    return [EXTRA.ip, EXTRA.title, EXTRA.notes];
  }
  if (key === "btlkeywords") {
    return [EXTRA.keyword, EXTRA.description];
  }
  if (key === "coursefeedbackquestion" || key === "questionbankdashboard") {
    return [EXTRA.question, EXTRA.course, EXTRA.notes];
  }
  if (key === "methodologyactivities") {
    return [EXTRA.activity, EXTRA.date, EXTRA.notes];
  }
  if (key === "alternativearrangement") {
    return [EXTRA.faculty, EXTRA.date, EXTRA.slot, EXTRA.room, EXTRA.notes];
  }
  if (key === "myinout" || key === "history") {
    return [EXTRA.date, EXTRA.status, EXTRA.notes];
  }
  if (key === "sop") {
    return [EXTRA.title, EXTRA.description];
  }
  return [EXTRA.notes];
}

export const moduleConfig = {};

[...academic, ...admin].forEach((item) => {
  const key = item.endPoint;
  moduleConfig[key] = {
    key,
    title: item.title,
    academicFields: !NO_ACADEMIC.has(key),
    fields: extrasFor(key),
  };
});

export function getModuleConfig(endpoint) {
  return (
    moduleConfig[endpoint] || {
      key: endpoint,
      title: endpoint,
      academicFields: true,
      fields: [EXTRA.notes],
    }
  );
}
