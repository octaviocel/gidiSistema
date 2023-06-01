import { useCallback, useState } from "react";
import { Box, Chip, TextField, Typography } from "@mui/material";
import { useEffect } from "react";

export function ChipListManual({ label, onChange, list, text, setText }) {
  const [chips, setChips] = useState(list ? list : []);
  useEffect(() => {
    onChange(chips.join(", "));
  }, [chips]);

  const handleDelete = (index) => {
    chips.splice(index, 1);
    setChips([...chips]);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleKey = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      chips.push(text);
      setChips([...chips]);
      setText("");
      event.preventDefault();
    }
  };

  return (
    <div style={{ width: "100%", marginBottom: 15, marginTop: 15 }}>
      <Typography variant="subtitle2" style={{ marginBottom: 10 }}>
        {label}
      </Typography>
      <Box sx={{ flexDirection: "row" }}>
        {chips.map((label, index) => {
          return (
            <Chip
              label={label}
              key={index}
              style={{ margin: 10, backgroundColor: "white" }}
              onClick={() => handleDelete(index)}
              onDelete={() => handleDelete(index)}
            />
          );
        })}
        <TextField
          variant="outlined"
          fullWidth
          helperText="(Presiona ENTER o COMA para agregar a la lista )"
          value={text}
          onChange={handleChange}
          onKeyPress={handleKey}
        />
      </Box>
    </div>
  );
}
