<?php require_once('../database/db_credentials.php'); ?>

<?php
// make connection to db
$connectionInfo = array("UID" => "barkeeper", "pwd" => "Koff123!", "Database" => "SIS", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:zapfhahn.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

//Debug
if( $conn ) {

     $sql = "SELECT * FROM (
     SELECT TOP(19600) [timestamp], [soilmoisture] FROM dbo.soilmoisture ORDER BY [timestamp] DESC

     ) AS roww
     ORDER BY timestamp ASC FOR JSON AUTO";

     $stmt = sqlsrv_query( $conn, $sql );
if( $stmt === false) {
    die( print_r( sqlsrv_errors(), true) );
}

while( $row = sqlsrv_fetch_array( $stmt, /*SQLSRV_FETCH_NUMERIC*/) ) {
      echo $row[0]." ".$row[1]."";
}

sqlsrv_free_stmt( $stmt);

}else{
     echo "Connection could not be established.<br />";
     die( print_r( sqlsrv_errors(), true));
}


/*if($result = mysqli_query($con, $sql)) {
foreach($result as $row) {
$data[] = $row;
}
}*/
// encode the array and print the data
//print(json_encode($data));

// close the db connection
//mysqli_close($con);
?>
