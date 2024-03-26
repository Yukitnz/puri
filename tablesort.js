function sortTable(columnIndex) {
    const table = document.getElementById("dataTable");
    const rows = Array.from(table.rows).slice(1); // Exclude header row
    const isAscending = !table.rows[0].cells[columnIndex].classList.contains("th-sort-asc");

    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();
        return isAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

    rows.forEach(row => table.appendChild(row));

    // Toggle sort icon
    table.querySelectorAll(".sort-icon").forEach(icon => icon.textContent = "");
    table.rows[0].cells[columnIndex].querySelector(".sort-icon").textContent = isAscending ? "▲" : "▼";

    // Update class for sorting indicator
    table.querySelectorAll("th").forEach(cell => cell.classList.remove("th-sort-asc", "th-sort-desc"));
    table.rows[0].cells[columnIndex].classList.toggle("th-sort-asc", isAscending);
    table.rows[0].cells[columnIndex].classList.toggle("th-sort-desc", !isAscending);
}

// Calculate the purine content based on the selected food and inputted amount in ounces
function calculatePurineContent() {
    const selectedFood = document.getElementById('foodSelect').value;
    const amountInput = parseFloat(document.getElementById('amountInput').value);
    const table = document.getElementById("dataTable");
    const rows = Array.from(table.rows).slice(1); // Exclude header row
    let purineContent = 0;

    // Find the row corresponding to the selected food
    const row = rows.find(row => row.cells[1].textContent === selectedFood);
    if (row) {
        const purineTotal = parseFloat(row.cells[2].textContent);
        purineContent = amountInput * purineTotal * 28.3495 / 100; // Convert ounces to grams
    }

    // Round up the purine content
    const roundedPurineContent = Math.ceil(purineContent);

    // Display the result
    document.getElementById('calculationResult').textContent = `Purine content: ${roundedPurineContent} milligrams`;
}


// Populate the food selection dropdown with options from the table's tbody
function populateFoodSelection() {
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const foodSelect = document.getElementById('foodSelect');

    for (let i = 0; i < tableBody.rows.length; i++) {
        const foodName = tableBody.rows[i].cells[1].textContent; // Food/Beverage column

        // Create an option element and add it to the select element
        const option = document.createElement('option');
        option.text = foodName;
        option.value = foodName;
        foodSelect.appendChild(option);
    }
}

// Call the function to populate the food selection dropdown when the page loads
window.onload = populateFoodSelection;
