// eslint-disable-next-line
import './App.css';
import Header from "./MyComp/Header";
import {Todos} from "./MyComp/Todos";
import {Footer} from "./MyComp/Footer";
import {AddTodo} from "./MyComp/AddTodo";
import {About} from "./MyComp/About";
import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


function App() {

  let initTodo;
  if(localStorage.getItem("todos")==null){
    initTodo=[];
  }
  else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete=(todo)=>{
    console.log("I am onDelete",todo);
    setTodos(todos.filter((e)=>{
      return e!==todo;
    }));
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const addTodo=(title,desc)=>{
    console.log("Adding ",title,desc);
    let sno;
    if(todos.length===0){
      sno=1;
    }
    else{
      sno = todos[todos.length-1].sno + 1;
    }
    const myTodo={sno:sno, title:title, desc:desc}
    setTodos([...todos,myTodo]);
    console.log(myTodo);
  }

  const [todos,setTodos] = useState([]);
  useEffect(() => {
      localStorage.setItem("todos",JSON.stringify(todos));
  }, [todos]);

  return (
    <Router>
      <Header title="Devansh-TODO"/>
      <Routes>
        <Route path="/Todo" element={<AddTodo addTodo={addTodo}/>} />
        <Route path="/" element={<Todos todos={todos} onDelete={onDelete}/>} />
        <Route path="/About" element={<About/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
