/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { StyleRegistry } from "styled-jsx";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [phone, setPhone] = useState("");

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "desc") {
      setDesc(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { name, phone, email, desc };

    fetch("http://localhost:3000/api/postcontact", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        alert("Thanks for contacting us");
        setName("");
        setPhone("");
        setEmail("");
        setDesc("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label className={styles.lable} htmlFor="exampleInputName">
            Enter your name:
          </label>
          <input
            value={name}
            onChange={handleChange}
            name="name"
            type="name"
            className={styles.input}
            id="name"
            aria-describedby="name"
            required
          />
        </div>

        <div className={styles.mb3}>
          <label className={styles.lable} htmlFor="email">
            Email address:
          </label>
          <input
            value={email}
            onChange={handleChange}
            name="email"
            type="email"
            className={styles.input}
            id="email"
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className={styles.formtext}>
            {" "}
            We'll never share ypur email anyone else.{" "}
          </div>
        </div>
        <div className={styles.mb3}>
          <label className={styles.lable} htmlFor="phone">
            Phone:
          </label>
          <input
            value={phone}
            onChange={handleChange}
            name="phone"
            type="password"
            className={styles.input}
            id="phone"
            required
          />
        </div>
        <div className={styles.mb3}>
          <label className={styles.lable} htmlFor="desc">
            Elaborate your concern:
          </label>
          <textarea
            value={desc}
            onChange={handleChange}
            name="desc"
            className={styles.input}
            id="desc"
          />
        </div>
        <button type="submit" className={styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
