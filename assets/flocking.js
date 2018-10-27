/*
Made by: Nathan Nieuwenhuizen

This script demonstrates and handles the flocking movement/system of these agents

The velocity vector for each agent is calculated by three rules:
-the Cohesion
-the Seperation
-the Allignment

With these rules you can create group movements like: birds, fish and bactaria.
*/

//As the windows loads.
window.addEventListener('load', function(){
    console.log('change!!!');
var flockLoaded = false;
document.getElementById('flockButton').addEventListener('click', toggle);
var shown = false;
var flockPaused = true;
function toggle() {
    console.log('click');

    shown = !shown;
    flockPaused = !shown;
    if (shown) {
        init(); 
        document.getElementById("canvas").style.opacity = '1';
        document.getElementById("canvas").style.zIndex = '1';

    } else {
        document.getElementById("canvas").style.opacity = '0';
        setTimeout(() => {
            document.getElementById("canvas").style.zIndex = '-1';
        }, 500);

    }
}
function init(){
    if (flockLoaded) {
        return;
    }
    flockLoaded = true;
    //Canvas and context is defined.
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    
    //Canvas gets size of the window screen.
    size = 1000;
    canvas.width = size;
    canvas.height = size;
    
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    
    //Declares the variables needed for the editData function.
    var agentSpeed, groupAmount, randomPos, followsMouse,mouseSpawning, seperationForce, cohesionForce, allignmentForce, agentSize;
    
    
    var maxAgents = 100;
    var attractorPos = new Vector();
    
    //Makes an empty array.
    var agents = [];
    
    
    //Calls the updateData and SpawnGroup.
    updateData();
    spawnGroup();
    
    
    //Click event at the screen.
    addEventListener("click", function(e){
        if(mouseSpawning)
            if ( agents.length > maxAgents) {
                return;
            }
            rect = canvas.getBoundingClientRect();

            spawnPos = new Vector(
                (e.clientX - rect.left) * (size / rect.width),
                (e.clientY - rect.top) * (size / rect.height)
            );
            if (spawnPos.x > 0 && spawnPos.x < size && spawnPos.y > 0 && spawnPos.y < size) {
                spawnAgent(
                    new Vector(
                        (e.clientX - rect.left) * (size / rect.width),
                        (e.clientY - rect.top) * (size / rect.height)
                    ),
                    new Vector(1-Math.random()*2,1-Math.random()*2)
                    );
            }
    });
    
    //Updates the attractorPos with the mouse position.
    addEventListener("mousemove", function(e){
        rect = canvas.getBoundingClientRect();
        attractorPos.x = (e.clientX - rect.left) * (size / rect.width);
        attractorPos.y = (e.clientY - rect.top) * (size / rect.height);
        if (attractorPos.x > 0 && attractorPos.x < size && attractorPos.y > 0 && attractorPos.y < size) {
            followsMouse = true;
        }else {
            followsMouse = false;
        }

        // console.log(attractorPos, rect);
    });
    
    //The updateData function edits the variables with the document vaules from the HTML file.
    function updateData()
    {
        agentSize = 5;
        agentSpeed = 3;
        groupAmount = 50;
        randomPos = false;
        // followsMouse = true;
        mouseSpawning = true;
        
        //These vaules must be max at 1, in index.html the max value is 1000.
        seperationForce = 0.5;
        allignmentForce = 0.1;
        cohesionForce = 0.05;
        
    }
    
    //Spawns a group of agents.
    function spawnGroup()
    {
        for(var i = 0; i <groupAmount; i++)
        {
            var position;
            if(randomPos)
                position = new Vector(canvas.width*Math.random(),canvas.height*Math.random());
            else
                position = new Vector(canvas.width/2,canvas.height/2);
            
            if(agents.length < maxAgents)
                spawnAgent(
                position,
                new Vector(1-Math.random()*2,1-Math.random()*2)
                );
        }
    }
    
    //This function spawnes an agent at a position and velocity and adds it to the array.
    function spawnAgent(position,velocity)
    {
        var agent = new Agent(position,velocity,agentSize);
        agents.push(agent);
    }
    
    
    //Update function
    !function update() {
        window.requestAnimationFrame(update);
        
        if (flockPaused) {
            return;
        }
        context.shadowBlur = 0;
        context.shadowColor = "black";
        
        
        //Clear rects the canvas with a color that has an alpha below the 1, so you get a more fade effect.
        context.fillStyle = "rgba(0,0,0, 0.2)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // context.clearRect(0, 0, canvas.width, canvas.height);

        //updates the data from the index.HTML document.
        updateData();
        
        context.shadowBlur = 20;
        context.shadowColor = "#f22";
        
        //for each agent
        for(var i = 0; i <agents.length; i++)
        {
            //The calculated velocities of the three rules are added multiplied with the forces.
            agents[i].velocity.Add(CalculateAllignment(agents[i]).x*allignmentForce + 
                                   CalculateCohesion(agents[i]).x*cohesionForce + 
                                   CalculateSeperation(agents[i]).x*seperationForce ,
                                   CalculateAllignment(agents[i]).y*allignmentForce + 
                                   CalculateCohesion(agents[i]).y*cohesionForce + 
                                   CalculateSeperation(agents[i]).y*seperationForce);
            
            //If they are attracted by the mouse.
            if(followsMouse)
            {
                //If the distance to the mouse is below 500 px.
                if( agents[i].position.DistanceFrom(attractorPos) < 500 )
                {
                    var magnetDistance =1+ agents[i].position.DistanceFrom(attractorPos)/100;
                    var attractDirection = new Vector(attractorPos.x-agents[i].position.x,attractorPos.y-agents[i].position.y);
                    attractDirection.Normalizen();
                    
                    //Applies the additional velocity towards the mouse.
                    agents[i].velocity.Add(attractDirection.x/magnetDistance,attractDirection.y/magnetDistance);
                }
            }
            
            //Normalizes the velocity to 1
            agents[i].velocity.Normalizen();
            
            //multiplies it with the speed.
            agents[i].velocity.Multiply(agentSpeed);
            
            
            //Updates adn draws the agent.
            agents[i].Update(canvas);
            agents[i].Draw(context);
        }
        
    }();
    
    
    /*
    These functions are the three rules every agent should calculate arround its neighbour agents.
    Allignment makes sure the agent goes with the same direction of itsa neighbours, 
    Cohesion makes sure the agent wants to be part of the group
    and Seperation makes sure the agent doesn't goes to close to its neighbour agents.
    */
    
    //This returns the vector of the neighbour agents average direction/velocity.
    function CalculateAllignment(agent)
    {
        var vector = new Vector();
        var neighbours = 0;
        for(var a = 0; a <agents.length; a++)
            {
                if(agents[a] != agent && agents[a].position.DistanceFrom(agent.position) < 200)
                {
                    vector.Add(agents[a].velocity.x,agents[a].velocity.y);
                    neighbours++;
                }
            }
        if(neighbours >0)
        {
            vector.Devide(neighbours);
            vector.Normalizen();
        }
        return vector;
    }
    
    //This returns the vector towards the average position of the neighbour agents.
    function CalculateCohesion(agent)
    {
        var vector = new Vector(0,0);
        var neighbours = 0;
        for(var c = 0; c <agents.length; c++)
            {
                if(agents[c] != agent && agents[c].position.DistanceFrom(agent.position) < 200)
                {
                    vector.Add(agents[c].position.x,agents[c].position.y);
                    neighbours++;
                }
            }
        
        if(neighbours >0)
        {
            vector.Devide(neighbours);
            vector.Add(-agent.position.x,-agent.position.y);
            vector.Normalizen();
        }
        return vector;
    }
    
    
    //This returns the vector towards the distances of all the neighbour agents added, and then made negative.
    function CalculateSeperation(agent)
    {
        var vector = new Vector();
        
        for(var s = 0; s <agents.length; s++)
            {
                if(agents[s] != agent && agents[s].position.DistanceFrom(agent.position) < 50)
                {
                    vector.Add(agents[s].position.x - agent.position.x,agents[s].position.y - agent.position.y);
                }
            }
        
            vector.Multiply(-1);
            vector.Normalizen(1);
        
        
        return vector;
    }
    
};
});

