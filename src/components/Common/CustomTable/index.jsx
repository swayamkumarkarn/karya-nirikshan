import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import { submitAction } from '../../../services/NotificationService'; 
import CustomTypo from '../CustomTypo/CustomTypo';
import CardWrap from '../CardWrap';
import CustomButton from '../CustomButton';

const CustomTable = ({ title, rows, headData, gridWidth, loading, reFetchData }) => {
    const [tableRows, setTableRows] = useState(rows);
    const userId = useSelector((state) => state?.auth?.user?.data?.id); 

    const handleAction = async (rowIndex, actionType, rowId) => {
        if (!userId) {
            alert('User ID is missing!');
            return;
        }

        try {
            await submitAction(rowId, userId, actionType);

            if (reFetchData) {
                await reFetchData();
            }

            alert(`Successfully ${actionType}`);
        } catch (error) {
            console.error(`Error during ${actionType.toLowerCase()} action:`, error);
            alert(`Failed to ${actionType.toLowerCase()}. Please try again.`);
        }
    };

    const styles = {
        row: {
            display: 'grid',
            gridTemplateColumns: gridWidth || '1fr 2fr 2fr 1fr 1fr',
            margin: '0px 15px',
        },
        headerCell: {
            fontWeight: 'bold',
            fontSize: '1.2rem',
            textAlign: 'center',
            padding: '10px',
        },
        cell: {
            textAlign: 'center',
            padding: '10px',
            fontSize: '1rem',
        },
    };

    return (
        <CardWrap>
            {title && (
                <div className="mb-4">
                    <CustomTypo variant="h5" className="pl-1 text-xl flex justify-center font-bold">
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
                                    <TableCell colSpan={headData.length} style={{ textAlign: 'center' }}>
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : tableRows.length === 0 ? (
                                <TableRow style={styles.row}>
                                    <TableCell className='flex justify-center m-auto' colSpan={headData.length} style={{ textAlign: 'center', padding: '20px' }}>
                                        No data available
                                    </TableCell>
                                </TableRow>
                            ) : (
                                tableRows.map((row, rowIndex) => (
                                    <TableRow key={rowIndex} style={styles.row}>
                                        <TableCell style={styles.cell}>{row.documentNumber}</TableCell>
                                        <TableCell style={styles.cell}>{row.documentTitle}</TableCell>
                                        <TableCell style={styles.cell}>{row.department}</TableCell>
                                        <TableCell style={styles.cell}>{row.forwardDate}</TableCell>
                                        <TableCell style={styles.cell}>
                                            {row.remarks !== 'Accepted' && row.remarks !== 'Declined' ? (
                                                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                                    <CustomButton
                                                        text="Accept"
                                                        onClick={() => handleAction(rowIndex, 'accepted', row.id)}
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                    />
                                                    <CustomButton
                                                        text="Decline"
                                                        onClick={() => handleAction(rowIndex, 'declined', row.id)}
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
