import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  Paper,
  Skeleton,
  TableRow,
  TableCell,
} from "@mui/material";
import SubscriberGym from "../Components/DashboardPage/Subscriptions";
import { useGetSubscriptionsQuery } from "../Store/Services/subscription";
import EnhancedTableHead from "../Components/DashboardPage/Subscriptions/EnhancedTableHead";

function SubscriberGymPage() {
  const { isLoading, isError, isSuccess, data } = useGetSubscriptionsQuery();

  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mt: 2.5 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead />
              <TableBody>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    );
  }
  if (isError) {
    return <div>عذرا هناك خطأ , أعد تحديث الصفحة </div>;
  }
  const { gymSubscription } = data;
  if (isSuccess && gymSubscription.length === 0) {
    return <div>لا يوجد مشتركين </div>;
  }
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/dashboard/gyms">الصفحة الرئيسية</Link>
        <Typography color="text.primary">المشتركين</Typography>
      </Breadcrumbs>
      <SubscriberGym />
    </div>
  );
}

export default SubscriberGymPage;
