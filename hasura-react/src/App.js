import {useEffect, useState} from 'react'
function App() {
  const [users, setUsers] = useState([])

  //Fetching users data
  const fetchData = async() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
      query: "query MyQuery {\r\n  users {\r\n    active\r\n    email\r\n    id\r\n    name\r\n  }\r\n}",
      variables: {}
    })
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow'
    };

    const res = await fetch("http://localhost:8080/v1/graphql", requestOptions)
    const usersData = await res.json()
    setUsers(usersData.data.users);
  }
  useEffect(() => {
    // Calling fetchData Method
    fetchData()

  }, [])
  return (
    <div className="App">
      {JSON.stringify(users)}
    </div>
  );
}

export default App;
