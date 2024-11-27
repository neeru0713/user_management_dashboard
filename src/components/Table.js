import React, { useState, useEffect } from "react";
import TableRow from "./TableRow"; // Assuming TableRow component is in a separate file
import Button from "./Button";

const Table = () => {
    const [users, setUsers] = useState([]);
    const [editingRow, setEditingRow] = useState(-1)

  useEffect(() => {
    const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    department: "IT",
  },
  {
    id: 2,
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    department: "Marketing",
  },
  {
    id: 3,
    firstName: "Eva",
    lastName: "Johnson",
    email: "eva.johnson@example.com",
    department: "Sales",
  },
  {
    id: 4,
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    department: "Finance",
  },
  {
    id: 5,
    firstName: "Olivia",
    lastName: "Williams",
    email: "olivia.williams@example.com",
    department: "Human Resources",
  },
  {
    id: 6,
    firstName: "Daniel",
    lastName: "Miller",
    email: "daniel.miller@example.com",
    department: "IT",
  },
  {
    id: 7,
    firstName: "Sophia",
    lastName: "Jones",
    email: "sophia.jones@example.com",
    department: "Marketing",
  },
  {
    id: 8,
    firstName: "Liam",
    lastName: "Johnson",
    email: "liam.johnson@example.com",
    department: "Sales",
  },
  {
    id: 9,
    firstName: "Ava",
    lastName: "Martinez",
    email: "ava.martinez@example.com",
    department: "Finance",
  },
  {
    id: 10,
    firstName: "Logan",
    lastName: "Davis",
    email: "logan.davis@example.com",
    department: "Human Resources",
  }
];

// You now have 10 unique user objects in the 'users' array.


    setUsers(users);
  }, []);

  function editButtonClickHandler(event, index) {
    setEditingRow(index);
    }

    function saveUpdatedData(event, index, editingData) {
        let myarr = [...users]
        
        myarr[index].firstName =
          editingData.firstName === ""
            ? myarr[index].firstName
            : editingData.firstName;
        myarr[index].lastName =
          editingData.lastName === ""
            ? myarr[index].lastName
                : editingData.lastName;
        
        myarr[index].email =
          editingData.email === ""
            ? myarr[index].email
            : editingData.email;
        myarr[index].department =
          editingData.department === ""
            ? myarr[index].department
                : editingData.department;
        
        setUsers(myarr)

        setEditingRow(-1)
        
    }
    

    function updateRowItem(event) {
        let index = parseInt(event.target.getAttribute("data-index"));
        let keyName = event.target.name
        let val = event.target.value
        let newArray = [...users]
        newArray[index][keyName] = val
        setUsers(newArray);
    }

    function deleteRow(event, index) {
    let filteredArray = users.filter((rowData, ind) => {
      return ind !== index;
    });
        
    console.log("filtered : ", filteredArray);
      
    setUsers(filteredArray);
  }


function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function generateRandomUser() {
  const firstNames = [
    "John",
    "Alice",
    "Eva",
    "Michael",
    "Olivia",
    "Daniel",
    "Sophia",
    "Liam",
    "Ava",
    "Logan",
  ];
  const lastNames = [
    "Doe",
    "Smith",
    "Johnson",
    "Brown",
    "Williams",
    "Miller",
    "Jones",
    "Martinez",
    "Davis",
  ];
  const departments = [
    "IT",
    "Marketing",
    "Sales",
    "Finance",
    "Human Resources",
  ];

  const randomUser = {
    id: users.length + 1,
    firstName: firstNames[getRandomIndex(firstNames)],
    lastName: lastNames[getRandomIndex(lastNames)],
    email: "",
    department: departments[getRandomIndex(departments)],
  };

  // Generate email using firstName and lastName
  randomUser.email = `${randomUser.firstName.toLowerCase()}.${randomUser.lastName.toLowerCase()}@example.com`;

  return randomUser;
}

    function addNewUser() {
      let user = generateRandomUser()
      let myarr = [...users]
      myarr.push(user)
      setUsers(myarr)
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
    </div>
  );
};

export default Table;
