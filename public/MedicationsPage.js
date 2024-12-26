function displayMedications(medications) {
    if (!Array.isArray(medications)) {
        root.innerHTML = `<p class="text-red-600 text-center">Error: Invalid data format received</p>`;
        return;
    }

    root.innerHTML = `
        <h1 class="text-3xl text-blue-600 text-center my-4">Medications Information</h1>
        <table class="table-auto w-full bg-white rounded shadow-lg">
            <thead class="bg-blue-500 text-white">
                <tr>
                    <th class="px-4 py-2">ID</th>
                    <th class="px-4 py-2">Name</th>
                    <th class="px-4 py-2">Price</th>
                    <th class="px-4 py-2">Quantity</th>
                    <th class="px-4 py-2">Sale Date</th>
                </tr>
            </thead>
            <tbody>
                ${medications
                    .map(
                        (medication) => `
                    <tr
                        class="text-center border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                        onclick="fetchSales(${medication.medication_id})"
                    >
                        <td class="px-4 py-2">${medication.medication_id}</td>
                        <td class="px-4 py-2">${medication.name}</td>
                        <td class="px-4 py-2">$${medication.price.toFixed(2)}</td>
                        <td class="px-4 py-2">${medication.quantity || 'undefined'}</td>
                        <td class="px-4 py-2">${
                            medication.sale_date
                                ? new Date(medication.sale_date).toLocaleDateString()
                                : 'Invalid Date'
                        }</td>
                    </tr>
                    `
                    )
                    .join('')}
            </tbody>
        </table>

        <!-- Form for Adding New Medication -->
        <div class="mt-6">
            <h2 class="text-2xl text-blue-600 text-center my-4">Add New Medication</h2>
            <form id="new-medication-form" class="max-w-lg mx-auto">
                <div class="mb-4">
                    <label class="block text-gray-700">Name:</label>
                    <input type="text" id="medication-name" class="w-full border px-4 py-2 rounded" required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Visit ID:</label>
                    <input type="number" id="medication-visit-id" class="w-full border px-4 py-2 rounded" required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Dosage:</label>
                    <input type="text" id="medication-dosage" class="w-full border px-4 py-2 rounded" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Price:</label>
                    <input type="number" id="medication-price" class="w-full border px-4 py-2 rounded" required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Manufacturer ID:</label>
                    <input type="number" id="medication-manufacturer-id" class="w-full border px-4 py-2 rounded" />
                </div>
                <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Add Medication
                </button>
            </form>
        </div>
    `;

    document.getElementById('new-medication-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('medication-name').value;
        const visit_id = parseInt(document.getElementById('medication-visit-id').value, 10);
        const dosage = document.getElementById('medication-dosage').value;
        const price = parseFloat(document.getElementById('medication-price').value);
        const manufacturer_id = parseInt(document.getElementById('medication-manufacturer-id').value, 10);

        try {
            const response = await fetch('http://localhost:3000/api/medications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, visit_id, dosage, price, manufacturer_id }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert('New medication added successfully!');
            fetchMedications(); // Refresh the list
        } catch (err) {
            console.error('Error adding medication:', err);
            alert('Failed to add medication.');
        }
    });
}

// Fetch medications
async function fetchMedications() {
    try {
        const response = await fetch('http://localhost:3000/api/medications');
        const medications = await response.json();
        displayMedications(medications);
    } catch (err) {
        root.innerHTML = `<p class="text-red-600 text-center">Error: ${err.message}</p>`;
    }
}

// Initialize
fetchMedications();
window.fetchSales = fetchSales;
