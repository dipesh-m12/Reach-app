import { EuiButton, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import React from "react";
import { useNavigate } from "react-router-dom";

function CreateMeetingButtons({
  createMeeting,
  isEdit,
  closeFlyout,
}: {
  createMeeting: () => void;
  isEdit?: boolean;
  closeFlyout?: () => {};
}) {
  const navigate = useNavigate();
  return (
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>
        <EuiButton
          color="danger"
          onClick={() => (isEdit ? closeFlyout!() : navigate("/"))}
          fill
        >
          Cancel
        </EuiButton>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiButton fill onClick={createMeeting}>
          {isEdit ? "Edit Meeting" : "Create Meeting"}
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

export default CreateMeetingButtons;
