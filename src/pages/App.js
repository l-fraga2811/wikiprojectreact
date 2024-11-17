import { Container } from "./styles";
import { useState } from "react";
import gitlogo from "../assets/github.png";
import Input from "../components/input";
import ItemRepo from "../components/itemRepo";
import Button from "../components/button";
import { api } from "../services/api";

function App() {
  const [repos, setRepos] = useState([]);
  const [currentRepo, setCurrentRepo] = useState("");

  const handleSearchRepos = async () => {
    const { data } = await api.get(`/repos/${currentRepo}`);
    //valida se o repositorio ja foi adicionado
    if (data.id) {
      const isExist = repos.find((repo) => repo.id === data.id);
      if (!isExist) {
        setRepos((prev) => [...prev, data]);
      setCurrentRepo("");
      return;
      }
    }
    alert("Repositório não encontrado");
  };
  const handleRemoveRepo = (id) => {
    console.log("Removendo: ", id);
    const remainingRepos = repos.filter(repo => repo.id !== id);
    setRepos(remainingRepos);
  };

  return (
    <Container>
      <img src={gitlogo} width={72} height={72} alt="gitlogo" />
      <Input
        value={currentRepo}
        onChange={(e) => setCurrentRepo(e.target.value)}
      />
      <Button onClick={handleSearchRepos} />
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
  );
}

export default App;
