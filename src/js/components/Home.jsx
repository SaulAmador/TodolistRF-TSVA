import React, { useState, useEffect } from "react";

const BASE_URL = "https://playground.4geeks.com/todo";
const USERNAME = "SaulAmador";

const Home = () => { 
	const [tareas, setTareas] = useState([]); 
	const [nuevaTarea, setNuevaTarea] = useState('');

	useEffect(() => {
		initUserThenFetch();
	}, []);
	
	const initUserThenFetch = async () => {
    	try {
      		const getRes = await fetch(`${BASE_URL}/users/${USERNAME}`);
      		if (getRes.status === 404) {
        		const createRes = await fetch(`${BASE_URL}/users/${USERNAME}`, {
          			method: "POST",
        		});
        		if (!createRes.ok) {
          			console.error("No se pudo crear el usuario");
          			return;
        		}
      		} else if (!getRes.ok) {
        	console.error("GET inicial falló");
        	return;
      	}
      	await obtenerTareas();
    } catch (err) {
      console.error("Error inicializando usuario:", err);
    }
  	};	
	
	const obtenerTareas = async () => {
    	try {
      		const response = await fetch(`${BASE_URL}/users/${USERNAME}`);
      		if (!response.ok) return;
      		const data = await response.json();
      		setTareas(Array.isArray(data.todos) ? data.todos : []);
    	} catch (err) {
      		console.error("Error fetching tasks:", err);
    	}
  	};

	const manejarEnter = async (e) => { 
    	if (e.key !== 'Enter' || !nuevaTarea.trim()) return;
    		try { 
      			const response = await fetch(`${BASE_URL}/todos/${USERNAME}`, {
        			method: "POST",
        			headers: { 
						"Content-Type": "application/json" 
					},
        			body: JSON.stringify({
						label: nuevaTarea.trim(),
						is_done: false,
					}),
      			});
      			if (response.ok) {
        			setNuevaTarea('');
        			await obtenerTareas();
      			}
    		} catch (error) {
      			console.error("Error adding task:", error);
    		}
  		}; 
	
	const eliminarTarea = async (id) => { 
    	try {
      		const response = await fetch(`${BASE_URL}/todos/${id}`, {
        		method: "DELETE",
      		});
      		if (response.ok) 
        		await obtenerTareas();
    	} catch (error) {
      		console.error("Error deleting task:", error);
    	}
  	};  
	
	return ( 
		<div className="text-center"> 
			<h1 className="text-center mt-5">Goals for Today</h1> 
			<input 
				type="text" 
				value={nuevaTarea} 
				onChange={(e) => setNuevaTarea(e.target.value)} 
				onKeyDown={manejarEnter} 
				placeholder="Write your goal..." 
			/> 
			
			<div className="lista-tareas"> 
				{tareas.length === 0 ? ( 
					<p className="mensaje-vacio">Small steps, big impact.</p> 
				) : ( 
					tareas.map((tarea) => ( 
						<Tarea key={tarea.id} 
							tarea={tarea} 
							eliminarTarea={eliminarTarea} /> 
						)) 
					)} 
				</div> 
			</div> 
		); 
	}; 
	
	function Tarea({ tarea, eliminarTarea }) { 
		return ( 
			<div className="tarea-contenedor"> 
				<span>{tarea.label}</span> 
				<button 
					className="boton-eliminar" 
					onClick={() => eliminarTarea(tarea.id)} > ❌ 
				</button> 
			</div> 
		); 
	} 

	export default Home;