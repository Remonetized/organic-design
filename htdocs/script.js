function intRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function backColour(id) {
    const backColour = document.getElementById('backcolour').value;
    document.getElementById(id).style.backgroundColor = backColour;
}

function borderColour(id) {
    let check = document.getElementById('border').checked;
    if (check) {
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
        case 'Normal':
            divGen(id);
            break;
        case 'Rectangular Curved':
            divGenCurve(id);
            break;
        case 'Rectangular Jagged':
            divGenJagged(id);
            break;
        case 'Circular':
            divGenCircle(id);
            break;
        case 'Circular Jagged':
            divGenCircleWavy(id);
            break;        
        default:
            divGen(id);
            break;
    }
    // divGenJagged(id);
}

function setDimensions(id) {
    // Get detail
    let detail = parseInt(document.getElementById('divDetail').value);
    let divDetail = 110 - detail;
    let divVariation = parseInt(document.getElementById('divVariation').value);
    // set co-ordinates x start, x end, y start, y end
    let xs = divVariation + 20;
    let ys = divVariation + 20;
    // Get Custom height and width from form
    let width = parseInt(document.getElementById('divWidth').value);
    let xe = width + xs;
    let height = parseInt(document.getElementById('divHeight').value);
    let ye = height + ys;
    let divHeight = (height + divVariation + 50) + 'px';
    let divWidth = (width + divVariation + 50) + 'px';
    let containerHeight = (height + divVariation + 70) + 'px';
    document.getElementById((id + 'Container')).style.height = containerHeight; 

    return [xs, ys, xe, ye, height, width, divDetail, divVariation, containerHeight];
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

function divGenJagged(id) {
    // Get detail
    let detail = parseInt(document.getElementById('divDetail').value);
    let divDetail = 110 - detail;
    let divVariation = parseInt(document.getElementById('divVariation').value);
    // set co-ordinates x start, x end, y start, y end
    let xs = divVariation + 20;
    let ys = divVariation + 20;
    // Get Custom height and width from form
    let width = parseInt(document.getElementById('divWidth').value);
    let xe = width + xs;
    let height = parseInt(document.getElementById('divHeight').value);
    let ye = height + ys;

    let divHeight = (height + divVariation + 50) + 'px';
    let divWidth = (width + divVariation + 50) + 'px';
    document.getElementById(id).style.height = divHeight;
    document.getElementById(id).style.width = divWidth;

    let containerHeight = (height + divVariation + 70) + 'px';
    document.getElementById((id + 'Container')).style.height = containerHeight;

    const coords = [xs.toString() + 'px ' + ys.toString() + 'px'];
    // 1st line: xs, ys - xs, ye
    x = xs;
    y = ys;
    br = false;
    while (br == false) {
        mvFw = intRandom(1,intRandom(1, divDetail));
        mvSide = intRandom(0, (divVariation * 2)) -divVariation;
        y += mvFw;
        x = xs + mvSide;
        if (y >= ye) { x = xs; y = ye; br = true; }
        coords.push(x.toString() + 'px ' + y.toString() + 'px');
    }
    // 2nd line: xs, ye - xe, ye
    x = xs;
    y = ye;
    br = false;
    while (br == false) {
        mvFw = intRandom(1,intRandom(1, divDetail));
        mvSide = intRandom(0, (divVariation * 2)) -divVariation;
        x += mvFw;
        y = ye + mvSide;
        if (x >= xe) { x = xe; y = ye; br = true; }
        coords.push(x.toString() + 'px ' + y.toString() + 'px');
    }
    // 3rd line: xe, ye - xe, ys
    x = xe;
    y = ye;
    br = false;
    while (br == false) {
        mvFw = intRandom(1,intRandom(1, divDetail));
        mvSide = intRandom(0, (divVariation * 2)) -divVariation;
        y -= mvFw;
        x = xe + mvSide;
        if (y <= ys) { x = xe; y = ys; br = true; }
        coords.push(x.toString() + 'px ' + y.toString() + 'px');
    }
    //  4th line: xe, ys - xs, ys
    x = xe;
    y = ys;
    br = false;
    while (br == false) {
        mvFw = intRandom(1,intRandom(1, divDetail));
        mvSide = intRandom(0, (divVariation * 2)) -divVariation;
        x -= mvFw;
        y = ys + mvSide;
        if (x <= xs) { x = xs; y = ys; br = true; }
        coords.push(x.toString() + 'px ' + y.toString() + 'px');
    }
    
    let polygon = 'polygon(' + coords.toString() + ')';
    document.getElementById(id).style.clipPath = polygon;
    document.getElementById(id).style.shapeOutside = polygon;    

    showCode(coords, '', 'jagged', divHeight, divWidth, containerHeight);
}

function divGenCurve(id) {
    let curveCountVert = 0;
    let curveCountHor = 0;

    let [xs, ys, xe, ye, height, width, divDetail, divVariation, containerHeight] = setDimensions(id);

    xs += 10; ys += 10;

    let coords = 'M ' + xs + ' ' + ys;
    const polygonCoords = [xs.toString() + 'px ' + ys.toString() + 'px'];

    // Variables:
    // MoveFw is the total amount to move forward in that curve. Based on the 'div detail' level selected
    // coordSide determines how far to the side from the path the coordinate will be set, determined by dv variation setting
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
        tempCoords = ' C ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3;
        // console.log(tempCoords);
        polygonCoords.push(x1.toString() + 'px ' + y1.toString() + 'px');
        polygonCoords.push(x2.toString() + 'px ' + y2.toString() + 'px');
        polygonCoords.push(x3.toString() + 'px ' + y3.toString() + 'px');
        coords += tempCoords;
        ys = y3;
        curveCountVert++;
    }
    let divHeight = (y3 + 50) + 'px';
    // 2nd line: xs, ye - xe, ye
    xs = x3;
    ys = y3;
    br = false;
    switchVar = false;
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

    document.getElementById(id).style.height = divHeight;
    document.getElementById(id).style.width = divWidth;

    showCode(coords, polygonCoords, 'curved', divHeight, divWidth, containerHeight);
}

