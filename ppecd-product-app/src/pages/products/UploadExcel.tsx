import { useState } from "react";
import { useProductService } from "../../services/productService";

import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

export const UploadExcel = () => {
  const { uploadExcel } = useProductService();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("File", file);

    try {
      setLoading(true);
     var response =  await uploadExcel(formData);
     console.log(response);
      setMessage("Upload successful");
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Upload Excel File
        </Typography>

        <Typography
          variant="body2"
          sx={{ mb: 3, color: "text.secondary" }}
        >
          Select a .xlsx or .xls file to upload
        </Typography>

        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ mb: 2 }}
        >
          Choose File
          <input
            type="file"
            hidden
            accept=".xlsx,.xls"
            onChange={handleFileChange}
          />
        </Button>

        {file && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            {file.name}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Upload"}
        </Button>

        {message && (
          <Alert
            severity={message.includes("successful") ? "success" : "error"}
            sx={{ mt: 2 }}
          >
            {message}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};