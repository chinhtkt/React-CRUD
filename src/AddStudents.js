import React, {Component} from 'react';

class AddStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "React"
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onValueChange(event) {
        this.setState({
          selectedOption: event.target.value
        });
      }

    onSubmit(event) {
        event.preventDefault();
        this.props.onAdd(this.nameInput.value, this.classNameInput.value, this.state.selectedOption)
        this.nameInput.value ='';
        this.classNameInput.value = '';
        
    }
  render() {
    return (
        <form onSubmit={this.onSubmit}>
            <h3>Tên Sinh Viên</h3>
            <input placeholder="Tên" required name ref={nameInput => this.nameInput = nameInput}/>
            <h3>Tên Lớp</h3>
            <input placeholder="Lớp" required name  ref={classNameInput => this.classNameInput = classNameInput}/>
            <h3>Giới Tính</h3>
            <div>
            <input 
            type="radio" 
            value="Nam"
            name="gender"
            checked={this.state.selectedOption === "Nam"}
            onChange={this.onValueChange}
            required
            />Nam
            <input 
            type="radio" 
            value="Nữ"
            name="gender"
            checked={this.state.selectedOption === "Nữ"}
            onChange={this.onValueChange}
            required
            />Nữ
            </div>
            <div>
        </div>
        <div><button>Thêm mới</button></div>
        <br></br>
            <hr />
            <h3>Danh Sách Sinh Viên</h3>
        </form>
    );
  }
}

export default AddStudents;
