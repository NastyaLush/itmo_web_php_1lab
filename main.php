<?php

$time = microtime(true);

$x ="";
$y="";
$r="";
date_default_timezone_set('Europe/Moscow');
$date = date('m/d/Y h:i:s a', time());
$result = 'miss';

if (isset($_GET["x"])) {

  $x = (float)htmlentities($_GET["x"]);
}
if (isset($_GET["y"])) {

  $y = htmlentities($_GET["y"]);

}if (isset($_GET["r"])) {

  $r = htmlentities($_GET["r"]);
}
echo ("<table>
        <tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Result</th>
        <th>Attempt time</th>
        <th>Process time</th>
        </tr>"
);
function between($x, $x1, $x2){
  return $x>=$x1 && $x<=$x2;;
}

function is_in_square($x,$y, $r){

  return between($x, -$r, 0) && between($y, -$r, 0);
}function is_in_triangle($x,$y, $r){

  return between($x, 0, $r) && between($y, -($r-$x), 0);
}
function is_in_sector($x,$y, $r){

  if(between($x, -$r, 0)){
    if (between($y, 0, sqrt($r**2 + $x**2))){
      return true;
    }
  }
  return false;
}
function is_in_shape($x,$y,$r){
  return is_in_sector($x,$y,$r) || is_in_square($x,$y,$r) || is_in_triangle($x,$y,$r);
}

$results=[];
if(!($x=="" || $y=="" || $r=="" || !between($x,-3,3))){
  if(is_in_shape($x,$y,$r)){
    $result= 'reach';
  }
  $process = microtime(true)- $time;

  $date = [$x,$y,$r,$result,$date,$process];

  if (!isset($_SESSION["date"])) {
    $_SESSION["date"] = array($date);
    $results= $_SESSION["date"];
  } else {
    $results= $_SESSION["date"];
    $results[] = $date;
    $_SESSION["date"]=$results;
  }

} else{
  if (!isset($_SESSION["date"])) {
    $_SESSION["date"] = array();
  } else {
    $results = $_SESSION["date"];
  }
}
foreach ($results as $element){
  echo("<tr>
<td>$element[0]</td>
<td>$element[1]</td>
<td>$element[2]</td>
<td>$element[3]</td>
<td>$element[4]</td>
<td>$element[5]</td>
</tr>");
}
echo ("</table>");
