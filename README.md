# Graphics
## Introduction
###	Mesh

A collection of lines segments forming a close loop is called a polygon. 
A collection of one or more polygons that formed of vertices and grouped together is called mesh.

### Example of a mesh:

#### A simple cube has 8 vertices, and formed of six polygons:

![alt text](https://github.com/nglthu/Graphics/blob/master/img/cube.png)
 
Figure 1: A cube formed form six polygons (each polygon formed from a close loop four-lines).
#### A simple 3D triangle has 4 vertices, and formed of four polygons. 

![alt text](https://github.com/nglthu/Graphics/blob/master/img/mesh.png)
 
Figure 2: 3D triangle form of four polygons (each polygon form from a close loop three-lines)

###	Modelling by using graphics API (OpenGL, WebGL) :

WebGL/Three.js code that defines a vertex

WebGL considers these vertices to be a part of polygons such as a triangle using the faces.push method.  Produce a polygon with 3 or 4 edges, we would need to create a THREE.Face3 or THREE.Face4 respectively

The collection of one or more Polygons (mesh) that formed of vertices and grouped together that coordinate position of each vertex has to be calculated.

The mesh could be changed, or rotate based its size requires that the coordinate position of each vertex has to be recalculated.


## Implementation :

Mesh with sphere geometry : [Access Link of sphere](https://nglthu.github.io/Graphics/three_js.html)

Polygon Square composed of 4 vertices: [Access Link of Square polygon](https://nglthu.github.io/Graphics/meshOf4Polygon.html)

Polygon Triangle: [Access Link of Triangle Polygon](https://nglthu.github.io/Graphics/meshOf3Polygon.html)
