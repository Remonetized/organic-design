<?php
header('Content-Type: application/json; charset=utf-8');

// Functions
function deviate($dev, $max, $min=1, $range=false) {
    $minimum = max($min, ceil($max / $dev));
    if($minimum < $min) $minimum = $min;
    return $range ? $max - $minimum: rand($minimum, $max);
}

function segmentLine($length, $detail, $deviation, $minimum = 4) {
    $tempVal = 0;
    $tempLength = 0;
    $tempSegments = array();

    for($i =0; $i < $detail; $i++) {
        if($i > 0) $tempLength = $length - $tempVal;
        if(($i < ($detail - 1))) {
            $tempVal = rand(-$deviation, $deviation);
            if($i == 0) $tempLength = $length;
            $tempLength += $tempVal;
        }
        if($tempLength < $minimum) $tempLength = $minimum;
        $tempSegments[] = $tempLength;
    }
    return $tempSegments;
}

// Only one type for now
// $shape = $_GET['shape'] ?? 'default';

if(isset($_GET['w'])) $width = $_GET['w']; else $width = 278;
if(isset($_GET['h'])) $height = $_GET['h']; else $height = 278;
if(isset($_GET['detail'])) $detail = $_GET['detail']; else $detail = 8;
if(isset($_GET['variation'])) $variation = $_GET['variation']; else $variation = 14;
if(isset($_GET['deviation'])) $deviation = $_GET['deviation']; else $deviation = 3;

foreach($_GET as $param) {
    if (!is_numeric($param)) {
        http_response_code(400);
        echo json_encode(['error' => 'All parameters must be integer values.']);
        exit;
    }
}

$width = (int)$width;
$height = (int)$height;
$detail = (int)$detail;
$variation = (int)$variation;
$deviation = (int)$deviation;

$xs = $variation + 20;
$ys = $variation + 20;
$xe = $xs + $width;
$ye = $ys + $height;
$containerHeight = $height + $variation + 70;

if($detail > 1) $detail++;
if($detail > $variation) $margin = $detail;
else $margin = $variation;

$coords = 'path("M ' . $xs . ' ' . $ys;
$polygonCoords = array('polygon(');
$polygonCoords[] = $xs. 'px ' . $ys . 'px, ';

$x1 = $xs;
$y1 = $ys;
$switch = false;

$lineSegmentLength = $height / $detail;
$lineDev = deviate($deviation, $lineSegmentLength, 1, true) * .5;
$segements = segmentLine($lineSegmentLength, $detail, $lineDev);

for($i = 0; $i < $detail; $i++) {
    $moveFw = ceil($segements[$i]);
    $maxFw = max(1, floor($moveFw / 2) -1);
    $coordFw = deviate($deviation, $maxFw);
    $coordSide = deviate($deviation, $variation);
    $switch ? $x2 = $xs + $coordSide: $x2 = $xs - $coordSide;
    $switch = !$switch;
    $x3 = $x2;
    $x4 = $xs;
    $y2 = $y1 + $coordFw;
    $y3 = $y1 + $moveFw - $coordFw;
    $y4 = $y1 + $moveFw;
    $tempCoords = ' C ' . $x2 . ' ' . $y2 . ' ' . $x3 . ' ' . $y3 . ' ' . $x4 . ' ' . $y4;
    $coords .= $tempCoords;
    $polygonCoords[] = $x2 .'px ' . $y2 . 'px, ';
    $polygonCoords[] = $x3 .'px ' . $y3 . 'px, ';
    $polygonCoords[] = $x4 .'px ' . $y4 . 'px, ';
    $y1 = $y4;
}

// Line 2
$x1 = $xs;
$y1 = $ye;
$switch = false; 
$lineSegmentLength = $width / $detail;
$lineDev = deviate($deviation, $lineSegmentLength, 1, true) * .5;
$segments = segmentLine($lineSegmentLength, $detail, $lineDev);

