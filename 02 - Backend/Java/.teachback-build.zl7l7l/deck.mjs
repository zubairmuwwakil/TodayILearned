import fs from "node:fs/promises";
import path from "node:path";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

import { buildSlide01 } from "./codex-grid/slide-01.mjs";
import { buildSlide05 } from "./codex-grid/slide-05.mjs";
import { buildSlide06 } from "./codex-grid/slide-06.mjs";
import { buildSlide11 } from "./codex-grid/slide-11.mjs";
import { buildSlide13 } from "./codex-grid/slide-13.mjs";
import { buildSlide17 } from "./codex-grid/slide-17.mjs";
import { buildSlide26 } from "./codex-grid/slide-26.mjs";

const TMP_DIR =
  "/Users/zub/Library/CloudStorage/OneDrive-Personal/Documents/Obsidian/50 Resources/Sofware Engineering/Java/.teachback-build.zl7l7l";
const FINAL_PPTX =
  "/Users/zub/Library/CloudStorage/OneDrive-Personal/Documents/Obsidian/50 Resources/Sofware Engineering/Java/Teachback Deliverables/Fundamentals of OOP - Inheritance and Polymorphism Teachback.pptx";

const COLORS = {
  ink: "#000000",
  white: "#FFFFFF",
  panel: "#EDEDED",
  panelSoft: "#F6F6F6",
  rule: "#B8BCC4",
  accent: "#6DCBF4",
  accentSoft: "#D0EDFA",
  accentStrong: "#3D8DFF",
  green: "#14804A",
  red: "#B42318",
  muted: "#5E6470",
};

const FONT = "Helvetica Neue";
const CODE_FONT = "Menlo";

const kw = (run) => ({
  run,
  textStyle: {
    bold: true,
    color: COLORS.accentStrong,
    typeface: CODE_FONT,
  },
});

const lit = (run) => ({
  run,
  textStyle: {
    color: "#9A4D00",
    typeface: CODE_FONT,
  },
});

const comment = (run) => ({
  run,
  textStyle: {
    italic: true,
    color: COLORS.muted,
    typeface: CODE_FONT,
  },
});

const code = (run) => ({
  run,
  textStyle: {
    color: COLORS.ink,
    typeface: CODE_FONT,
  },
});

function addText(slide, name, textValue, position, style = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    name,
    position,
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  shape.text = textValue;
  shape.text.style = {
    fontSize: 26,
    typeface: FONT,
    color: COLORS.ink,
    alignment: "left",
    verticalAlignment: "top",
    autoFit: "none",
    insets: { top: 0, right: 0, bottom: 0, left: 0 },
    ...style,
  };
  return shape;
}

function addPanel(slide, name, position, fill = COLORS.panelSoft, line = COLORS.rule) {
  return slide.shapes.add({
    geometry: "rect",
    name,
    position,
    fill,
    line: { style: "solid", fill: line, width: 1 },
  });
}

function addKicker(slide, textValue, left = 41.33, top = 132, width = 600) {
  return addText(
    slide,
    `Kicker-${textValue.replaceAll(" ", "-")}`,
    textValue,
    { left, top, width, height: 32 },
    {
      fontSize: 19,
      bold: true,
      color: COLORS.accentStrong,
      verticalAlignment: "middle",
    },
  );
}

function addCodeBlock(
  slide,
  name,
  position,
  lines,
  {
    highlightLines = [],
    fontSize = 21,
    lineHeight = 28,
    fill = COLORS.panelSoft,
  } = {},
) {
  addPanel(slide, `${name}-Background`, position, fill, COLORS.rule);

  for (const lineIndex of highlightLines) {
    slide.shapes.add({
      geometry: "rect",
      name: `${name}-Highlight-${lineIndex + 1}`,
      position: {
        left: position.left + 9,
        top: position.top + 13 + lineIndex * lineHeight,
        width: position.width - 18,
        height: lineHeight - 1,
      },
      fill: COLORS.accentSoft,
      line: { style: "solid", fill: "none", width: 0 },
    });
  }

  const textShape = slide.shapes.add({
    geometry: "textbox",
    name,
    position: {
      left: position.left + 16,
      top: position.top + 12,
      width: position.width - 32,
      height: position.height - 24,
    },
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });

  textShape.text = lines.map((runs) => ({
    runs,
    paragraphStyle: {
      lineSpacingPercent: 92000,
      spaceAfter: 0,
      spaceBefore: 0,
    },
  }));
  textShape.text.style = {
    fontSize,
    typeface: CODE_FONT,
    color: COLORS.ink,
    autoFit: "none",
    insets: { top: 0, right: 0, bottom: 0, left: 0 },
  };
  return textShape;
}

