<?php

//для работы с JSON
$_POST = json_decode(file_get_contents("php://input"), true);
//без JSON
echo var_dump($_POST);
