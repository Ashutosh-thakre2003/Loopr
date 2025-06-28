import React from "react";
import { Box } from "@mui/material";
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
      {/* Stat Cards */}
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="space-between">
        <Box flex="1 1 220px" maxWidth="250px">
          <StatCard
            title="Balance"
            value="$133,198"
            icon={<AccountBalanceWalletIcon />}
            color={blue[300]}
          />
        </Box>
        <Box flex="1 1 220px" maxWidth="250px">
          <StatCard
            title="Revenue"
            value="$58,970"
            icon={<TrendingUpIcon />}
            color={green[400]}
          />
        </Box>
        <Box flex="1 1 220px" maxWidth="250px">
          <StatCard
            title="Expenses"
            value="$25,310"
            icon={<MonetizationOnIcon />}
            color={red[400]}
          />
        </Box>
        <Box flex="1 1 220px" maxWidth="250px">
          <StatCard
            title="Savings"
            value="$13,500"
            icon={<SavingsIcon />}
            color="#00FFAB"
          />
        </Box>
      </Box>

      {/* Chart + Transactions */}
      <Box mt={4} display="flex" flexWrap="wrap" gap={3}>
        <Box flex="1 1 600px" minWidth="300px">
          <OverviewChart />
        </Box>
        <Box flex="0 1 300px" minWidth="280px">
          <RecentTransactions />
        </Box>
      </Box>

      {/* Transaction Table */}
      <Box mt={4}>
        <TransactionTable />
      </Box>
    </Box>
  );
};

export default DashboardPage;
