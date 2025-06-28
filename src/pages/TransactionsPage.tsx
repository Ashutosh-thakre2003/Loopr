import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormGroup,
    FormControlLabel,
    Checkbox,
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

const TransactionsPage: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [search, setSearch] = useState("");
    const [minAmount, setMinAmount] = useState("");
    const [maxAmount, setMaxAmount] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [columnConfigOpen, setColumnConfigOpen] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>([
        "name",
        "date",
        "amount",
        "category",
        "status",
    ]);

    const allColumns = [
        { label: "Name", value: "name" },
        { label: "Date", value: "date" },
        { label: "Amount", value: "amount" },
        { label: "Category", value: "category" },
        { label: "Status", value: "status" },
        { label: "Type", value: "type" },
        
    ];

    useEffect(() => {
        API.get("/transactions")
            .then((res) => setTransactions(res.data))
            .catch((err) => console.error("Failed to load transactions", err));
    }, []);

    const filtered = transactions.filter((txn) => {
        const matchSearch = (txn.name ?? txn.category ?? "").toLowerCase().includes(search.toLowerCase());
        const matchMin = minAmount ? txn.amount >= parseFloat(minAmount) : true;
        const matchMax = maxAmount ? txn.amount <= parseFloat(maxAmount) : true;
        const matchStart = startDate ? new Date(txn.date) >= new Date(startDate) : true;
        const matchEnd = endDate ? new Date(txn.date) <= new Date(endDate) : true;
        return matchSearch && matchMin && matchMax && matchStart && matchEnd;
    });

    const exportCSV = () => {
        const headers = selectedColumns.map((col) => {
            const found = allColumns.find((c) => c.value === col);
            return found?.label || col;
        });

        const rows = filtered.map((txn) =>
            selectedColumns.map((col) =>
                col === "date"
                    ? new Date(txn.date).toLocaleDateString()
                    : txn[col as keyof Transaction]
            )
        );

        const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "transactions.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Box>
            <Typography variant="h5" mb={3} color="white">
                Transactions
            </Typography>

            {/* Filters */}
            <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
                <TextField
                    label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                    sx={{ bgcolor: "#36454F", borderRadius: 1 }}
                />
                <TextField
                    label="Min Amount"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    type="number"
                    size="small"
                    sx={{ bgcolor: "#36454F", borderRadius: 1 }}
                />
                <TextField
                    label="Max Amount"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    type="number"
                    size="small"
                    sx={{ bgcolor: "#36454F", borderRadius: 1 }}
                />
                <TextField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{ bgcolor: "#36454F", borderRadius: 1 }}
                />
                <TextField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{ bgcolor: "#36454F", borderRadius: 1 }}
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
                <Button variant="outlined" onClick={() => setColumnConfigOpen(true)}>
                    Configure Columns
                </Button>
            </Box>

            {/* Column Config Dialog */}
            <Dialog open={columnConfigOpen} onClose={() => setColumnConfigOpen(false)}>
                <DialogTitle>Select Columns to Export</DialogTitle>
                <DialogContent>
                    <FormGroup>
                        {allColumns.map((col) => (
                            <FormControlLabel
                                key={col.value}
                                control={
                                    <Checkbox
                                        checked={selectedColumns.includes(col.value)}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            setSelectedColumns((prev) =>
                                                checked
                                                    ? [...prev, col.value]
                                                    : prev.filter((c) => c !== col.value)
                                            );
                                        }}
                                    />
                                }
                                label={col.label}
                            />
                        ))}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setColumnConfigOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Table */}
            <TableContainer component={Paper} sx={{ bgcolor: "#2A2A3D" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "#ccc" }}>Name</TableCell>
                            <TableCell sx={{ color: "#ccc" }}>Date</TableCell>
                            <TableCell sx={{ color: "#ccc" }}>Amount</TableCell>
                            <TableCell sx={{ color: "#ccc" }}>Category</TableCell>
                            <TableCell sx={{ color: "#ccc" }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtered.map((txn) => (
                            <TableRow key={txn._id}>
                                <TableCell>{txn.name}</TableCell>
                                <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
                                <TableCell>${txn.amount.toFixed(2)}</TableCell>
                                <TableCell>
                                    {txn.type === "Income" ? `+ $${txn.amount}` : "-"}
                                </TableCell>

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
            </TableContainer>
        </Box>
    );
};

export default TransactionsPage;
