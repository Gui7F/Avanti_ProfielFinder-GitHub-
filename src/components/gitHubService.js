import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

export async function fetchGitHubUser(username) {
  try {
    const response = await octokit.rest.users.getByUsername({ username });

    return {
      name: response.data.name,
      login: response.data.login,
      avatarUrl: response.data.avatar_url,
      bio: response.data.bio
    };
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw new Error("Usuário não encontrado");
  }
}
