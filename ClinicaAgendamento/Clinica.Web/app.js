const API_BASE = 'http://localhost:5144/api';

document.addEventListener('DOMContentLoaded', () => {
    carregarAgendamentos();
    carregarClientes();
    carregarProfissionais();
    carregarServicosTab();
    carregarSelectsAgendamento();
});

// ==================== AGENDAMENTOS ====================
async function carregarSelectsAgendamento() {
    await carregarClientesSelect();
    await carregarProfissionaisSelect();
    await carregarServicosSelect();
}

async function carregarClientesSelect() {
    try {
        const res = await fetch(`${API_BASE}/Usuarios`);
        const select = document.getElementById('clienteId');
        if (res.ok) {
            const dados = await res.json();
            select.innerHTML = '<option value="">Selecione um cliente...</option>';
            dados.forEach(c => {
                select.innerHTML += `<option value="${c.id}">${c.nome || c.email}</option>`;
            });
        }
    } catch (e) { console.error(e); }
}

async function carregarProfissionaisSelect() {
    try {
        const res = await fetch(`${API_BASE}/Profissionais`);
        const select = document.getElementById('profissionalId');
        if (res.ok) {
            const dados = await res.json();
            select.innerHTML = '<option value="">Selecione um profissional...</option>';
            dados.forEach(p => {
                const nome = p.nome || p.especialidade || `Profissional #${p.id}`;
                select.innerHTML += `<option value="${p.id}">${nome}</option>`;
            });
        }
    } catch (e) { console.error(e); }
}

async function carregarServicosSelect() {
    try {
        const res = await fetch(`${API_BASE}/Servicos`);
        const select = document.getElementById('servicoId');
        if (res.ok) {
            const dados = await res.json();
            select.innerHTML = '<option value="">Selecione um serviço...</option>';
            dados.forEach(s => {
                select.innerHTML += `<option value="${s.id}">${s.nome} - R$ ${s.preco}</option>`;
            });
        }
    } catch (e) { console.error(e); }
}

