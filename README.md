# 🛠️ ServiceDesk ITSM — Gestão de Incidentes & SLA

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0-brightgreen?style=for-the-badge&logo=springboot)
![H2 Database](https://img.shields.io/badge/Database-H2-blue?style=for-the-badge)
![License](https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge)

> **Plataforma Full Stack de Governação de TI e Gestão de Incidentes baseada nas melhores práticas de ITSM / ITIL.**

O **ServiceDesk ITSM** automatiza o ciclo de vida de chamados técnicos, aplicando regras de priorização e cálculo dinâmico de SLA, além de fornecer um painel analítico com métricas em tempo real.

---

## 🚀 Funcionalidades Principais

- **Abertura Inteligente de Chamados**: Registo com título, descrição, categoria e prioridade.
- **Gestão por Abas Operacionais**: Separação nítida entre **Fila Ativa** (chamados pendentes) e **Histórico** (chamados encerrados).
- **Métricas em Tempo Real**: Indicadores de total de chamados, pendentes e incidentes críticos.
- **Pesquisa e Filtro Instantâneo**: Busca dinâmica por palavra-chave no título ou conteúdo.
- **Operações CRUD Completas**: Alteração de estado para resolvido e exclusão permanente de registos.

---

## ⏱️ Matriz de SLA por Severidade

| Prioridade | SLA Padrão | Descrição do Impacto |
| :--- | :---: | :--- |
| 🔴 **Crítica** | **2 Horas** | Paragem total de serviços essenciais |
| 🟠 **Alta** | **8 Horas** | Degradação severa de desempenho |
| 🟡 **Média** | **24 Horas** | Falha parcial com contorno disponível |
| 🟢 **Baixa** | **48 Horas** | Dúvidas, solicitações e melhorias |

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologias Utilizadas |
| :--- | :--- |
| **Backend** | Java 17, Spring Boot 3, Spring Data JPA, REST API, Maven |
| **Database** | H2 Database (In-Memory Data Store) |
| **Frontend** | HTML5, CSS3 Moderno (Flexbox & Grid), JavaScript ES6+ (Fetch API) |

---

## 📂 Estrutura do Projeto

```text
itsm-ticket-system/
├── backend/
│   ├── src/main/java/com/itsm/backend/
│   │   ├── controller/      # Endpoints da API REST (TicketController)
│   │   ├── model/           # Entidades JPA (Ticket)
│   │   ├── repository/      # Persistência de dados (TicketRepository)
│   │   └── service/         # Regras de negócio e cálculo de SLA
│   └── pom.xml              # Gestão de dependências Maven
└── frontend/
    ├── index.html           # Interface do utilizador e Dashboard
    ├── style.css            # Estilização visual e componentes
    └── app.js               # Lógica de integração e manipulação do DOM
````
## 🔧 Como Executar o Projeto Localmente

### Pré-requisitos
- **Java JDK 17** ou superior instalado
- **Git** instalado

### Passo a Passo

1. **Clonar o Repositório**:
   git clone https://github.com/Pedro-H-Dev/itsm-ticket-system.git
   cd itsm-ticket-system

2. **Iniciar o Backend (Spring Boot)**:
   cd backend
   .\mvnw spring-boot:run

3. **Aceder à Aplicação**:
   - Abra o ficheiro `frontend/index.html` diretamente em qualquer navegador web.
   - O backend estará a correr no endereço: `http://localhost:8080/api/tickets`

---

## 👨‍💻 Autor

**Pedro Henrique Freitas dos Santos**


[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/pedro-h-devv)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Pedro-H-Dev)

