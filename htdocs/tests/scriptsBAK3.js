function intRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function backColour(id) {
    const backColour = document.getElementById('backcolour').value;
    document.getElementById(id).style.backgroundColor = backColour;
}

function borderColour(id) {
    let check = document.getElementById('borderCheck').checked;
    if (check) {
        alert('checked');
        const borderColour = document.getElementById('bordercolour').value;
        document.getElementById(id).style.borderColor = borderColour;
    }
    else {
        document.getElementById(id).style.borderColor = backColour;
    }
}

function divFunc(id) {
    backColour(id);
    const divType = document.getElementById('style').value;
    switch (divType) {
        // case 'Normal':
        //     divGen(id);
        //     break;
        case 'Rectangular Curved':
            divGenCurve(id);
            break;
        case 'Rectangular Jagged':
            divGenJagged(id);
            break;
        case 'Circular':
            divGenCircle(id);
            break;
        // case 'Circular Jagged':
        //     divGenCircleWavy(id);
        //     break;        
        default:
            divGen(id);
            break;
    }
    // divGenJagged(id);
}

function segmentLine(length, detail, lineDev) {
    let tempVal = 0;
    let tempLength = 0;
    let tempSegments = [];
    for(let i = 0; i < detail; i++) {
        if (i > 0) {
            // Skip the first loop, no subtraction needed
            tempLength = length - tempVal;
            // Subtract previous tempVal 
            // console.log("1st tempLength = lineSegmentLength + tempVal", tempLength, " = ", lineSegmentLength, " + ", tempVal);
            // logStr += " Stored tempVal: " + tempVal;
            // logStr += " tempLength:" + tempLength;
        }
        if (i < (detail -1)) {
            // Skip the last loop, no addition needed
            tempVal = intRandom(-lineDev, lineDev);
            if (i == 0) tempLength = length;
            // Get random deviation
            tempLength += tempVal;
            // console.log("2nd tempLength = lineSegmentLength + tempVal", tempLength, " = ", lineSegmentLength, " + ", tempVal);
            // logStr += " New tempVal:" + tempVal;
            // logStr += " tempLength:" + tempLength;
        }

        tempSegments.push(tempLength);
        // console.log(logStr);
        // logStr = "";
    }
    return tempSegments;
}

function setDimensions(id) {
    // Get detail
    let edgeDetail = parseInt(document.getElementById('divDetail').value);
    let edgeVariation = parseInt(document.getElementById('divVariation').value);
    let deviation = 7 - (parseInt(document.getElementById('deviation').value));
    // set co-ordinates x start, x end, y start, y end
    let xs = edgeVariation + 20;
    let ys = edgeVariation + 20;
    // Get Custom height and width from form
    let width = parseInt(document.getElementById('divWidth').value);
    let xe = width + xs;
    let height = parseInt(document.getElementById('divHeight').value);
    let ye = height + ys;
    let containerHeight = (height + edgeVariation + 70) + 'px';
    document.getElementById((id + 'Container')).style.height = containerHeight; 

    return [xs, ys, xe, ye, height, width, edgeDetail, edgeVariation, deviation, containerHeight];
}

function divGenCurve(id) {
    console.clear();

    let [xs, ys, xe, ye, height, width, edgeDetail, edgeVariation, containerHeight] = setDimensions(id);
    console.log({xs, ys, xe, ye, height, width, edgeDetail, edgeVariation, containerHeight});

    // calculate line divisions
    let lineSegmentHeight = Math.floor(height / edgeDetail);
    console.log(edgeDetail);
}

