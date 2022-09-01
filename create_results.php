<?php
session_start();
$time = microtime(true);
date_default_timezone_set('Europe/Moscow');

$x = "";
$y = "";
$r = "";
$date = date('m/d/Y h:i:s a', time());
$result = 'miss';
$results = [];
$last_results='date';

if (isset($_GET["x"])) {
    if(is_numeric(htmlentities($_GET["x"]))) {
        $x = number_format((float)htmlentities($_GET["x"]), 3);
    }
}
if (isset($_GET["y"])) {
    if(is_numeric(htmlentities($_GET["y"]))) {
        $y = number_format(htmlentities($_GET["y"]));
    }

}
if (isset($_GET["r"])) {
    if(is_numeric(htmlentities($_GET["r"]))) {
        $r = number_format(htmlentities($_GET["r"]));
    }
}
function between($x, $x1, $x2)
{
    return $x >= $x1 && $x <= $x2;
}

function is_in_square($x, $y, $r)
{

    return between($x, -$r, 0) && between($y, -$r, 0);
}

function is_in_triangle($x, $y, $r)
{

    return between($x, 0, $r) && between($y, -($r - $x), 0);
}

function is_in_sector($x, $y, $r)
{

    if (between($x, -$r, 0)) {
        if (between($y, 0, sqrt($r ** 2 + $x ** 2))) {
            return true;
        }
    }
    return false;
}

function is_in_shape($x, $y, $r)
{
    return is_in_sector($x, $y, $r) || is_in_square($x, $y, $r) || is_in_triangle($x, $y, $r);
}
if (!($x == "" || $y == "" || $r == "" || !between($x, -3, 3))) {
    if (is_in_shape($x, $y, $r)) {
        $result = 'reach';
    }
    $process = number_format(microtime(true) - $time, 6);

    $date = [$x, $y, $r, $result, $date, $process];

    if (!isset($_SESSION[$last_results])) {
        $_SESSION[$last_results] = array($date);

        $results = $_SESSION[$last_results];
    } else {
        $results = $_SESSION[$last_results];
        $results[] = $date;
        $_SESSION[$last_results] = $results;
    }

} else {
    if (!isset($_SESSION[$last_results])) {
        $_SESSION[$last_results] = array();
    } else {
        $results = $_SESSION[$last_results];
    }
}

header('Location: /lab_web/index.php');



