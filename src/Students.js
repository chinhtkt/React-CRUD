import React, {Component} from 'react';
import { Table, Button } from 'react-bootstrap';
import './style.css';


class Students extends Component {
    constructor(props) {
        super(props);

        this.state = {
          isEdit: false
        }
       

        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.onValueChangeEdit = this.onValueChangeEdit.bind(this);

    }

  

    onValueChangeEdit(event) {
      this.setState({
        selectedOptionEdit: event.target.value
      });
    }

    onEdit() {
      this.setState({isEdit: true});
    }

    onEditSubmit(event) {
      event.preventDefault();
      this.props.onEditSubmit(this.nameInput.value, this.classNameInput.value, this.state.selectedOptionEdit, this.props.name)
      this.setState({isEdit: false});
    }

    onDelete() {
        const {onDelete, name} = this.props;
        onDelete(name);
    }
  render() {
      const {name, className, gender} = this.props;

    return (
        <div>
          {
            this.state.isEdit
            ? (
              <form onSubmit={this.onEditSubmit}>
                <input placeholder="Tên" required name defaultValue={name} ref={nameInput => this.nameInput = nameInput}/>
                <input placeholder="Lớp" required name defaultValue={className} ref={classNameInput => this.classNameInput = classNameInput}/>
                <input 
                 type="radio" 
                 value="Nam"
                 name="gender"
                 checked={this.state.selectedOptionEdit === "Nam"}
                 onChange={this.onValueChangeEdit}
                 required
               />Nam
               <input 
                 type="radio" 
                 value="Nữ"
                 name="gender"
                 checked={this.state.selectedOptionEdit === "Nữ"}
                 onChange={this.onValueChangeEdit}
                 required
               />Nữ
               <div><button>Lưu</button></div>
              </form>
            )
            : (
              <div id ="reg">
                <Table striped bordered hover size="sm" id="nameTR">
                  <thead>
                    <tr>
                      <th className="space">Tên Sinh Viên</th>
                      <th className="space">Lớp</th>
                      <th className="space">Giới Tính</th>
                      <th className="space">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                  <td className="space">{name}</td>
                  <td className="space">{className}</td>
                  <td className="space">{gender}</td>
                  <td>
                  <Button onClick={this.onEdit} variant="primary">Sửa</Button>
                  <Button onClick={this.onDelete} variant="danger">Xóa</Button>
                  </td>
                  </tr>
                  </tbody>
                </Table>
              </div>
              )
          }
        </div>
        
      
    );
  }

  
  
}

export default Students;
