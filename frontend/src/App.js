import React from "react";
import "./App.css";
import { Typography, Button, Alert } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
  height: 90vh;
  padding: 50px 10px;
  background-color: #f9faff;
`;

const Box = styled.div`
  max-width: 650px;
  min-height: 45px;
  display: ${(props) => props.display || "flex"};
  ${"" /* padding:20px; */}
  border-radius: 8px;
  margin: 20px auto;
  box-shadow: ${(props) => props.shadow || "0px 0px 18px #f4f4f4"};
  border: 1px solid #f0f0f0;
  background-color: white;
  transition: ease-in 0.2;
  input {
    width: 100%;
    border: none;
    outline: none;
    border-radius: 8px;
    padding: 10px;
    font-size: 13px;
  }
`;

const Grid = styled.div`
  padding: 15px;
  bottom-bo
`;

const Item = styled.div`
  padding: 10px;
`;

function App() {
  const [seachText, setSeachText] = React.useState("");
  const [isFocus, setIsFocus] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleError = () => {
    setError("");
  };

  const getUser = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (seachText === "") return setError("Cant be empty");
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ name: seachText }),
      });
      const res = await response.json();
      if (res?.error) {
        setError(res.error);
        setLoading(false);
        return;
      }
      console.log(res);
      setResult(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ margin: "20px" }} align="center">
        Find address by name
      </Typography>
      <Box shadow={isFocus && "0px 0px 10px 1px #DEDFE3"}>
        <input
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholder="Enter name"
          autoComplete="off"
          value={seachText}
          onChange={(e) => setSeachText(e.target.value)}
          type="text"
          name="search"
        />
        <Button
          disabled={seachText === ""}
          disableElevation={true}
          size="large"
          variant="contained"
          sx={{ borderRadius: "7px" }}
          onClick={getUser}
        >
          Search
        </Button>
      </Box>

      {error && (
        <Grid>
          <Alert severity="error" onClose={handleError}>
            {error}
          </Alert>
        </Grid>
      )}

      {result && (
        <Box display="block">
          <Grid>
            <Typography variant="h6">Information page</Typography>
          </Grid>

          <Grid>
            {result?.map((item, i) => (
              <Item key={i.toString()}>
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="subtitle2">{item.address}</Typography>
              </Item>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default App;
