// Importaciones de Librerías.

const express = require ('express')
const cors = require ('cors')

// Definir servidor en base a la librería .

const app = express ();

// Definimos un puerto.

const Puerto = 3000;

// Midleworks
app.use(cors()).use(express.json())
app.use('/public', express.static(__dirname+'/public'))

// Arreglos

let cocinero = []

               // Servicio REST.

// Get --- Consultar.

app.get ('/', (req,res)=> {
     res.status(200).json(cocinero)
})

// Get Individual --- Consulta Individual

app.get ('/:id', (req,res)=> {
    const { id } = req.params;
    const cocineroSelect = cocinero.filter(p=> p.id === id)
    if (cocineroSelect.length>0)
    {
        return res.status(200).send (cocineroSelect[0])
    }
    res.status(404).send({
        message:`El cocinero con ese id no existe`
    })
})

// Post  --- Insertar. 

app.post ('/', (req,res)=> {
    const { body } = req;
    cocinero.push(body)
    res.status(200).send({
        message:`Dato insertado correctamente`,
        reponse: body
    })
})


// Put or patch --- Actualizar.
app.put ('/', (req, res)=>{
const { id, Nombre, Cedula, Direccion } = req.body
const Cocinero = cocinero.filter(p=> p.id===id) [0] || {}
Cocinero.Nombre= Nombre;
Cocinero.Cedula= Cedula;
Cocinero.Direccion= Direccion;
res.status(200).send({
    message:`Cocinero modificado con exito`,
    response: Cocinero
    })
})


// Delete --- Eliminar.
app.delete ('/:id',(req, res)=>{
    const { id } =req.params;
    cocinero = cocinero.filter(p=> p.id !== id)
    res.status (200).send ({
        message: `Cocinero con id ${id} fue eliminado`
    })
})

//Escucha el puerto y llama.

app.listen(Puerto, ()=>{
    console.log (`Server running http://localhost:${Puerto}`);
})