function divGenJagged(id) {
    // Set drawing dimensions from form input
    let [xs, ys, xe, ye, height, width, edgeDetail, edgeVariation, deviation, containerHeight] = setDimensions(id);

    // Initialise arrays
    let coords = [];
    let segments = [];
    // Set margin for whichever value is larger to avoid clipping
    let margin = (edgeDetail > edgeVariation)? edgeDetail: edgeVariation;
    
    // Set initial x, y co-ordinates
    coords = [xs, ys];
    const coordsStr = [xs.toString() + 'px ' + ys.toString() + 'px'];
    
    // 1st line: xs, ys - xs, ye
    x = xs;
    y = ys;

    // calculate line divisions
    // Length of lines
    let lineSegmentLength = height / edgeDetail;
    // Amount line lengths change
    let lineDev = lineSegmentLength / deviation;
    
    segments = segmentLine(lineSegmentLength, edgeDetail, lineDev);

    let mvSide, xRound, yRound;

    for(let i = 0; i < edgeDetail; i++) {
        mvSide = intRandom(0, (edgeVariation * 2)) -edgeVariation;
        y += segments[i];
        x = xs + mvSide;
        if(y > ye) y = ye;
        xRound = Math.ceil(x);
        yRound = Math.ceil(y);
        coordsStr.push(xRound.toString() + 'px ' + yRound.toString() + 'px');
    }

    // Set divs height by maximum y value
    let divHeight = (ye + margin + 10) + 'px';

    // 2nd line: xs, ye - xe, ye
    x = xs;
    y = ye;

    // Length of lines
    lineSegmentLength = width / edgeDetail;
    // Amount line lengths change
    lineDev = lineSegmentLength / deviation;
    
    segments = segmentLine(lineSegmentLength, edgeDetail, lineDev);

    for(let i = 0; i < edgeDetail; i++) {
        mvSide = intRandom(0, (edgeVariation * 2)) -edgeVariation;
        x += segments[i];
        y = ye + mvSide;
        if(x > xe) x = xe;
        xRound = Math.ceil(x);
        yRound = Math.ceil(y);
        coordsStr.push(xRound.toString() + 'px ' + yRound.toString() + 'px');
    }

    // Set divs width by maximum x value
    let divWidth = (xe + margin + 10) + 'px';

    // 3rd line: xe, ye - xe, ys
    x = xe;
    y = ye;

    lineSegmentLength = height / edgeDetail;
    // Amount line lengths change
    lineDev = lineSegmentLength / deviation;
    
    segments = segmentLine(lineSegmentLength, edgeDetail, lineDev);

    for(let i = 0; i < edgeDetail; i++) {
        mvSide = intRandom(0, (edgeVariation * 2)) -edgeVariation;
        y -= segments[i];
        x = xe + mvSide;
        if(y < ys) y = ys;
        xRound = Math.ceil(x);
        yRound = Math.ceil(y);
        coordsStr.push(xRound.toString() + 'px ' + yRound.toString() + 'px');
    }

    //  4th line: xe, ys - xs, ys
    x = xe;
    y = ys;

    // Length of lines
    lineSegmentLength = width / edgeDetail;
    // Amount line lengths change
    lineDev = lineSegmentLength / deviation;
    
    segments = segmentLine(lineSegmentLength, edgeDetail, lineDev);

    for(let i = 0; i < (edgeDetail -1); i++) {
        mvSide = intRandom(0, (edgeVariation * 2)) -edgeVariation;
        x -= segments[i];
        y = ys + mvSide;
        if(x < xs) x = xs;
        xRound = Math.ceil(x);
        yRound = Math.ceil(y);
        coordsStr.push(xRound.toString() + 'px ' + yRound.toString() + 'px');
    }
    
    coordsStr.push(xs.toString() + 'px ' + ys.toString() + 'px');
    
    let polygon = 'polygon(' + coordsStr.toString() + ')';
    document.getElementById(id).style.clipPath = polygon;
    document.getElementById(id).style.shapeOutside = polygon;    
    
    document.getElementById(id).style.height = divHeight;
    document.getElementById(id).style.width = divWidth;

    showCode(coordsStr, '', 'jagged', height, width, containerHeight);
}

