import React, { useEffect, useState } from "react";
import { MeetingType } from "../utils/Types";
import { meetingsRef } from "../utils/FirebaseConfig";
import { where, query, getDocs } from "firebase/firestore";
import { useAppSelector } from "../app/hooks";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import {
  EuiBadge,
  EuiBasicTable,
  EuiButtonIcon,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from "@elastic/eui";
import moment from "moment";
import { Link } from "react-router-dom";


function Meeting() {
  useAuth();
  const [meetings, setMeetings] = useState<Array<MeetingType>>([]);
  const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);



  useEffect(() => {
    if(userInfo){
        const getUserMeeting=async()=>{
            const firestoreQuery=query(meetingsRef)
            const fetchMeetings= await getDocs(firestoreQuery)
            if(fetchMeetings.docs.length){
                const myMeetings:Array<MeetingType>=[]
                fetchMeetings.forEach(meeting=>{
                    const data = meeting.data() as MeetingType
                    if(data.createdBy===userInfo.uid) myMeetings.push(data)
                    else if(data.meetingType==="anyone-can-join") myMeetings.push(data)
                    else {
                        const index = data.invitedUsers.findIndex(user=>user===userInfo.uid)
                        if(index!==-1){
                            myMeetings.push(data)
                        }
                }    
                })
                setMeetings(myMeetings)
            }
        }
        getUserMeeting()
    }
  }, [userInfo]);



  const columns = [
    {
      field: "meetingName",
      name: "meetingName",
    },
    {
      field: "meetingType",
      name: "Meeting Type",
    },
    {
      field: "meetingDate",
      name: "Meeting Date",
    },
    {
      field: "",
      name: "Status",
      render: (meeting: MeetingType) => {
        if (meeting.status) {
          if (meeting.meetingDate === moment().format("L")) {
            return (
              <EuiBadge color="success">
                <Link
                  style={{ color: "black" }}
                  to={`/join/${meeting.meetingId}`}
                >
                  Join Now
                </Link>
              </EuiBadge>
            );
          } else if (
            moment(meeting.meetingDate).isBefore(moment().format("L"))
          ) {
            return <EuiBadge color="default">Ended</EuiBadge>;
          } else {
            return <EuiBadge color="primary">Upcoming</EuiBadge>;
          }
        } else {
          return <EuiBadge color="danger">Cancelled</EuiBadge>;
        }
      },
    },
    {
      field: "meetingId",
      name: "Copy Link",
      render: (meetingId: string) => {
        return (
          <EuiCopy
            textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}
          >
            {(copy: any) => (
              <EuiButtonIcon
                iconType="copy"
                onClick={copy}
                display="base"
                aria-label="Meeting-copy"
              />
            )}
          </EuiCopy>
        );
      },
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" style={{ margin: "1rem" }}>
        <EuiFlexItem>
          <EuiPanel>
            <EuiBasicTable items={meetings} columns={columns} />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    
    </div>
  );
}

export default Meeting;
