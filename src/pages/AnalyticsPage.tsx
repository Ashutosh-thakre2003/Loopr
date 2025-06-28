import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import API from "../services/api";

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  type: "income" | "expense";
}

const AnalyticsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/transactions")
      .then((res) => setTransactions(res.data))
      .finally(() => setLoading(false));
  }, []);

  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "short" }),
    income: 0,
    expense: 0,
  }));

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((txn) => {
    const date = new Date(txn.date);
    const monthIndex = date.getMonth();

    if (txn.type.toLowerCase() === "income") {
      monthlyData[monthIndex].income += txn.amount;
      totalIncome += txn.amount;
    } else {
      monthlyData[monthIndex].expense += txn.amount;
      totalExpense += txn.amount;
    }
  });

  const savings = totalIncome - totalExpense;

  return (
    <Box>
      <Typography variant="h5" mb={3} color="white">
        Analytics Overview
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={2} mb={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 2, bgcolor: "#1e1e2f", color: "white" }}>
                <Typography variant="subtitle1">Total Income</Typography>
                <Typography variant="h6" color="lightgreen">${totalIncome.toFixed(2)}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 2, bgcolor: "#1e1e2f", color: "white" }}>
                <Typography variant="subtitle1">Total Expense</Typography>
                <Typography variant="h6" color="salmon">${totalExpense.toFixed(2)}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 2, bgcolor: "#1e1e2f", color: "white" }}>
                <Typography variant="subtitle1">Total Savings</Typography>
                <Typography variant="h6" color="cyan">${savings.toFixed(2)}</Typography>
              </Paper>
            </Grid>
          </Grid>

          <Paper elevation={3} sx={{ p: 3, bgcolor: "#1e1e2f", color: "white" }}>
            <Typography variant="h6" mb={2}>
              Monthly Income vs Expenses
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#00FFAB" strokeWidth={2} />
                <Line type="monotone" dataKey="expense" stroke="#FF6B6B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default AnalyticsPage;
