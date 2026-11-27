import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { User } from "./models/User.js";
import { Record } from "./models/Record.js";

dotenv.config();

const MODULES = [
  "pretimetable","ttcourselist","studymaterialmapping","studymaterial","viewtimetable","timetable","studentattendanceregister","sessionplan","schooltimetable","setupschoolreport","tutcoursebatches","coursebatches","coursefeedbackquestion","slowfastlearner","roomtimetable","alternativearrangement","syllabustopiclist","courseassignment","bulkattendance","paramarshportal","quizbyteportal","physicalsurveillancereport","slotmaster","roomassignment","facultyloadreport","academicereport","holidaymaster","methodologyactivities","timetablereport","attendancenottakenreport","academiccalender","attendanceapprovalcases","programsemestersections","ipaddress","studenteventattendance","attendanceremarks","facultyslotreport","helpsupport","courseslotassignment","questionbankdashboard","btlkeywords","myinout","history","allowedmyip","createticket","sop","help"
];

const NO_ACADEMIC = new Set(["createticket","helpsupport","help","ipaddress","allowedmyip","btlkeywords","holidaymaster","myinout","history","sop","paramarshportal","quizbyteportal"]);

const institutions = ["Himani Institute of Management Studies","HS Learning Center"];
const schools = ["School of Business & Management","School of Computing & IT","School of Design & Media","School of Humanities"];
const departments = ["Management","IT","HR","Admin","Faculty","Finance"];
const years = ["2024 - 25","2025 - 26","2026 - 27"];
const programmeTypes = ["General Programme","Special Programme"];
const programmes = ["Master of Business Administration","Bachelor of Business Administration","Bachelor of Computer Applications","Master of Computer Applications","Bachelor of Commerce (Hons)"];
const semesters = ["Semester 1","Semester 2","Semester 3","Semester 4","Semester 5","Semester 6"];
const sections = ["A","B","C","D","E"];
const faculties = ["Himani Sharma","Rahul Mehta","Neha Verma","Amit Joshi","Priya Nair","Karan Singh"];
const students = ["Aarav Patel","Ishita Kapoor","Rohan Gupta","Ananya Sharma","Vivaan Shah","Diya Malhotra","Kabir Khan","Meera Iyer"];
const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const slots = ["09:00-10:00","10:00-11:00","11:00-12:00","12:00-13:00","14:00-15:00","15:00-16:00"];
const rooms = ["A-101","B-201","C-105","Lab-1","Lab-2","Seminar Hall"];
const statuses = ["Present","Absent","Late","On Leave","Approved","Pending"];
const priorities = ["Low","Medium","High"];
const holidays = ["Republic Day","Holi","Diwali Break","Independence Day","Gandhi Jayanti","Christmas","New Year","Founders Day"];
const PER_MODULE = 18;

function pick(list, i) { return list[i % list.length]; }
function dateOffset(i) {
  const d = new Date("2026-11-01T00:00:00.000Z");
  d.setUTCDate(d.getUTCDate() + (i % 28));
  return d.toISOString().slice(0, 10);
}
function academicBase(i) {
  return {
    Institution: pick(institutions, i),
    School: pick(schools, i),
    Department: pick(departments, i),
    AcademicYear: pick(years, i),
    ProgrammeType: pick(programmeTypes, i),
    Programme: pick(programmes, i),
    Semester: pick(semesters, i),
    Section: pick(sections, i),
  };
}

