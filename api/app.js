const express = require('express');
const app = express();
// ROUTE HANDLERS

// LIST ROUTES

/*
* GET /lists
* Purpose : Get all lists

*/
app.get('/lists', (req, res) => {
    // We want to get an array of all lists in the database
})

/*
 * Post /lists
 * Purpose : Create a list
 */
app.post('/lists', (req, res) => {
    // We want to create a new list and return the new list document back to the user (which includes the id)
    //The list information(fields) will be passed in via the JSON request body
})

app.patch('/lists/:id', (req, res) => {
    // We want to update the specified list (list document with id in the URL ) with the new values specified in the JSON 
})
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})