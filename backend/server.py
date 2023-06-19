# For creating Flask application and allow Cross Origin with Frontend
from flask import Flask, request
from flask_cors import CORS

# For Connecting to Postgres Database
import database

# To parse date values
from datetime import datetime

# Creates Flask Application
app= Flask(__name__)
CORS(app, support_credentials=True)             # Handles Cross Origin Policy

connection= database.getConnection()            # Starts a database connection
driver= connection.cursor()                     # Open a Postgres cursor for SQL implementation

driver.execute("select * from testcases limit 0;")      # Fetch the columns in a table
columns= [col.name for col in driver.description ]
driver.close()                                          # Close the cursor
connection.close()                                      # Close db connection


# Calculates the time of last updation of each test data in the table testcases
def calculateLastUpdation(table):

    currTimeStamp= int(datetime.now().timestamp())
    for i in range(len(table)):
    
        table[i]= list(table[i])
        timeObj= datetime.strptime(str(table[i][-1]), "%Y-%m-%d %H:%M:%S.%f")
        timeObjStamp= int(timeObj.timestamp())

        lastUpdated= currTimeStamp-timeObjStamp

        if(lastUpdated<60):
            lastUpdated= str(int(lastUpdated))+" seconds ago"
        elif(lastUpdated<3600):
            lastUpdated= str(int(lastUpdated/60))+" minutes ago"
        elif(lastUpdated<3600*24):
            lastUpdated= str(int(lastUpdated/3600))+" hours ago"
        elif(lastUpdated<3600*24*30):
            lastUpdated= str(int(lastUpdated/(3600*24)))+" days ago"
        elif(lastUpdated<3600*24*30*12):
            lastUpdated= str(int(lastUpdated/(3600*24*30)))+" months ago"
        else:
            lastUpdated= str(int(lastUpdated/(3600*24*30*12)))+" years ago"

        table[i][-1]= lastUpdated

    return table

# Fetches all test data from table testcases
@app.route("/", methods=['GET'])
def showAllTests():

    connection= database.getConnection()
    driver= connection.cursor()

    driver.execute('Select * from testcases order by test_id;')
    res= driver.fetchall()

    driver.close()
    connection.close()

    return calculateLastUpdation(res)

# Inserts a new Testcase data
@app.route("/add-test", methods= ["POST"])
def addTest():

    testData= request.get_json()                # fetches the data to be inserted from POST request
    testData=list(testData.values())
    testColumns= ",".join(columns[1:])          # stringify columns whose data to be inserted manually

    connection= database.getConnection()
    driver= connection.cursor()

    driver.execute(f"insert into testcases ({testColumns}) values ('{testData[0]}', {testData[1]}, '{testData[2]}','{testData[3]}','{testData[4]}', NOW());")
    connection.commit()                         # finalize the sql operation executed above

    driver.close()
    connection.close()

    return "inserted successfully"

# delete a testcase from table
@app.route("/delete-test/<test_id>", methods=['DELETE'])
def deleteTest(test_id):

    connection= database.getConnection()
    driver= connection.cursor()

    driver.execute(f"delete from testcases where test_id= {test_id}")
    connection.commit()

    driver.close()
    connection.close()

    return "deleted successfully"

# update a testcase
@app.route("/update-test", methods= ['PATCH'])
def updateTest():

    updateData= request.get_json()

    connection= database.getConnection()
    driver= connection.cursor()

    driver.execute(f"update testcases set {updateData.get('modify_data')}, last_updated= NOW() where test_id= {updateData.get('test_id')};")
    connection.commit()

    driver.close()
    connection.close()
    
    return "updated"

if __name__== "__main__":
    app.run(debug=True, host= '0.0.0.0', port=3003)