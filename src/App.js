import React, {Component} from 'react';
import './App.css';
import AddStudents from './AddStudents'
import Students from './Students'
import 'bootstrap/dist/css/bootstrap.min.css';
import  Pagination from './Pagination'
const students = [
  {
    name: 'Nguyen Duc Chinh0',
    className: 'BHAF180222',
    gender: 'Nam'
  },
  {
    name: 'Nguyen Van Chien1',
    className: 'BHAF180222',
    gender: 'Nam'
  },
  {
    name: 'Nguyen Duc Chinh2',
    className: 'BHAF180222',
    gender: 'Nam'
  },
  {
    name: 'Nguyen Duc Chinh3',
    className: 'BHAF180222',
    gender: 'Nam'
  },
  {
    name: 'Nguyen Duc Chinh4',
    className: 'BHAF180222',
    gender: 'Nam'
  },
  {
    name: 'Nguyen Duc Chinh5',
    className: 'BHAF180222',
    gender: 'Nam'
  },
  
];
localStorage.setItem('students', JSON.stringify(students));


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: JSON.parse(localStorage.getItem('students')),
      search: '',
      currentPage: 1,
      studentsPerPage: 5,
     
    };
    

    this.onAdd = this.onAdd.bind(this);

    this.onDelete = this.onDelete.bind(this)

    this.onEditSubmit = this.onEditSubmit.bind(this)

    this.updateSearch = this.updateSearch.bind(this)
  }



  updateSearch(event) {
    this.setState({search: event.target.value.substr(0,20)});
  }

  componentWillMount() {
    const students = this.getStudent();

    this.setState({students});
  }

  getStudent() {
    return this.state.students
  }

  onAdd(name, className, gender) {
    const students = this.getStudent();

    students.push({
      name,
      className,
      gender
    });

    this.setState({students})

  }

  onDelete(name) {
    const students = this.getStudent();

    const filteredStudents = students.filter(student => {
      return student.name !== name;

    });

    this.setState({students: filteredStudents});
  }

  onEditSubmit(name,className, gender, originalName) {
    let students = this.getStudent();

    students = students.map(student => {
      if(student.name === originalName) {
        student.name = name;
        student.className = className;
        student.gender = gender

      }
      return student;
    });

    this.setState({students})

  }

  render() {
    const {currentPage, studentsPerPage, students} = this.state;
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const paginate = pageNum => this.setState({currentPage: pageNum})
    const nextPage = () => this.setState({currentPage: currentPage + 1});
    const prevPage = () => this.setState({currentPage: currentPage - 1});



    let filterStudentslist = this.state.students.filter(
      (student) => {
        return student.name.indexOf(this.state.search) !== -1;
      }
    )
    return (
      <div className="App">
       <h1>Quản lý sinh viên</h1>

       <AddStudents

       onAdd={this.onAdd}
       />
        <input
        type="text"
        placeholder="Search"
        value={this.state.search}
        onChange={this.updateSearch}
      />
       {
        filterStudentslist.map(student =>{
           return (
             <Students
             key={student.name}
             {...student}
             onDelete={this.onDelete}
             onEditSubmit={this.onEditSubmit}
             />
           );
         })
         .slice(indexOfFirstStudent, indexOfLastStudent)
        
         
         
       }
       <Pagination studentsPerPage={studentsPerPage} totalStudents={students.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
      
      </div>
    );
  }
  
}

export default App;