function divGenCircleWavy (id) {        
    // Code: Radu Mariescu-Istodor 
    // Source: https://www.youtube.com/watch?v=W6cirmhLSSw 
    let [xs, ys, xe, ye, height, width, divDetail, divVariation] = setDimensions(id);

    let divHeight = (height + 20) + 'px';
    let divWidth = (width + 20) + 'px';
    document.getElementById(id).style.height = divHeight;
    document.getElementById(id).style.width = divWidth;

    let containerHeight = (divHeight + 70) + 'px';
    document.getElementById((id + 'Container')).style.height = containerHeight;

    let rad = (width/ 2) -10;
    let vRadius = (height/ 2) -10;
    let x = (width/ 2);
    let y = (height/ 2);
    

    // let waveAmplitude = 10;
    let waveAmplitude = divVariation;
    let waveDirection = 1;

    let coords = 'M ' + (x + rad) + ' ' + y;
    const polygonCoords = [Math.ceil(x + rad).toString() + 'px ' + Math.ceil(y).toString() + 'px'];

    let startX = x + rad;
    let startY = y;

    // Bottom-left quarter
    waveDirection = 1;
    let tempX, tempY, controlX, controlY;
    for (let x = 0; x > -rad; ) {
        const y = -Math.sqrt((rad * rad) - (x * x));
        tempX = (width / 2) + x;
        tempY = (height / 2) - y;
        let waveAmplitude = intRandom(0, divVariation);
        controlX = (width / 2) + x - waveAmplitude * waveDirection;
        controlY = (height / 2) - y + waveAmplitude * waveDirection;
        coords += ' Q ' + controlX + ' ' + controlY + ', ' + tempX + ' ' + tempY;
        polygonCoords.push(Math.ceil(controlX).toString() + 'px ' + Math.ceil(controlY).toString() + 'px');
        polygonCoords.push(Math.ceil(tempX).toString() + 'px ' + Math.ceil(tempY).toString() + 'px');
        waveDirection *= -1;
        xChange = intRandom(0, divDetail);
        if ((x - xChange) < -rad) x = -rad;
        else x -= xChange;
    }
    // Top-left quarter
    for (let x = -rad; x < 0; ) {
        const y = Math.sqrt((rad * rad) - (x * x));
        let tempX = (width / 2) + x;
        let tempY = (height / 2) - y;
        let waveAmplitude = intRandom(0, divVariation);
        let controlX = (width / 2) + x - waveAmplitude * waveDirection;
        let controlY = (height / 2) - y - waveAmplitude * waveDirection;
        coords += ' Q ' + controlX + ' ' + controlY + ', ' + tempX + ' ' + tempY;
        polygonCoords.push(Math.ceil(controlX).toString() + 'px ' + Math.ceil(controlY).toString() + 'px');
        polygonCoords.push(Math.ceil(tempX).toString() + 'px ' + Math.ceil(tempY).toString() + 'px');
        waveDirection *= -1;
        xChange = intRandom(0, divDetail);
        if ((x + xChange) > 0) x = 0;
        else x += xChange;
    }
    // console.clear();
    console.log('----------');
    // Top-right quarter
    waveDirection = 1; 
    for (let x = 0; x < rad; ) {
        const y = Math.sqrt((rad * rad) - (x * x));
        let tempX = (width / 2) + x;
        let tempY = (height / 2) - y;
        let waveAmplitude = intRandom(0, divVariation);
        let controlX = (width / 2) + x + waveAmplitude * waveDirection;
        let controlY = (height / 2) - y - waveAmplitude * waveDirection;
        coords += ' Q ' + controlX + ' ' + controlY + ', ' + tempX + ' ' + tempY;
        polygonCoords.push(Math.ceil(controlX).toString() + 'px ' + Math.ceil(controlY).toString() + 'px');
        polygonCoords.push(Math.ceil(tempX).toString() + 'px ' + Math.ceil(tempY).toString() + 'px');
        waveDirection *= -1;
        xChange = intRandom(0, divDetail);
        if ((x + xChange) > rad) x = rad;
        else x += xChange;
    }
    // Bottom-right quarter
    waveDirection = 1; 
    for (let x = rad; x > 0; ) {
        const y = -Math.sqrt((rad * rad) - (x * x));
        let tempX = (width / 2) + x;
        let tempY = (height / 2) - y;
        let waveAmplitude = intRandom(0, divVariation);
        let controlX = (width / 2) + x + waveAmplitude * waveDirection;
        let controlY = (height / 2) - y + waveAmplitude * waveDirection;
        coords += ' Q ' + controlX + ' ' + controlY + ', ' + tempX + ' ' + tempY;
        polygonCoords.push(Math.ceil(controlX).toString() + 'px ' + Math.ceil(controlY).toString() + 'px');
        polygonCoords.push(Math.ceil(tempX).toString() + 'px ' + Math.ceil(tempY).toString() + 'px');
        waveDirection *= -1;
        xChange = intRandom(0, divDetail);
        if ((x - xChange) < 0) x = 0;
        else x -= xChange;
    }

    // Connect lines to start for closed path
    controlX = (tempX + startX) / 2;
    controlY = (tempY + startY) / 2;
    coords += ' Q ' + controlX + ' ' + controlY + ', ' + startX + ' ' + startY;

    coords += ' Z';
    let circlepath = 'path("' + coords + '")';
    let polypath = 'polygon(' + polygonCoords.toString() + ')';
    document.getElementById(id).style.clipPath = circlepath;
    document.getElementById(id).style.shapeOutside = polypath;

    showCode(coords, polygonCoords, 'curved', divHeight, divWidth);
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
    let html = '<code>&lt;div id="organicDiv">\n&lt;/div></code>';
    document.getElementById('divHTML').innerHTML = html;
    // Show CSS
    let css = '#organicDiv {\n\theight: ' + height + ';\n\twidth: ' + width + ';\n\tbackground-color: ' + backColour + ';';
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
    let sass = '$backgroundColour: ' + backColour + ';';
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
