1.Project Setup

creation of CourseManagement folder.

inside that courseClient folder then in this npm install , npm install tailwindcss @tailwindcss/vite and in vite.config.js need to import the tailwindcss and add tailwindcss() plugin.

and remove unwanted boiler plate codes and boiler folder and files.Keeping the needed.

2.project structure

This is the main folders

course-management-system/
├── src/
│ ├── components/
│ ├── pages/
│ ├── layouts/
│ ├── store/
│ │ ├── slices/
│ │ └── middleware/
│ ├── hooks/
│ ├── utils/
│ ├── styles/
│ ├── routes/
│ └── assets/
│
├── .eslintrc.js
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md

---Files creation---

course-management-system/
├── src/
│ ├── components/
│ │ ├── Button.jsx
│ │ ├── Modal.jsx
│ │ ├── CourseCard.jsx
│ │ └── RichTextEditor.jsx
│ │
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── CourseList.jsx
│ │ ├── CourseDetail.jsx
│ │ ├── CourseCreate.jsx
│ │ └── NotFound.jsx
│ │
│ ├── layouts/
│ │ └── MainLayout.jsx
│ │
│ ├── store/
│ │ ├── index.js # Configure Redux store
│ │ ├── slices/
│ │ │ ├── coursesSlice.js
│ │ │ ├── progressSlice.js
│ │ │ └── uiSlice.js
│ │ └── middleware/
│ │ └── storageMiddleware.js
│ │
│ ├── hooks/
│ │ ├── useLocalStorage.js
│ │ └── useDebounce.js
│ │
│ ├── utils/
│ │ ├── storage.js # LocalStorage helpers
│ │ ├── validation.js # Form validation helpers
│ │ └── sanitize.js # HTML sanitization
│ │
│ ├── styles/
│ │ ├── globals.css
│ │ └── components.css
│ │
│ ├── routes/
│ │ └── AppRoutes.jsx
│ │
│ ├── assets/ # (images, icons, thumbnails)
│ │ └── logo.png
│ │
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── .eslintrc.js
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md

3.Setting React router navigation

npm install react-router-dom

Setting up of the AppRoutes for the pages

4.Setting the intial slices and store

Initializing the storage Middleware and connecting react and redux in main.jsx using Provider

5.CourseCreation
RichTextEditor.jsx added code using react-quill-new
Included validation for the input fields

Intial code for the courseCreation form https://gist.github.com/madhavaraj1111/911b4a5cd924cf89dc605710663f2d0f

6.Sprint 1: Project Setup & Course Creation (Week 1)

1. Project Setup
   Done--
   Initialize project with Vite + React
   Configure ESLint and Prettier
   Set up project structure
   Set up basic navigation with React Router
   Configure Redux Toolkit store with initial slices

2. Course Creation Form
   Done--
   Title with validation (10–60 chars)
   Description with Quill.js RichTextEditor
   Thumbnail (URL)
   Category dropdown
   Difficulty dropdown
   Course Content (sections & lessons)
   Lesson contents with RichTextEditor
   Partial Done--
   Initial browser storage save/load -- Currently saving to local storage but needs to load back populate but it is needed for the edit / update of the course.


7.Sprint 2 start

--> Course Card Display.
--> Designing of the card like book
--> Show title,thumbnail course inner content sections and lessons
--> Pagination to show up 10 cards per page
--> Delete feature for the course
--> Update feature for the course with route
--> Validation for the Updation form
--> Course Form shared component for the Creation and Updation 
--> Added Button component
--> Added FormSelect Component
--> Added CheckBox component

Folder Structure Update 

course-management-system/
├── src/
│ ├── components/
│ │ ├── Button.jsx
│ │ ├── Modal.jsx
│ │ ├── CourseCard.jsx
│ │ ├── RichTextEditor.jsx
│ │ ├── CourseForm.jsx           # New component for course form
│ │ ├── FormSelect.jsx           # New component for form select input
│ │ └── CheckBox.jsx             # New component for checkbox input
│ │
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── CourseList.jsx
│ │ ├── CourseDetail.jsx
│ │ ├── CourseCreate.jsx
│ │ ├── CourseUpdate.jsx         # New page for course update
│ │ └── NotFound.jsx
│ │
│ ├── layouts/
│ │ └── MainLayout.jsx
│ │
│ ├── store/
│ │ ├── index.js
│ │ ├── slices/
│ │ │ ├── coursesSlice.js
│ │ │ ├── progressSlice.js
│ │ │ └── uiSlice.js
│ │ └── middleware/
│ │ └── storageMiddleware.js
│ │
│ ├── hooks/
│ │ ├── useLocalStorage.js
│ │ └── useDebounce.js
│ │
│ ├── utils/
│ │ ├── storage.js
│ │ ├── validation.js
│ │ └── sanitize.js
│ │
│ ├── styles/
│ │ ├── globals.css
│ │ └── components.css
│ │
│ ├── routes/
│ │ └── AppRoutes.jsx
│ │
│ ├── assets/
│ │ └── logo.png
│ │
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── .eslintrc.js
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md

