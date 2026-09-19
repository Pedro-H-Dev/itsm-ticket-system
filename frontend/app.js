const API_URL = 'http://localhost:8080/api/tickets';

let todosChamados = [];
let abaAtual = 'ativos';

document.addEventListener('DOMContentLoaded', carregarTickets);

document.getElementById('form-ticket').addEventListener('submit', async (e) => {
    e.preventDefault();

    const ticketData = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        categoria: document.getElementById('categoria').value,
        prioridade: document.getElementById('prioridade').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ticketData)
        });

        if (response.ok) {
            document.getElementById('form-ticket').reset();
            carregarTickets();
        }
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
    }
});

async function carregarTickets() {
    try {
        const response = await fetch(API_URL);
        todosChamados = await response.json();

        atualizarMetrics(todosChamados);
        renderizarLista();
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

function renderizarLista() {
    const container = document.getElementById('lista-tickets');
    const termoInput = document.getElementById('input-busca');
    const termoBusca = termoInput ? termoInput.value.toLowerCase() : '';
    
    container.innerHTML = '';

    // Filtrar por Aba (Ativos vs Histórico)
    let filtrados = todosChamados.filter(t => {
        if (abaAtual === 'ativos') return t.status !== 'RESOLVIDO';
        return t.status === 'RESOLVIDO';
    });

    // Filtrar por Pesquisa
    if (termoBusca) {
        filtrados = filtrados.filter(t => 
            t.titulo.toLowerCase().includes(termoBusca) || 
            t.descricao.toLowerCase().includes(termoBusca)
        );
    }

    if (filtrados.length === 0) {
        container.innerHTML = `<p style="color: #64748b; font-size: 0.9rem;">Nenhum chamado encontrado nesta vista.</p>`;
        return;
    }

    filtrados.reverse().forEach(ticket => {
        const dataSla = new Date(ticket.dataLimiteSla).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
        
        const card = document.createElement('div');
        card.className = `ticket-item ${ticket.prioridade}`;
        card.innerHTML = `
            <div class="ticket-header">
                <span class="ticket-title">#${ticket.id} - ${ticket.titulo}</span>
                <span class="badge-status ${ticket.status}">${ticket.status}</span>
            </div>
            <p class="ticket-desc">${ticket.descricao}</p>
            <div class="ticket-footer">
                <span><strong>Cat:</strong> ${ticket.categoria} | <strong>SLA:</strong> ${dataSla}</span>
                <div class="actions-group">
                    ${ticket.status !== 'RESOLVIDO' ? `<button class="btn-action" onclick="resolverTicket(${ticket.id})">Concluir</button>` : ''}
                    <button class="btn-action delete" onclick="deletarTicket(${ticket.id})">Excluir</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function alternarAba(aba) {
    abaAtual = aba;
    const tabAtivos = document.getElementById('tab-ativos');
    const tabHistorico = document.getElementById('tab-historico');
    
    if (tabAtivos) tabAtivos.classList.toggle('active', aba === 'ativos');
    if (tabHistorico) tabHistorico.classList.toggle('active', aba === 'historico');
    
    renderizarLista();
}

function filtrarChamados() {
    renderizarLista();
}

async function resolverTicket(id) {
    try {
        await fetch(`${API_URL}/${id}/status?status=RESOLVIDO`, { method: 'PUT' });
        carregarTickets();
    } catch (error) {
        console.error('Erro ao atualizar chamado:', error);
    }
}

async function deletarTicket(id) {
    if (confirm("Tem certeza que deseja apagar este registo permanentemente?")) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            carregarTickets();
        } catch (error) {
            console.error('Erro ao apagar chamado:', error);
        }
    }
}

function atualizarMetrics(tickets) {
    const totalEl = document.getElementById('metric-total');
    const abertosEl = document.getElementById('metric-abertos');
    const criticosEl = document.getElementById('metric-criticos');

    if (totalEl) totalEl.innerText = tickets.length;
    if (abertosEl) abertosEl.innerText = tickets.filter(t => t.status === 'ABERTO').length;
    if (criticosEl) criticosEl.innerText = tickets.filter(t => t.prioridade === 'Critica' && t.status !== 'RESOLVIDO').length;
}