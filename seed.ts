import { db } from "./src/db";

console.log("🌱 Populando o banco de dados...");

// Limpar dados existentes
db.run("DELETE FROM likes");
db.run("DELETE FROM posts");
db.run("DELETE FROM users");
db.run("DELETE FROM sqlite_sequence WHERE name IN ('users', 'posts', 'likes')");

// Criar usuários
const users = [
  { name: "Alice Silva", email: "alice@example.com", password: "password123" },
  { name: "Bob Santos", email: "bob@example.com", password: "password123" },
  { name: "Charlie Oliveira", email: "charlie@example.com", password: "password123" },
];

const insertUser = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?) RETURNING id");
const userIds = users.map(u => (insertUser.get(u.name, u.email, u.password) as any).id);

console.log(`✅ ${userIds.length} usuários criados.`);

const posts = [
  { title: "Debugando cedo", content: "Nada como resolver um bug logo pela manhã 😅", authorId: userIds[0] },
  { title: "Vida de Dev", content: "Funciona na minha máquina 👍", authorId: userIds[1] },
  { title: "Aprendizado constante", content: "Todo dia aprendendo algo novo em programação.", authorId: userIds[2] },
  { title: "API limpa", content: "Endpoints bem definidos fazem toda diferença.", authorId: userIds[0] },
  { title: "Código limpo", content: "Código legível é melhor que código inteligente.", authorId: userIds[1] },
  { title: "Refatoração", content: "Hoje é dia de refatorar aquele código antigo.", authorId: userIds[2] },
  { title: "Deploy sexta?", content: "Quem nunca fez deploy na sexta não viveu 😬", authorId: userIds[0] },
  { title: "Logs salvam vidas", content: "Logs bem feitos ajudam MUITO no debug.", authorId: userIds[1] },
  { title: "Testes importam", content: "Se não tem teste, não está pronto.", authorId: userIds[2] },
  { title: "Performance matters", content: "Otimizar é uma arte.", authorId: userIds[0] },

  { title: "CSS sofre", content: "Centralizar div ainda é um desafio 😅", authorId: userIds[1] },
  { title: "Dark mode sempre", content: "Programar no modo escuro é vida.", authorId: userIds[2] },
  { title: "Stack nova", content: "Testando novas tecnologias hoje!", authorId: userIds[0] },
  { title: "Banco rápido", content: "SQLite tá voando nesse projeto.", authorId: userIds[1] },
  { title: "Backend forte", content: "Uma boa base no backend resolve muita coisa.", authorId: userIds[2] },

  { title: "Bug estranho", content: "Consertei... mas não sei como 🤡", authorId: userIds[0] },
  { title: "Prod caiu", content: "Quem derrubou produção? 😶", authorId: userIds[1] },
  { title: "Documentação", content: "Documentar é tão importante quanto codar.", authorId: userIds[2] },
  { title: "Git salvador", content: "Ainda bem que fiz commit antes.", authorId: userIds[0] },
  { title: "Branch confusa", content: "Merge deu conflito de novo 😩", authorId: userIds[1] },

  { title: "Código bonito", content: "Formatação automática salva tempo.", authorId: userIds[2] },
  { title: "Stack overflow", content: "Sempre ajudando devs pelo mundo 🌎", authorId: userIds[0] },
  { title: "Deploy automático", content: "CI/CD é mágico ✨", authorId: userIds[1] },
  { title: "Erro 500", content: "Algo deu muito errado...", authorId: userIds[2] },
  { title: "Erro 404", content: "Página não encontrada 👀", authorId: userIds[0] },

  { title: "Node ou Bun?", content: "Testando alternativas ao Node.js", authorId: userIds[1] },
  { title: "Frontend rápido", content: "SPA bem feita é outra coisa.", authorId: userIds[2] },
  { title: "Cache é rei", content: "Caching resolve muitos problemas.", authorId: userIds[0] },
  { title: "API REST", content: "Simplicidade é tudo.", authorId: userIds[1] },
  { title: "GraphQL", content: "Flexível, mas exige cuidado.", authorId: userIds[2] },

  { title: "Bug de madrugada", content: "Aquele erro que só aparece à noite 😴", authorId: userIds[0] },
  { title: "Código legado", content: "Mexer nisso aqui dá medo...", authorId: userIds[1] },
  { title: "Testando feature", content: "Nova feature indo pro ar!", authorId: userIds[2] },
  { title: "Hotfix", content: "Corrigindo direto em produção 😬", authorId: userIds[0] },
  { title: "Deploy feito", content: "Agora é torcer pra não quebrar 🙏", authorId: userIds[1] },

  { title: "Clean architecture", content: "Separação de responsabilidades é essencial.", authorId: userIds[2] },
  { title: "SOLID sempre", content: "Boas práticas fazem diferença.", authorId: userIds[0] },
  { title: "DRY", content: "Não se repita!", authorId: userIds[1] },
  { title: "KISS", content: "Simples é melhor.", authorId: userIds[2] },
  { title: "YAGNI", content: "Você não vai precisar disso.", authorId: userIds[0] },

  { title: "Código testado", content: "Cobertura de testes em dia!", authorId: userIds[1] },
  { title: "Monitoramento", content: "Observabilidade é essencial.", authorId: userIds[2] },
  { title: "Escalabilidade", content: "Pensando no futuro da aplicação.", authorId: userIds[0] },
  { title: "Infraestrutura", content: "Deploy na nuvem facilitou tudo.", authorId: userIds[1] },
  { title: "Docker ajuda", content: "Ambiente consistente sempre.", authorId: userIds[2] },

  { title: "Feature pronta", content: "Mais uma entrega concluída 🚀", authorId: userIds[0] },
  { title: "Review de código", content: "Feedback melhora tudo.", authorId: userIds[1] },
  { title: "Pair programming", content: "Aprendendo em dupla.", authorId: userIds[2] },
  { title: "Sprint final", content: "Correndo contra o tempo ⏳", authorId: userIds[0] },
  { title: "Projeto evoluindo", content: "Cada dia melhor!", authorId: userIds[1] },
];

const insertPost = db.prepare("INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)");
posts.forEach(p => insertPost.run(p.title, p.content, p.authorId));

console.log(`✅ ${posts.length} posts criados.`);

// Criar alguns likes aleatórios
const insertLike = db.prepare("INSERT INTO likes (postId, userId) VALUES (?, ?)");
const allPosts = db.prepare("SELECT id FROM posts").all() as any[];

allPosts.forEach((post, index) => {
  // Alice dá like em quase tudo
  if (index % 2 === 0) insertLike.run(post.id, userIds[0]);
  // Bob dá like nos posts pares
  if (index % 3 === 0) insertLike.run(post.id, userIds[1]);
});

console.log("✅ Likes iniciais adicionados.");
console.log("🚀 Banco de dados populado com sucesso!");
