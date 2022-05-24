import * as React from "react";

import { TableCell, TableHead, TableRow } from "@mui/material";

export default function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>اسم المشترك</TableCell>
        <TableCell align="left">رقم الهاتف</TableCell>
        <TableCell align="left">مدة الاشتراك</TableCell>
        <TableCell align="left">تاريخ الاشتراك</TableCell>
        <TableCell align="left">حالة الاشتراك</TableCell>
      </TableRow>
    </TableHead>
  );
}
