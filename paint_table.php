<?php

$last_results = 'date';
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
if (isset($_SESSION[$last_results])) {
    $results = $_SESSION[$last_results];
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