function buildData(moduleKey, i) {
  const n = i + 1;
  const base = NO_ACADEMIC.has(moduleKey) ? {} : academicBase(i);

  if (["pretimetable","timetable","viewtimetable","schooltimetable","roomtimetable","slotmaster","courseslotassignment","roomassignment"].includes(moduleKey)) {
    return { ...base, Faculty: pick(faculties, i), Course: `HS${1000 + ((i * 7) % 200)}`, Day: pick(days, i), Slot: pick(slots, i), Room: pick(rooms, i), Notes: `${moduleKey} entry #${n}` };
  }
  if (["studymaterial","studymaterialmapping","sessionplan","syllabustopiclist"].includes(moduleKey)) {
    return { ...base, Title: `${moduleKey} topic ${n}`, Link: `https://example.com/${moduleKey}/${n}`, Course: `HS${2000 + (i % 50)}`, Notes: `Resource pack ${n}` };
  }
  if (["studentattendanceregister","bulkattendance","studenteventattendance","attendanceremarks","attendancenottakenreport","attendanceapprovalcases"].includes(moduleKey)) {
    return { ...base, Student: pick(students, i), Date: dateOffset(i), Status: pick(statuses, i), Notes: `Attendance note ${n}` };
  }
  if (["ttcourselist","courseassignment","coursebatches","tutcoursebatches","slowfastlearner","facultyloadreport","facultyslotreport"].includes(moduleKey)) {
    return { ...base, Faculty: pick(faculties, i), Course: `HS${3000 + (i % 80)}`, Notes: `Faculty load item ${n}` };
  }
  if (moduleKey === "holidaymaster" || moduleKey === "academiccalender") {
    return { HolidayName: `${pick(holidays, i)} ${n}`, Date: dateOffset(i), Notes: `Calendar item ${n}` };
  }
  if (moduleKey === "createticket" || moduleKey === "helpsupport" || moduleKey === "help") {
    return { Subject: `Support request ${n}`, Priority: pick(priorities, i), Description: `Auto-generated ticket for ${moduleKey} #${n}` };
  }
  if (moduleKey === "ipaddress" || moduleKey === "allowedmyip") {
    return { IPAddress: `192.168.${(i % 20) + 1}.${(i % 200) + 10}`, Title: `Device ${n}`, Notes: `Allowed network entry ${n}` };
  }
  if (moduleKey === "btlkeywords") {
    return { Keyword: `keyword_${n}`, Description: `Bloom taxonomy keyword sample ${n}` };
  }
  if (moduleKey === "coursefeedbackquestion" || moduleKey === "questionbankdashboard") {
    return { ...base, Question: `Sample question ${n} for course feedback?`, Course: `HS${4000 + (i % 40)}`, Notes: `Question bank item ${n}` };
  }
  if (moduleKey === "methodologyactivities") {
    return { ...base, Activity: `Activity ${n}`, Date: dateOffset(i), Notes: `Methodology note ${n}` };
  }
  if (moduleKey === "alternativearrangement") {
    return { ...base, Faculty: pick(faculties, i), Date: dateOffset(i), Slot: pick(slots, i), Room: pick(rooms, i), Notes: `Alternate class ${n}` };
  }
  if (moduleKey === "myinout" || moduleKey === "history") {
    return { Date: dateOffset(i), Status: pick(["IN","OUT","Checked","Updated"], i), Notes: `Log entry ${n}` };
  }
  if (moduleKey === "sop") {
    return { Title: `SOP Document ${n}`, Description: `Standard operating procedure details for process ${n}` };
  }
  if (NO_ACADEMIC.has(moduleKey)) {
    return { Notes: `${moduleKey} demo record ${n}`, Title: `${moduleKey} item ${n}` };
  }
  return { ...base, Notes: `${moduleKey} demo record ${n}` };
}

async function seedData() {
  await connectDB(process.env.MONGO_URI);
  let admin = await User.findOne({ email: "himani@hsacademic.com" });
  if (!admin) {
    admin = await User.create({ name: "Himani Sharma", email: "himani@hsacademic.com", password: "admin123", role: "admin" });
    console.log("Admin created");
  }
  await Record.deleteMany({});
  const docs = [];
  for (const moduleKey of MODULES) {
    for (let i = 0; i < PER_MODULE; i += 1) {
      docs.push({ moduleKey, data: buildData(moduleKey, i), createdBy: admin._id });
    }
  }
  await Record.insertMany(docs);
  console.log(`Seeded ${docs.length} records across ${MODULES.length} modules (${PER_MODULE} each)`);
  process.exit(0);
}

seedData().catch((error) => { console.error(error); process.exit(1); });
