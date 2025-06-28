import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  Divider,
} from "@mui/material";

interface Message {
  id: string;
  sender: string;
  content: string;
  date: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Admin",
    content: "Welcome to Penta Dashboard!",
    date: "2025-06-01",
  },
  {
    id: "2",
    sender: "Finance Bot",
    content: "Your weekly spending report is ready.",
    date: "2025-06-25",
  },
  {
    id: "3",
    sender: "Support",
    content: "Your ticket has been resolved.",
    date: "2025-06-26",
  },
];

const MessagePage: React.FC = () => {
  const [messages] = useState<Message[]>(mockMessages);

  return (
    <Box>
      <Typography variant="h5" mb={3} color="white">
        Messages
      </Typography>

      <Paper sx={{ bgcolor: "#1e1e2f", p: 2 }}>
        <List>
          {messages.map((msg, i) => (
            <React.Fragment key={msg.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>{msg.sender[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography color="white" fontWeight="bold">
                      {msg.sender}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography color="gray" variant="body2">
                        {new Date(msg.date).toLocaleDateString()}
                      </Typography>
                      <Typography color="#ccc">{msg.content}</Typography>
                    </>
                  }
                />
              </ListItem>
              {i < messages.length - 1 && <Divider variant="inset" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default MessagePage;