function divGenJaggedBAK(id) {
    // Set drawing dimensions from form input
    let [xs, ys, xe, ye, height, width, edgeDetail, edgeVariation, deviation, containerHeight] = setDimensions(id);
    console.clear();
    console.log({xs, ys, xe, ye, height, width, edgeDetail, edgeVariation, deviation, containerHeight});
    // Initialise arrays
    let coords = [];
    let segments = [];
    // Set margin for whichever value is larger to avoid clipping
    let margin = (edgeDetail > edgeVariation)? edgeDetail: edgeVariation;
    
    // Set initial x, y co-ordinates
    coords = [xs, ys];
    const coordsStr = [xs.toString() + 'px ' + ys.toString() + 'px'];
    
    // 1st line: xs, ys - xs, ye
    x = xs;
    y = ys;

    // calculate line divisions
    // Length of lines
    let lineSegmentLength = height / edgeDetail;
    // Amount line lengths change
    let lineDev = lineSegmentLength / deviation;
    
    segments = segmentLine(lineSegmentLength, edgeDetail, lineDev);

    let mvSide, xRound, yRound;

    for(let i = 0; i < edgeDetail; i++) {
        mvSide = intRandom(0, (edgeVariation * 2)) -edgeVariation;
        y += segments[i];
        x = xs + mvSide;
        if(y > ye) y = ye;
        xRound = Math.ceil(x);
        yRound = Math.ceil(y);
        coordsStr.push(xRound.toString() + 'px ' + yRound.toString() + 'px');
        // coordsStr.push(x.toString() + 'px ' + y.toString() + 'px');
    }
    // br = false;
    // while (br == false) {
    //     // mvFw = intRandom(1,intRandom(1, edgeDetail));
    //     mvFw = lineSegmentHeight;
    //     mvSide = intRandom(0, (edgeVariation * 2)) -edgeVariation;
    //     y += mvFw;
    //     x = xs + mvSide;
    //     if (y >= ye) { x = xs; y = ye; br = true; }
    //     coordsStr.push(x.toString() + 'px ' + y.toString() + 'px');
    // }
    // let tempVal = 0;
    // let tempLength = 0;
    
    
    // console.log("line length:", lineSegmentLength);
    // console.log("line deviation:", lineDev);
    
    // for(let i = 0; i < edgeDetail; i++) {
    //     if (i > 0) {
    //         // Skip the first loop, no subtraction needed
    //         tempLength = lineSegmentLength - tempVal;
    //         // Subtract previous tempVal 
    //         // console.log("1st tempLength = lineSegmentLength + tempVal", tempLength, " = ", lineSegmentLength, " + ", tempVal);
    //         logStr += " Stored tempVal: " + tempVal;
    //         logStr += " tempLength:" + tempLength;
    //     }
    //     if (i < (edgeDetail -1)) {
    //         // Skip the last loop, no addition needed
    //         tempVal = intRandom(-lineDev, lineDev);
    //         if (i == 0) tempLength = lineSegmentLength;
    //         // Get random deviation
    //         tempLength += tempVal;
    //         // console.log("2nd tempLength = lineSegmentLength + tempVal", tempLength, " = ", lineSegmentLength, " + ", tempVal);
    //         logStr += " New tempVal:" + tempVal;
    //         logStr += " tempLength:" + tempLength;
    //     }

    //     segments.push(tempLength);
    //     console.log(logStr);
    //     logStr = "";
    // }

    segments.forEach((e) => console.log(e));
    let countLen = 0;
    segments.forEach((e) => countLen += Number(e));
    console.log(countLen);

    

    // for (let i =1; i <= edgeDetail; i++) {
    //     console.log(i);
    //     mvSide = intRandom(0, (edgeVariation * 2)) -edgeVariation;
    //     y += lineSegmentLength;
    //     x = xs + mvSide;
    //     coordsStr.push(x.toString() + 'px ' + y.toString() + 'px');
    // }
    // coordsStr.push(xs.toString() + 'px ' + ye.toString() + 'px');
    
    // Set divs height by maximum y value
    let divHeight = (ye + margin + 10) + 'px';

    // 2nd line: xs, ye - xe, ye
    x = xs;
    y = ye;
    // br = false;
    // while (br == false) {
    //     // mvFw = intRandom(1,intRandom(1, edgeDetail));
    //     mvFw = lineSegmentHeight;
    //     mvSide = intRandom(0, (edgeVariation * 2)) -edgeVariation;
    //     x += mvFw;
    //     y = ye + mvSide;
    //     if (x >= xe) { x = xe; y = ye; br = true; }
    //     coords.push(x.toString() + 'px ' + y.toString() + 'px');
    // }
    coordsStr.push(xs.toString() + 'px ' + ye.toString() + 'px');
    coordsStr.push(xe.toString() + 'px ' + ye.toString() + 'px');

    // Set divs width by maximum x value
    let divWidth = (xe + margin + 10) + 'px';

    // 3rd line: xe, ye - xe, ys
    x = xe;
    y = ye;
    // br = false;
    // while (br == false) {
    //     // mvFw = intRandom(1,intRandom(1, edgeDetail));
    //     mvFw = lineSegmentHeight;
    //     mvSide = intRandom(0, (edgeVariation * 2)) -edgeVariation;
    //     y -= mvFw;
    //     x = xe + mvSide;
    //     if (y <= ys) { x = xe; y = ys; br = true; }
    //     coords.push(x.toString() + 'px ' + y.toString() + 'px');
    // }
    // coordsStr.push(xe.toString() + 'px ' + ye.toString() + 'px');
    // coordsStr.push(xe.toString() + 'px ' + ys.toString() + 'px');


    lineSegmentLength = height / edgeDetail;
    // Amount line lengths change
    lineDev = lineSegmentLength / deviation;
    
    segments = segmentLine(lineSegmentLength, edgeDetail, lineDev);

    for(let i = 0; i < edgeDetail; i++) {
        mvSide = intRandom(0, (edgeVariation * 2)) -edgeVariation;
        y -= segments[i];
        x = xe + mvSide;
        if(y < ys) y = ys;
        xRound = Math.ceil(x);
        yRound = Math.ceil(y);
        coordsStr.push(xRound.toString() + 'px ' + yRound.toString() + 'px');
        // coordsStr.push(x.toString() + 'px ' + y.toString() + 'px');
    }

    //  4th line: xe, ys - xs, ys
    x = xe;
    y = ys;
    // br = false;
    // while (br == false) {
    //     // mvFw = intRandom(1,intRandom(1, edgeDetail));
    //     mvFw = lineSegmentHeight;
    //     mvSide = intRandom(0, (edgeVariation * 2)) -edgeVariation;
    //     x -= mvFw;
    //     y = ys + mvSide;
    //     if (x <= xs) { x = xs; y = ys; br = true; }
    //     coords.push(x.toString() + 'px ' + y.toString() + 'px');
    // }
    coordsStr.push(xe.toString() + 'px ' + ys.toString() + 'px');
    coordsStr.push(xs.toString() + 'px ' + ys.toString() + 'px');
    
    let polygon = 'polygon(' + coordsStr.toString() + ')';
    document.getElementById(id).style.clipPath = polygon;
    document.getElementById(id).style.shapeOutside = polygon;    
    
    document.getElementById(id).style.height = divHeight;
    document.getElementById(id).style.width = divWidth;

    showCode(coordsStr, '', 'jagged', height, width, containerHeight);
}

