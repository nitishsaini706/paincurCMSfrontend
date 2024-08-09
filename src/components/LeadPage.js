import { useEffect, useState } from "react";
import { getLeads } from "../Utils/api";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Modal, Button } from "react-bootstrap";
import { GrView } from "react-icons/gr";

export default function LeadPage() {
  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getLeads();
      if (response && response.data) {
        console.log(response.data.data);
        setLeads(response.data.data);
      }
    }
    fetchData();
  }, []);

  const handleShow = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedLead(null);
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="p-6 mx-5 w-[70%]">
          <h2 className="text-3xl mb-3">Leads</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-200 border-b border-gray-300">
                <tr>
                  <th className="p-3 text-left">Full Name</th>
                  <th className="p-3 text-left">Height</th>
                  <th className="p-3 text-left">Email Address</th>
                  <th className="p-3 text-left">Age</th>
                  <th className="p-3 text-left">Gender</th>
                  <th className="p-3 text-left">View</th>
                </tr>
              </thead>
              <tbody>
                {leads.length > 0 ? (
                  leads.map((data) => (
                    <tr key={data.slug} className="border-b border-gray-300">
                      <td className="p-3">{data[0]['What is your Full Name?']}</td>
                      <td className="p-3">{data[1]['What is your Height in Feet?']}</td>
                      <td className="p-3">{data[3]['What is your Email address?']}</td>
                      <td className="p-3">{data[4]['What is your Age?']}</td>
                      <td className="p-3">{data[5]['What is your Gender?']}</td>
                      <td className="p-3 text-center">
                        <GrView
                          className="hover:cursor-pointer text-blue-600 hover:text-blue-800"
                          onClick={() => handleShow(data)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-3 text-center">No Leads Present</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedLead && (
        <Modal
          show={showModal}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Lead Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-gray-100 p-4">
            <div className="space-y-2">
              <p><strong>Full Name:</strong> {selectedLead[0]['What is your Full Name?']}</p>
              <p><strong>Height:</strong> {selectedLead[1]['What is your Height in Feet?']}</p>
              <p><strong>Email Address:</strong> {selectedLead[3]['What is your Email address?']}</p>
              <p><strong>Age:</strong> {selectedLead[4]['What is your Age?']}</p>
              <p><strong>Gender:</strong> {selectedLead[5]['What is your Gender?']}</p>
              <p><strong>Weight:</strong> {selectedLead[2]['What is your Weight in kg?']}</p>
              <p><strong>Company:</strong> {selectedLead[6]['Company you work for:']}</p>
              <p><strong>Designation:</strong> {selectedLead[7]['Designation']}</p>
              <p><strong>Sitting Time:</strong> {selectedLead[8]['How many hours do you spend sitting each day?']}</p>
              <p><strong>Regular Physical Activity:</strong> {selectedLead[9]['Do you engage in regular physical activity or exercise?']}</p>
              <p><strong>Exercise:</strong> {selectedLead[10]['If yes, how often do you exercise?']}</p>
              <p><strong>Type of Physical Activities:</strong> {selectedLead[11]['What type of physical activities do you participate in? (Check all that apply)']}</p>
              <p><strong>Hours of Sleep:</strong> {selectedLead[12]['On average, how many hours of sleep do you get each night?']}</p>
              <p><strong>Medical Conditions:</strong> {selectedLead[13]['Do you have any known medical conditions? (Check all that apply)']}</p>
              <p><strong>Any Medications:</strong> {selectedLead[14]['Are you currently taking any medications?']}</p>
              <p><strong>Surgeries:</strong> {selectedLead[15]['Do you have a history of surgeries?']}</p>
              <p><strong>Services:</strong> {selectedLead[16]['Which services are you interested in? (Check all that apply)']}</p>
              <p><strong>Goals:</strong> {selectedLead[17]['What are your primary health and wellness goals? (Check all that apply)']}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
