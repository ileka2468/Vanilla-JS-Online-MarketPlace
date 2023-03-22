
// exporting function that loads in specified csv file
export function loadCSV(url) {
  // creates new XML request object
    const xhr = new XMLHttpRequest();
    // sends request to parameter endpoint recived from caller
    xhr.open('GET', url, false);
    xhr.send();
    // console.log(xhr.responseText)
    // using Papa parse to turn raw text into JSON object
    return Papa.parse(xhr.responseText, { header: true }).data;
  }
  