function divGenCurveBAK(id) {
    let curveCountVert = 0;
    let curveCountHor = 0;

    let [xs, ys, xe, ye, height, width, divDetail, divVariation, containerHeight] = setDimensions(id);

    xs += 10; ys += 10;  // console.log(ys); console.log(ye)

    ys += (divDetail);
    // ye -= (divDetail / 2);

    // console.log(ys); console.log(ye)

    let coords = 'M ' + xs + ' ' + ys;
    const polygonCoords = [xs.toString() + 'px ' + ys.toString() + 'px'];

    // Variables:
    // MoveFw is the total amount to move forward in that curve. Based on the 'div detail' level selected
    // coordSide determines how far to the side from the path the coordinate will be set, determined by div variation setting
    // CoordFw is a fraction of MoveFw inset from the start and finish 
    // Polygon stores a polygonal line to apply to shape-outside
    
    // 1st line: xs, ys - xs, ye
    let br = false; // set break = false
    let switchVar = false; // Switchvar will alternate between true and false to curve the path in alternating directions
    while (br == false) {        
        moveFw = intRandom(20,intRandom(20, divDetail));
        coordSide = intRandom(2, divVariation);
        coordFw = intRandom(0, 10);
        if (ys >= (height - 10) && switchVar == false) { br = true; }
        (switchVar == false) ? x1 = xs - coordSide : x1 = xs + coordSide;
        switchVar = !switchVar;
        x2 = x1;
        y1 = ys + coordFw;
        y2 = ys + moveFw - coordFw;
        x3 = xs;
        y3 = ys + moveFw;

        // console.clear;
        // console.log("---");
        if (br == true) {
            // console.log({x2, y2, x3, y3, moveFw, coordFw, coordSide});
            y1 = ys + moveFw - coordFw;
            x2 = xs + coordFw;
            y2 = ys + moveFw + coordSide;
            x3 = xs + moveFw;
            y3 = ys + moveFw;
            // console.log("---");
            // console.log({x2, y2, x3, y3});
            // Smooth curve 
            // tempCoords = ' S ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3;
        }

        tempCoords = ' C ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3;
        // console.log(tempCoords);

        polygonCoords.push(x1.toString() + 'px ' + y1.toString() + 'px');
        polygonCoords.push(x2.toString() + 'px ' + y2.toString() + 'px');
        polygonCoords.push(x3.toString() + 'px ' + y3.toString() + 'px');
        coords += tempCoords;
        ys = y3;
        curveCountVert++;
    }

    let divHeight = (y3 +  divVariation + 50) + 'px';
    // 2nd line: xs, ye - xe, ye
    xs = x3;
    ys = y3;
    br = false;
    switchVar = true;
    while (br == false) {
        moveFw = intRandom(30,intRandom(30, divDetail));
        coordFw = intRandom(0, 10);
        coordSide = intRandom(2, divVariation);
        if (xs >= (width - 10) && switchVar == false) { br = true; }
        (switchVar == true) ? y1 = ys - coordSide : y1 = ys + coordSide;
        switchVar = !switchVar;
        y2 = y1;
        x1 = xs + coordFw;
        x2 = xs + moveFw - coordFw;
        y3 = ys;
        x3 = xs + moveFw;
        tempCoords = ' C ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3;
        polygonCoords.push(x1.toString() + 'px ' + y1.toString() + 'px');
        polygonCoords.push(x2.toString() + 'px ' + y2.toString() + 'px');
        polygonCoords.push(x3.toString() + 'px ' + y3.toString() + 'px');
        coords += tempCoords;
        xs = x3;
        curveCountHor++;
    }
    let divWidth = (x3 + 10) + 'px';
    // 3rd line: xe, ye - xe, ys
    xs = x3;
    ys = y3;
    br = false;
    let count = 1;
    switchVar = false;
    while (br == false) {
        moveFw = intRandom(20,intRandom(20, divDetail));
        coordSide = intRandom(2, divVariation);
        coordFw = intRandom(0, 10);
        if (count >= curveCountVert && switchVar == false) br = true; 
        (switchVar == true) ? x1 = xs - coordSide : x1 = xs + coordSide;
        switchVar = !switchVar;
        x2 = x1;
        y1 = ys - coordFw;
        y2 = ys - moveFw + coordFw;
        x3 = xs;
        y3 = ys - moveFw;
        if (y1 < 0 || y2 < 0 || y3 < 0) { break; }
        tempCoords = ' C ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3;
        polygonCoords.push(x1.toString() + 'px ' + y1.toString() + 'px');
        polygonCoords.push(x2.toString() + 'px ' + y2.toString() + 'px');
        polygonCoords.push(x3.toString() + 'px ' + y3.toString() + 'px');
        coords += tempCoords;

        ys = y3;
        count++;
    }
    //  4th line: xe, ys - xs, ys
    xs = x3;
    ys = y3;
    br = false;
    count = 1;
    switchVar = false;
    while (br == false) {
        moveFw = intRandom(30,intRandom(30, divDetail));
        coordFw = intRandom(0, 10);
        coordSide = intRandom(2, divVariation);
        if (count >= curveCountHor && switchVar == false) { br = true; }
        (switchVar == false) ? y1 = ys - coordSide : y1 = ys + coordSide;
        switchVar = !switchVar;
        y2 = y1;
        x1 = xs - coordFw;
        x2 = xs - moveFw + coordFw;
        y3 = ys;
        x3 = xs - moveFw;
        tempCoords = ' C ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3;
        polygonCoords.push(x1.toString() + 'px ' + y1.toString() + 'px');
        polygonCoords.push(x2.toString() + 'px ' + y2.toString() + 'px');
        polygonCoords.push(x3.toString() + 'px ' + y3.toString() + 'px');
        coords += tempCoords;
        xs = x3;
        count++;
    }

    let curvepath = 'path("' + coords + '")';
    let polygonpath = 'polygon(' + polygonCoords.toString() + ')';
    document.getElementById(id).style.clipPath = curvepath;
    document.getElementById(id).style.shapeOutside = polygonpath;
    document.getElementById(id).style.shapeInside = polygonpath;

    document.getElementById(id).style.height = divHeight;
    document.getElementById(id).style.width = divWidth;
    showCode(coords, polygonCoords, 'curved', divHeight, divWidth, containerHeight);
}

