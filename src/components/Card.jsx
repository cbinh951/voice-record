/* eslint-disable react/prop-types */
// import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import './Card.css'; // Import the CSS file

export default function BasicCard({ name = '' }) {
  return (
    <Card className="hoverable-card">
      <CardContent>
        <Typography variant="h5" component="div">
          {name ? (
            name
          ) : (
            <>
              <PersonAddAlt1Icon /> Add user
            </>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}
