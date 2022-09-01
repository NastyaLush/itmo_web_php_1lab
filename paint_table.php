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
