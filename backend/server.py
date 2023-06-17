from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
import database
from datetime import datetime

app= Flask(__name__)
CORS(app, support_credentials=True)

driver= database.conn.cursor()

driver.execute("select * from testcases limit 0;")
columns= [col.name for col in driver.description ]

# Example date and time string from PostgreSQL table
date_time_string = "2023-06-17 10:19:07.337401"

# Parse the date and time string into a datetime object
dt = datetime.strptime(date_time_string, "%Y-%m-%d %H:%M:%S.%f")
dt= int(dt.timestamp())

# Get the current date and time
current_datetime = datetime.now()

# Convert the datetime object to a timestamp
timestamp = int(current_datetime.timestamp())

updatedTime= timestamp-dt

print(int(updatedTime/(60*60)))

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


@app.route("/", methods=['GET'])
def showAllTests():
    driver.execute('Select * from testcases order by test_id;')
    print(driver.description[0].name)
    res= driver.fetchall()
    return calculateLastUpdation(res)

@app.route("/add-test", methods= ["POST"])
def addTest():
    testData= request.get_json()
    testData=list(testData.values())
    testColumns= ",".join(columns[1:])
    print(testData)
    print(testColumns)
    print("testcolumns: ",testColumns)
    print(f"insert into testcases ({testColumns}) values ('{testData[0]}', {testData[1]}, '{testData[2]}','{testData[3]}','{testData[4]}', NOW());")
    driver.execute(f"insert into testcases ({testColumns}) values ('{testData[0]}', {testData[1]}, '{testData[2]}','{testData[3]}','{testData[4]}', NOW());")
    database.conn.commit()
    return "inserted successfully"

@app.route("/delete-test/<test_id>", methods=['DELETE'])
def deleteTest(test_id):
    driver.execute(f"delete from testcases where test_id= {test_id}")
    database.conn.commit()
    return "deleted successfully"

@app.route("/updateTest", methods= ['PATCH'])
def updateTest():
    updateData= request.get_json()
    driver.execute(f"update testcases set {updateData.get('modifyData')}, last_updated= NOW() where test_id= {updateData.get('test_id')};")
    database.conn.commit()
    return "updated"

if __name__== "__main__":
    app.run(debug=True, host= '0.0.0.0', port=3003)