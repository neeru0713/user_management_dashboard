import React, { useState } from "react";

const Modal = ({ isShowModal, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    lat: "",
    lng: "",
    phone: "",
    website: "",
    companyName: "",
    catchPhrase: "",
    bs: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the final request body
    const requestBody = {
      id: parseInt(formData.id),
      name: formData.name,
      username: formData.username,
      email: formData.email,
      address: {
        street: formData.street,
        suite: formData.suite,
        city: formData.city,
        zipcode: formData.zipcode,
        geo: {
          lat: formData.lat,
          lng: formData.lng,
        },
      },
      phone: formData.phone,
      website: formData.website,
      company: {
        name: formData.companyName,
        catchPhrase: formData.catchPhrase,
        bs: formData.bs,
      },
    };

    onSubmit(requestBody);
  };

  return (
    isShowModal && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-1/2">
          <h2 className="text-2xl font-bold mb-4">Add New User</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
             
              <input name="id" placeholder="ID" onChange={handleChange} className="border p-2" />
              <input name="name" placeholder="Name" onChange={handleChange} className="border p-2" />
              <input name="username" placeholder="Username" onChange={handleChange} className="border p-2" />
              <input name="email" placeholder="Email" onChange={handleChange} className="border p-2" />
              <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-2" />
              <input name="website" placeholder="Website" onChange={handleChange} className="border p-2" />

              
              <input name="street" placeholder="Street" onChange={handleChange} className="border p-2" />
              <input name="suite" placeholder="Suite" onChange={handleChange} className="border p-2" />
              <input name="city" placeholder="City" onChange={handleChange} className="border p-2" />
              <input name="zipcode" placeholder="Zipcode" onChange={handleChange} className="border p-2" />

             
              <input name="lat" placeholder="Latitude" onChange={handleChange} className="border p-2" />
              <input name="lng" placeholder="Longitude" onChange={handleChange} className="border p-2" />

             
              <input name="companyName" placeholder="Company Name" onChange={handleChange} className="border p-2" />
              <input name="catchPhrase" placeholder="Catch Phrase" onChange={handleChange} className="border p-2" />
              <input name="bs" placeholder="Business Strategy (BS)" onChange={handleChange} className="border p-2" />
            </div>

            
            <div className="flex justify-end mt-4">
              <button type="button" onClick={onClose} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
              <button type="submit" className="bg-teal-700 text-white px-4 py-2 rounded">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Modal;
