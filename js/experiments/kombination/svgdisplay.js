class SVGDisplay{

    constructor(svg, stepWidth, stepHeight, scale, dimensions){
        this.dimensions = dimensions
        this.svg = svg;
        this.svg.setAttribute("width", dimensions[0]);
        this.svg.setAttribute("height", dimensions[1]);
        this.stepWidth = stepWidth;
        this.stepHeight = stepHeight;
        this.origin = [this.dimensions[0]/2, this.dimensions[1]/2];
        this.scale = scale;
        this.line = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
        this.line.setAttribute("style","fill:none;stroke:black;stroke-width:3");
        this.pointer = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
        this.pointer.setAttribute("style","fill:none;stroke:black;stroke-width:3");
        this.background = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        this.objects = {};
        this.svg.appendChild(this.background); 
        this.svg.appendChild(this.line); 
        this.svg.appendChild(this.pointer); 
    }

    onInit(objects, points, position, width, height, cycle){
        this.drawBackground(cycle);
        this.drawLine(points, width, height);
        this.drawPointer(width, height, position);
        this.drawObjects(objects, points, width, height);
    }
    onInc(objects, points, position, width, height){
        this.drawObject(objects, points, position, width, height);
        this.drawLine(points, width, height);
    }

    onDec(objects, points, position, width, height){
        this.drawObject(objects, points, position, width, height);
        this.drawLine(points, width, height);
    }

    onSetObject(objects, points, position, width, height){
        this.drawObject(objects, points, position, width, height);
        this.drawLine(points, width, height);
    }

    onUnSetObject(objects, points, position, width, height){
        this.drawObject(objects, points, position, width, height);
        this.drawLine(points, width, height);
    }

    onCycleFwd(width, height, position){
        this.drawPointer(width, height, position)
    }

    onCycleBwd(width, height, position){
        this.drawPointer(width, height, position)
    }

    onSetDayCycle(cycle){
        this.drawBackground(cycle);
    }

    drawObjects(objects, points, width, height){
        for (var i=0; i < width; i++){
            this.drawObject(objects, points, i, width, height);
        }
    }

    drawObject(objects, points, position, width, height){
        switch (objects[position].type["id"]){
            case ObjectType.None["id"]:
                if (this.objects[position] !== undefined){
                    this.svg.removeChild(this.objects[position]);
                    this.objects[position] = undefined;
                }
                break;
            case ObjectType.Box["id"]:
                if (this.objects[position] !== undefined){
                    this.svg.removeChild(this.objects[position]);
                }

                var x = this.stepWidth*this.scale*position + this.origin[0] - this.stepWidth*this.scale*width/2;
                var y = (this.stepHeight*this.scale*(points[position]-1) + this.origin[1]) - this.stepHeight*this.scale * height/2;
                var boxSvg = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
                boxSvg.setAttribute("width", this.stepWidth*this.scale);
                boxSvg.setAttribute("height", this.stepHeight*this.scale);
                boxSvg.setAttribute("style", "fill:rgb(0,0,0)");
                boxSvg.setAttribute("x", x);
                boxSvg.setAttribute("y", y);
                this.objects[position] = boxSvg;
                this.svg.appendChild(boxSvg);
                break;
            case ObjectType.Walker["id"]:
                if (this.objects[position] !== undefined){
                    this.svg.removeChild(this.objects[position]);
                }

                var x = this.stepWidth*this.scale*position + this.origin[0] - this.stepWidth*this.scale*width/2;
                var y = (this.stepHeight*this.scale*(points[position]-1) + this.origin[1]) - this.stepHeight*this.scale * height/2;
                var walkerSvg = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
                walkerSvg.setAttribute("width", this.stepWidth*this.scale);
                walkerSvg.setAttribute("height", this.stepHeight*this.scale);
                walkerSvg.setAttribute("style", "fill:rgb(0,0,0)");
                walkerSvg.setAttribute("x", x);
                walkerSvg.setAttribute("y", y);
                this.objects[position] = walkerSvg;
                this.svg.appendChild(walkerSvg);
                break;
        }
    }

    drawLine(points, width, height){
        var polygon = "";
        for (var i=0; i < width; i++){
            var x1 = this.stepWidth*this.scale*i + this.origin[0] - this.stepWidth*this.scale*width/2;
            var x2 = (this.stepWidth*this.scale*(i+1) + this.origin[0] - this.stepWidth*this.scale*width/2);
            var y = (this.stepHeight*this.scale*points[i] + this.origin[1]) - this.stepHeight*this.scale * height/2;
            polygon = polygon + x1 + "," + y + " " + x2 + "," + y + " "; 
        }
        this.line.setAttribute("points", polygon);
    }

    drawBackground(time){
        console.log(time);
        this.background.setAttribute("width", this.dimensions[0]);
        this.background.setAttribute("height", this.dimensions[1]);
        if (time < 6){
            this.background.setAttribute("style", "fill:rgb(50,50,255)");
        } else{
            this.background.setAttribute("style", "fill:rgb(100,100,255)");
        }      
    }

    drawPointer(width, height, position){
        var x = this.stepWidth*this.scale*(position+0.5) + this.origin[0] - this.stepWidth*this.scale*width/2 
        var y = this.origin[1] + this.stepHeight* this.scale * height;
        var str = x +"," + y + " " + x +"," + (y+10*this.scale);
        this.pointer.setAttribute("points", str);
    }

}

