import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import API from "../services/api";

interface Transaction {
  _id: string;
  name: string;
  amount: number;
  type: string;
  status: string;
  date: string;
}

const RecentTransactions: React.FC = () => {
  const [recent, setRecent] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await API.get("/transactions");
      const sorted = res.data.sort((a: Transaction, b: Transaction) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setRecent(sorted.slice(0, 5));
    };
    fetch();
  }, []);

  return (
    <Box
      p={2}
      bgcolor="#1e1e2f"
      borderRadius="10px"
      minWidth="280px"
      height="100%"
    >
      <Typography variant="subtitle1" mb={2} color="white">
        Recent Transactions
      </Typography>
      {recent.map((txn) => (
        <Box key={txn._id} display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ mr: 2 }} />
          <Box flexGrow={1}>
            <Typography variant="body2" color="white">
              {txn.name}
            </Typography>
            <Typography variant="caption" color="gray">
              {new Date(txn.date).toLocaleDateString()}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color={txn.amount > 0 ? "lightgreen" : "salmon"}
          >
            {txn.amount > 0 ? `+$${txn.amount}` : `-$${Math.abs(txn.amount)}`}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default RecentTransactions;
