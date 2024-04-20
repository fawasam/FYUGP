export const generalfoundationcourses: {
  no: string;
  name: string;
  no_course: string;
  requiredcredits: string;
}[] = [
  {
    no: "1",
    name: "Ability enhancement course",
    no_course: "4",
    requiredcredits: "12",
  },
  {
    no: "2",
    name: "skill enhancement course",
    no_course: "3",
    requiredcredits: "9",
  },
  {
    no: "3",
    name: "value added course",
    no_course: "3",
    requiredcredits: "9",
  },
  {
    no: "4",
    name: "multi-disciplinary course",
    no_course: "3",
    requiredcredits: "9",
  },
];

export const Desciplinespecificcourses: {
  no: string;
  name: string;
  no_course: string;
  requiredcredits: string;
}[] = [
  {
    no: "1",
    name: "major pathway courses",
    no_course: "17",
    requiredcredits: "68",
  },
  {
    no: "2",
    name: "minor pathway courses",
    no_course: "6",
    requiredcredits: "24",
  },
  {
    no: "3",
    name: "internship/apprenticeship courses",
    no_course: "1",
    requiredcredits: "2",
  },
];
export const minimumnumberofcourses: {
  no: string;
  catogorization_of_courses: string;
  no_coursein3YUG: string;
  no_coursein4YUG: string;
}[] = [
  {
    no: "1",
    catogorization_of_courses: "major [core]",
    no_coursein3YUG: "17",
    no_coursein4YUG: "23",
  },
  {
    no: "2",
    catogorization_of_courses: "minor [complementary]",
    no_coursein3YUG: "6",
    no_coursein4YUG: "8",
  },
  {
    no: "3",
    catogorization_of_courses: "multi-disciplinary courses [MDC]",
    no_coursein3YUG: "3",
    no_coursein4YUG: "3",
  },
  {
    no: "4",
    catogorization_of_courses: "ability enhancement courses [SEC]",
    no_coursein3YUG: "4",
    no_coursein4YUG: "4",
  },
  {
    no: "5",
    catogorization_of_courses: "skill enhancement courses [SEC]",
    no_coursein3YUG: "3",
    no_coursein4YUG: "3",
  },
  {
    no: "6",
    catogorization_of_courses: "value-added couses [VAC]",
    no_coursein3YUG: "3",
    no_coursein4YUG: "3",
  },
  {
    no: "7",
    catogorization_of_courses: "summer internship/field based learning",
    no_coursein3YUG: "1",
    no_coursein4YUG: "1",
  },
  {
    no: "8",
    catogorization_of_courses: "research project/desertation",
    no_coursein3YUG: "-",
    no_coursein4YUG: "1",
  },
  {
    no: "",
    catogorization_of_courses: "Total courses ",
    no_coursein3YUG: "36",
    no_coursein4YUG: "44(47)",
  },
];

export const descipilinespecificcourses: {
  no: string;
  name: string;
  no_course: string;
  requiredcredits: string;
}[] = [
  {
    no: "1",
    name: "Major Advanced / Capstone / PG level Courses",
    no_course: "6",
    requiredcredits: "24",
  },
  {
    no: "2",
    name: "Major Capstone / Research Projector Major Capstone Courses in lieu of Project",
    no_course: "3",
    requiredcredits: "12",
  },
  {
    no: "3",
    name: "Courses in online / blended mode.",
    no_course: "2",
    requiredcredits: "8",
  },
];

export const DSC: {
  no: string;
  Academic_Pathway: string;
  Major: string;
  minor: string;
  MultiDisciplinary_Courses: string;
  Foundation_Courses: string;
  Internship: string;
  Total_Credits: string;
  Example: string;
}[] = [
  {
    no: "1",
    Academic_Pathway: "Single Major(A)",
    Major: "68",
    minor: "24",
    MultiDisciplinary_Courses: "9",
    Foundation_Courses: "30",
    Internship: "2",
    Total_Credits: "133",
    Example:
      "Major: Physics +a set of six courses in the same subject or different subjects",
  },
  {
    no: "2",
    Academic_Pathway: "Major(A) with MultipleDisciplines (B,C)",
    Major: "68",
    minor: "24",
    MultiDisciplinary_Courses: "9",
    Foundation_Courses: "30",
    Internship: "2",
    Total_Credits: "133",
    Example: "Major: Physics +Mathematics andChemistry",
  },
  {
    no: "3",
    Academic_Pathway: "Major(A) with Minor(B)",
    Major: "68",
    minor: "12 + 12",
    MultiDisciplinary_Courses: "9",
    Foundation_Courses: "30 ",
    Internship: "2",
    Total_Credits: "133",
    Example: "Major: Major: Physics Minor: Mathematics",
  },
  {
    no: "4",
    Academic_Pathway: "Major(A) with Vocational Minor(B)",
    Major: "68",
    minor: "12 + 12",
    MultiDisciplinary_Courses: "9",
    Foundation_Courses: "30 ",
    Internship: "2",
    Total_Credits: "133",
    Example: "Major: PhysicsMinor: A vocationalminor",
  },
  {
    no: "5",
    Academic_Pathway: "DoubleMajor(A1, A2)",
    Major: "A1:48,A2:44",
    minor: "-",
    MultiDisciplinary_Courses: "9",
    Foundation_Courses: "30 ",
    Internship: "2",
    Total_Credits: "133",
    Example: "Physics andChemistry double major",
  },
];
