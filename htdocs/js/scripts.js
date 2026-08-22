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

function segmentLine(length, detail, lineDev, minimum = 4) {
    let tempVal = 0;
    let tempLength = 0;
    let tempSegments = [];
    for(let i = 0; i < detail; i++) {
        // Skip the first loop, no subtraction needed
        if (i > 0) { 
            // Subtract previous tempVal 
            tempLength = length - tempVal; 
        }
        // Skip the last loop, no addition needed
        if (i < (detail -1)) {           
            tempVal = intRandom(-lineDev, lineDev);
            if (i == 0) tempLength = length;
            // Get random deviation
            tempLength += tempVal;
        }
        // Set minimum threshold to prevent negative values
        tempLength = Math.max(tempLength, minimum)
        tempSegments.push(tempLength);
    }
    return tempSegments;
}

function deviate(deviation, max, min=1, asRange = false) {
    let minimum = Math.max(min, Math.ceil(max / deviation));
    return asRange ? (max - minimum) : intRandom(minimum, max);
}

function setDimensions(id) {
    // Get detail
    let edgeDetail = parseInt(document.getElementById('divDetail').value);
    let edgeVariation = parseInt(document.getElementById('divVariation').value);
    let deviation = parseInt(document.getElementById('deviation').value);
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

    return {xs, ys, xe, ye, height, width, edgeDetail, edgeVariation, deviation, containerHeight};
}

