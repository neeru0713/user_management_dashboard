import React, { useState, useEffect } from "react";
import TableRow from "./TableRow"; 
import Button from "./Button";
import Modal from "./Modal";
import Notification from "./Notification";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [editingRow, setEditingRow] = useState(-1);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5); 

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  async function onSubmit(body) {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      setUsers([...users, result]);
      setIsShowModal(false);
      showNotification("User added successfully!", "success");
    } catch (e) {
      showNotification("Error adding user.", "error");
    }
  }

  async function fetchUsers() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await res.json();
      setUsers(users);
      showNotification("Users loaded successfully!", "success");
    } catch (e) {
      showNotification("Error fetching users.", "error");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Pagination controls
  const totalPages = Math.ceil(users.length / usersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json();
      const updatedUsers = [...users];
      updatedUsers[index] = result;
      setUsers(updatedUsers);
      setEditingRow(-1);
      showNotification("User updated successfully!", "success");
    } catch (error) {
      showNotification("Error updating user.", "error");
    }
  }

  async function deleteRow(event, index) {
    event.preventDefault();
    const id = index + 1;
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
        showNotification("User deleted successfully!", "success");
      } else {
        showNotification("Failed to delete user.", "error");
      }
    } catch (error) {
      showNotification("Error deleting user.", "error");
    }
  }

  function onClose() {
    setIsShowModal(false);
  }

  function addNewUser() {
    setIsShowModal(true);
  }

  return (
    <div className="flex flex-col mt-5">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
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
            {currentUsers.map((user, index) => (
              <TableRow
                editingRow={editingRow}
                user={user}
                index={index}
                editButtonClickHandler={editButtonClickHandler}
                deleteRow={deleteRow}
                saveUpdatedData={saveUpdatedData}
              />
            ))}
          </tbody>
        </table>
      </div>


      <div className="flex justify-between items-center m-auto pt-8 w-[50%]">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-teal-700 text-white p-2 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="bg-teal-700 text-white p-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      <Modal isShowModal={isShowModal} onSubmit={onSubmit} onClose={onClose} />
    </div>
  );
};

export default Table;
