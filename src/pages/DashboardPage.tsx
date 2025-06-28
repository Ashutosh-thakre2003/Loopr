import React from "react";
import { Box, Grid } from "@mui/material";
import StatCard from "../components/StatCard";
import OverviewChart from "../components/OverviewChart";
import RecentTransactions from "../components/RecentTransactions";
import TransactionTable from "../components/TransactionTable";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SavingsIcon from "@mui/icons-material/Savings";

import { blue, green, red } from "@mui/material/colors";

const DashboardPage: React.FC = () => {
  return (
    <Box p={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Balance"
            value="$133,198"
            icon={<AccountBalanceWalletIcon />}
            color={blue[300]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Revenue"
            value="$58,970"
            icon={<TrendingUpIcon />}
            color={green[400]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Expenses"
            value="$25,310"
            icon={<MonetizationOnIcon />}
            color={red[400]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Savings"
            value="$13,500"
            icon={<SavingsIcon />}
            color="#00FFAB"
          />
        </Grid>
      </Grid>

      <Box display="flex" gap={3} flexWrap="wrap" mt={4}>
        <Box flex="1" minWidth="600px">
          <OverviewChart />
        </Box>
        <Box width="300px">
          <RecentTransactions />
        </Box>
      </Box>

      <TransactionTable />
    </Box>
  );
};

export default DashboardPage;