/*
Made by: Nathan Nieuwenhuizen

This is a simple 2D vector class that has a couple of inbuild functions.
*/

function Vector(x,y)
{
    //If it isn't declared a number, it automaticly is 0.
    this.x = x || 0;
    this.y = y || 0;
    
}

//These functions make the code a lot more readable and easier to understand. 
//I dont know it also optimalisize it sadly.
Vector.prototype = {
    //Function that returns the distance between vectors in numbers.
    DistanceFrom: function(v)
    {
        return Math.sqrt( Math.pow(this.x-v.x,2) + Math.pow(this.y-v.y,2) );
    },
    
    //This function changes the x and y of the vector making the hypotenuse equal 1.
    Normalizen: function()
    {
        if(this.x != 0 && this.y != 0)
        {
            var distance =  Math.sqrt( Math.pow(this.x,2) + Math.pow(this.y,2) );
            this.x/=distance;
            this.y/=distance;
        }
        
    },
    
    //Multiplies the vector with a number.
    Multiply: function (number)
    {
        this.x *= number;
        this.y *= number;
    },
    //Devides the vector with a number.
    Devide: function (number)
    {
        this.x /= number;
        this.y /= number;
    },
    //Adds values to the vector.
    Add: function(numberX,numberY)
    {
        this.x += numberX;
        this.y += numberY;
    }
}
/*
Made by: Nathan Nieuwenhuizen

This class hadles the agent draws and updates.
It also contains the agent its velocity and position.*/
function Agent(position, velocity, radius)
{
    //Declares the variables.
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    
    //The draw function.
    this.Draw = function(context){
        //the outer cirlce (white)
        context.beginPath();
        context.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = '#f22';
        context.fill();
        
        //the inner circle (black) / eye (o)
        /*context.beginPath();
        context.arc(position.x, position.y, radius/4, 0, 2 * Math.PI, false);
        context.fillStyle = 'black';
        context.fill();
        */
    }
    
    //The update function.
    this.Update = function(canvas)
    {
        
        //If the agent goes off canvas, it goes to the other side of the canvas.
        if(position.x <0)
            position.x =canvas.width;
        if(position.x >canvas.width)
            position.x = 0;
        if(position.y <0)
            position.y =canvas.height;
        if(position.y >canvas.height)
            position.y = 0;
        
        //Updates the position with the velocity.
        position.x += velocity.x;
        position.y += velocity.y;
    }
};