function divGenCurve(id) {
        // Set drawing dimensions from form input
        let {xs, ys, xe, ye, height, width, edgeDetail, edgeVariation, deviation, containerHeight} = setDimensions(id);
        // console.log({xs, ys, xe, ye, height, width, edgeDetail, edgeVariation, deviation, containerHeight});
        // decrement edgeDetail because the number of curved lines will be odd to make it vertically symmetrical
        if (edgeDetail > 1) edgeDetail++;

        // Set margin for whichever value is larger to avoid clipping
        let margin = (edgeDetail > edgeVariation)? edgeDetail: edgeVariation;
        
        // Set initial x, y co-ordinates
        let coords = xs + ' ' + ys;
        let polygonCoords = [xs.toString() + 'px ' + ys.toString() + 'px'];
        
        // 1st line: xs, ys - xs, ye
        let x1 = xs, x2, x3, x4;
        let y1 = ys, y2, y3, y4;
        let switchVar = false; 
        
        // 1st line: xs, ys - xs, ye (placeholder)
        // coords += ' L ' + xs.toString() + ' ' + ye.toString();
        // polygonCoords.push(xe.toString() + 'px ' + ye.toString() + 'px');

        // Length of lines
        let lineSegmentLength = height / edgeDetail;
        
        // Amount line lengths change. Maximum 50% of total length
        let lineDev = deviate(deviation, lineSegmentLength, 1, true) * .5;

        // Initialise and populate segment length array
        let segments = segmentLine(lineSegmentLength, edgeDetail, lineDev);
    
        let moveFw, coordSide, coordFw, maxFw;

        for(let i = 0; i < edgeDetail; i++) {
            // Get line segment length
            moveFw = Math.ceil(segments[i]);
            // Cap the control points so they don't cross over 
            maxFw = Math.max(1, Math.floor(moveFw / 2) - 1);
            // Fetch random values for bezier control point values up to the maximum
            coordFw = deviate(deviation, maxFw);
            coordSide = deviate(deviation, edgeVariation);
            // Switch between curves going outwards and inwards
            (switchVar == false) ? x2 = xs - coordSide : x2 = xs + coordSide;
            switchVar = !switchVar;
            x3 = x2;
            x4 = xs;
            y2 = y1 + coordFw;
            y3 = y1 + moveFw - coordFw;
            y4 = y1 + moveFw;
            tempCoords = ' C ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3 + ' ' + x4 + ' ' + y4;
            coords += tempCoords;
            polygonCoords.push(x2.toString() + 'px ' + y2.toString() + 'px');
            polygonCoords.push(x3.toString() + 'px ' + y3.toString() + 'px');
            polygonCoords.push(x4.toString() + 'px ' + y4.toString() + 'px');
            y1 = y4;
        }

        // 2nd line: xs, ye - xe, ye
        // coords += ' L ' + xe.toString() + ' ' + ye.toString();
        // polygonCoords.push(xe.toString() + 'px ' + ye.toString() + 'px');

        x1 = xs;
        y1 = ye;
        switchVar = false; 
        lineSegmentLength = width / edgeDetail;
        lineDev = deviate(deviation, lineSegmentLength, 1, true) * .5;
        segments = segmentLine(lineSegmentLength, edgeDetail, lineDev);

        for(let i = 0; i < edgeDetail; i++) {
            moveFw = Math.ceil(segments[i]);
            maxFw = Math.max(1, Math.floor(moveFw / 2) - 1);
            coordFw = deviate(deviation, maxFw);
            coordSide = deviate(deviation, edgeVariation);
            (switchVar == false) ? y2 = ye + coordSide : y2 = ye - coordSide;
            switchVar = !switchVar;
            x2 = x1 + coordFw;
            x3 = x1 + moveFw - coordFw;
            x4 = x1 + moveFw;
            y3 = y2;
            y4 = ye;
            tempCoords = ' C ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3 + ' ' + x4 + ' ' + y4;
            coords += tempCoords;
            polygonCoords.push(x2.toString() + 'px ' + y2.toString() + 'px');
            polygonCoords.push(x3.toString() + 'px ' + y3.toString() + 'px');
            polygonCoords.push(x4.toString() + 'px ' + y4.toString() + 'px');
            x1 = x4;
        }        

        // 3rd line: xe, ye - xe, ys
        // coords += ' L ' + xe.toString() + ' ' + ys.toString();
        // polygonCoords.push(xe.toString() + 'px ' + ys.toString() + 'px');

        x1 = xe;
        y1 = ye;
        switchVar = false; 

        lineSegmentLength = height / edgeDetail;
        lineDev = deviate(deviation, lineSegmentLength, 1, true) * .5;

        segments = segmentLine(lineSegmentLength, edgeDetail, lineDev);

        for(let i = 0; i < edgeDetail; i++) {
            moveFw = Math.ceil(segments[i]);
            maxFw = Math.max(1, Math.floor(moveFw / 2) - 1);
            coordFw = deviate(deviation, maxFw);
            coordSide = deviate(deviation, edgeVariation);
            (switchVar == false) ? x2 = xe + coordSide : x2 = xe - coordSide;
            switchVar = !switchVar;
            y2 = y1 - coordFw;
            y3 = y1 - moveFw + coordFw;
            y4 = y1 - moveFw;
            x3 = x2;
            x4 = xe;
            tempCoords = ' C ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3 + ' ' + x4 + ' ' + y4;
            coords += tempCoords;
            polygonCoords.push(x2.toString() + 'px ' + y2.toString() + 'px');
            polygonCoords.push(x3.toString() + 'px ' + y3.toString() + 'px');
            polygonCoords.push(x4.toString() + 'px ' + y4.toString() + 'px');
            y1 = y4;
        }

        //  4th line: xe, ys - xs, ys
        // coords += ' L ' + xs.toString() + ' ' + ys.toString();
        // polygonCoords.push(xs.toString() + 'px ' + ys.toString() + 'px');

        x1 = xe;
        y1 = ys;
        switchVar = false; 
        
        lineSegmentLength = width / edgeDetail;
        
        lineDev = deviate(deviation, lineSegmentLength, 1, true) * .5;

        segments = segmentLine(lineSegmentLength, edgeDetail, lineDev);

        for(let i = 0; i < edgeDetail; i++) {
            moveFw = Math.ceil(segments[i]);
            maxFw = Math.max(1, Math.floor(moveFw / 2) - 1);
            coordFw = deviate(deviation, maxFw);
            coordSide = deviate(deviation, edgeVariation);
            (switchVar == false) ? y2 = ys - coordSide : y2 = ys + coordSide;
            switchVar = !switchVar;
            x2 = x1 - coordFw;
            x3 = x1 - moveFw + coordFw;
            x4 = x1 - moveFw;
            y3 = y2;
            y4 = ys;
            tempCoords = ' C ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3 + ' ' + x4 + ' ' + y4;
            coords += tempCoords;
            polygonCoords.push(x2.toString() + 'px ' + y2.toString() + 'px');
            polygonCoords.push(x3.toString() + 'px ' + y3.toString() + 'px');
            polygonCoords.push(x4.toString() + 'px ' + y4.toString() + 'px');
            x1 = x4;
        }

        let curve = 'path("M ' + coords + ' Z")';
        let polygon = 'polygon(' + polygonCoords.toString() + ')';
        document.getElementById(id).style.clipPath = curve;
        document.getElementById(id).style.shapeOutside = polygon;    
    
        // console.clear();
        // console.log(curve);
        // console.log(polygon);

        // Set divs height by maximum y value
        let divHeight = (ye + margin + 10) + 'px';
        // Set divs width by maximum x value
        let divWidth = (xe + margin + 10) + 'px';
        
        document.getElementById(id).style.height = divHeight;
        document.getElementById(id).style.width = divWidth;
    
        showCode(coords, polygonCoords, 'curved', divHeight, divWidth, containerHeight);
}

