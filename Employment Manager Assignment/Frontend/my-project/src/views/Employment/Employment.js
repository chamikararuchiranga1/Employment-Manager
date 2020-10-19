import React, {Component} from 'react';
import '../Employment/Employment.css';
import 'semantic-ui-css/semantic.min.css';
import { Dropdown,Button } from 'semantic-ui-react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import AddEmployment from './AddEmployment/AddEmployment';
import axios from 'axios';
import Swal from "sweetalert2";


const columns= [
  {
    label: 'Title | Company',
    field: 'title_company',
    sort: 'disabled',
    align:  'center',
    width: 100,
  },
  {
    label: 'Duration',
    field: 'duration',
    sort: 'asc',
    width: 300,
  },
  {
    label: '',
    field: 'action',
    sort: 'asc',
    width: 200
  }
  ];

  const rows= [
    {
      'title_company': 'Software Engineer | Blu Tac',
      'duration': 'May 2005 - May 2007',
      'action': <RiDeleteBin5Line className="deleteIcon" size={26}/>,

    },
    {
      'title_company': 'System Engineer | 99XTec',
      'duration': '27th Sep 2019 - Now',
      'action':  <RiDeleteBin5Line className="deleteIcon" size={26}/>,
    },
  ];


class Employment extends Component {

  state={
    isModel: false,
    rows: []
  };

  constructor(props){
    super(props);

    this.loadEmploymentTable();
  }

  // Load Employment Table
  loadEmploymentTable = () =>{

    axios.get(
      'http://localhost:3000/employment',
    )
      .then(res => {

        const array = [];
        res.data.map((value, index)=>{
          array.push({
            title_company: value.title+' | '+value.company,
            duration: value.peried_month+' '+value.peried_year+' - '+value.through_month+' '+value.through_year,
            action:  <RiDeleteBin5Line
              onClick={()=>{this.clickDelete(value.employment_id)}}
              className="deleteIcon"
              size={26}/>,
          })
        })

        this.setState({
          rows: array,
        })
      })
      .catch(err => {
        console.log(err);
      })
  };

  // Click Delete Table Data
  clickDelete = (value) =>{

    Swal.fire({
      title: 'Are you sure?',
      text: "Delete Data!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(
          'http://localhost:3000/employment/'+value,
        )
          .then(res => {
            this.loadEmploymentTable();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res.data,
              showConfirmButton: false,
              timer: 1500
            })
          })
          .catch(err => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: err,
              showConfirmButton: false,
              timer: 1500
            })
          })
      }
    });

  };


  // Click Add Employee Button
  clickHandlerAddEmployee = () =>{
    this.setState({
      isModel: true
    })
  };

  // Close Model State
  closeModelState = (value) =>{
    this.setState({
      isModel: value
    })
  };

  // Save Employmrnt
  saveEmploymentState = () =>{
    this.loadEmploymentTable();
  };



  render() {
    return (
      <div className="m-4">
        <div>
          {
            this.state.isModel ?
              <AddEmployment closeModal={this.closeModelState} saveEmployment={this.saveEmploymentState}/>
              :
              null
          }

        </div>

        <div>
          <h2 className="title">Employment</h2>
        </div>
        <div className="mt-4">
          <h5 className="title_2">Add your past work experience</h5>
        </div>
        <div className="mt-4">
          <h5 className="title_3">Build your credibility by showcasing the projects or jobs have completed.</h5>
        </div>
        <div className="mt-4">
          <Button size='large'
                  className="text-center ui button add_button"
                  onClick={()=>{this.clickHandlerAddEmployee()}}>
            <AiOutlinePlusCircle
              size={23}
              className="add_icon"
            />&nbsp;Add Employment
          </Button>
        </div>
        <div className="mt-5">
          <MDBTable responsive>
            <MDBTableHead columns={columns} />
            <MDBTableBody rows={this.state.rows} />
          </MDBTable>
        </div>
        <div className="mt-5">
          <a href='' className="link_1">Skip this step for now</a>
        </div>
        <div className="row mt-5">
          <div className="col-sm-6 col-lg-6 col-md-6 col-xl-6">
            <a href='' className="link_2">Back</a>
          </div>
          <div className="col-sm-6 col-lg-6 col-md-6 col-xl-6">
            <Button size='large' className="text-center next_btn" style={{'float': 'right'}}>Next</Button>
          </div>
        </div>
      </div>

    );
  }
}

export default Employment;
