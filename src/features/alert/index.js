import "react-toastify/dist/ReactToastify.min.css";

import React, { memo, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";

const alertTypeIcons = { success: "✓", error: "✗" };

const Alert = props => {
  const { alert } = props;

  const updateToast = useCallback(() => {
    if (!alert) return;
    const { type, message } = alert || {};
    const alertType = (type || "").toLowerCase();
    toast[alertType](`${alertTypeIcons[alertType] || ""}  ${message}`);
  }, [alert]);

  useEffect(() => {
    updateToast();
  }, [alert, updateToast]);

  return <ToastContainer closeOnClick={false} position="top-right" />;
};

const mapStateToProps = ({ alert }) => ({ alert });

export default connect(mapStateToProps)(memo(Alert));