function addFlowStep(slide, name, x, y, width, title, detail, fill) {
  addPanel(
    slide,
    `${name}-Panel`,
    { left: x, top: y, width, height: 94 },
    fill,
    COLORS.rule,
  );
  addText(
    slide,
    `${name}-Title`,
    title,
    { left: x + 14, top: y + 16, width: width - 28, height: 28 },
    { fontSize: 18, bold: true, typeface: CODE_FONT },
  );
  addText(
    slide,
    `${name}-Detail`,
    detail,
    { left: x + 14, top: y + 53, width: width - 28, height: 24 },
    { fontSize: 15, color: COLORS.muted },
  );
}

function setNotes(slide, paragraphs, sources = []) {
  const notes = [
    ...paragraphs,
    "",
    "[Sources]",
    ...(sources.length > 0 ? sources : ["No external sources; original framing."]),
    "[/Sources]",
  ];
  slide.speakerNotes.textFrame.setText(notes);
  slide.speakerNotes.setVisible(true);
}

function blankTwoColumnTokens(title, footer) {
  return {
    title,
    footer1: footer,
    body1: {
      titleHere: "",
      loremIpsumDolorSitAmetConsecteturAdipiscing: "",
    },
    body2: {
      titleHere: "",
      loremIpsumDolorSitAmetConsecteturAdipiscing: "",
    },
  };
}

function blankThreeColumnTokens(title, footer) {
  return {
    title,
    footer1: footer,
    body1: {
      titleHere: "",
      loremIpsumDolorSitAmetConsecteturAdipiscing: "",
    },
    body2: {
      titleHere: "",
      loremIpsumDolorSitAmetConsecteturAdipiscing: "",
    },
    body3: {
      titleHere: "",
      loremIpsumDolorSitAmetConsecteturAdipiscing: "",
    },
  };
}

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

