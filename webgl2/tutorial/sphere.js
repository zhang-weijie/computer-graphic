// New Tutorial 7 -> sphere.js

class Sphere {
    constructor() {
        // create vertex array object that is supposed to combine all buffers
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        // we need only one buffer since normals and vertices are identical at radius 1
        // let buffer = gl.createBuffer();
        let lats, longs;
        lats = longs = 10;

        var data = [];
        this.pntsSphere = (lats + 1) * (longs + 1) * 2;

        for (let i = 0; i <= lats; i++) {
            let lat0 = Math.PI * (-0.5 + (i - 1) / lats);
            let z0 = Math.sin(lat0);
            let zr0 = Math.cos(lat0);

            let lat1 = Math.PI * (-0.5 + i / lats);
            let z1 = Math.sin(lat1);
            let zr1 = Math.cos(lat1);

            for (let j = 0; j <= longs; j++) {
                let lng = 2.0 * Math.PI * (j - 1) / longs;
                let x = Math.cos(lng);
                let y = Math.sin(lng);
                data.push(x * zr0);
                data.push(y * zr0);
                data.push(z0);
                // data.push(z0 + 1);
                data.push(x * zr1);
                data.push(y * zr1);
                data.push(z1);
                // data.push(z1 + 1);
            }
        }
        // Setting up the VBO
        let vertexNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

        // Binding buffer to vertices
        gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(program.aVertexPosition);

        // New Tutorial 7: now normals instead of colors
        gl.vertexAttribPointer(program.aNormal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(program.aNormal);

        gl.bindVertexArray(null);
    }

    draw() {
        gl.bindVertexArray(this.vao);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.pntsSphere);
        gl.bindVertexArray(null);
    }
}