for($i = 0; $i < $detail; $i++) {
    $moveFw = ceil($segments[$i]);
    $maxFw = max(1, floor($moveFw / 2) - 1);
    $coordFw = deviate($deviation, $maxFw);
    $coordSide = deviate($deviation, $variation);
    $switch ? $y2 = $ye - $coordSide: $y2 = $ye + $coordSide;
    $switch = !$switch;
    $x2 = $x1 + $coordFw;
    $x3 = $x1 + $moveFw - $coordFw;
    $x4 = $x1 + $moveFw;
    $y3 = $y2;
    $y4 = $ye;
    $tempCoords = ' C ' . $x2 . ' ' . $y2 . ' ' . $x3 . ' ' . $y3 . ' ' . $x4 . ' ' . $y4;
    $coords .= $tempCoords;
    $polygonCoords[] = $x2 . 'px ' . $y2 . 'px, ';
    $polygonCoords[] = $x3 . 'px ' . $y3 . 'px, ';
    $polygonCoords[] = $x4 . 'px ' . $y4 . 'px, ';
    $x1 = $x4;
}    
// Line 3
$x1 = $xe;
$y1 = $ye;
$switch = false; 

$lineSegmentLength = $height / $detail;
$lineDev = deviate($deviation, $lineSegmentLength, 1, true) * .5;

$segments = segmentLine($lineSegmentLength, $detail, $lineDev);

for($i = 0; $i < $detail; $i++) {
    $moveFw = ceil($segments[$i]);
    $maxFw = max(1, floor($moveFw / 2) - 1);
    $coordFw = deviate($deviation, $maxFw);
    $coordSide = deviate($deviation, $variation);
    $switch ? $x2 = $xe - $coordSide : $x2 = $xe + $coordSide;
    $switch = !$switch; 
    $y2 = $y1 - $coordFw;
    $y3 = $y1 - $moveFw + $coordFw;
    $y4 = $y1 - $moveFw;
    $x3 = $x2;
    $x4 = $xe;
    $tempCoords = ' C ' . $x2 . ' ' . $y2 . ' ' . $x3 . ' ' . $y3 . ' ' . $x4 . ' ' . $y4;
    $coords .= $tempCoords;
    $polygonCoords[] = $x2 . 'px ' . $y2 . 'px, ';
    $polygonCoords[] = $x3 . 'px ' . $y3 . 'px, ';
    $polygonCoords[] = $x4 . 'px ' . $y4 . 'px, ';
    $y1 = $y4;
}

// Line 4
$x1 = $xe;
$y1 = $ys;
$switch = false; 

$lineSegmentLength = $width / $detail;

$lineDev = deviate($deviation, $lineSegmentLength, 1, true) * .5;

$segments = segmentLine($lineSegmentLength, $detail, $lineDev);

for($i = 0; $i < $detail; $i++) {
    $moveFw = ceil($segments[$i]);
    $maxFw = max(1, floor($moveFw / 2) - 1);
    $coordFw = deviate($deviation, $maxFw);
    $coordSide = deviate($deviation, $variation);
    $switch ? $y2 = $ys + $coordSide : $y2 = $ys - $coordSide;
    $switch = !$switch;
    $x2 = $x1 - $coordFw;
    $x3 = $x1 - $moveFw + $coordFw;
    $x4 = $x1 - $moveFw;
    $y3 = $y2;
    $y4 = $ys;
    $tempCoords = ' C ' . $x2 . ' ' . $y2 . ' ' . $x3 . ' ' . $y3 . ' ' . $x4 . ' ' . $y4;
    $coords .= $tempCoords;
    $polygonCoords[] = $x2 . 'px ' . $y2 . 'px, ';
    $polygonCoords[] = $x3 . 'px ' . $y3 . 'px, ';
    if($i >= ($detail - 1)) $polygonCoords[] = $x4 . 'px ' . $y4 . 'px';
    else $polygonCoords[] = $x4 . 'px ' . $y4 . 'px, ';
    $x1 = $x4;
}

$coords .= ' Z")';
$polygonCoords[] = ')';

$polygon = implode("", $polygonCoords);
$path = $coords;

echo json_encode([
    'width' => $width,
    'height' => $height,
    'path' => $path,
    'polygon' => $polygon
]);