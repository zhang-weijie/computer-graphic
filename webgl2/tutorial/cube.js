// New Tutorial 7: cube.js

class RGBCube {
    // from function initBuffers() {  
    constructor() {
        /*
        V4                         V7
         X-------------------------X
         |\                       /|
         | X---------------------X |
         | |V0                 V3| |
         | |                     | |
         | |       (0, 0)        | |
         | |                     | |
         | |V1                 V2| |
         | X---------------------X |
         |/                       \|
         X-------------------------X
        V5                         V6
        */

        // Tutorial 3: truncated pyramid -> cube
        const vertices = [
            -0.5, 0.5, -0.5,
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, 0.5
        ];

        // Tutorial 3: Gouraud shading
        const colors = [
            0, 0, 0,
            1, 0, 0,
            1, 1, 0,
            0, 1, 0,
            0, 0, 1,
            1, 0, 1,
            1, 1, 1,
            0, 1, 1
        ];

        // Tutorial 3
        // Indices for triangles
        const indices = [0, 1, 2, 0, 2, 3, 4, 6, 5, 4, 7, 6, 0, 1, 5, 0, 5, 4,
            2, 7, 3, 2, 6, 7, 1, 2, 5, 2, 6, 5, 3, 4, 7, 3, 0, 4]; // New Tutorial 6: const 

        // New Tutorial 6: create vertex array object that is supposed to combine all buffers
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        // Setting up the VBO
        let vertexBuffer = gl.createBuffer(); // New Tutoral 6, now here
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        // New Tutorial 6: now here
        gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(program.aVertexPosition);

        // Tutorial 3
        // let colorBuffer = gl.createBuffer();
        // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        // New Tutorial 7: normal instead of color
        gl.vertexAttribPointer(program.aNormal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(program.aNormal);

        // New Tutorial 6: now here
        //gl.vertexAttribPointer(program.aColor, 3, gl.FLOAT, false, 0, 0);
        //gl.enableVertexAttribArray(program.aColor);

        // Setting up the IBO
        this.indexBuffer = gl.createBuffer(); // New Tutorial 6, now here
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

        this.length = indices.length;

        // Clean
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        // New Tutorial 6:
        gl.bindVertexArray(null);
    }


    // Tutorial 5: method, code from function draw
    draw() {
        // Use the buffers we've constructed
        gl.bindVertexArray(this.vao);
        // Bind IBO
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        // Draw to the scene using triangle primitives
        // Tutorial 3: TRIANGLES, was: gl.drawElements(gl.LINES, indices.length, gl.UNSIGNED_SHORT, 0);
        gl.drawElements(gl.TRIANGLES, this.length, gl.UNSIGNED_SHORT, 0);  // New Tutorial 6

        // Clean
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        //Tutorial7
        gl.bindVertexArray(null);
        //Tutorial7
    }
}