async function carregarAgendamentos() {
    const tabela = document.getElementById('tabela-agendamentos');
    tabela.innerHTML = `<tr><td colspan="5" class="text-center py-3 text-muted">A carregar...</td></tr>`;
    try {
        const res = await fetch(`${API_BASE}/Agendamentos`);
        if (res.ok) {
            const dados = await res.json();
            tabela.innerHTML = dados.length === 0 ? `<tr><td colspan="5" class="text-center py-3 text-muted">Nenhum agendamento.</td></tr>` : '';
            dados.forEach(item => {
                tabela.innerHTML += `
                    <tr>
                        <td class="fw-bold">#${item.id}</td>
                        <td>${new Date(item.dataHoraInicio).toLocaleString('pt-BR')}</td>
                        <td>${new Date(item.dataHoraFim).toLocaleString('pt-BR')}</td>
                        <td><span class="badge bg-secondary">${item.status || 'Pendente'}</span></td>
                        <td class="text-center">
                            <button class="btn btn-outline-danger btn-sm" onclick="eliminarAgendamento(${item.id})"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>`;
            });
        }
    } catch (e) { tabela.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Erro de ligação.</td></tr>`; }
}

document.getElementById('form-agendamento').addEventListener('submit', async function(e) {
    e.preventDefault();
    const payload = {
        clienteId: parseInt(document.getElementById('clienteId').value),
        profissionalId: parseInt(document.getElementById('profissionalId').value),
        servicoId: parseInt(document.getElementById('servicoId').value),
        dataHoraInicio: new Date(document.getElementById('dataHoraInicio').value).toISOString(),
        dataHoraFim: new Date(document.getElementById('dataHoraFim').value).toISOString(),
        status: "Pendente"
    };
    const res = await fetch(`${API_BASE}/Agendamentos`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    if (res.ok) {
        alert('Agendamento criado com sucesso!');
        this.reset();
        carregarAgendamentos();
    } else {
        alert('Erro ao criar agendamento: ' + await res.text());
    }
});

async function eliminarAgendamento(id) {
    if (!confirm(`Eliminar agendamento #${id}?`)) return;
    const res = await fetch(`${API_BASE}/Agendamentos/${id}`, { method: 'DELETE' });
    if (res.ok) carregarAgendamentos();
}


// ==================== CLIENTES ====================
async function carregarClientes() {
    const tabela = document.getElementById('tabela-clientes');
    tabela.innerHTML = `<tr><td colspan="3" class="text-center py-3 text-muted">A carregar...</td></tr>`;
    try {
        const res = await fetch(`${API_BASE}/Usuarios`);
        if (res.ok) {
            const dados = await res.json();
            tabela.innerHTML = dados.length === 0 ? `<tr><td colspan="3" class="text-center py-3 text-muted">Nenhum cliente.</td></tr>` : '';
            dados.forEach(c => {
                tabela.innerHTML += `<tr><td class="fw-bold">#${c.id}</td><td>${c.nome || '-'}</td><td>${c.email}</td></tr>`;
            });
        }
    } catch (e) { tabela.innerHTML = `<tr><td colspan="3" class="text-center text-danger">Erro de ligação.</td></tr>`; }
}

document.getElementById('form-cliente').addEventListener('submit', async function(e) {
    e.preventDefault();
    const payload = {
        nome: document.getElementById('nomeCliente').value,
        email: document.getElementById('emailCliente').value,
        senhaHash: document.getElementById('senhaCliente').value,
        tipoPerfil: "Cliente"
    };
    const res = await fetch(`${API_BASE}/Usuarios`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    if (res.ok) {
        alert('Cliente registado com sucesso!');
        this.reset();
        carregarClientes();
        carregarClientesSelect();
    } else {
        alert('Erro ao registar cliente: ' + await res.text());
    }
});


// ==================== PROFISSIONAIS ====================
async function carregarProfissionais() {
    const tabela = document.getElementById('tabela-profissionais');
    tabela.innerHTML = `<tr><td colspan="3" class="text-center py-3 text-muted">A carregar...</td></tr>`;
    try {
        const res = await fetch(`${API_BASE}/Profissionais`);
        if (res.ok) {
            const dados = await res.json();
            tabela.innerHTML = dados.length === 0 ? `<tr><td colspan="3" class="text-center py-3 text-muted">Nenhum profissional.</td></tr>` : '';
            dados.forEach(p => {
                tabela.innerHTML += `<tr><td class="fw-bold">#${p.id}</td><td>${p.nome || 'Profissional #' + p.id}</td><td>${p.especialidade}</td></tr>`;
            });
        }
    } catch (e) { tabela.innerHTML = `<tr><td colspan="3" class="text-center text-danger">Erro de ligação.</td></tr>`; }
}

document.getElementById('form-profissional').addEventListener('submit', async function(e) {
    e.preventDefault();
    // Nota: Dependendo de como a sua API espera o registo de profissional (se vincula a usuário ou cria direto), ajustamos o payload:
    const payload = {
        nome: document.getElementById('profNome').value,
        email: document.getElementById('profEmail').value,
        especialidade: document.getElementById('profEspecialidade').value
    };
    const res = await fetch(`${API_BASE}/Profissionais`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    if (res.ok) {
        alert('Profissional registado com sucesso!');
        this.reset();
        carregarProfissionais();
        carregarProfissionaisSelect();
    } else {
        alert('Erro ao registar profissional: ' + await res.text());
    }
});


// ==================== SERVIÇOS ====================
async function carregarServicosTab() {
    const tabela = document.getElementById('tabela-servicos');
    tabela.innerHTML = `<tr><td colspan="4" class="text-center py-3 text-muted">A carregar...</td></tr>`;
    try {
        const res = await fetch(`${API_BASE}/Servicos`);
        if (res.ok) {
            const dados = await res.json();
            tabela.innerHTML = dados.length === 0 ? `<tr><td colspan="4" class="text-center py-3 text-muted">Nenhum serviço.</td></tr>` : '';
            dados.forEach(s => {
                tabela.innerHTML += `<tr><td class="fw-bold">#${s.id}</td><td>${s.nome}</td><td>R$ ${s.preco}</td><td>${s.duracaoMinutos} min</td></tr>`;
            });
        }
    } catch (e) { tabela.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Erro de ligação.</td></tr>`; }
}

document.getElementById('form-servico').addEventListener('submit', async function(e) {
    e.preventDefault();
    const payload = {
        nome: document.getElementById('servNome').value,
        preco: parseFloat(document.getElementById('servPreco').value),
        duracaoMinutos: parseInt(document.getElementById('servDuracao').value)
    };
    const res = await fetch(`${API_BASE}/Servicos`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    if (res.ok) {
        alert('Serviço registado com sucesso!');
        this.reset();
        carregarServicosTab();
        carregarServicosSelect();
    } else {
        alert('Erro ao registar serviço: ' + await res.text());
    }
});