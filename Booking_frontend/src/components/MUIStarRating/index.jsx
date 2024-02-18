import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useState, useEffect } from "react";
import { Tooltip } from "react-bootstrap";

const labels = {
  0.5: "Poor",
  1: "Poor",
  1.5: "Poor",
  2: "Poor",
  2.5: "Average",
  3: "Average",
  3.5: "Good",
  4: "Good",
  4.5: "Excellent",
  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverRating({ setUserReview, userReview }) {
  const [value, setValue] = React.useState(3);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        // width: 200,
        display: "flex",
        alignItems: "center",
        marginRight: 4,
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          setUserReview((prev) => ({ ...prev, rating: newValue }));
        }}
        // onChangeActive={(event, newHover) => {
        //   setHover(newHover);
        // }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />

      {/* {value !== null && (
        <Box sx={{ fontSize: 15, ml: 2 }}>
          {labels[hover !== -1 ? hover : value]}
        </Box>
      )} */}
    </Box>
  );
}
