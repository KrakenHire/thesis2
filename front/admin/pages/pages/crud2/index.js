import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

function Crud2() {
    const [id, setID] = useState("");
  const [service, setService] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [price, setPrice] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      id,
      service,
      username,
      firstName,
      lastName,
      age,
      experience,
      city,
      region,
      price,
    };

    const apiUrlEndpoint = "http://localhost:3000/provider";

    try {
      const response = await fetch(apiUrlEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Provider created successfully!");
        setService("");
        setUsername("");
        setFirstName("");
        setLastName("");
        setAge("");
        setExperience("");
        setCity("");
        setRegion("");
        setPrice("");
      } else {
        console.error("Failed to create provider.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
<div className="provider-form-container">
  <form onSubmit={handleSubmit} className="provider-form">
    <h2>Create Provider</h2>

    <div className="p-field">
      <label htmlFor="id">ID</label>
      <InputText id="id" value={id} onChange={(e) => setID(e.target.value)} required />
    </div>

    <div className="p-field">
      <label htmlFor="service">Service</label>
      <InputText id="service" value={service} onChange={(e) => setService(e.target.value)} required />
    </div>

    <div className="p-field">
      <label htmlFor="username">Username</label>
      <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
    </div>

    <div className="p-field">
      <label htmlFor="firstName">First Name</label>
      <InputText id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
    </div>

    <div className="p-field">
      <label htmlFor="lastName">Last Name</label>
      <InputText id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
    </div>

    <div className="p-field">
      <label htmlFor="age">Age</label>
      <InputText id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
    </div>

    <div className="p-field">
      <label htmlFor="experience">Experience</label>
      <InputText id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} required />
    </div>

    <div className="p-field">
      <label htmlFor="city">City</label>
      <InputText id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
    </div>

    <div className="p-field">
      <label htmlFor="region">Region</label>
      <InputText id="region" value={region} onChange={(e) => setRegion(e.target.value)} required />
    </div>

    <div className="p-field">
      <label htmlFor="price">Price</label>
      <InputText id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
    </div>

    <Button label="Create" type="submit" className="p-button-raised" />
  </form>
</div>
  );
}

export default Crud2;