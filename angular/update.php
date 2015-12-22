<?php
$data = json_decode(file_get_contents("php://input"));
//echo $data->name . ' - ' . $data->alias;

$con=mysqli_connect("localhost","root","","muarau");
// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
mysqli_set_charset($con, 'utf8');
mysqli_query($con,"UPDATE Posts SET name='".$data->name."' WHERE id = $data->id");

$result = mysqli_query($con,"SELECT id,name FROM Posts");
$arrResult = array();
while($row = mysqli_fetch_object($result)) {    
    $arrResult[] = $row;
}
mysqli_close($con);
echo json_encode($arrResult);