function divGenCurveBAK(id) {
    // Set drawing dimensions from form input
    let {xs, ys, xe, ye, height, width, edgeDetail, edgeVariation, containerHeight} = setDimensions(id);

    let polygonCoords = [xs.toString() + 'px ' + ys.toString() + 'px'];
    let coordsStr = 'M ' + xs + ' ' + ys;
    let tempCoords = "";

    // Length of lines
    let lineSegmentLength = height / edgeDetail;
    // Amount line lengths change
    let lineDev = lineSegmentLength / deviation;

    let segments = segmentLine(lineSegmentLength, edgeDetail, lineDev);

    let coordSide, xRound, yRound;
    let x1, x2, x3, y1, y2, y3;

    for(let i = 0; i < edgeDetail; i++) {
        coordSide = intRandom(2, edgeVariation);

        y1 += segments[i];
        x1 = xs + coordSide;
        if(y1 > ye) y1 = ye;
        xRound = Math.ceil(x1);
        yRound = Math.ceil(y1);
        coordsStr += xRound.toString() + 'px ' + yRound.toString() + 'px';
    }

    coordsStr += xs.toString() + 'px ' + ys.toString() + 'px';
    coordsStr += xs.toString() + 'px ' + ye.toString() + 'px';
    coordsStr += xe.toString() + 'px ' + ye.toString() + 'px';
    coordsStr += xe.toString() + 'px ' + ys.toString() + 'px';
    coordsStr += xs.toString() + 'px ' + ys.toString() + 'px';

}

function divGenJagged(id) {
    // Set drawing dimensions from form input
    let {xs, ys, xe, ye, height, width, edgeDetail, edgeVariation, deviation, containerHeight} = setDimensions(id);

    // invert the value of deviation, so 1 -> 6, 2 -> 5..
    deviation = 7 - deviation;
    
    // Initialise arrays
    let coords = [];
    let segments = [];
    // Set margin for whichever value is larger to avoid clipping
    let margin = (edgeDetail > edgeVariation)? edgeDetail: edgeVariation;
    
    // Set initial x, y co-ordinates
    coords = [xs, ys];
    let coordsStr = [xs.toString() + 'px ' + ys.toString() + 'px'];
    
    // 1st line: xs, ys - xs, ye
    x = xs;
    y = ys;

    // calculate line divisions
    // Length of lines
    let lineSegmentLength = height / edgeDetail;
    // Amount line lengths change
    let lineDev = lineSegmentLength / deviation;
    
    segments = segmentLine(lineSegmentLength, edgeDetail, lineDev);

    let coordSide, xRound, yRound;

    for(let i = 0; i < edgeDetail; i++) {
        coordSide = intRandom(0, (edgeVariation * 2)) -edgeVariation;
        y += segments[i];
        x = xs + coordSide;
        if(y > ye) y = ye;
        xRound = Math.ceil(x);
        yRound = Math.ceil(y);
        coordsStr.push(xRound.toString() + 'px ' + yRound.toString() + 'px');
    }

    // coordsStr.push(xs.toString() + 'px ' + ye.toString() + 'px');

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
        coordSide = intRandom(0, (edgeVariation * 2)) -edgeVariation;
        x += segments[i];
        y = ye + coordSide;
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
        coordSide = intRandom(0, (edgeVariation * 2)) -edgeVariation;
        y -= segments[i];
        x = xe + coordSide;
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
        coordSide = intRandom(0, (edgeVariation * 2)) -edgeVariation;
        x -= segments[i];
        y = ys + coordSide;
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

