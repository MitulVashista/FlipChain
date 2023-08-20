import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  transactionId,
  brandName,
  productName,
  expenditure,
  tokensRedeemed,
  rewardRedeemed
) {
  return {
    transactionId,
    brandName,
    productName,
    expenditure,
    tokensRedeemed,
    rewardRedeemed,
  };
}

export default function UserPurchaseTable({ rows }) {
  return (
    <>
      <h1>Purchase History</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Transaction Id</TableCell>
              <TableCell align="right">Brand Name</TableCell>
              <TableCell align="right">Product Name</TableCell>
              <TableCell align="right">Expenditure</TableCell>
              <TableCell align="right">Tokens Redeemed</TableCell>
              <TableCell align="right">Reward Redeemed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.transactionId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.transactionId}
                </TableCell>
                <TableCell align="right">{row.brandName}</TableCell>
                <TableCell align="right">{row.productName}</TableCell>
                <TableCell align="right">{row.expenditure}</TableCell>
                <TableCell align="right">{row.tokensRedeemed}</TableCell>
                <TableCell align="right">
                  {row.rewardRedeemed ? row.rewardRedeemed : `_`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
