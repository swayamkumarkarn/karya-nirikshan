import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
} from "@mui/material";
import PropTypes from "prop-types";
import { submitAction } from "../../../services/NotificationService";
import CustomTypo from "../CustomTypo/CustomTypo";
import CardWrap from "../CardWrap";
import CustomButton from "../CustomButton";
import { useRefresh } from "../../../contexts/RefreshContext";

const CustomTable = ({
  title,
  rows,
  headData,
  gridWidth,
  loading,
  refetchData, // Function to refetch data
}) => {
  const [alertData, setAlertData] = useState({
    open: false,
    message: "",
    severity: "success",
  });


  const { triggerRefresh } = useRefresh();
  const userId = useSelector((state) => state?.auth?.user?.data?.id);

  const handleAction = async (rowIndex, actionType, rowId) => {
    if (!userId) {
      setAlertData({
        open: true,
        message: "उपयोगकर्ता आईडी गायब है!",
        severity: "error",
      });
      return;
    }
  
    try {
      await submitAction(rowId, userId, actionType);
  
      setAlertData({
        open: true,
        message: `सफलतापूर्वक ${actionType === "accepted" ? "स्वीकृत" : "अस्वीकृत"} किया गया।`,
        severity: "success",
      });
  
      refetchData();
      triggerRefresh(); // Refetch the data after a successful action
    } catch (error) {
      console.error(`Error during ${actionType.toLowerCase()} action:`, error);
      setAlertData({
        open: true,
        message: `कृपया पुनः प्रयास करें। ${actionType === "accepted" ? "स्वीकृत" : "अस्वीकृत"} करने में विफल।`,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setAlertData({ ...alertData, open: false });
  };

  const styles = {
    row: {
      display: "grid",
      gridTemplateColumns: gridWidth || "1fr 2fr 2fr 1fr 1fr",
      margin: "0px 15px",
    },
    headerCell: {
      fontWeight: "bold",
      fontSize: "1.2rem",
      textAlign: "center",
      padding: "10px",
    },
    cell: {
      textAlign: "center",
      padding: "10px",
      fontSize: "1rem",
    },
  };

  return (
    <CardWrap>
      {title && (
        <div className="mb-4">
          <CustomTypo
            variant="h5"
            className="pl-1 text-xl flex justify-center font-bold"
          >
            {title}
          </CustomTypo>
        </div>
      )}

      <Box className="overflow-hidden">
        <TableContainer className="relative block">
          <Table>
            <TableHead>
              <TableRow style={styles.row}>
                {headData.map((headCell, index) => (
                  <TableCell key={index} style={styles.headerCell}>
                    {headCell}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow style={styles.row}>
                  <TableCell
                    colSpan={headData.length}
                    style={{ textAlign: "center" }}
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow style={styles.row}>
                  <TableCell
                    className="flex justify-center m-auto"
                    colSpan={headData.length}
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex} style={styles.row}>
                    <TableCell style={styles.cell}>{row.documentNumber}</TableCell>
                    <TableCell style={styles.cell}>{row.documentTitle}</TableCell>
                    <TableCell style={styles.cell}>{row.department}</TableCell>
                    <TableCell style={styles.cell}>{row.forwardDate}</TableCell>
                    <TableCell style={styles.cell}>
                      {row.remarks !== "Accepted" &&
                      row.remarks !== "Declined" ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "10px",
                          }}
                        >
                          <CustomButton
                            text="Accept"
                            onClick={() =>
                              handleAction(rowIndex, "accepted", row.id)
                            }
                            variant="contained"
                            color="primary"
                            size="small"
                          />
                          <CustomButton
                            text="Decline"
                            onClick={() =>
                              handleAction(rowIndex, "declined", row.id)
                            }
                            variant="contained"
                            color="primary"
                            size="small"
                          />
                        </div>
                      ) : (
                        row.remarks
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Snackbar Alert */}
      <Snackbar
        open={alertData.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={alertData.severity}
          sx={{ width: "100%" }}
        >
          {alertData.message}
        </Alert>
      </Snackbar>
    </CardWrap>
  );
};

CustomTable.propTypes = {
  title: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  headData: PropTypes.arrayOf(PropTypes.string).isRequired,
  gridWidth: PropTypes.string,
  loading: PropTypes.bool,
  reFetchData: PropTypes.func.isRequired,
};

export default CustomTable;
