import React from "react";
import "../TourList.scss";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import { updateUserRole ,  getUserById , getUsers} from '../../utils/services/Apis/UsersApi.jsx'
import Swal from "sweetalert2";
import './RoleStyles.scss'

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedRole, setSelectedRole] = useState("");

  const handleClose = () => {
    if (show) {
      setShow(false);
      getAllUsers();
    }
  };

  const handleShow = async (role) => {
    try {
      const response = await getUserById(role.id);
      setSelectedUser(response);
    } catch (error) {
      console.error(error);
    }
    setShow(true);
  };

  async function getAllUsers() {
    try {
      const res = await getUsers();
      setRoles(res)
      setLoading(false);
    } catch {}
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedRole === "") {
      Swal.fire({ text: "Por favor, selecciona un rol", icon: "warning" });
      return;
    }
    try {
      await updateUserRole(selectedUser.id, selectedRole); 
      Swal.fire({ text: "Rol actualizado", icon: "success" });
      handleClose()
    } catch (error) {
      Swal.fire({ text: `Error: ${error}`, icon: "warning" });
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [show]);

  return (
    <div className="form-container">
      <h4>Usuarios</h4>
      <table className="table table-sm">
        <thead className="table-active">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rol</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name.toUpperCase()}</td>
              <td>{role.surname.toUpperCase()}</td>
              <td>{role.role.substring(5)}</td>
              <td>
                
                  <AiOutlineEdit type='button' onClick={() => handleShow(role)}/>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton className="header-rol">
          <Modal.Title className="title-users">Modificar rol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>

        <form>
          <div className="row">
            <div className="col-25">
              <label className="user">Nombre:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                value={selectedUser ? selectedUser.name : ""}
                readOnly
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label className="user">Apellido:</label>
            </div>
            <div className="col-75">
               <input
                type="text"
                value={selectedUser ? selectedUser.surname: ""}
                readOnly
              />
            </div>
          </div>
         
          <div className="row">
            <div className="col-25">
              <label className="user">Rol</label>
            </div>
            <div className="col-75">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                required
              >
                <option value="">Seleccione el rol</option>
                <option value={"ROLE_ADMIN"}>ADMIN</option>
        <option value={"ROLE_USER"}>USER</option>
              </select>
            </div>
          </div>
        </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <button className="button-enviar" type="submit" onClick={handleSubmit}>
              Enviar
            </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Roles;