function setLinePoints(iterations) {
    var pointList = {};
    pointList.first = {x:0, y:1};
    var lastPoint = {x:1, y:1}
    var minY = 1;
    var maxY = 1;
    var point;
    var nextPoint;
    var dx, newX, newY;
    pointList.first.next = lastPoint;
    for (var i = 0; i < iterations; i++) {
        point = pointList.first;
        while (point.next != null) {
            nextPoint = point.next;            
            dx = nextPoint.x - point.x;
            newX = 0.5*(point.x + nextPoint.x);
            newY = 0.5*(point.y + nextPoint.y);
            newY += dx*(Math.random()*2 - 1);            
            var newPoint = {x:newX, y:newY};            
            //min, max
            if (newY < minY) minY = newY;
            else if (newY > maxY) maxY = newY;           
            //put between points
            newPoint.next = nextPoint;
            point.next = newPoint;            
            point = nextPoint;
        }
    }    
    //normalize to values between 0 and 1
    if (maxY != minY) {
        var normalizeRate = 1/(maxY - minY);
        point = pointList.first;
        while (point != null) {
            point.y = normalizeRate*(point.y - minY);
            point = point.next;
        }
    }
    //unlikely that max = min, but could happen if using zero iterations. In this case, set all points equal to 1.
    else {
        point = pointList.first;
        while (point != null) {
            point.y = 1;
            point = point.next;
        }
    }    
    return pointList;		
}  

