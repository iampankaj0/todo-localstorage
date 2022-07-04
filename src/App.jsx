import React, { useEffect, useState } from "react";
import "./App.css";
import ListIcon from "./images/listicon.png";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";

// GET DATA FROM LOCAL_STORAGE START
const getLocalData = () => {
  let data = localStorage.getItem("List");
  console.log(data);

  if (data) {
    return JSON.parse(localStorage.getItem("List"));
  } else {
    return [];
  }
};
// GET DATA FROM LOCAL_STORAGE ENDS

const App = () => {
  const [data, setData] = useState(getLocalData());
  const [input, setInput] = useState("");

  const updateInput = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setData((prevData) => [...prevData, { input: input }]);
    if (!input) {
      alert("Please fill out the field");
    } else {
      alert("Your data successfully added in list");
    }
    setInput("");
  };

  // ADD ALL DATA TO LOCAL_STORAGE
  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(data));
  }, [data]);

  const deleteData = (id) => {
    var newData = data;
    newData.splice(id, 1);
    setData([...newData]);
    alert(`Index number ${id + 1} deleted`);
  };

  // TODAY DATE METHOD
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <div className="App">
      <div className="todo_list">
        <div className="heading">
          <img src={ListIcon} className="main_head-img" alt="List-icon" />
          <h1>What will you do on date {date} <span>?</span></h1>
        </div>

        {/* INPUT FORM START */}
        <form className="data-form" onSubmit={handleAdd}>
          <input
            value={input}
            onChange={updateInput}
            name="todo"
            type="text"
            placeholder="Type here..."
          />
          <button className="deskbtn">
            <IoMdAddCircleOutline />
          </button>
          <button className="mobile-btn">
            <IoMdAddCircleOutline className="icon" /> Add
          </button>
        </form>
        {/* INPUT FORM ENDS */}

        {/* RENDERED DATA START */}
        <div className="list-data">
          <ol>
            {data.map((todo, id) => {
              return (
                <li key={id}>
                  {todo.input}
                  <button onClick={() => deleteData(id)}>
                    <RiDeleteBin6Fill />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        {/* RENDERED DATA ENDS */}
      </div>
    </div>
  );
};

export default App;
