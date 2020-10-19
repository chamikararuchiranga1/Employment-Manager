import React, {Component} from 'react';
import { MDBModal , MDBModalHeader , MDBModalBody , MDBModalFooter  } from 'mdbreact';
import '../../Employment/Employment.css';
import { Checkbox } from 'antd';
import axios from 'axios';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText, Row, Col
} from "reactstrap";
import { Dropdown,Button } from 'semantic-ui-react';
import * as Data from './Date.js';
import Swal from 'sweetalert2'
// import * as pkg from 'https://restcountries.eu/rest/v2/all';



class AddEmployment extends Component {

  state={
    countryCmb: [],
    monthCmb: [],
    yearCmb: [],

    companyName: "",
    city: "",
    country: "",
    title: "",
    periodMonth: "",
    periodYear: "",
    throughMonth: "",
    throughYear: "",
    states: false,
    description: "",

    companyNameEntered: false,
    cityEntered: false,
    countryEntered: false,
    titleEntered: false,
    periodMonthEntered: false,
    periodYearEntered: false,
    throughMonthEntered: false,
    throughYearEntered: false,
    descriptionEntered: false,
    formTouched: false
  };

  constructor(props) {
    super(props);

    this.loadAllCountry();

    this.loadAllMonths();

    this.loadAllYear();
  }

  // Load All Country
  loadAllCountry = ()=>{
    const array=[];
    axios.get(
      'https://restcountries.eu/rest/v2/all'
    )
      .then(res =>{
        res.data.map((value, index)=>{
          array.push({
            key: index,
            value: value.name,
            text: value.name
          })
        });
        this.setState({
          countryCmb: array
        })
      })
      .catch(err =>{

      });
  };

  // Load All Months
  loadAllMonths = ()=>{
    const array=[];
    Data.month.map((value, index)=>{
      array.push({
        key: index,
        value: value.name,
        text: value.name
      })
    });
    this.state.monthCmb = array;

  };

  // Load All Year
  loadAllYear = ()=>{
    const array=[];
    Data.year.map((value, index)=>{
      array.push({
        key: index,
        value: value.name,
        text: value.name
      })
    });
    this.state.yearCmb = array;

  };

  // On Change Check Box
  OnChangeCheckBox = (value) =>{
    this.setState({
      states: value.target.checked
    })
  };

