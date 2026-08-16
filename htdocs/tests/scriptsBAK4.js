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