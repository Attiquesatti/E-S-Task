// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get submit element that submits the data
var submit = document.getElementById("submit");

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// Array to store form data objects
var formDataArray = [];

// Function to toggle inputs based on visualization type
function toggleInputs() {
    var selectedValue = document.getElementById("visualizationType").value;
    var chartInputs = document.getElementById("chartInputs");
    var tableInputs = document.getElementById("tableInputs");

    if (selectedValue === "Chart") {
        chartInputs.style.display = "block";
        tableInputs.style.display = "none";
    } else if (selectedValue === "Table") {
        chartInputs.style.display = "none";
        tableInputs.style.display = "block";
    } else {
        // If "Select Type" is chosen, hide both input sections
        chartInputs.style.display = "none";
        tableInputs.style.display = "none";
    }
}

// Event listener to toggle inputs when visualization type is changed
document.getElementById("visualizationType").addEventListener("change", toggleInputs);

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form values
    var name = document.getElementById("fname").value;
    var order = document.getElementById("lname").value;
    var type = document.getElementById("visualizationType").value;
    var totalValue, currentValue;

    // Get total value and current value based on selected visualization type
    if (type === "Chart") {
        totalValue = document.getElementById("chartTotalValue").value;
        currentValue = document.getElementById("chartCurrentValue").value;
    } else if (type === "Table") {
        totalValue = document.getElementById("tableTotalValue").value;
        currentValue = document.getElementById("tableCurrentValue").value;
    }

    // Create form data object
    var formData = {
        name: name,
        order: order,
        type: type,
        totalValue: totalValue,
        currentValue: currentValue
    };

    // Add form data object to array
    formDataArray.push(formData);

    // Display form data
    displayFormData();

    // Close the modal
    modal.style.display = "none";
}


// Function to display form data
function displayFormData() {
    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = ""; // Clear previous output

    // Loop through formDataArray and display each object
    formDataArray.forEach(function(formData, index) {
        var formDataDiv = document.createElement("div");
        formDataDiv.classList.add("formDataBox");

        // Create labels and values for each property
        for (var key in formData) {
            if (formData.hasOwnProperty(key)) {
                var label = document.createElement("label");
                label.textContent = key.charAt(0).toUpperCase() + key.slice(1) + ": ";
                var value = document.createElement("span");
                value.textContent = formData[key];
                formDataDiv.appendChild(label);
                formDataDiv.appendChild(value);
                formDataDiv.appendChild(document.createElement("br"));
            }
        }

        // Create delete button
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.onclick = function () {
            // Ask for confirmation
            if (confirm("Are you sure you want to delete this entry?")) {
                deleteEntry(index);
            }
        };

        formDataDiv.appendChild(deleteBtn);

        // Create edit button
        var editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("editBtn");
        editBtn.onclick = function() {
            editEntry(index);
        };
        formDataDiv.appendChild(editBtn);

        outputDiv.appendChild(formDataDiv);
    });
}
// Function to delete entry
function deleteEntry(index) {
    formDataArray.splice(index, 1);
    displayFormData();
}

// Function to edit entry
function editEntry(index) {

    var formData = formDataArray[index];
    // console.log("Form data to edit: ", formData); // Log to check the form data to edit

    document.getElementById("fname").value = formData.name;
    document.getElementById("lname").value = formData.order;
    document.getElementById("visualizationType").value = formData.type;

}


// Event listener for form submission
document.getElementById("modalForm").addEventListener("submit", handleSubmit);