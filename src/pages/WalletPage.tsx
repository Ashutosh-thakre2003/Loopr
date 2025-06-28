import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from "@mui/material";
import API from "../services/api";

interface Transaction {
  _id: string;
  name: string;
  amount: number;
  date: string;
  type: "income" | "expense" | "Income" | "Expense";
}

const WalletPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    API.get("/transactions").then((res) => {
      const txns = res.data as Transaction[];
      setTransactions(txns.slice(0, 5));

      const total = txns.reduce((sum, t) => {
        return t.type === "Income" ? sum + t.amount : sum - t.amount;
      }, 0);
      setBalance(total);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h5" mb={3} color="white">
        Wallet
      </Typography>

      <Paper sx={{ p: 3, bgcolor: "#1e1e2f", color: "white", mb: 3 }}>
        <Typography variant="subtitle1">Current Balance</Typography>
        <Typography
          variant="h4"
          color={balance >= 0 ? "lightgreen" : "salmon"}
        >
          ${balance.toFixed(2)}
        </Typography>
      </Paper>

      <Paper sx={{ p: 2, bgcolor: "#1e1e2f", color: "white" }}>
        <Typography variant="h6" mb={2}>
          Recent Wallet Activity
        </Typography>
        <List>
          {transactions.map((txn, index) => (
            <React.Fragment key={txn._id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>{txn.name?.[0] ?? "?"}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={txn.name}
                  secondary={new Date(txn.date).toLocaleDateString()}
                />
                <Typography
                  color={txn.type === "Income" ? "lightgreen" : "salmon"}
                >
                  {txn.type === "Income" ? "+" : "-"}${txn.amount.toFixed(2)}
                </Typography>
              </ListItem>
              {index < transactions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default WalletPage;
