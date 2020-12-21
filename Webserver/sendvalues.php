<?php
//extract the passed arguements depending on the type from the GET reqeust
function readValuesFromGet($type) {
	global $time;
	$time = date("Y-m-d H:i:s");

	switch ($type) {
		case "dht":
			global $temperature, $humidity;
			$temperature = $_GET['temperature'];
			$humidity = $_GET['humidity'];
			break;
		case "sm":
			global $soilmoisture; 
			$soilmoisture = $_GET['soilmoisture'];
			break;
		case "wl":
			global $waterlevel;
			$waterlevel = $_GET['waterlevel'];
			break;
		case "mt":
			global $on;
			$on = $_GET['on'];
			break;
		case "lb":
			break;
		default:
			echo "No valid type!";
	}
}

//create sql query depening on the type from the GET request
function createSqlQuery($type) {
	global $sqlQuery, $sqlParams;
	global $time, $temperature, $humidity, $soilmoisture, $waterlevel, $poweron;
	switch ($type) {
		case "dht":
			$sqlQuery = "INSERT INTO dht (timestamp, temperature, humidity) VALUES (?, ?, ?)";
			$sqlParams = array($time, $temperature, $humidity);
			break;
		case "sm":
			$sqlQuery = "INSERT INTO soilmoisture (timestamp, soilmoisture) VALUES (?, ?)";
			$sqlParams = array($time, $soilmoisture);
			break;
		case "wl":
			$sqlQuery = "INSERT INTO waterlevel (timestamp, waterlevel) VALUES (?, ?)";
			$sqlParams = array($time, $waterlevel);
			break;
		case "mt":
			$sqlQuery = "INSERT INTO motor (timestamp, powerOn) VALUES (?, ?)";
			$sqlParams = array($time, $poweron);
			break;
		case "lb":
			$sqlQuery = "INSERT INTO lastsystemboot (timestamp) VALUES (?)";
			$sqlParams = array($time);
			break;
		default:
			echo "No valid type!";
	}
}

//SETUP
date_default_timezone_set('Europe/Helsinki');

//Declare and initalize sensor variables
$time = $temperature = $humidity = $soilmoisture = $waterlevel = $poweron = null;
$sqlQuery = $sqlParams = null;

//Conenct to SQL server
// SQL Server Extension Sample Code:
$connectionInfo = array("UID" => "barkeeper", "pwd" => "Koff123!", "Database" => "SIS", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:zapfhahn.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

//Debug
if( $conn ) {
     echo "Connection established.<br />";
}else{
     echo "Connection could not be established.<br />";
     die( print_r( sqlsrv_errors(), true));
}

//WEBSITE OUTPUT
$type = $_GET['type'];
readValuesFromGet($type);
echo nl2br("The time is $time\n");
echo nl2br("Type: $type\n");
echo nl2br("temperature: $temperature \n");
echo nl2br("humidity: $humidity \n");
echo nl2br("soilmoisture: $soilmoisture\n");
echo nl2br("waterlevel: $waterlevel\n");
echo nl2br("on: $on\n\n");

//Write to database
createSqlQuery($type);

echo nl2br("SQL Query: $sqlQuery\n");
echo "SQL Params: ";
echo implode(", ", $sqlParams);
echo nl2br("\n");

$stmt = sqlsrv_query( $conn, $sqlQuery, $sqlParams);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}

//Close SQL server connection
sqlsrv_close( $conn );
?>