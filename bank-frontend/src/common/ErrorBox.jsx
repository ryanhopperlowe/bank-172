import React from "react";
import { Notification, KIND } from "baseui/notification";

const ErrorBox = ({ error = ""}) => {
  return error.length > 0 && (
    <Notification kind={KIND.negative}>
      {() => error}
    </Notification>
  );
};

export default ErrorBox;