function divGenCircle(id) {
    // Code Dan Gries
    // Adapted from Source: https://codepen.io/RectangleWorld/pen/napvqA
    const div = document.getElementById(id);
    let [xs, ys, xe, ye, height, width] = setDimensions(id);
    let divHeight = (height) + 'px';
    let divWidth = (width) + 'px';
    document.getElementById(id).style.height = divHeight;
    document.getElementById(id).style.width = divWidth;
    var centerX, centerY;
    var r,g,b,a;
    var color;
    var lineW;
    var maxRad, minRad;
    var phase;		
    maxRad = 0.5*width;
    minRad = 0.88*maxRad;
    centerX = maxRad + 2*maxRad *0;
    centerY = maxRad + 2*maxRad *0;        
    r = Math.floor(Math.random()*192);
    g = Math.floor(Math.random()*192);
    b = Math.floor(Math.random()*192);
    a = 0.5;
    color = "rgba("+r+","+g+","+b+","+a+")";        
    phase = Math.random()*Math.PI*2;
    var point;
    var rad, theta;
    var twoPi = 2*Math.PI;
    var x0,y0;
    //generate the random function that will be used to vary the radius, 9 iterations of subdivision
    var pointList = setLinePoints(9);
    point = pointList.first;
    theta = phase;
    rad = minRad + point.y*(maxRad - minRad);
    x0 = centerX + rad*Math.cos(theta);
    y0 = centerY + rad*Math.sin(theta);
    let coords = 'M ' + x0.toString() + ' ' + y0.toString(); // coords traces a path
    const polygonCoords = [Math.ceil(x0).toString() + 'px ' + Math.ceil(y0).toString() + 'px']; // polygon traces a polygon for shape-outside
    while (point.next != null) {
        point = point.next;
        theta = twoPi*point.x + phase;
        rad = minRad + point.y*(maxRad - minRad);
        x0 = centerX + rad*Math.cos(theta);
        y0 = centerY + rad*Math.sin(theta);
        x = Math.ceil(x0);
        y = Math.ceil(y0);
        coords += ' L ' + x0.toString() + ' ' + y0.toString();
        polygonCoords.push(Math.ceil(x0).toString() + 'px ' + Math.ceil(y0).toString() + 'px');
    }
    let curvepath = 'path("' + coords + ' Z")';
    let polygonpath = 'polygon(' + polygonCoords.toString() + ')';
    document.getElementById(id).style.clipPath = curvepath;
    document.getElementById(id).style.shapeOutside = polygonpath;

    showCode(coords, polygonCoords, 'curved', divHeight, divWidth);
}

