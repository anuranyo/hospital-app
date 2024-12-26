# Hospital App

Hospital App is a full-stack web application designed for managing hospital resources efficiently. It allows users to interact with various hospital databases, such as medications, patients, doctors, and sales, while providing an intuitive user interface for easy management.

---

## Features

### Frontend Features
- **Dynamic Data Display**: Show lists of medications, doctors, patients, and sales information.
- **Form Handling**: Add new records (medications, sales, patients, etc.) through interactive forms.
- **Error Handling**: Inform users of invalid inputs or system issues.
- **Responsive Design**: Built with modern UI frameworks to provide a seamless experience on all devices.

### Backend Features
- **RESTful API**: Supports CRUD operations for managing data related to medications, patients, doctors, and sales.
- **Database Interaction**: Uses Microsoft SQL Server to store and retrieve data.
- **Secure Data Handling**: Validates inputs and ensures database security through structured queries.
- **Custom Business Logic**: Implements triggers and stored procedures for data integrity.

---

## Tech Stack

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript**
- **Tailwind CSS** for styling

### Backend
- **Node.js**
- **Express.js**
- **Microsoft SQL Server**
- **Tedious** for database interaction

---

## Installation

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v14+)
- **SQL Server**

### Steps to Run Locally
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/anuranyo/hospital-app.git
   cd hospital-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Setup Database**:
   - Import the SQL schema provided in the `/database` folder into your SQL Server.
   - Update the `.env` file with your database credentials:
     ```env
     DB_SERVER=<your_server_name>
     DB_PORT=1433
     DB_DATABASE=hospital_db
     DB_USER=<your_db_user>
     DB_PASSWORD=<your_db_password>
     ```

4. **Start the Server**:
   ```bash
   npm start
   ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

---

## API Endpoints

### Medications
- **GET** `/api/medications` - Retrieve all medications.
- **POST** `/api/medications` - Add a new medication.
- **GET** `/api/medications/:id` - Retrieve medication details by ID.

### Patients
- **POST** `/api/patients` - Add a new patient.

### Sales
- **GET** `/api/medications/:id/sales` - Get sales for a specific medication.
- **POST** `/api/sales` - Add a new sale.

---

## Example Usage

### Adding a Medication
Make a `POST` request to `/api/medications` with the following payload:
```json
{
  "name": "Paracetamol",
  "visit_id": 1,
  "dosage": "500mg",
  "price": 50,
  "manufacturer_id": 2
}
```
Response:
```json
{
  "message": "Medication added successfully"
}
```

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a Pull Request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact
For questions or support, please contact:
- **Author**: [Anuranyo](https://github.com/anuranyo)
- **Email**: anuranyo@example.com

