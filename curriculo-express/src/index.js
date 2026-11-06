import "dotenv/config";
import express from "express";
import helmet from "helmet";
import models, { sequelize } from "./models/index.js";
import {
  corsMiddleware,
  logMiddleware,
  contextMiddleware,
  notFoundMiddleware,
  errorMiddleware,
  limiterMiddleware,
} from "./middlewares/index.js";
import * as routes from "./routes/index.js";

const app = express();

app.set("trust proxy", 1);

// middlewares
app.use(helmet());
app.use(corsMiddleware);
app.use(limiterMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware);
app.use(contextMiddleware);

// rotas

app.get("/", async (req, res) => {
  const pessoas = await models.Pessoa.findAll({
    include: [
      models.ExperienciaAcademica,
      models.ExperienciaProfissional,
      models.Projeto,
    ],
    order: [["nome", "ASC"]],
  });

  const escapeHTML = (value = "") =>
    String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char]);

  const cards = pessoas.map((pessoa) => {
    const iniciais = pessoa.nome
      .split(" ")
      .slice(0, 2)
      .map((parte) => parte[0])
      .join("")
      .toUpperCase();

    const academicas = pessoa.experienciaAcademicas || [];
    const profissionais = pessoa.experienciaProfissionals || [];
    const projetos = pessoa.projetos || [];

    return `
      <article class="card">
        <div class="profile">
          <div class="avatar">${escapeHTML(iniciais)}</div>
          <div>
            <h2>${escapeHTML(pessoa.nome)}</h2>
            <p>${escapeHTML(pessoa.endereco || "Localização não informada")}</p>
          </div>
        </div>

        <p class="summary">${escapeHTML(pessoa.resumo || "Sem resumo profissional.")}</p>

        <div class="stats">
          <span>🎓 ${academicas.length} formação(ões)</span>
          <span>💼 ${profissionais.length} experiência(s)</span>
          <span>🚀 ${projetos.length} projeto(s)</span>
        </div>

        <div class="details">
          <h3>Formação acadêmica</h3>
          ${academicas.map(item => `
            <div class="item">
              <strong>${escapeHTML(item.curso)}</strong>
              <p>${escapeHTML(item.instituicao)} · ${escapeHTML(item.nivel)}</p>
            </div>
          `).join("") || "<p>Não informado.</p>"}

          <h3>Experiência profissional</h3>
          ${profissionais.map(item => `
            <div class="item">
              <strong>${escapeHTML(item.cargo)}</strong>
              <p>${escapeHTML(item.empresa)}</p>
              <p>${escapeHTML(item.descricao || "")}</p>
            </div>
          `).join("") || "<p>Não informado.</p>"}

          <h3>Projetos</h3>
          ${projetos.map(item => `
            <div class="item">
              <strong>${escapeHTML(item.nome)}</strong>
              <p>${escapeHTML(item.descricao)}</p>
              <p>Tecnologias: ${escapeHTML(item.tecnologias || "Não informadas")}</p>
              ${item.repositorio ? `<a href="${escapeHTML(item.repositorio)}" target="_blank" rel="noopener noreferrer">Ver repositório ↗</a>` : ""}
            </div>
          `).join("") || "<p>Não informado.</p>"}
        </div>

        <div class="links">
          ${pessoa.linkedin ? `<a href="${escapeHTML(pessoa.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>` : ""}
          ${pessoa.github ? `<a href="${escapeHTML(pessoa.github)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>` : ""}
          <a href="/pessoas/${encodeURIComponent(pessoa.id)}">Ver dados JSON ↗</a>
        </div>
      </article>
    `;
  }).join("");

  res.type("html").send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="Portal de currículos profissionais - Currículo Express">
      <title>Currículo Express | Profissionais</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: Inter, Arial, sans-serif;
          background: #f4f6fb;
          color: #172033;
          line-height: 1.6;
        }
        header {
          background: linear-gradient(120deg, #14213d, #274c77);
          color: white;
          padding: 55px 8%;
        }
        header .brand { font-size: 15px; font-weight: 700; letter-spacing: 2px; color: #a9d6e5; }
        header h1 { font-size: clamp(30px, 5vw, 48px); margin: 18px 0 8px; }
        header p { color: #dbeafe; max-width: 600px; }
        main { max-width: 1100px; margin: 40px auto; padding: 0 22px; }
        .section-title { margin-bottom: 22px; }
        .section-title h2 { font-size: 25px; }
        .section-title p { color: #68758a; }
        .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
        .card {
          background: white;
          border: 1px solid #e4e9f1;
          border-radius: 18px;
          padding: 25px;
          box-shadow: 0 8px 25px rgba(25, 45, 75, .06);
        }
        .profile { display: flex; align-items: center; gap: 15px; }
        .avatar {
          width: 54px; height: 54px; border-radius: 16px;
          display: grid; place-items: center;
          background: #e0efff; color: #24558a; font-weight: 800;
          font-size: 18px;
        }
        .profile h2 { font-size: 21px; }
        .profile p, .summary, .item p { color: #68758a; font-size: 14px; }
        .summary { margin: 20px 0; }
        .stats { display: flex; flex-wrap: wrap; gap: 9px; margin-bottom: 22px; }
        .stats span {
          background: #f0f5fb; color: #35516e;
          border-radius: 20px; padding: 6px 10px; font-size: 12px;
        }
        .details h3 { color: #24558a; font-size: 15px; margin: 20px 0 10px; }
        .item { border-left: 3px solid #a9d6e5; padding: 3px 0 5px 12px; margin-bottom: 12px; }
        .item strong { font-size: 14px; }
        a { color: #2463a6; text-decoration: none; font-size: 13px; font-weight: 600; }
        a:hover { text-decoration: underline; }
        .links { display: flex; flex-wrap: wrap; gap: 16px; border-top: 1px solid #e8edf3; padding-top: 18px; margin-top: 20px; }
        footer { text-align: center; color: #8792a3; padding: 30px 15px; font-size: 13px; }
        .empty { background: white; border-radius: 14px; padding: 30px; color: #68758a; }
      </style>
    </head>
    <body>
      <header>
        <div class="brand">CURRÍCULO EXPRESS</div>
        <h1>Talentos e trajetórias profissionais.</h1>
        <p>Conheça profissionais, suas formações acadêmicas, experiências e projetos.</p>
      </header>
      <main>
        <section class="section-title">
          <h2>Profissionais cadastrados</h2>
          <p>Confira os currículos disponíveis na plataforma.</p>
        </section>
        <section class="cards">
          ${cards || '<div class="empty">Nenhum currículo cadastrado até o momento.</div>'}
        </section>
      </main>
      <footer>Currículo Express · API REST desenvolvida com Express e PostgreSQL</footer>
    </body>
    </html>
  `);
});

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);
app.use("/pessoas", routes.pessoa);
app.use("/experiencias-academicas", routes.experienciaAcademica);
app.use("/experiencias-profissionais", routes.experienciaProfissional);
app.use("/projetos", routes.projeto);

// rota não encontrada (404)
app.use(notFoundMiddleware);

// middleware global de erro
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";
const syncDatabase =
  process.env.SYNC_DATABASE === "true" || eraseDatabaseOnSync;

if (syncDatabase) {
  sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
      await createUsersWithMessages();
    }
  });
}

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
}

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "rwieruch",
      email: "rwieruch@email.com",
      messages: [
        {
          text: "Published the Road to learn React",
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: "ddavids",
      email: "ddavids@email.com",
      messages: [
        {
          text: "Happy to release ...",
        },
        {
          text: "Published a complete ...",
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};

export default app;
