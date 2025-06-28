import React, { useEffect, useState } from "react";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Box, Typography } from "@mui/material";
import API from "../services/api";

interface ChartData {
  month: string;
  income: number;
  expenses: number;
}

const OverviewChart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/overview");
        setData(res.data);
      } catch (err) {
        console.error("Failed to load overview data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#2A2A3D", borderRadius: "16px", p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Income vs Expenses Overview
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#444" />
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#00FFAB" strokeWidth={2} />
          <Line type="monotone" dataKey="expenses" stroke="#FF5C8D" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default OverviewChart;
