<?php 
$keys = array("2kQn5nBp7GdFm0jvXZOIzYLCelWwRJhUH43iPE0T"); //Add Key here Example: ("test", "asd", "asdasdasd", "gasdasd")
$testing = $_GET["key"];
if (in_array($testing,$keys,TRUE)) {
  echo "true"; 
} else {
  echo "false"; 
}
?>
