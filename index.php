<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>lab-work 1</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="main.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" rel="stylesheet">
<body>

<table class="main_table">
    <tr class="head">
        <td>
            <div class="circle"></div>
            <div class="circle b" id="circle b"></div>
            <h2 class="name" id="name">
                <div class="full_name">Lushnikova Anastasia</div>
                >
                <div class="attributes" id="attributes">Group: P32302 Option:3209</div>
            </h2>
        </td>

    </tr>
    <tr>
        <th class="canvas_column">
            <canvas class="canvas" id="canvas" width="300" height="300"></canvas>
        </th>
    </tr>
    <tr>
        <th>
            <form class="labels" method="get" action="create_results.php">
                <div class="x">
                    <label for="x" class="menu">Change X:</label>
                    <input class="warning" type="text" name="x" id="x" placeholder="0">
                    <span id="log_x" class="error">&nbsp You should write x between -3 and 3 &nbsp</span>
                </div>
                <span class="y" id="y">
        <label for="y" class="menu">Change Y:</label>
        <input type="checkbox" name="y" value="-5" id="-5" class="ll">-5
        <input type="checkbox" name="y" value="-4" id="-4">-4
        <input type="checkbox" name="y" value="-3" id="-3">-3
        <input type="checkbox" name="y" value="-2" id="-2">-2
        <input type="checkbox" name="y" value="-1" id="-1">-1
        <input type="checkbox" name="y" value="0" id="0">0
        <input type="checkbox" name="y" value="1" id="1">1
        <input type="checkbox" name="y" value="2" id="2">2
        <input type="checkbox" name="y" value="3" id="3">3
      </span>
                <span id="log_y" class="error"> &nbsp You should choose one y &nbsp</span>

                <div>
                    <label class="menu">Change R:</label>
                    <select id="r" class="r" name="r">
                        <option value="1">1</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2</option>
                        <option value="2.5">2.5</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <button type="submit" class="no-active" id="send" >send</button>
            </form>

    </tr>
    <tr>
        <th class="table">
            <?php

            $last_results = 'date';
            echo ("jj");
            echo (isset($_SESSION[$last_results]));
            echo ("jssj");
            echo("<table >
        <tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Result</th>
        <th>Attempt time</th>
        <th>Process time</th>
        </tr>"
            );
            print_r("kjj");
            if (isset($_SESSION[$last_results])) {
                print_r("kjj");
                $results = $_SESSION[$last_results];
                print_r($results);
                foreach ($results as $element) {
                    echo("<tr>
<td>$element[0]</td>
<td>$element[1]</td>
<td>$element[2]</td>
<td>$element[3]</td>
<td>$element[4]</td>
<td>$element[5]</td>
</tr>");
                }
            }
            echo("</table>");

            ?>
            <div>
                <script src="validation.js"></script>
                <script src="canvas.js" type=""></script>
            </div>
        </th>
    </tr>
</table>

</body>

</html>

