const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis');
// const fs = require('fs');
// const path = require('path');
// const keys = require(process.env.Sheet_JSON); //JSON key file path
require('dotenv').config();
const keys = require('../src/G_cred.json')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// console.log("environment variables:", process.env);


// const credsPath = path.resolve(__dirname, process.env.Sheet_KEYS);
// const keys = JSON.parse(fs.readFileSync(process.env.Sheet_KEYS, 'utf8'));

// let keys ={};
// Google Sheets setup
// const client = new google.auth.JWT(
//   process.env.client_email,
//   null,
//   process.env.private_key,
//   ['https://www.googleapis.com/auth/spreadsheets']
// );
const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize((err, tokens) => {
  if (err) {
    console.error('Error connecting to Google Sheets API:', err);
    return;
  } else {
    console.log('Connected to Google Sheets API');
  }
});

const sheets = google.sheets({ version: 'v4', auth: client });

const spreadsheetId = process.env.SHEET_ID; //Google Sheet ID
const range = 'Sheet1!A3:G'; // range start
// console.log(spreadsheetId)

app.post('/submit', async (req, res) => {
  const { name, phoneNumber, email, companyName, address, howDidYouHear, inquiry } = req.body;

  const values = [
    [name, phoneNumber, email, companyName, address, howDidYouHear, inquiry, new Date().toISOString()]
  ];

  const resource = {
    values,
  };

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource,
    });
    res.status(200).send('Form submitted successfully');
  } catch (error) {
    console.error('Error writing to Google Sheets:', error);
    res.status(500).send('Internal Server Error');
  }
  // console.log(spreadsheetId,  process.env.SHEET_ID)
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
