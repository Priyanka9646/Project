const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis');
const keys = require('../src/sunny-emissary-427613-s8-04f04c834d7b.json'); //JSON key file path

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Google Sheets setup
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

const spreadsheetId = '1O2Qg4r8j_uMSMYb50_Gc4zLt6-9IqusE8YkPTYuhwpI'; //Google Sheet ID
const range = 'Sheet1!A3:G'; // range start

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
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
