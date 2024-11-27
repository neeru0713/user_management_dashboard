import React, { useState, useEffect } from "react";
import TableRow from "./TableRow"; // Assuming TableRow component is in a separate file
import Button from "./Button";
import Modal  from "./Modal";
const Table = () => {
  const [users, setUsers] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [editingRow, setEditingRow] = useState(-1);

  async function onSubmit(body) {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), 
      });
  
      const result = await res.json(); 
      console.log("User added successfully:", result);
      setUsers([...users, result]);
      setIsShowModal(false);
    } catch (e) {
      console.error("Error adding user:", e);
    }
  }

  async function fetchUsers() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await res.json();
      setUsers(users);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function editButtonClickHandler(event, index) {
    setEditingRow(index);
  }

  async function saveUpdatedData(event, index, editingData) {
    event.preventDefault();
    const id = index + 1;
    const updatedData = {
      id: id,
      name: `${editingData.firstName}${editingData.lastName}`,
      username: editingData.firstName.toLowerCase(), 
      email: editingData.email,
      address: {
        street: "Default Street", 
        suite: "Default Suite",
        city: "Default City",
        zipcode: "00000",
        geo: {
          lat: "0.0000",
          lng: "0.0000",
        },
      },
      phone: "000-000-0000", 
      website: "example.com",
      company: {
        name: editingData.department,
        catchPhrase: "Default CatchPhrase",
        bs: "default-bs",
      },
    };
  
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      const result = await response.json();
      console.log("Data updated successfully:", result);

      const tempArr = [...users];
      tempArr[index] = result;
      setUsers(tempArr);
      
    } catch (error) {
      console.error("Error updating data:", error);
    }
  
    setEditingRow(-1);
  }
  

  function updateRowItem(event) {
    let index = parseInt(event.target.getAttribute("data-index"));
    let keyName = event.target.name;
    let val = event.target.value;
    let newArray = [...users];
    newArray[index][keyName] = val;
    setUsers(newArray);
  }

  function deleteRow(event, index) {
    let filteredArray = users.filter((rowData, ind) => {
      return ind !== index;
    });

    console.log("filtered : ", filteredArray);

    setUsers(filteredArray);
  }

  function onClose() {
    setIsShowModal(false)
  }


  function addNewUser() {
   setIsShowModal(true)
  }

  return (
    <div className="flex flex-col mt-5">
      <h1 className="text-center text-4xl font-bold">
        {" "}
        <span className="text-teal-600">U</span>ser{" "}
        <span className="text-teal-600">M</span>anagement{" "}
        <span className="text-teal-600">D</span>ashboard
      </h1>
      <button
        onClick={addNewUser}
        className="fixed right-[20px] top-[30px] border border-1 rounded border-teal-900 bg-teal-700 p-2 text-white font-semibold hover:bg-teal-600"
      >
        Add user
      </button>
      <div className=" mt-10 overflow-x-hidden  m-auto w-[85%] bg-white border border-slate-300 shadow-lg shadow-slate-500/40 hover:shadow-blue-500/80 ">
        <table className="flex flex-col text-black text-md pt-6 pl-2 w-[95%] h-100">
          <thead className="flex justify-between text-slate-500 text-xs pt-4 w-[100%] py-4">
            <tr className="flex justify-between w-[100%]">
              <th className="w-[5%]">ID</th>
              <th className="w-[20%]">First Name</th>
              <th className="w-[20%]">Last Name</th>
              <th className="w-[20%]">Email</th>
              <th className="w-[20%]">Department</th>
              <th className="w-[15%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <TableRow
                editingRow={editingRow}
                user={user}
                index={index}
                editButtonClickHandler={editButtonClickHandler}
                deleteRow={deleteRow}
                updateRowItem={updateRowItem}
                saveUpdatedData={saveUpdatedData}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Modal isShowModal={isShowModal} onSubmit={onSubmit} onClose={onClose}/>
    </div>
   
  );
};

export default Table;
