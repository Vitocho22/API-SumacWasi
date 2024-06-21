"use strict";
html >
    lang;
"en" >
    charset;
"UTF-8" >
    name;
"viewport";
content = "width=device-width, initial-scale=1.0" >
    Formulario;
de;
Producto < /title>
    < /head>
    < body >
    Formulario;
de;
Producto < /h1>
    < form;
action = "http://localhost:3001/api/productos";
method = "POST";
enctype = "multipart/form-data" >
;
for ( = "nombre" > Nombre; ; )
    : /label>
        < input;
type = "text";
id = "nombre";
name = "nombre";
required > ;
for ( = "descripcion" > Descripción; ; )
    : /label><br>
        < textarea;
id = "descripcion";
name = "descripcion";
rows = "4";
cols = "50";
required > /textarea><br><br>
    < label;
for ( = "categoria" > Categoría; ; )
    : /label>
        < input;
type = "text";
id = "categoria";
name = "categoria";
required > ;
for ( = "ubicacion" > Ubicación; ; )
    : /label>
        < input;
type = "text";
id = "ubicacion";
name = "ubicacion";
required > ;
for ( = "precio" > Precio; ; )
    : /label>
        < input;
type = "number";
id = "precio";
name = "precio";
min = "0";
step = "0.01";
required > ;
for ( = "imagen" > Imagen; ; )
    : /label>
        < input;
type = "file";
id = "imagen";
name = "imagen";
accept = "image/*";
required > type;
"submit" > Enviar < /button>
    < /form>
    < /body>
    < /html>;
