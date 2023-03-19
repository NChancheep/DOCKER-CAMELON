import React from "react";
// import { MDBRipple } from "mdb-react-ui-kit";
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export default function ImageHover() {
  return (
    <>
        <MDBCol md="4">
          <MDBView hover>
            <img
              src="https://mdbootstrap.com/img/Others/documentation/forest-sm-mini.webp"
              className="img-fluid"
              alt=""
            />
            <MDBMask className="flex-center" overlay="red-strong">
              <p className="white-text">Strong overlay</p>
            </MDBMask>
          </MDBView>
        </MDBCol>
    </>
  );
}
