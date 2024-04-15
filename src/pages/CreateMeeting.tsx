import React from "react";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";
import meeting1 from "../assets/meeting1.png";
import meeting2 from "../assets/meeting2.png";
import { useNavigate } from "react-router-dom";

function CreateMeeting() {
  const navigate = useNavigate();
  useAuth();
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ margin: "5vh 10vh" }}
      >
        <EuiFlexItem>
          <EuiCard
            icon={<EuiImage size="100%" alt="icon" src={meeting1} />}
            title={`Create 1 on 1 Meeting`}
            description="Create a personal single person meeting."
            onClick={() => navigate("/create1on1")}
            paddingSize="xl"
          />{" "}
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            icon={<EuiImage size="100%" alt="icon" src={meeting2} />}
            title={`Video Conference`}
            description="Invite multiple persons to the meeitng."
            onClick={() => navigate("/videoconference")}
            paddingSize="xl"
          />{" "}
        </EuiFlexItem>
        
      </EuiFlexGroup>
    </div>
  );
}

export default CreateMeeting;
