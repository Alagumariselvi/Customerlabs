import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
export default function Popup(props){
        const values=[
            {label:'Add New schema to segment',value:''},
            {label:'First Name',value:'first_name'},
            {label:'Last Name',value:'last_name'},
            {label:'Gender',value:'gender'},
            {label:'Age',value:'age'},
            {label:'Account Name',value:'account_name'},
            {label:'City',value:'city'},
            {label:'State',value:'state'},

        ];
        const selectValues=[
            {label:'First Name',value:'first_name'},
            {label:'Last Name',value:'last_name'},
            {label:'Gender',value:'gender'},
            {label:'Age',value:'age'},
            {label:'Account Name',value:'account_name'},
            {label:'City',value:'city'},
            {label:'State',value:'state'},

        ];
        const LoginSchema = Yup.object().shape({
          segmentName: Yup.string().required("Segment Name is required"),
        });
        const[datas,setDatas]=useState(values);
        const[selectedOption,setSelectedOption]=useState([]);
        const[choosedOption,setChoosedOption]=useState("")
        const[selectedData,setSelectedData]=useState(selectValues);
        const handleOption=(e)=>{
         setChoosedOption(e.target.value)

        }
        const AddSchema=()=>{
          const value=values.find((val)=>val.value===choosedOption);
          setSelectedOption({...selectedOption,[value.label]:choosedOption});
          const index=values.map(e => e.value).indexOf(choosedOption)         
          selectValues.splice(index-1,1);
          selectValues.unshift({"label":value.label,"value":choosedOption})
          setSelectedData(selectValues)
          const filteredData=datas.filter((val)=>val.value!==choosedOption);
          setDatas(filteredData);
        }
        const handleSelectedOption=(e)=>{
        }
        const handleClose=()=>{
            props.onSubmit("close");
        }
        const handleSubmit=(values)=>{
         
          fetch('https://webhook.site/2495f1e4-0eeb-4e44-901f-93fbc3ffd342',{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            method:'POST',
            body:JSON.stringify({
            "segment_name": values.segmentName,
            "schema": [selectedOption]
            })
          })
          .then((response) => {
            props.onSubmit("close");
            alert('Schema Added')
          })
        }
   
    return(
        <Modal show={props.show} onHide={()=>handleClose()}>
        <Modal.Header>
          <Modal.Title>
          <svg width="19" height="19" viewBox="0 0 9 14"  fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.02732 1.50004L1.75 6.77737L7.02732 12.0547" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
            Saving Segment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Formik
              initialValues={{ segmentName: ""}}
              validationSchema={LoginSchema}
              onSubmit={(values) =>handleSubmit(values)}
            >
                {({ touched, errors, isSubmitting, values }) =>(
                <Form>
                        <div className="form-group">
                          <Field
                            type="text"
                            name="segmentName"
                            placeholder="Enter the Segment Name"
                            autocomplete="off"
                            className={`mt-2 form-control
                            ${touched.segmentName && errors.segmentName ? "is-invalid" : ""}`}
                          />

                          <ErrorMessage
                            component="div"
                            name="segmentName"
                            className="invalid-feedback"
                          />
                        </div>              
                        <p>To save your segment,you need to add the schemas to build the query</p>
                        <div className="bluediv">
                            { Object.values(selectedOption).map((value, index) =>(
                                    <div className="row m-3" key={value}>
                                        <div className="col-md-1 line">
                                        <div className="circle"></div>
                                        </div>
                                        <div className="col-md-9">
                                        <select className="dropdown" onChange={(e)=>handleSelectedOption(e)}>
                                            {selectedData.map((value)=>(
                                            <option key={value.label} value={value.value} >{value.label}</option>
                                            ))
                                            }
                                        </select>
                                        </div>
                                        <div className="col-md-2 line">
                                        <button style={{background:'#96DED1',border:'none'}} type="button">-</button>
                                        </div>
                                    
                                    </div>
                            ))}
                        </div>                      
                        <div className="row line mt-2">
                        <div className="col-md-1">
                        <div className="circle"></div>
                        </div>
                        <div className="col-md-8">
                        <select className="dropdown" onChange={(e)=>handleOption(e)}>
                          {datas.map((value)=>(
                            <option  key={value.label} value={value.value}>{value.label}</option>
                          ))
                          }
                        </select>
                        </div>
                        </div>
                        <div className="row m-5">
                        <Link to="" className="link" onClick={()=>AddSchema()}>+Add new schema</Link>
                        </div>
                  <button className='save mx-2' type="submit">
                    Save the Segment
                  </button>
                  <button className='cancel' type="button" onClick={()=>handleClose()}>
                    Close
                  </button>
                </Form>
          )
        }
        </Formik>
        </Modal.Body>
      </Modal>
    )
}