async function main() {
  const presentation = Presentation.create({
    slideSize: { width: 1280, height: 720 },
  });

  // Slide 1 — cover.
  const slide1 = buildSlide01(presentation, {
    title: "JAVA 25 TEACHBACK",
    title2: "Fundamentals of OOP:\nInheritance & Polymorphism",
    title3: "One family. Different voices.",
  });
  setNotes(slide1, [
    "Timing: 0:30",
    "Open simply: Today I am breaking down inheritance and polymorphism from the ground up.",
    "These concepts confused me because they are almost always demonstrated together. My goal is to show both why they are connected and exactly where they differ.",
    "The entire presentation will use one classroom example: Human as the parent class, with Student and Teacher as subclasses.",
  ]);

  // Slide 2 — opening definition and distinction.
  const slide2 = buildSlide11(presentation, {
    title: "One sentence hides several foundations",
    footer1: "2",
    body1: {
      topic:
        "Runtime polymorphism lets a supertype reference point to subtype objects, while an overridden instance method is selected from the runtime object’s class.",
      loremIpsumDolorSitAmetConsecteturAdipiscing: "",
      loremIpsumDolorSitAmetConsecteturAdipiscing2: "",
    },
    body2: "Inheritance\nbuilds the relationship",
    body3: "Polymorphism\nuses the relationship",
    body4: {
      detailGoesHere: "class → subtype",
      detailGoesHere2: "shared state and behavior",
      detailGoesHere3: "",
    },
    body5: {
      detailGoesHere: "one shared reference type",
      detailGoesHere2: "runtime behavior can differ",
      detailGoesHere3: "",
    },
  });
  setNotes(
    slide2,
    [
      "Timing: 1:15",
      "Read the definition once, but do not try to explain every phrase yet.",
      "Say: This sounded circular to me at first. To understand polymorphism, I needed to understand the reference, the object, the type relationship, and overriding.",
      "That is why I am taking a ground-up approach. I will unpack each load-bearing term and then rebuild this exact definition.",
      "Preview the distinction: inheritance creates the relationship between classes; polymorphism is a runtime use of that relationship.",
    ],
    [
      "https://docs.oracle.com/javase/specs/jls/se25/html/jls-1.html",
      "https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html#jls-15.12.4.4",
    ],
  );

  // Slide 3 — class and object.
  const slide3 = buildSlide05(
    presentation,
    blankTwoColumnTokens("A class describes; an object exists", "3"),
  );
  addCodeBlock(
    slide3,
    "Human-Class-Code",
    { left: 41, top: 190, width: 582, height: 390 },
    [
      [kw("class"), code(" Human {")],
      [code("    "), kw("private final"), code(" String name;")],
      [code("")],
      [code("    "), kw("void"), code(" useSenses() { ... }")],
      [code("    "), kw("void"), code(" communicate(String message) { ... }")],
      [code("}")],
    ],
    { highlightLines: [1, 3, 4], fontSize: 18.5, lineHeight: 30 },
  );
  addText(
    slide3,
    "Class-Labels",
    "CLASS\nA user-defined type that describes state and behavior.",
    { left: 59, top: 601, width: 540, height: 74 },
    { fontSize: 21, bold: false },
  );
  addPanel(
    slide3,
    "Object-Zub",
    { left: 675, top: 210, width: 535, height: 132 },
    COLORS.accentSoft,
  );
  addText(
    slide3,
    "Object-Zub-Code",
    'new Human("Zub")',
    { left: 702, top: 233, width: 470, height: 42 },
    { fontSize: 29, bold: true, typeface: CODE_FONT },
  );
  addText(
    slide3,
    "Object-Zub-Detail",
    "one object • name = “Zub”",
    { left: 702, top: 288, width: 470, height: 32 },
    { fontSize: 20, color: COLORS.muted },
  );
  addPanel(
    slide3,
    "Object-Maya",
    { left: 675, top: 382, width: 535, height: 132 },
    COLORS.panelSoft,
  );
  addText(
    slide3,
    "Object-Maya-Code",
    'new Human("Maya")',
    { left: 702, top: 405, width: 470, height: 42 },
    { fontSize: 29, bold: true, typeface: CODE_FONT },
  );
  addText(
    slide3,
    "Object-Maya-Detail",
    "another object • name = “Maya”",
    { left: 702, top: 460, width: 470, height: 32 },
    { fontSize: 20, color: COLORS.muted },
  );
  addText(
    slide3,
    "Object-Labels",
    "OBJECTS\nConcrete runtime instances created from the class definition.",
    { left: 675, top: 553, width: 535, height: 78 },
    { fontSize: 21 },
  );
  setNotes(
    slide3,
    [
      "Timing: 1:35",
      "Start with Human as the class. A class is a user-defined reference type that describes the structure and behavior its objects can have.",
      "The name field is state: information held by each object. useSenses and communicate are behavior: operations the object can perform.",
      "The two expressions on the right create two distinct Human objects. They follow the same class definition but hold different state.",
      "Avoid defining identity as a raw memory address. The important point here is that each new expression creates a distinct object instance.",
      "Transition: Java variables do not contain the whole object. For class types, they hold references to objects.",
    ],
    [
      "https://dev.java/learn/oop/",
      "https://docs.oracle.com/javase/specs/jls/se25/html/jls-4.html#jls-4.3.2",
    ],
  );

  // Slide 4 — reference and object.
  const slide4 = buildSlide17(presentation, {
    title: "Reference variable ≠ object",
    footer1: "4",
    label1: "DECLARE",
    label2: "CREATE",
    label3: "COMBINE",
    body1: {
      titleHere: "Human person;",
      loremIpsumDolorSitAmetConsecteturAdipiscing:
        "A reference variable whose declared type is Human.",
    },
    body2: {
      titleHere: 'new Human("Zub")',
      loremIpsumDolorSitAmetConsecteturAdipiscing:
        "A constructor call creates a new object.",
    },
    body3: {
      titleHere: "Human person =\nnew Human(\"Zub\");",
      loremIpsumDolorSitAmetConsecteturAdipiscing:
        "Initialization stores the new reference in the variable.",
    },
  });
  setNotes(
    slide4,
    [
      "Timing: 1:25",
      "Walk through this as three separate operations.",
      "Human person; is a declaration. It creates a variable whose declared, or compile-time, type is Human.",
      "new Human(\"Zub\") instantiates an object by selecting the Human constructor.",
      "The equals sign assigns the resulting reference to the variable. Written together, declaration plus assignment is initialization.",
      "This may feel like vocabulary, but the separation becomes essential when the declared type and runtime object type are different.",
    ],
    ["https://docs.oracle.com/javase/specs/jls/se25/html/jls-4.html#jls-4.3.2"],
  );

  // Slide 5 — inheritance hierarchy.
  const slide5 = buildSlide06(presentation, {
    title: "Inheritance creates the family relationship",
    footer1: "5",
    body1: {
      titleHere: "Human owns",
      loremIpsumDolorSitAmetConsecteturAdipiscing:
        "private name\ngetName()\nuseSenses()\ncommunicate(String)",
    },
    body2: {
      titleHere: "Student extends Human",
      loremIpsumDolorSitAmetConsecteturAdipiscing:
        "inherits accessible behavior\nadds student behavior",
    },
    body3: {
      titleHere: "Teacher extends Human",
      loremIpsumDolorSitAmetConsecteturAdipiscing:
        "inherits accessible behavior\nadds teacher behavior",
    },
  });
  // Connectors first so they sit behind nodes.
  slide5.shapes.add({
    geometry: "line",
    name: "Hierarchy-Vertical",
    position: { left: 640, top: 227, width: 0, height: 53 },
    fill: "none",
    line: { style: "solid", fill: COLORS.ink, width: 2 },
  });
  slide5.shapes.add({
    geometry: "line",
    name: "Hierarchy-Horizontal",
    position: { left: 350, top: 279, width: 580, height: 0 },
    fill: "none",
    line: { style: "solid", fill: COLORS.ink, width: 2 },
  });
  slide5.shapes.add({
    geometry: "line",
    name: "Hierarchy-Student-Vertical",
    position: { left: 350, top: 279, width: 0, height: 29 },
    fill: "none",
    line: { style: "solid", fill: COLORS.ink, width: 2 },
  });
  slide5.shapes.add({
    geometry: "line",
    name: "Hierarchy-Teacher-Vertical",
    position: { left: 930, top: 279, width: 0, height: 29 },
    fill: "none",
    line: { style: "solid", fill: COLORS.ink, width: 2 },
  });
  addPanel(
    slide5,
    "Human-Node",
    { left: 510, top: 165, width: 260, height: 64 },
    COLORS.accentSoft,
  );
  addText(
    slide5,
    "Human-Node-Text",
    "Human",
    { left: 510, top: 177, width: 260, height: 40 },
    { fontSize: 30, bold: true, alignment: "center" },
  );
  addPanel(
    slide5,
    "Student-Node",
    { left: 220, top: 306, width: 260, height: 54 },
    COLORS.panelSoft,
  );
  addText(
    slide5,
    "Student-Node-Text",
    "Student",
    { left: 220, top: 316, width: 260, height: 34 },
    { fontSize: 26, bold: true, alignment: "center" },
  );
  addPanel(
    slide5,
    "Teacher-Node",
    { left: 800, top: 306, width: 260, height: 54 },
    COLORS.panelSoft,
  );
  addText(
    slide5,
    "Teacher-Node-Text",
    "Teacher",
    { left: 800, top: 316, width: 260, height: 34 },
    { fontSize: 26, bold: true, alignment: "center" },
  );
  setNotes(
    slide5,
    [
      "Timing: 1:45",
      "Human is the superclass. Student and Teacher are subclasses because they extend Human.",
      "In this simplified classroom model, a Student is a Human and a Teacher is a Human. That subtype relationship is what makes a Student or Teacher object compatible with a Human variable.",
      "The subclasses inherit accessible behavior such as getName and useSenses. They can use it without rewriting it.",
      "Be precise about the private field: private name is not inherited as a member of Student or Teacher. The Human-declared state is still present within the complete object, and subclass code reaches it through getName.",
      "Constructors are also not inherited. Each subclass declares its own constructor and invokes a Human constructor.",
    ],
    [
      "https://docs.oracle.com/javase/specs/jls/se25/html/jls-1.html",
      "https://docs.oracle.com/javase/specs/jls/se25/html/jls-8.html#jls-8.2",
    ],
  );

  // Slide 6 — constructor chain and Java 25 research.
  const slide6 = buildSlide05(
    presentation,
    blankTwoColumnTokens("Construction initializes the Human part first", "6"),
  );
  addKicker(slide6, "BEYOND THE BASICS • JAVA 25", 41, 128, 550);
  addText(
    slide6,
    "Constructor-Flow-Label",
    "Normal constructor chain",
    { left: 41, top: 184, width: 550, height: 36 },
    { fontSize: 24, bold: true },
  );
  addFlowStep(
    slide6,
    "Constructor-Step-1",
    41,
    239,
    175,
    "new Student(...)",
    "select Student",
    COLORS.panelSoft,
  );
  addFlowStep(
    slide6,
    "Constructor-Step-2",
    238,
    239,
    175,
    "super(name)",
    "delegate upward",
    COLORS.accentSoft,
  );
  addFlowStep(
    slide6,
    "Constructor-Step-3",
    435,
    239,
    175,
    "Human sets name",
    "parent state ready",
    COLORS.panelSoft,
  );
  slide6.shapes.add({
    geometry: "rightArrow",
    name: "Constructor-Arrow-1",
    position: { left: 215, top: 267, width: 24, height: 28 },
    fill: COLORS.accentStrong,
    line: { style: "solid", fill: "none", width: 0 },
  });
  slide6.shapes.add({
    geometry: "rightArrow",
    name: "Constructor-Arrow-2",
    position: { left: 412, top: 267, width: 24, height: 28 },
    fill: COLORS.accentStrong,
    line: { style: "solid", fill: "none", width: 0 },
  });
  addText(
    slide6,
    "Constructor-Explanation",
    "super(name) initializes the Human portion of the same Student object. It does not create a second object.",
    { left: 41, top: 374, width: 570, height: 112 },
    { fontSize: 25 },
  );
  addCodeBlock(
    slide6,
    "Java25-Constructor-Code",
    { left: 657, top: 182, width: 582, height: 390 },
    [
      [code("Student(String name) {")],
      [code("    "), kw("if"), code(" (name == null || name.isBlank()) {")],
      [code("        "), kw("throw new"), code(" IllegalArgumentException();")],
      [code("    }")],
      [code("    String normalized = name.strip();")],
      [code("    "), kw("super"), code("(normalized);")],
      [code("}")],
    ],
    { highlightLines: [1, 4, 5], fontSize: 18.5, lineHeight: 32 },
  );
  addText(
    slide6,
    "Java25-Research-Note",
    "Java 25 permits restricted validation and preparation before super(...).",
    { left: 657, top: 590, width: 582, height: 48 },
    { fontSize: 21, bold: true, color: COLORS.accentStrong },
  );
  setNotes(
    slide6,
    [
      "Timing: 2:00",
      "First explain the normal chain on the left. new Student selects the Student constructor explicitly. That constructor delegates Human initialization through super(name). Human stores the shared name state, and then control returns to the Student constructor.",
      "Clarify that super does not create a second Human object. It initializes the Human portion of the same Student object.",
      "Additional research one: many Java courses still teach that super or this must be the first constructor statement. Java 25 finalized flexible constructor bodies.",
      "The code on the right is legal in Java 25 without preview flags. It validates and normalizes the parameter before invoking super.",
      "The prologue is restricted: it cannot freely use the object under construction. Parameter validation and local computation are safe examples.",
      "Mention that both delivered demo files were compiled with javac 25.0.2 and -Xlint:all.",
    ],
    [
      "https://openjdk.org/jeps/513",
      "https://docs.oracle.com/javase/specs/jls/se25/html/jls-8.html#jls-8.8.7",
    ],
  );

  // Slide 7 — reuse, override, add.
  const slide7 = buildSlide06(presentation, {
    title: "Subclasses can reuse, replace, and add",
    footer1: "7",
    body1: {
      titleHere: "REUSE",
      loremIpsumDolorSitAmetConsecteturAdipiscing:
        "useSenses()\nInherited unchanged from Human.",
    },
    body2: {
      titleHere: "REPLACE",
      loremIpsumDolorSitAmetConsecteturAdipiscing:
        "communicate(String)\nOverridden with the same signature.",
    },
    body3: {
      titleHere: "ADD",
      loremIpsumDolorSitAmetConsecteturAdipiscing:
        "Student: askQuestion(), shareIdea()\nTeacher: explainConcept(), answerQuestion()",
    },
  });
  addText(
    slide7,
    "Reuse-Replace-Add-Lead",
    "One subclass can do all three.",
    { left: 41, top: 190, width: 800, height: 70 },
    { fontSize: 42, bold: true },
  );
  addText(
    slide7,
    "Reuse-Replace-Add-Detail",
    "@Override lets the compiler verify that communicate(String) really matches an inherited method.",
    { left: 41, top: 278, width: 1120, height: 48 },
    { fontSize: 23, color: COLORS.muted },
  );
  setNotes(
    slide7,
    [
      "Timing: 2:00",
      "This slide classifies the behavior before we talk about polymorphism.",
      "Reuse: both subclasses receive useSenses unchanged. That is inheritance without overriding.",
      "Replace: Student and Teacher each override communicate(String). The method name and parameter list match the inherited method. @Override asks the compiler to verify that the match is real.",
      "Add: Student has actions that make sense for a student—askQuestion and shareIdea. Teacher has explainConcept and answerQuestion.",
      "The student communication protocol is: raise a hand, wait to be called on, and then communicate a question or idea. The teacher communicates directly when explaining or answering.",
      "A subclass-specific method does not automatically belong in Human. It can remain specific to the subclass.",
    ],
    ["https://docs.oracle.com/javase/specs/jls/se25/html/jls-8.html#jls-8.4.8"],
  );

  // Slide 8 — bridge between concepts.
  const slide8 = buildSlide17(presentation, {
    title: "Overriding is the bridge between them",
    footer1: "8",
    label1: "RELATIONSHIP",
    label2: "VERSIONS",
    label3: "RUNTIME USE",
    body1: {
      titleHere: "extends",
      loremIpsumDolorSitAmetConsecteturAdipiscing:
        "Student and Teacher become Human subtypes.",
    },
    body2: {
      titleHere: "@Override",
      loremIpsumDolorSitAmetConsecteturAdipiscing:
        "Each subtype supplies its own communicate body.",
    },
    body3: {
      titleHere: "person.communicate(...)",
      loremIpsumDolorSitAmetConsecteturAdipiscing:
        "The runtime object determines which override runs.",
    },
  });
  setNotes(
    slide8,
    [
      "Timing: 1:30",
      "This is the slide that resolves my original confusion.",
      "Inheritance and polymorphism are closely connected, but they are not the same event.",
      "Inheritance is established when Student and Teacher extend Human. It creates the subtype relationship and inherited members.",
      "Overriding supplies different implementations of the same inherited method.",
      "Polymorphism appears when code uses a Human reference and the runtime object selects the appropriate override.",
      "Use the concise sentence: inheritance makes the substitution legal; polymorphism makes the shared call behave differently.",
    ],
    [
      "https://docs.oracle.com/javase/specs/jls/se25/html/jls-1.html",
      "https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html#jls-15.12.4.4",
    ],
  );

  // Slide 9 — compile-time versus runtime prediction.
  const slide9 = buildSlide11(presentation, {
    title: "The compiler checks one type; the JVM sees another",
    footer1: "9",
    body1: {
      topic: "",
      loremIpsumDolorSitAmetConsecteturAdipiscing: "",
      loremIpsumDolorSitAmetConsecteturAdipiscing2: "",
    },
    body2: "Compiler\nHuman API",
    body3: "Runtime\nStudent object",
    body4: {
      detailGoesHere: "useSenses()  ✓",
      detailGoesHere2: "communicate(...)  ✓",
      detailGoesHere3: "raiseHand()  ✕",
    },
    body5: {
      detailGoesHere: "communicate → Student",
      detailGoesHere2: "useSenses → Human",
      detailGoesHere3: "actual class → Student",
    },
  });
  addCodeBlock(
    slide9,
    "Prediction-Code",
    { left: 42, top: 130, width: 1197, height: 164 },
    [
      [code("Human person = "), kw("new"), code(' Student("Zub");')],
      [code("person.useSenses();")],
      [code('person.communicate("I have an idea.");')],
      [code("person.raiseHand(); "), comment("// compile or error?")],
    ],
    { highlightLines: [0, 2, 3], fontSize: 22, lineHeight: 34 },
  );
  setNotes(
    slide9,
    [
      "Timing: 2:10",
      "Pause before revealing each answer.",
      "Ask: Does person.useSenses compile? Yes. Human declares that method, so it is part of the API visible through the Human reference. No subclass override exists, so Human's implementation runs.",
      "Ask: Does person.communicate compile, and which body runs? It compiles because Human declares the method. Student's override runs because the runtime object is a Student.",
      "Ask: Does person.raiseHand compile? No. The actual object has that method, but the compiler checks the declared Human type, and Human does not declare raiseHand.",
      "State the decisive rule: the declared type controls what can be called; the runtime object controls which overridden instance implementation runs.",
    ],
    [
      "https://docs.oracle.com/javase/specs/jls/se25/html/jls-4.html#jls-4.3.2",
      "https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html#jls-15.12.4.4",
    ],
  );

  // Slide 10 — live demo.
  const slide10 = buildSlide05(
    presentation,
    blankTwoColumnTokens("One call takes two forms", "10"),
  );
  addKicker(slide10, "LIVE DEMO • PREDICT BEFORE RUNNING", 41, 128, 620);
  addCodeBlock(
    slide10,
    "Live-Demo-Code",
    { left: 41, top: 184, width: 582, height: 422 },
    [
      [code("List<Human> classroom = List.of(")],
      [code("    "), kw("new"), code(' Student("Zub"),')],
      [code("    "), kw("new"), code(' Teacher("Maya")')],
      [code(");")],
      [code("")],
      [kw("for"), code(" (Human person : classroom) {")],
      [code("    person.communicate(message);")],
      [code("}")],
    ],
    { highlightLines: [5, 6], fontSize: 21, lineHeight: 32 },
  );
  addCodeBlock(
    slide10,
    "Live-Demo-Output",
    { left: 657, top: 184, width: 582, height: 422 },
    [
      [comment("OUTPUT")],
      [code("Zub raises a hand.")],
      [code("Zub waits to be called on.")],
      [code("Zub communicates: ...")],
      [code("")],
      [code("Maya communicates directly: ...")],
      [code("")],
      [comment("The loop and method call never changed.")],
    ],
    { highlightLines: [1, 2, 3, 5], fontSize: 21, lineHeight: 32 },
  );
  setNotes(
    slide10,
    [
      "Timing: 3:00",
      "Before running, ask the audience to predict the output order.",
      "Open HumanTeachbackDemo.java. Point at the List<Human>, then at the loop variable Human person, and finally highlight only person.communicate(...).",
      "Run: javac -Xlint:all HumanTeachbackDemo.java && java HumanTeachbackDemo",
      "As the output appears, connect each line to the runtime object. Student raises a hand and waits before speaking. Teacher communicates directly.",
      "The list type, loop, method name, and message do not change. Only the runtime object changes.",
      "Then point to the commented participant.raiseHand() line. Explain that uncommenting it produces a compile-time error because participant is declared as Human.",
      "Fallback: if the IDE or terminal fails, use the output already shown on this slide and continue the explanation.",
    ],
    ["https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html#jls-15.12.4.4"],
  );

  // Slide 11 — dispatch boundary.
  const slide11 = buildSlide13(presentation, {
    title: "Dynamic dispatch has a boundary",
    footer1: "11",
    body1: {
      titleGoesHere: "OVERRIDDEN INSTANCE METHOD",
      loremIpsumDolorSitAmetConsecteturAdipiscing:
        "Selected from the runtime object.",
    },
    body2: {
      titleGoesHere: "FIELD",
      loremIpsumDolorSitAmetConsecteturAdipiscing:
        "Selected from the declared or qualifying type.",
    },
    body3: {
      titleGoesHere: "STATIC METHOD",
      loremIpsumDolorSitAmetConsecteturAdipiscing:
        "Belongs to the named class; it is hidden, not overridden.",
    },
    body4: {
      titleGoesHere: "CONSTRUCTOR",
      loremIpsumDolorSitAmetConsecteturAdipiscing:
        "Selected by the class written after new; never overridden.",
    },
  });
  addKicker(slide11, "BEYOND THE BASICS • MEMBER SELECTION", 700, 132, 540);
  setNotes(
    slide11,
    [
      "Timing: 2:00",
      "Additional research two is not simply the definition of dynamic dispatch. It is the boundary between different member-selection mechanisms.",
      "Overridable instance methods are the category selected using the runtime object. That is why Student.communicate runs through a Human reference.",
      "Fields are not polymorphic. A hidden field is selected using the qualifying expression's compile-time type.",
      "Static methods belong to classes and are hidden rather than overridden. Their selection does not use the runtime object's override lookup.",
      "Constructors are neither inherited nor overridden. new Student explicitly selects a Student constructor, which then participates in constructor chaining.",
      "The safest beginner summary is: expect runtime polymorphism from overridden instance methods, not from every member with a repeated name.",
    ],
    [
      "https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html#jls-15.12.4.4",
      "https://docs.oracle.com/javase/specs/jls/se25/html/jls-8.html#jls-8.4.8",
      "https://docs.oracle.com/javase/specs/jls/se25/html/jls-8.html#jls-8.2",
    ],
  );

  // Slide 12 — close.
  const slide12 = buildSlide26(presentation, {
    title: "TAKEAWAY",
    title2: "Connected,\nnot identical.",
    title3: {
      loremIpsumDetails: "Declared relationship",
      loremIpsumDetails2: "Runtime implementation",
      loremIpsumDetails3: "Questions?",
    },
  });
  addText(
    slide12,
    "Closing-Formula",
    "Inheritance builds the relationship.  Overriding supplies the versions.  Polymorphism selects behavior at runtime.",
    { left: 660, top: 485, width: 570, height: 132 },
    { fontSize: 23, bold: true },
  );
  setNotes(
    slide12,
    [
      "Timing: 1:30",
      "Rebuild the opening definition in plain language.",
      "A Human reference can point to Student or Teacher objects because inheritance created a compatible subtype relationship.",
      "The call to communicate is legal because Human declares the method. The runtime object's class determines which override runs.",
      "Explain the value: code can work with a classroom of Humans without writing a type-checking branch for each role.",
      "Personal close: What changed for me was learning to ask two separate questions. What relationship did I declare? Which implementation will this call select?",
      "Invite questions. Aim to answer at least three accurately. If an edge case is uncertain, state the boundary you know and offer to verify the detail rather than guessing.",
    ],
    [
      "https://docs.oracle.com/javase/specs/jls/se25/html/jls-1.html",
      "https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html#jls-15.12.4.4",
    ],
  );

  const renderDir = path.join(TMP_DIR, "rendered");
  await fs.mkdir(renderDir, { recursive: true });

  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    const png = await presentation.export({ slide, format: "png", scale: 1 });
    await writeBlob(path.join(renderDir, `${stem}.png`), png);
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(
      path.join(renderDir, `${stem}.layout.json`),
      await layout.text(),
    );
  }

  const montage = await presentation.export({
    format: "webp",
    montage: true,
    scale: 1,
  });
  await writeBlob(path.join(TMP_DIR, "deck-montage.webp"), montage);

  const inspection = await presentation.inspect({
    kind: "slide,textbox,shape,notes",
    maxChars: 100000,
  });
  await fs.writeFile(
    path.join(TMP_DIR, "inspection.ndjson"),
    inspection.ndjson,
  );

  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(FINAL_PPTX);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
