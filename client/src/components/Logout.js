import axios from "axios";

function logout() {
    axios.delete("api/session")
            .then((response) => {
                console.log(response);
                window.location.href = "/"
            }).catch((err) => {
                console.log(err)
                alert("log out unsuccessful")
            });
  };

export default logout;