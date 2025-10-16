# Course Management Project Documentation

## 1. Project Setup

Creation of CourseManagement folder.

Inside that, create courseClient folder, then run npm install, npm install tailwindcss @tailwindcss/vite and in vite.config.js need to import tailwindcss and add tailwindcss() plugin.

Remove unwanted boilerplate code and boilerplate folders and files, keeping only the needed ones.

---

## 2. Project Structure

These are the main folders:

```
CourseManagement/
├── courseClient/
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── src/
│   │   ├── App.jsx
│   │   ├── assets/
│   │   │   ├── PerfectStudy.png
│   │   │   ├── logo.png
│   │   ├── components/
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── RichTextEditor.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── SignUp.jsx
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useLoginForm.js
│   │   │   │   │   ├── useSignupForm.js
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── CheckBox.jsx
│   │   │   │   ├── FormSelect.jsx
│   │   │   │   ├── ProgressBar.jsx
│   │   │   │   ├── SearchInput.jsx
│   │   │   ├── course-card/
│   │   │   │  
│   │   │   ├── course-detail/
│   │   │   │   
│   │   │   ├── course-form/
│   │   │   │ 
│   │   │   ├── course-list/
│   │   │   │  
│   │   ├── index.css
│   │   ├── layouts/
│   │   │   
│   │   ├── pages/
│   │   │   ├── AskAI.jsx
│   │   │   ├── CourseCreate.jsx
│   │   │   ├── CourseUpdate.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── ask-ai/
│   │   │   │   ├── components/
│   │   │   │   │  
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useChatManager.js
│   │   │   │   ├── sections/
│   │   │   │   │  
│   │   │   │   ├── utils/
│   │   │   │   │  
│   │   │   ├── dashboard/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── StudentDashboard.jsx
│   │   │   │   ├── components/
│   │   │   │   │  
│   │   │   │   ├── sections/
│   │   │   │   │   
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   ├── ProtectedRoutes.jsx
│   │   ├── store/
│   │   │   ├── index.js
│   │   │   ├── middleware/
│   │   │   │  
│   │   │   ├── selectors/
│   │   │   │   
│   │   │   ├── slices/
│   │   │   │ 
│   │   ├── utils/
│   │   │   ├── api.js
│   ├── vite.config.js
```

---

## 3. Setting React Router Navigation

```bash
npm install react-router-dom
```

Setting up the AppRoutes for the pages.

---

## 4. Setting the Initial Slices and Store

Initializing the storage middleware and connecting React and Redux in main.jsx using Provider.

---

## 5. Course Creation

RichTextEditor.jsx added code using react-quill-new.
Included validation for the input fields.

Initial code for the course creation form: https://gist.github.com/madhavaraj1111/911b4a5cd924cf89dc605710663f2d0f

---

## 6. Sprint 1: Project Setup & Course Creation (Week 1)

### 1. Project Setup
**Done:**
- Initialize project with Vite + React
- Configure ESLint and Prettier
- Set up project structure
- Set up basic navigation with React Router
- Configure Redux Toolkit store with initial slices

### 2. Course Creation Form
**Done:**
- Title with validation (10–60 chars)
- Description with Quill.js RichTextEditor
- Thumbnail (URL)
- Category dropdown
- Difficulty dropdown
- Course Content (sections & lessons)
- Lesson contents with RichTextEditor

**Partial Done:**
- Initial browser storage save/load -- Currently saving to local storage but needs to load back and populate, which is needed for the edit/update of the course.

---

## 7. Sprint 2 Start

- Course Card Display
- Designing of the card like a book
- Show title, thumbnail, course inner content, sections and lessons
- Pagination to show up to 10 cards per page
- Delete feature for the course
- Update feature for the course with route
- Validation for the update form
- Course Form shared component for the creation and update
- Added Button component
- Added FormSelect component
- Added CheckBox component

---

## 8. Sprint 2 Continue

- Course Detail Page
- Layout background changed
- Global Header added
- Make responsivity changes where needed

---

## Sprint 3: Course Detail Page

- Course Header: Thumbnail, title, section count and lesson count, who created the course, progress bar
- About this course
- Quick Navigation
- Course structure, sections and lessons
- Completion of lesson when clicked on the lesson

---

## Sprint 4: Dashboard and Auth for Student and Admin

### Students
- Completed courses
- Enrolled courses
- Average progress
- My courses that the student enrolled in

### Admin
- Total courses created
- Total students
- Active enrollments
- My courses that the admin created
- Quick actions to create new course and manage all courses created
- Course distribution chart of the admin's own courses that they created

### Optimization & Additional Features
- Implemented React memo to optimize recalculations
- Lazy loading for routes
- Error boundaries for component crashes
- Responsive design for mobile and desktop

---

## Additional Important Added

- JWT for authentication
- Added AskAI using Weaviate and Gemini
- Student and admin roles
- Course preview while creating and updating course