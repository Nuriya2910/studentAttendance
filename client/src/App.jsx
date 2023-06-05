import {Route, Routes} from 'react-router-dom'
import Auth from './Components/Auth'
import Admin from './Components/Admin'
import AdminTeachers from './Components/AdminTeachers'
import AdminStudents from './Components/AdminStudents'
function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/admin/teachers" element={<AdminTeachers/>}/>
        <Route path="/admin/students" element={<AdminStudents/>}/>
      
      </Routes>
    </div>
  )
}

export default App
