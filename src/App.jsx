import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import TableHeader from "./components/TableHeader";
import StudentCard from "./components/StudentCard";

import studentsData from "./assets/students.json";

const initialData = {
  fullName: "",
  image: "",
  phone: "",
  email: "",
  program: "",
  graduationYear: 2023,
  graduated: false
}


function App() {
  //--State Variables:--
  const [students, setStudents] = useState(studentsData);
  const [ formData, setFormData ] = useState( initialData );

  //--Handle functions:--
  const onChangeInput = event => {
    const { name, type, value, checked } = event.target;
    setFormData({ ...formData, 
                [name]: type === "checkbox" ? checked : value //Set event value
              }
    )
  }

  //Submit form:
  const onSubmit = event => {
    event.preventDefault();

    const newStudent = { ...formData };

    onAddStudent( newStudent ); //Add new student 

    //Clear form inputs:
    setFormData( initialData );
  }

  //Add Student
  const onAddStudent = student => {
    setStudents( [student, ...students ]);
  }

  return (
    <div className="App pt-20">
      <Navbar />

      {/* FORM */}
      <form onSubmit= { onSubmit }>
        <span>Add a Student</span>
        <div>
          <label>
            Full Name
            <input 
              name="fullName"  
              type="text" 
              placeholder="Full Name" 
              value = { formData.fullName }
              onChange = { onChangeInput }
            />
          </label>

          <label>
            Profile Image
            <input 
              name="image" 
              type="url" 
              placeholder="Profile Image" 
              value = { formData.image }
              onChange = { onChangeInput }
           />
          </label>

          <label>
            Phone
            <input 
              name="phone" 
              type="tel" 
              placeholder="Phone" 
              value = { formData.phone }
              onChange = { onChangeInput }
               />
          </label>

          <label>
            Email
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              value = { formData.email }
              onChange = { onChangeInput } 
               />
          </label>
        </div>

        <div>
          <label>
            Program
            <select 
              name="program" 
              value= { formData.program }
              onChange = { onChangeInput } 
              >
                <option value="">-- None --</option>
                <option value="Web Dev">Web Dev</option>
                <option value="UXUI">UXUI</option>
                <option value="Data">Data</option>
            </select>
          </label>

          <label>
            Graduation Year
            <input
              name="graduationYear"
              type="number"
              value = { formData.graduationYear }
              placeholder="Graduation Year"
              minLength={4}
              maxLength={4}
              min={2023}
              max={2030}
              onChange= { onChangeInput }
            />
          </label>

          <label>
            Graduated
            <input 
              name="graduated" 
              type="checkbox" 
              checked = { formData.graduated }
              onChange = { onChangeInput }
              />
          </label>

          <button type="submit">Add Student</button>
        </div>

      </form>
      {/* FORM END */}


      {/* TABLE/LIST HEADER */}
      <TableHeader />


      {/* STUDENT LIST */}
      {students &&
        students.map((student) => {
          return <StudentCard key={student.email} {...student} />;
        })}
    </div>
  );
}

export default App;