function showCode(coords, polygonCoords, style, height, width, contHeight) {
    const backColour = document.getElementById('backcolour').value;
    // Show HTML
    let html = '<code>&lt;div id="myDiv">\n&lt;/div></code>';
    document.getElementById('divHTML').innerHTML = html;
    // Show CSS
    let css = '#myDiv {\n\theight: ' + height + ';\n\twidth: ' + width + ';\n\tbackground-color: ' + backColour + ';';
    if (coords != 'null') {
        switch(style) {
            case 'jagged':
                css += '\n\tclip-path: polygon(' + coords + ');\n\tshape-outside: polygon(' + coords + ');';
                break;
            case 'curved':
                css += '\n\tclip-path: path("' + coords + '");\n\tshape-outside: polygon(' + polygonCoords + ');';
                break;
        }
    }
    css += '\n}';
    document.getElementById('divCSS').innerHTML = css;
    // Show SASS
    let sass = '$backgroundColor: ' + backColour + ';';
    if (coords != 'null') {
        switch(style) {
            case 'jagged':
                sass += '\n$polygon: ' + coords + ';\n&nbsp;';
                break;
            case 'curved':
                sass += '\n$path: "' + coords + '";';
                sass += '\n$polygon: ' + polygonCoords + ';\n&nbsp;';
                break;
        }
    }
    document.getElementById('divSASS').innerHTML = sass; 
}

function divGen(id) {
    // No style, retained for reference

    // set co-ordinates x start x end y start y end
    let xs = 20;
    // Get Custom height and width from form
    let width = parseInt(document.getElementById('divWidth').value);
    let xe = width + xs;
    let ys = 20;
    let height = parseInt(document.getElementById('divHeight').value);
    let ye = height + ys;
    let divHeight = (height + 20) + 'px';
    let divWidth = (width + 20) + 'px';
    document.getElementById(id).style.height = divHeight;
    document.getElementById(id).style.width = divWidth;
    let containerHeight = (height + 70) + 'px';
    document.getElementById((id + 'Container')).style.height = containerHeight;
    // Reset clip path
    document.getElementById(id).style.clipPath = "none";
    document.getElementById(id).style.shapeOutside = "none";

    showCode('null', 'none', divHeight, divWidth, containerHeight);
}


window.onload = function() {
    divFunc('orgDiv');
}

