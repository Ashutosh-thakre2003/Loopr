import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#2A2A3D",
        borderRadius: "16px",
        minWidth: 200,
        boxShadow: "0 0 12px rgba(0,0,0,0.2)",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Box color={color}>{icon}</Box>
        </Box>
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
