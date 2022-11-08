import React, { useEffect, useState } from "react";
import "./App.css";
import ListIcon from "./images/listicon.png";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

// GET DATA FROM LOCAL_STORAGE START
const getLocalData = () => {
  let data = localStorage.getItem("List");

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
  const [myId, setMyId] = useState(data.length + 1);
  const [isEditedItem, setIsEditedItem] = useState(null);
  const [isEditedEnable, setIsEditedEnable] = useState(false);

  const updateInput = (e) => {
    setInput(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input) {
      alert("Please fill out the field");
    } else if (isEditedItem) {
      setData(
        data.map((item) => {
          if (item.myId === isEditedItem.myId) {
            return { ...item, input: input };
          }
          return item;
        })
      );
      setIsEditedItem(null);
      setIsEditedEnable(false);
      window.location.reload(false);
    } else {
      setData((prevData) => [...prevData, { input: input, myId: myId }]);
      alert(`${input} successfully added in list`);
      window.location.reload(false);
    }
    setInput("");
  };

  // ADD ALL DATA TO LOCAL_STORAGE
  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(data, myId));
  }, [data, myId]);

  // DELETE SINGLE DATA
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

  const editData = (id) => {
    let newEditData = data.find((item) => {
      return item.myId === id;
    });

    setInput(newEditData.input);
    setIsEditedItem(newEditData);
    setIsEditedEnable(true);
  };

  return (
    <div className="App">
      <div className="todo_list">
        <div className="heading">
          <img src={ListIcon} className="main_head-img" alt="List-icon" />
          <h1>
            What will you do on date {date} <span>?</span>
          </h1>
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
          {isEditedEnable ? (
            <>
              <button className="deskbtn" style={{ color: "hotpink" }}>
                <FiEdit />
              </button>
              <button
                className="mobile-btn"
                style={{ color: "blanchedalmond", background: "hotpink" }}
              >
                <FiEdit className="icon" /> Update
              </button>
            </>
          ) : (
            <>
              <button className="deskbtn">
                <IoMdAddCircleOutline />
              </button>
              <button className="mobile-btn">
                <IoMdAddCircleOutline className="icon" /> Add
              </button>
            </>
          )}
        </form>
        {/* INPUT FORM ENDS */}

        {/* RENDERED DATA START */}
        <div className="list-data">
          <ol>
            {[...data].reverse().map((todo, id) => {
              return (
                <li key={id}>
                  {todo.input}
                  <div>
                    <button
                      className="edit_btn"
                      onClick={() => editData(todo.myId)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="delete_btn"
                      onClick={() => deleteData(id)}
                    >
                      <RiDeleteBin6Fill />
                    </button>
                  </div>
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
