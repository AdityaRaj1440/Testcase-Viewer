# Testcase-Viewer
A Web Application to view, add, update and delete testcases for different modules. Developed using React.js, Flask and Postgresql

## Prerequisites

- Node.js and npm should be installed on your machine.
- Python and pip should be installed on your machine.

## Getting Started

1. Clone the repository:
2. Navigate to the project directory:

### Database Setup

3. Create a Database test_empiler:- 
<br><pre>create database test_empiler;<pre>
4. Switch to test_empiler in psql terminal:-
<br><pre>\c test_empiler;</pre>
5. Create the table testcases with the following command:-
<br><pre>
CREATE TABLE testcases(
  test_id serial primary key,
  testcase_name varchar(50) NOT NULL,
  estimated_time decimal(10,2),
  module varchar(100),
  priority varchar(10),
  status varchar(10),
  last_updated timestamp
);
</pre>

### Backend Setup

6. Open a terminal in the backend folder and install the below Python packages: 
     <br> pip install psycopg2 python-dotenv Flask Flask-Cors

7. Create a env file and store the posgres login password with variable name:- "DB_PASSWORD"

8. Start the Flask backend server:


The server will run at `http://localhost:3003`.

### Frontend Setup

9. Open a terminal in the Frontend's "src" folder and install the frontend dependencies using "npm i":


10. Start the React development server:


The app will be available at `http://localhost:3000`.

## Usage

- Access the React app by visiting `http://localhost:3000` in your web browser.
- The app interacts with the Flask backend API running at `http://localhost:3003`.
