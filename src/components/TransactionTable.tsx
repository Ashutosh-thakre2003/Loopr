import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import API from "../services/api";

interface Transaction {
  _id: string;
  name: string;
  date: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  type: string;
  category: string;
}

const TransactionTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Filter states
  const [search, setSearch] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showAll, setShowAll] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/transactions");
        setTransactions(res.data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };

    fetchData();
  }, []);

  const filteredTransactions = transactions.filter((txn) => {
    const matchSearch = txn.name
      ? txn.name.toLowerCase().includes(search.toLowerCase())
      : txn.category?.toLowerCase().includes(search.toLowerCase()); // fallback

    const matchMin = minAmount ? txn.amount >= parseFloat(minAmount) : true;
    const matchMax = maxAmount ? txn.amount <= parseFloat(maxAmount) : true;
    const matchStart = startDate ? new Date(txn.date) >= new Date(startDate) : true;
    const matchEnd = endDate ? new Date(txn.date) <= new Date(endDate) : true;

    return matchSearch && matchMin && matchMax && matchStart && matchEnd;
  });


  const exportCSV = () => {
    const headers = ["Name", "Date", "Amount", "Status"];
    const rows = filteredTransactions.map((txn) => [
      txn.name || "N/A",
      new Date(txn.date).toLocaleDateString(),
      txn.amount,
      txn.status,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <Box mt={4}>
      <Typography variant="h6" mb={2}>
        Transactions
      </Typography>

      {/* Filter Controls */}
      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          label="Min Amount"
          type="number"
          variant="outlined"
          size="small"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
        />
        <TextField
          label="Max Amount"
          type="number"
          variant="outlined"
          size="small"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
        />
        <TextField
          label="Start Date"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          label="End Date"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={() => {
            setSearch("");
            setMinAmount("");
            setMaxAmount("");
            setStartDate("");
            setEndDate("");
          }}
        >
          Reset
        </Button>
        <Button variant="contained" onClick={exportCSV}>
          Export CSV
        </Button>

      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ backgroundColor: "#2A2A3D" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#ccc" }}>Name</TableCell>
              <TableCell sx={{ color: "#ccc" }}>Date</TableCell>
              <TableCell sx={{ color: "#ccc" }}>Amount</TableCell>
              <TableCell sx={{ color: "#ccc" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(showAll ? filteredTransactions : filteredTransactions.slice(0, 25)).map((txn) => (

              <TableRow key={txn._id}>
                <TableCell>{txn.name || "N/A"}</TableCell>
                <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
                <TableCell>${txn.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={txn.status}
                    color={
                      txn.status === "Completed"
                        ? "success"
                        : txn.status === "Pending"
                          ? "warning"
                          : "error"
                    }
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredTransactions.length > 25 && (
          <Box textAlign="center" mt={2}>
            <Button variant="outlined" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "View All"}
            </Button>
          </Box>
        )}

      </TableContainer>
    </Box>
  );
};

export default TransactionTable;
