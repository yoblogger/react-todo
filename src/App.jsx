import React, { useEffect, useState } from 'react';
import {
  MDBBadge,
  MDBCard,
  MDBCardBody,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
} from "mdb-react-ui-kit";
import axios from 'axios';

export default function App() {
  const [data, setData] = useState(null);

  const apiUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:dDQ0FXaq/todo';

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      const responseData = response.data;
      setData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const checkToggle = (itemId, isChecked) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === itemId ? { ...item, status: isChecked } : item
      )
    );
  };

  return (
    <section className="p-5 vh-100" style={{ backgroundColor: "#3da2c3" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol lg="8" xl="6">
            <MDBCard className="rounded-3">
              <MDBCardBody className="p-4">
                <h5>
                  <span className="h2 me-2">Coding with Mandeep YT</span>{" "}
                  <MDBBadge className="mx-2" color="danger">
                    checklist
                  </MDBBadge>
                </h5>
                <p className="text-muted pb-2">04/01/2020 • ML - 1321</p>
                <MDBListGroup className="rounded-0">
                  {data && data.map((item) => (
                    <MDBListGroupItem className="border-0 d-flex align-items-center ps-0" key={item.id}>
                      <MDBCheckbox
                        name="flexCheck"
                        value=""
                        id="flexCheck"
                        className="me-3"
                        defaultChecked={item.status === true}
                        onChange={(e) => checkToggle(item.id, e.target.checked)}
                      />
                      {item.status === true ? (<s>{item.name}</s>) : item.name}
                    </MDBListGroupItem>
                  ))}
                  {/* <MDBListGroupItem className="border-0 d-flex align-items-center ps-0">
                    <MDBCheckbox
                      name="flexCheck"
                      value=""
                      id="flexCheckChecked"
                      className="me-3"
                    />
                    <s>Set due date and assignments</s>
                  </MDBListGroupItem> */}
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
