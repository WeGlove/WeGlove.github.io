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

    draw(game){
        /**
         * Draws the game in its current state
         */
        this.drawBackground(game.ticks, game.dayCycleLength);
        this.drawLine(game.points, game.width, game.height);
        this.drawPointer(game.width, game.height, game.position);
        this.drawObjects(game.objects, game.points,  game.width, game.height);
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
                boxSvg.setAttribute("style", "fill:none;stroke:black;stroke-width:3");
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
            case ObjectType.Grass["id"]:
                if (this.objects[position] !== undefined){
                    this.svg.removeChild(this.objects[position]);
                }

                var bounding_box = this.bounding_box(position, points[position]-1, width, height);
                var grass_group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
                var grassSvg_l = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
                var grassSvg_m = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
                var grassSvg_r = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
                var grass_svgs = [grassSvg_l, grassSvg_m, grassSvg_r];
                for (var i=0; i <3; i++){
                    var x = bounding_box[0][0];
                    x += (bounding_box[1][0] - bounding_box[0][0])*(i+1)/4;
                    var y1 = bounding_box[0][1]- game.objects[position].values["power"]/ 10 * (bounding_box[1][1]- bounding_box[0][1]);
                    var y2 = bounding_box[1][1];
                    var str = x + "," + y1 + " " + x + "," + y2;
                    grass_svgs[i].setAttribute("points", str);
                    grass_svgs[i].setAttribute("style","fill:none;stroke:black;stroke-width:3");
                }
                
                grass_group.appendChild(grassSvg_l);
                grass_group.appendChild(grassSvg_m);
                grass_group.appendChild(grassSvg_r);
                this.objects[position] = grass_group;
                this.svg.appendChild(grass_group);
                break;
            case ObjectType.Seed["id"]:
                if (this.objects[position] !== undefined){
                    this.svg.removeChild(this.objects[position]);
                }

                var bounding_box = this.bounding_box(position, points[position]-1, width, height);
                var walkerSvg = document.createElementNS("http://www.w3.org/2000/svg", 'text');
                walkerSvg.setAttribute("width", this.stepWidth*this.scale);
                walkerSvg.setAttribute("height", this.stepHeight*this.scale);
                walkerSvg.textContent = "Seed";
                walkerSvg.setAttribute("style", "fill:rgb(0,0,0)");
                walkerSvg.setAttribute("x", bounding_box[0][0]);
                walkerSvg.setAttribute("y", bounding_box[0][1]);
                this.objects[position] = walkerSvg;
                this.svg.appendChild(walkerSvg);
                break;
            case ObjectType.Water["id"]:
                if (this.objects[position] !== undefined){
                    this.svg.removeChild(this.objects[position]);
                }

                var bounding_box = this.bounding_box(position, points[position]-1, width, height);
                var walkerSvg = document.createElementNS("http://www.w3.org/2000/svg", 'text');
                walkerSvg.setAttribute("width", this.stepWidth*this.scale);
                walkerSvg.setAttribute("height", this.stepHeight*this.scale);
                walkerSvg.textContent = "Water";
                walkerSvg.setAttribute("style", "fill:rgb(0,0,0)");
                walkerSvg.setAttribute("x", bounding_box[0][0]);
                walkerSvg.setAttribute("y", bounding_box[0][1]);
                this.objects[position] = walkerSvg;
                this.svg.appendChild(walkerSvg);
                break;
        }
    }

    bounding_box(position_x, position_y, width, height){
        /**
         * position_x: Line Segment
         * position_y: Height of the line segment
         * width: Width from Game object
         * height: height from Game object
         * 
         * return: [[left, down], [up, right]]
         */
        var x1 = this.stepWidth*this.scale*position_x + this.origin[0] - this.stepWidth*this.scale*width/2;
        var x2 = (this.stepWidth*this.scale*(position_x+1) + this.origin[0] - this.stepWidth*this.scale*width/2);
        var y1 = (this.stepHeight*this.scale*position_y + this.origin[1]) - this.stepHeight*this.scale * height/2;
        var y2 = (this.stepHeight*this.scale*(position_y+1) + this.origin[1]) - this.stepHeight*this.scale * height/2;
        return [[x1, y1], [x2, y2]] 
    }

    drawLine(points, width, height){
        var polygon = "";
        for (var i=0; i < width; i++){
            var position = this.bounding_box(i, points[i], width, height);
            polygon = polygon + position[0][0] + "," + position[0][1] + " " + position[1][0] + "," + position[0][1] + " "; 
        }
        this.line.setAttribute("points", polygon);
    }

    drawBackground(time, length){
        time %= length;
        this.background.setAttribute("width", this.dimensions[0]);
        this.background.setAttribute("height", this.dimensions[1]);
        var midnight = new Matrix([[20,20,100]]);
        var noon = new Matrix([[150,150,255]]);
        var transition = new Matrix([[150,100,120]]);
        var color = Interpolation.lin_vec_interpolation([midnight, transition, noon, transition, midnight], time/length);
        this.background.setAttribute("style", "fill:rgb("+ color.values[0][0]+","+ color.values[0][1]+","+ color.values[0][2]+")");
    }

    drawPointer(width, height, position){
        var x = this.stepWidth*this.scale*(position+0.5) + this.origin[0] - this.stepWidth*this.scale*width/2 
        var y = this.origin[1] + this.stepHeight* this.scale * height;
        var str = x +"," + y + " " + x +"," + (y+10*this.scale);
        this.pointer.setAttribute("points", str);
    }

}

