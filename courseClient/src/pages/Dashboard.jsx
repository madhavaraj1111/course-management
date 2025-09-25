import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setDashboardView } from '../store/slices/uiSlice';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

const Dashboard = () => {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.list);
  const progress = useSelector(state => state.progress);
  const { dashboardView } = useSelector(state => state.ui);

  // Calculate stats
  const totalCourses = courses.length;
  const totalLessons = courses.reduce((acc, course) => {
    return acc + course.sections.reduce((sectionAcc, section) => {
      return sectionAcc + section.lessons.length;
    }, 0);
  }, 0);

  // Category distribution
  const categoryStats = courses.reduce((acc, course) => {
    acc[course.category] = (acc[course.category] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.entries(categoryStats).map(([name, value]) => ({
    name,
    value
  }));

  // Difficulty distribution
  const difficultyStats = courses.reduce((acc, course) => {
    acc[course.difficulty] = (acc[course.difficulty] || 0) + 1;
    return acc;
  }, {});

  const difficultyData = Object.entries(difficultyStats).map(([name, value]) => ({
    name,
    value
  }));

// Calculate Learning Progress
  const { completedLessonsCount, totalLessonsCount } = courses.reduce(
  (acc, course) => {
    const lessons = course.sections.flatMap(section => section.lessons);
    const completed = lessons.filter(lesson => lesson.readLesson).length;
    acc.completedLessonsCount += completed;
    acc.totalLessonsCount += lessons.length;
    return acc;
  },
  { completedLessonsCount: 0, totalLessonsCount: 0 }
);

const overallProgress =
  totalLessonsCount > 0
    ? Math.round((completedLessonsCount / totalLessonsCount) * 100)
    : 0;

  // Colors for charts
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const StatsCard = ({ title, value, subtitle, color = 'blue' }) => (
    <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/30">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  const QuickActions = () => (
    <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-6 shadow-xl">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <Link 
          to="/courses/create"
          className="block w-full bg-gradient-to-r from-blue-500/80 to-blue-600/80 backdrop-blur-sm text-white text-center py-3 px-4 rounded-xl hover:from-blue-600/90 hover:to-blue-700/90 transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-400/30"
        >
          Create New Course
        </Link>
        <Link 
          to="/courses"
          className="block w-full backdrop-blur-sm bg-white/40 border border-white/50 text-gray-700 text-center py-3 px-4 rounded-xl hover:bg-white/60 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Manage Courses
        </Link>
      </div>
    </div>
  );

  const RecentCourses = () => (
    <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-6 shadow-xl">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Courses</h3>
      <div className="space-y-3">
        {courses.slice(0, 3).map((course, index) => (
          <div key={course.courseId} className="flex items-center p-3 backdrop-blur-sm bg-white/30 border border-white/40 rounded-xl hover:bg-white/50 transition-all duration-300">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-12 h-12 rounded-xl object-cover mr-3 shadow-md"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 truncate">{course.title}</h4>
              <p className="text-sm text-gray-600">{course.category} • {course.difficulty}</p>
            </div>
          </div>
        ))}
        {courses.length === 0 && (
          <p className="text-gray-600 text-center py-4">No courses created yet</p>
        )}
      </div>
    </div>
  );

  if (dashboardView === 'student') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="text-gray-700">Continue your learning journey</p>
            </div>
            <button 
              onClick={() => dispatch(setDashboardView('admin'))}
              className="bg-gradient-to-r from-blue-500/80 to-blue-600/80 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:from-blue-600/90 hover:to-blue-700/90 transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-400/30"
            >
              Switch to Admin
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard 
              title="Available Courses" 
              value={totalCourses}
              subtitle="Ready to learn"
              color="green"
            />
            <StatsCard 
              title="Total Lessons" 
              value={totalLessons}
              subtitle="Across all courses"
              color="blue"
            />
            <StatsCard 
              title="Learning Progress" 
              value={`${overallProgress}%`}
              subtitle="Keep going!"
              color="purple"
            />
          </div>

          {/* Available Courses */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Courses</h3>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.courseId} className="backdrop-blur-sm bg-white/30 border border-white/40 rounded-xl p-4 hover:bg-white/50 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-16 h-16 rounded-xl object-cover mr-4 shadow-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{course.title}</h4>
                        <p className="text-sm text-gray-700 mb-2" dangerouslySetInnerHTML={{__html: course.description}}></p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm bg-white/50 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/40">{course.category}</span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium bg-white/40 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/40 hover:bg-white/60 transition-all duration-300">
                            Start Learning
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {courses.length === 0 && (
                  <p className="text-center text-gray-600 py-8">No courses available yet</p>
                )}
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Categories</h3>
              {categoryData.length > 0 ? (
                <div className="backdrop-blur-sm bg-white/10 rounded-xl p-4">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({name, value}) => `${name}: ${value}`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-center text-gray-600 py-8">No data to display</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-700">Manage your courses and track progress</p>
          </div>
          <button 
            onClick={() => dispatch(setDashboardView('student'))}
            className="bg-gradient-to-r from-green-500/80 to-green-600/80 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:from-green-600/90 hover:to-green-700/90 transition-all duration-300 shadow-lg hover:shadow-xl border border-green-400/30"
          >
            Switch to Student View
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Total Courses" 
            value={totalCourses}
            subtitle="Published courses"
          />
          <StatsCard 
            title="Total Lessons" 
            value={totalLessons}
            subtitle="Across all courses"
            color="green"
          />
          <StatsCard 
            title="Categories" 
            value={Object.keys(categoryStats).length}
            subtitle="Different topics"
            color="yellow"
          />
          <StatsCard 
            title="Average Sections" 
            value={totalCourses > 0 ? Math.round(courses.reduce((acc, course) => acc + course.sections.length, 0) / totalCourses) : 0}
            subtitle="Per course"
            color="purple"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Chart */}
                <div className="backdrop-blur-sm bg-white/10 rounded-xl p-4">
                  <h4 className="text-md font-medium text-gray-800 mb-3">By Category</h4>
                  {categoryData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-48 flex items-center justify-center text-gray-600">
                      No data available
                    </div>
                  )}
                </div>

                {/* Difficulty Chart */}
                <div className="backdrop-blur-sm bg-white/10 rounded-xl p-4">
                  <h4 className="text-md font-medium text-gray-800 mb-3">By Difficulty</h4>
                  {difficultyData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={difficultyData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="value" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-48 flex items-center justify-center text-gray-600">
                      No data available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <QuickActions />
            <RecentCourses />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;