  // On Change Text Field
  onChangeTextField = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    });
    this.validation(event.target.name,event.target.value)
  };

  // Change Country Combo
  onChangeCountryCombo =(event, {value})=>{
    this.setState({
      country: value
    });
    this.validation('country', value);
  };

  // Change Period month Combo
  onChangePeriodMonthCombo =(event, {value})=>{
    this.setState({
      periodMonth: value
    });
    this.validation('periodMonth', value);
  };

  // Change Period Year Combo
  onChangePeriodYearCombo =(event, {value})=>{
    this.setState({
      periodYear: value
    });
    this.validation('periodYear', value);
  };

  // Change Through month Combo
  onChangeThroughMonthCombo =(event, {value})=>{
    this.setState({
      throughMonth: value
    });
    this.validation('throughMonth', value);
  };

  // Change Through Year Combo
  onChangeThroughYearCombo =(event, {value})=>{
    this.setState({
      throughYear: value
    });
    this.validation('throughYear', value);
  };

  // Validation
  validation = (name,value) =>{
    switch (name) {
      case 'companyName':
        this.setState({
          companyNameEntered: value.trim() !== ''
        });
        break;
      case 'city':
        this.setState({
          cityEntered: value.trim() !== ''
        });
        break;
      case 'title':
        this.setState({
          titleEntered: value.trim() !== ''
        });
        break;
      case 'description':
        this.setState({
          descriptionEntered: value.trim() !== ''
        });
        break;
      case 'country':
        this.setState({
          countryEntered: value.trim() !== ''
        });
        break;
      case 'periodMonth':
        this.setState({
          periodMonthEntered: value.trim() !== ''
        });
        break;
      case 'periodYear':
        this.setState({
          periodYearEntered: value.trim() !== ''
        });
        break;
      case 'throughMonth':
        this.setState({
          throughMonthEntered: value.trim() !== ''
        });
        break;
      case 'throughYear':
        this.setState({
          throughYearEntered: value.trim() !== ''
        });
        break;
      default:
    }
    this.setState({
      formTouched: true
    });
  };

  // On Click Save Btn
  onClickSaveBtn = (value) =>{
    const {
      companyNameEntered, cityEntered, titleEntered, descriptionEntered, countryEntered,
      periodMonthEntered, periodYearEntered, throughMonthEntered, throughYearEntered,

      companyName, city, country, title, periodMonth, periodYear, throughMonth, throughYear, states,
      description} = this.state;

    if (
      companyNameEntered === true && cityEntered === true && titleEntered === true &&
      descriptionEntered === true && countryEntered === true && periodMonthEntered === true &&
      periodYearEntered === true && throughYearEntered === true && throughMonthEntered === true)
    {
      const data = {
        company: companyName,
        city: city,
        country: country,
        title: title,
        periedMonth: periodMonth,
        periedYear: periodYear,
        throughMonth: throughMonth,
        throughYear: throughYear,
        currentlyWork: states,
        description: description
      };

      axios.post(
        'http://localhost:3000/employment',data)

        .then(res =>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.data,
            showConfirmButton: false,
            timer: 1500
          });
          if (value === "SAVE"){
            this.props.closeModal(false);
            this.props.saveEmployment();
          } else if (value === "ADDMORE"){
            this.props.saveEmployment();
            this.clearTextField();
          }

        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: "Added fail",
            showConfirmButton: false,
            timer: 1500
          })
        })

    }
  };

  // Clear Text
  clearTextField = () =>{
    this.setState({
      companyName: "",
      city: "",
      country: "",
      title: "",
      periodMonth: "",
      periodYear: "",
      throughMonth: "",
      throughYear: "",
      states: false,
      description: "",

      companyNameEntered: false,
      cityEntered: false,
      countryEntered: false,
      titleEntered: false,
      periodMonthEntered: false,
      periodYearEntered: false,
      throughMonthEntered: false,
      throughYearEntered: false,
      descriptionEntered: false,
      formTouched: false
    });
  };

  // On Click Cancel
  onClickCancel = () =>{

    const {
      companyNameEntered,
      cityEntered,
      titleEntered,
      descriptionEntered,
      countryEntered,
      periodMonthEntered,
      periodYearEntered,
      throughMonthEntered,
      throughYearEntered} = this.state;
    
    if (
      companyNameEntered === true ||
      cityEntered === true ||
      titleEntered === true ||
      descriptionEntered === true ||
      countryEntered === true ||
      periodMonthEntered === true ||
      periodYearEntered === true ||
      throughYearEntered === true ||
      throughMonthEntered === true)
    {
      Swal.fire({
        title: 'Are you sure?',
        text: "close model!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.props.closeModal(false);
        }
      });
    }else {
      this.props.closeModal(false);
    }

  };

  render() {


    return (
      <div>
        <MDBModal isOpen={true} toggle={this.toggle} size="lg">
          {/*<MDBModalHeader className={"title"} toggle={this.props.closeModal}></MDBModalHeader>*/}
          <MDBModalBody>
            <div className="mt-3 ml-4 mr-4 mb-2">
              <h2 className="title">Add Employment</h2>

              <div className="mt-5">
                <Form>
                  <FormGroup>
                    <InputGroup>
                      <h5 className="mb-2">Company</h5>
                    </InputGroup>
                    <InputGroup>
                      <Input
                        size='md'
                        className={!this.state.companyNameEntered && this.state.formTouched ? 'border-danger text_fild' : 'text_fild'}
                        type="text"
                        id="company"
                        name="companyName"
                        autoComplete="company"
                        onChange={(e)=>this.onChangeTextField(e)}
                        value={this.state.companyName}
                      />
                    </InputGroup>
                    {
                      !this.state.companyNameEntered && this.state.formTouched ?
                        <span className="text-danger">Please enter your company Name</span> : ''
                    }
                  </FormGroup>

                  <FormGroup>
                    <InputGroup>
                      <h5 className="mb-2">Location</h5>
                    </InputGroup>
                      <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-sm-2">
                          <Input
                            className={!this.state.cityEntered && this.state.formTouched ? 'border-danger text_fild' : 'text_fild'}
                            type="text"
                            id="city"
                            name="city"
                            placeholder="City"
                            autoComplete="city"
                            onChange={(e)=>this.onChangeTextField(e)}
                            value={this.state.city}
                          />
                          {
                          !this.state.cityEntered && this.state.formTouched ?
                          <span className="text-danger">Please enter your city</span> : ''
                          }
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <Dropdown
                            className={!this.state.countryEntered && this.state.formTouched ? 'border-cmb' : ''}
                            onChange={this.onChangeCountryCombo}
                            fluid
                            search
                            selection
                            options={this.state.countryCmb}
                            placeholder='Country'
                            clearable={true}
                            value={this.state.country}
                          />
                          {
                          !this.state.countryEntered && this.state.formTouched ?
                          <span className="text-danger">Please select your country</span> : ''
                          }
                        </div>
                      </div>

                  </FormGroup>

                  <FormGroup>
                    <InputGroup>
                      <h5 className="mb-2">Title</h5>
                    </InputGroup>
                    <InputGroup>
                      <Input
                        className={!this.state.titleEntered && this.state.formTouched ? 'border-danger text_fild' : 'text_fild'}
                        type="text"
                        id="title"
                        name="title"
                        autoComplete="title"
                        onChange={(e)=>this.onChangeTextField(e)}
                        value={this.state.title}
                      />
                    </InputGroup>
                    {
                      !this.state.titleEntered && this.state.formTouched ?
                        <span className="text-danger">Please enter your title</span> : ''
                    }
                  </FormGroup>

                  <FormGroup>
                    <InputGroup>
                      <h5 className="mb-2">Period</h5>
                    </InputGroup>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-sm-2">
                        <Dropdown
                          className={!this.state.periodMonthEntered && this.state.formTouched ? 'border-cmb' : ''}
                          onChange={this.onChangePeriodMonthCombo}
                          fluid
                          search
                          selection
                          options={this.state.monthCmb}
                          placeholder='Month'
                          clearable={true}
                          value={this.state.periodMonth}
                        />
                        {
                          !this.state.periodMonthEntered && this.state.formTouched ?
                            <span className="text-danger">Please select month</span> : ''
                        }
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <Dropdown
                          className={!this.state.periodYearEntered && this.state.formTouched ? 'border-cmb' : ''}
                          onChange={this.onChangePeriodYearCombo}
                          fluid
                          search
                          selection
                          options={this.state.yearCmb}
                          placeholder='Year'
                          clearable={true}
                          value={this.state.periodYear}
                        />
                        {
                          !this.state.periodYearEntered && this.state.formTouched ?
                            <span className="text-danger">Please select year</span> : ''
                        }
                      </div>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <InputGroup>
                      <h5 className="mb-2">Through</h5>
                    </InputGroup>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-sm-2">
                        <Dropdown
                          className={!this.state.throughMonthEntered && this.state.formTouched ? 'border-cmb' : ''}
                          onChange={this.onChangeThroughMonthCombo}
                          fluid
                          search
                          selection
                          options={this.state.monthCmb}
                          placeholder='Month'
                          clearable={true}
                          value={this.state.throughMonth}
                        />
                        {
                          !this.state.throughMonthEntered && this.state.formTouched ?
                            <span className="text-danger">Please select month</span> : ''
                        }
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <Dropdown
                          className={!this.state.throughYearEntered && this.state.formTouched ? 'border-cmb' : ''}
                          onChange={this.onChangeThroughYearCombo}
                          fluid
                          search
                          selection
                          options={this.state.yearCmb}
                          placeholder='Year'
                          clearable={true}
                          value={this.state.throughYear}
                        />
                        {
                          !this.state.throughYearEntered && this.state.formTouched ?
                            <span className="text-danger">Please select year</span> : ''
                        }
                      </div>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <InputGroup>
                      <Checkbox onChange={e=>{this.OnChangeCheckBox(e)}} checked={this.state.states}>&nbsp;&nbsp;I currently work here</Checkbox>
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <InputGroup>
                      <h5 className="mb-2">Description (Optional)</h5>
                    </InputGroup>
                    <InputGroup>
                      <textarea
                        // className=""
                        className={!this.state.descriptionEntered && this.state.formTouched ? 'border-danger form-control' : 'form-control'}
                        id="description"
                        rows="4"
                        name="description"
                        onChange={e=>{this.onChangeTextField(e)}}
                        value={this.state.description}
                      />
                    </InputGroup>
                    {
                    !this.state.descriptionEntered && this.state.formTouched ?
                    <span className="text-danger">Please enter your Description</span> : ''
                    }
                  </FormGroup>

                  <FormGroup>
                    <div className="row">
                      <div className="col">
                        <Button
                          onClick={()=>{this.onClickSaveBtn("SAVE")}}
                          type='button'
                          size='large'
                          className="text-center save_btn"
                          style={{'float': 'right'}}
                        >Save</Button>
                        <Button
                          onClick={()=>{this.onClickSaveBtn("ADDMORE")}}
                          type='button'
                          size='large'
                          className="text-center save_addMore_btn"
                          style={{'float': 'right'}}
                        >Save & Add More</Button>
                        <Button
                          onClick={this.onClickCancel}
                          type='button'
                          size='large'
                          className="text-center cancel_btn"
                          style={{'float': 'right'}}
                        >Cancel</Button>
                      </div>
                    </div>
                  </FormGroup>
                </Form>
              </div>

            </div>
          </MDBModalBody>
          <MDBModalFooter>

          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}

export default AddEmployment;
