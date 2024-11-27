import React, {useState ,useEffect} from "react";
import { BiTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import {AiFillCheckCircle} from "react-icons/ai"
const TableRow = ({
  user,
  index,
  editButtonClickHandler,
  deleteRow,
  editingRow,
  saveUpdatedData,
}) => {
  const [editingData, setEditingData] = useState({
    firstName: "",
    lastName: "",
    department: "",
    email: "",
  });
  
  function handleEditingUpdate(event) {
    let keyname = event.target.name;
    let myarr = { ...editingData };
    myarr[keyname] = event.target.value;
    setEditingData(myarr);
  }

  return (
    <tr className="flex justify-between text-slate-800 text-xs w-[100%] py-4 border-b border-teal-100">
      <td className="w-[5%] ">{user.id}</td>
      <td className="w-[20%]">
        {editingRow === index ? (
          <input
            data-index={index}
            onChange={handleEditingUpdate}
            value={editingData.firstName}
            type="text"
            name="firstName"
            placeholder="Modify Text"
          />
        ) : (
          user?.name?.split(" ")[0]
        )}
      </td>
      <td className="w-[20%]">
        {editingRow === index ? (
          <input
            data-index={index}
            onChange={handleEditingUpdate}
            value={editingData.lastName}
            type="text"
            name="lastName"
            placeholder="Modify Text"
          />
        ) : (
          user?.name?.split(" ")[1]
        )}
      </td>
      <td className="w-[20%]">
        {editingRow === index ? (
          <input
            data-index={index}
            onChange={handleEditingUpdate}
            value={editingData.email}
            type="text"
            name="email"
            placeholder="Modify Text"
          />
        ) : (
          user.email
        )}
      </td>
      <td className="w-[20%]">
        {" "}
        {editingRow === index ? (
          <input
            data-index={index}
            onChange={handleEditingUpdate}
            value={editingData.department}
            type="text"
            name="department"
            placeholder="Modify Text"
          />
        ) : (
          user.company.name
        )}
      </td>
      <td className=" w-[15%] icon-group flex text-center pl-20">
        {editingRow === index ? (
          <AiFillCheckCircle
            data-index={index}
            id="editBtn"
            onClick={(event) => {
              saveUpdatedData(event, index,editingData);
            }}
          />
        ) : (
          <FiEdit
            data-index={index}
            id="editBtn"
            onClick={(event) => {
              editButtonClickHandler(event, index);
            }}
          />
        )}

        <BiTrashAlt
          data-index={index}
          onClick={(event) => {
            deleteRow(event, index);
          }}
          className="deleteIconRed"
          id="trashBtn"
        />
      </td>
    </tr>
  );
};

export default TableRow;
