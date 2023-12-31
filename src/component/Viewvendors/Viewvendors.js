import React from 'react'
import { FaAlignRight } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import '../Viewvendors/Viewvendors.css'
import Addvendors from '../Addvendors/Addvendors'
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup'
import { useEffect, useState } from "react"
import axios from 'axios'


function Viewvendors() {
    const navigate = useNavigate("/")
    const [vendorDetails, setVendorDetails] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
  
  
    const [details, setDetails] = useState([]);
    var data = [];
    var vdata = [];
    var pdata = [];
    // const navigate = useNavigate("/");
  
    useEffect(() => {
      axios.get("https://localhost:7017/api/VendorDetails").then((response) => {
        setDetails(response.data);
        response.data.map((newdata) => {
          vdata.push(newdata.vendorDetails);
          setVendorDetails(vdata);
          pdata.push(newdata.productDetails);
          setProductDetails(pdata);
        });
  
        console.log("asigned", vdata);
        console.log("asigned", pdata);
  
        // console.log('here:',response.data.vendorDetails);
        // setVendorDetails(response.data.vendorDetails)
      });
    }, []);
  
    useEffect(() => {
      console.log("new", details);
    }, []);
  
    function deleteVendor(id) {
      axios.delete("https://localhost:7017/api/VendorDetails/"+id)
      .then((response) => {
          console.log(response.data)
  
          })
      
          }
  
    console.log("asigned 1 :", vendorDetails);
    console.log("asigned 2 :", productDetails);
    
    
    return (
        <div class="viewvendorswholediv">
            <div className="topics">
                <h2 className="rh2">Registered Vendors</h2>
                {/* <Popup trigger={<button className="add_button" onClick={() => { navigate('/addvendor') }}>Add Vendor</button>} position="left center">
                    <div><Addvendors /></div>
                </Popup> */}
                <Popup trigger=
                    {<button className="add_button" onClick={() => { navigate('/addvendor') }}>Add Vendor</button>}
                    modal nested>
                    {
                        close => (
                            <div className='modal'>
                                <div>
                                    <button className="close" onClick=
                                        {() => close()}>
                                        X
                                    </button>
                                </div>
                                <div className='content'>
                                    <Addvendors />
                                </div>

                            </div>
                        )
                    }
                </Popup>
                {/* <button className="add_button" onClick={() => { navigate('/addvendor') }}>Add Vendor</button> */}
            </div>
            {/* <div class="table_overflow">
                <table id="vendorTable">
                    <tr>
                        <th>Vendor Name</th>
                        <th>Vendor Type</th>
                        <th>Contact</th>
                        <th>Vendor Email</th>
                        <th>Action</th>
                    </tr>
                </table>
            </div> */}
            
    {/* <div class="container">
      <div class="row">
        <div class="col-12"> */}
        <div className='table_overflow'>

          <table>
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Vendor Name</th>
                <th scope="col">Type</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendorDetails.map((x,index) => {
                return (
                  <tr>
                    <th scope="row">{index+1}</th>
                    <td>{x.vendorName}</td>
                    <td>Product</td>
                    <td>{x.isActive?'active':'inactive'}</td>
                    <td>
                      <button style={{fontSize:'24px'}} type="button" class="btn-btn">
                        <i class="far fa-eye"></i>
                      </button>
                      <button style={{fontSize:'24px'}} type="button" class="btn-btn">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button style={{fontSize:'24px'}} type="button" class="btn-btn" onClick={()=>deleteVendor(x.id)}>
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
    //   </div>
    // </div>

    //     </div>
    )
}

export default Viewvendors