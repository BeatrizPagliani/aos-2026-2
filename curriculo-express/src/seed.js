import "dotenv/config";
import models, { sequelize } from "./models/index.js";

const curriculos = [
  {
    nome: "Ana Souza",
    email: "ana.souza@example.com",
    telefone: "(81) 99999-1111",
    endereco: "Recife - PE",
    resumo: "Desenvolvedora web com interesse em tecnologia e inovação.",
    linkedin: "https://linkedin.com/in/ana-souza",
    github: "https://github.com/ana-souza",
    academicas: [
      {
        instituicao: "Universidade de Pernambuco",
        curso: "Sistemas de Informação",
        nivel: "Graduação",
        dataInicio: "2022-02-01",
        dataFim: "2026-12-01",
        descricao: "Formação em desenvolvimento de software e banco de dados."
      }
    ],
    profissionais: [
      {
        empresa: "Tech Recife",
        cargo: "Desenvolvedora Júnior",
        dataInicio: "2025-01-01",
        dataFim: null,
        descricao: "Desenvolvimento de aplicações web."
      }
    ],
    projetos: [
      {
        nome: "Sistema de Gestão",
        descricao: "Sistema para gerenciamento de tarefas e equipes.",
        tecnologias: "JavaScript, Node.js, PostgreSQL",
        repositorio: "https://github.com/ana-souza/sistema-gestao",
        link: null
      }
    ]
  },
  {
    nome: "Carlos Lima",
    email: "carlos.lima@example.com",
    telefone: "(81) 98888-2222",
    endereco: "Olinda - PE",
    resumo: "Profissional de tecnologia com foco em análise de dados.",
    linkedin: "https://linkedin.com/in/carlos-lima",
    github: "https://github.com/carlos-lima",
    academicas: [
      {
        instituicao: "Universidade Federal de Pernambuco",
        curso: "Ciência da Computação",
        nivel: "Graduação",
        dataInicio: "2021-02-01",
        dataFim: "2025-12-01",
        descricao: "Estudos em programação, algoritmos e inteligência artificial."
      }
    ],
    profissionais: [
      {
        empresa: "Inova Dados",
        cargo: "Analista de Dados",
        dataInicio: "2025-03-01",
        dataFim: null,
        descricao: "Análise de dados e criação de relatórios."
      }
    ],
    projetos: [
      {
        nome: "Painel de Indicadores",
        descricao: "Dashboard para visualização de indicadores empresariais.",
        tecnologias: "Python, Power BI, PostgreSQL",
        repositorio: "https://github.com/carlos-lima/painel-indicadores",
        link: null
      }
    ]
  }
];

try {
  for (const dados of curriculos) {
    const { academicas, profissionais, projetos, ...pessoaDados } = dados;

    const [pessoa] = await models.Pessoa.findOrCreate({
      where: { email: pessoaDados.email },
      defaults: pessoaDados
    });

    for (const experiencia of academicas) {
      await models.ExperienciaAcademica.findOrCreate({
        where: {
          pessoaId: pessoa.id,
          instituicao: experiencia.instituicao,
          curso: experiencia.curso
        },
        defaults: { ...experiencia, pessoaId: pessoa.id }
      });
    }

    for (const experiencia of profissionais) {
      await models.ExperienciaProfissional.findOrCreate({
        where: {
          pessoaId: pessoa.id,
          empresa: experiencia.empresa,
          cargo: experiencia.cargo
        },
        defaults: { ...experiencia, pessoaId: pessoa.id }
      });
    }

    for (const projeto of projetos) {
      await models.Projeto.findOrCreate({
        where: {
          pessoaId: pessoa.id,
          nome: projeto.nome
        },
        defaults: { ...projeto, pessoaId: pessoa.id }
      });
    }

    console.log(`Currículo cadastrado: ${pessoa.nome} - ${pessoa.id}`);
  }

  console.log("DOIS CURRÍCULOS CADASTRADOS COM SUCESSO!");
} catch (error) {
  console.error("Erro ao cadastrar currículos:", error);
  process.exitCode = 1;
} finally {
  await sequelize.close();
}