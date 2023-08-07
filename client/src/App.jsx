import {Route, Routes} from 'react-router-dom'
import Auth from './Components/Auth'
import Admin from './Components/Admin/Admin'
import AdminTeachers from './Components/Admin/AdminTeachers'
import AdminStudents from './Components/Admin/AdminStudents'
import Teacher from './Components/Teacher/Teacher'
import AdminTeachersGroup from './Components/Admin/AdminTeachersGroup'
import AdminGroupStudent from './Components/Admin/AdminGroupStudent'
import TGroup from './Components/Teacher/TGroup'
import TGrStudent from './Components/Teacher/TGrStudent'
import Students from './Components/Teacher/Students'
import Yoqlama from './Components/Teacher/Yoqlama'
import ShowAttendance from './Components/Teacher/ShowAttendance'
import Student from './Components/StudentRoute/Student'

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/admin/teachers" element={<AdminTeachers/>}/>
        <Route path="/admin/teachers/group/:id" element={<AdminTeachersGroup/>}/>
        <Route path="/admin/students/manage/:id/:idTeacher" element={<AdminGroupStudent/>}/>
        <Route path="/admin/students" element={<AdminStudents/>}/>
        <Route path="/teacher" element={<Teacher />}/>
        <Route path="/teacher/group" element={<TGroup />}/>
        <Route path="/teacher/group/:id" element={<TGrStudent />}/>
        <Route path="/teacher/students" element={<Students />}/>
        <Route path="/teacher/attendance/:id" element={<Yoqlama />}/>
        <Route path="/teacher/showAttendance/:id" element={<ShowAttendance />}/>
        <Route path="/student" element={<Student />}/>

      
      </Routes>
    </div>
  )
}

export default App
