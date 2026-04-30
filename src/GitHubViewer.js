import React, { useState } from "react";

function GitHubViewer() {
  const [githubUser, setGithubUser] = useState("");
  const [githubData, setGithubData] = useState(null);

  async function fetchGithub() {
    const res = await fetch(`https://api.github.com/users/${githubUser}`);
    const data = await res.json();
    setGithubData(data);
  }

  return (
    <div>
      <h3>GitHub Checker</h3>

      <input
        placeholder="Enter GitHub username"
        value={githubUser}
        onChange={(e) => setGithubUser(e.target.value)}
      />

      <button onClick={fetchGithub}>
        Get GitHub Info
      </button>

      {githubData && (
        <div>
          <p>Name: {githubData.name}</p>
          <p>Repos: {githubData.public_repos}</p>
        </div>
      )}
    </div>
  );
}

export default GitHubViewer;