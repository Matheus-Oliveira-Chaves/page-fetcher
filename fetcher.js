const request = require('request'); // Import the request
const fs = require('fs'); // Import the fs

function fetchAndSaveFile(url, localFilePath) {
  // Use 'request.get' to send an HTTP GET request to the specified URL.
  request.get(url, (error, response, body) => {

    // Check if error during the request and print error message
    if (error) {
      console.error('Error:', error.message);

      // Check if response status code is not 200 (OK) and print status code
    } else if (response.statusCode !== 200) {
      console.error(`Error: Received status code ${response.statusCode}`);

    } else {
      // If no errors and status 200 then use 'fs.writeFile' to write response body to local file path.
      fs.writeFile(localFilePath, body, (writeError) => {

        // Check if for error during file write and print error
        if (writeError) {
          console.error('Error:', writeError.message);

          // If successful calculate size of the file and print successful download and file size
        } else {
          const fileSize = Buffer.byteLength(body);
          console.log(`Downloaded and saved ${fileSize} bytes to ${localFilePath}`);
        }
      });
    }
  });
}

// Extract the URL and local file path from the command line arguments.
const [url, localFilePath] = process.argv.slice(2);

// Check if URL and local file path are provided. Print error if one missing
if (!url || !localFilePath) {
  console.error('Usage: node fetcher.js <URL> <localFilePath>'); // 
} else {
  // Call fetchAndSaveFile with URL and local file path
  fetchAndSaveFile(url, localFilePath);
}
