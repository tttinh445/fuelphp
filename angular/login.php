<?php
$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$password = $data->password;
if($username == 'abc' && $password == 'abc'){
    echo 'success';
}