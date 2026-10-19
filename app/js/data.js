/* INSTY · dados simulados. Em produção, tudo isto vem do Firestore (ver docs/ESPECIFICACAO.md). */
window.DB = (() => {
  const cursos = [
    { id: 'fund', nome: 'Ensino Fundamental', kanji: '基', turmas: [
      { id: 'f8', nome: '8º ano', ano: 2026 }, { id: 'f9', nome: '9º ano', ano: 2026 } ] },
    { id: 'medio', nome: 'Ensino Médio', kanji: '学', turmas: [
      { id: 'm1', nome: '1º ano', ano: 2026 }, { id: 'm2', nome: '2º ano', ano: 2026 }, { id: 'm3', nome: '3º ano', ano: 2026 } ] },
    { id: 'militar', nome: 'Preparatório Militar', kanji: '志', turmas: [
      { id: 'espcex', nome: 'EsPCEx', ano: 2026 }, { id: 'epcar', nome: 'EPCAR / Colégio Naval', ano: 2026 }, { id: 'afaita', nome: 'AFA / ITA / IME', ano: 2026 } ] },
    { id: 'enem', nome: 'ENEM e Vestibulares', kanji: '合', turmas: [
      { id: 'enem1', nome: 'ENEM · manhã', ano: 2026 }, { id: 'enem2', nome: 'ENEM · tarde', ano: 2026 } ] },
  ];
  const disciplinas = ['Matemática', 'Física', 'Química', 'Português', 'Redação', 'História', 'Geografia', 'Inglês'];

  const nomes = ['Rafael Tanaka', 'Beatriz Souza', 'Lucas Martins', 'Ana Paula Ribeiro', 'Thiago Kubo', 'Bianca Santos', 'Pedro Henrique', 'Mariana Oliveira', 'Kenji Nakamura', 'Larissa Costa', 'Gabriel Almeida', 'Yumi Sato', 'Felipe Rocha', 'Camila Duarte', 'Daniel Yamada', 'Isabela Ferreira', 'Matheus Lima', 'Sofia Pereira', 'Hiro Takahashi', 'Júlia Mendes', 'Enzo Barbosa', 'Laura Nogueira', 'Caio Fernandes', 'Akemi Ishida', 'Vinícius Teixeira', 'Letícia Paiva', 'Bruno Carvalho', 'Nicole Moraes', 'Eduardo Hirata', 'Giovanna Rezende', 'Arthur Cardoso', 'Melissa Ueda', 'Samuel Araújo', 'Clara Monteiro', 'Victor Hugo', 'Helena Barros', 'Igor Tanabe', 'Luana Freitas', 'Otávio Ramos', 'Rebeca Lopes'];
  const turmasFlat = cursos.flatMap(c => c.turmas.map(t => ({ ...t, cursoId: c.id })));
  const rnd = (s) => { let x = Math.sin(s) * 10000; return x - Math.floor(x); };

  const alunos = nomes.map((nome, i) => {
    const t = turmasFlat[i % turmasFlat.length];
    const base = 5.5 + rnd(i + 1) * 3.5;
    const notas = {};
    disciplinas.forEach((d, k) => { const b = Math.min(10, Math.max(3, base + (rnd(i * 7 + k) - .5) * 2)); notas[d] = [1, 2, 3].map(j => +Math.min(10, Math.max(2, b + (j - 2) * .4 + (rnd(i + j + k) - .5))).toFixed(1)); });
    const freq = Math.round(82 + rnd(i * 3) * 18);
    const mens = ['Jul', 'Ago', 'Set', 'Out', 'Nov'].map((m, k) => ({ mes: m, valor: t.cursoId === 'fund' ? 790 : t.cursoId === 'medio' ? 890 : 980, status: k < 3 ? 'pago' : (k === 3 ? (rnd(i + 11) < .12 ? 'atraso' : 'pago') : 'aberto'), venc: `10/${String(7 + k).padStart(2, '0')}` }));
    return { id: 'a' + (i + 1), nome, turmaId: t.id, cursoId: t.cursoId, responsavel: 'Família ' + nome.split(' ').slice(-1)[0], telefone: '(67) 9' + String(8000 + i * 37).padStart(4, '0') + '-' + String(1000 + i * 91).slice(-4), notas, freq, acessos: Math.round(rnd(i * 5) * 30), ultimoAcesso: Math.round(rnd(i * 9) * 12), mensalidades: mens, objetivo: t.cursoId === 'militar' ? t.nome : t.cursoId === 'enem' ? 'ENEM 2026' : 'Formação' };
  });

  const professores = [
    { id: 'p1', nome: 'Hiroshi Yasuda', disciplinas: ['Matemática'], turmas: ['m3', 'espcex', 'afaita'] },
    { id: 'p2', nome: 'Camila Andrade', disciplinas: ['Português', 'Redação'], turmas: ['m1', 'm2', 'm3', 'enem1'] },
    { id: 'p3', nome: 'Marcos Vieira', disciplinas: ['Física'], turmas: ['m2', 'm3', 'espcex', 'epcar'] },
    { id: 'p4', nome: 'Renata Kimura', disciplinas: ['Química'], turmas: ['m1', 'm2', 'm3', 'enem2'] },
    { id: 'p5', nome: 'André Lopes', disciplinas: ['História', 'Geografia'], turmas: ['f8', 'f9', 'm1'] },
    { id: 'p6', nome: 'Paula Sakamoto', disciplinas: ['Inglês'], turmas: ['f8', 'f9', 'm1', 'm2'] },
  ];

  const avisos = [
    { id: 'v1', titulo: 'Simulado EsPCEx neste sábado', texto: 'Das 8h às 12h30. Chegar 20 minutos antes, com documento.', para: 'Turma EsPCEx', data: '17/10', autor: 'Coordenação', canal: 'Plataforma + WhatsApp' },
    { id: 'v2', titulo: 'Reunião de pais do 3º bimestre', texto: 'Dia 24/10 às 19h, no auditório. Boletins entregues no fim.', para: 'Todas as famílias', data: '15/10', autor: 'Direção', canal: 'Plataforma + WhatsApp' },
    { id: 'v3', titulo: 'Plantão de dúvidas estendido', texto: 'Durante novembro, monitorias também aos sábados à tarde.', para: 'Ensino Médio', data: '10/10', autor: 'Coordenação', canal: 'Plataforma' },
  ];

  const materiais = [
    { id: 'm1', tipo: 'video', titulo: 'Funções logarítmicas · aula 12', disc: 'Matemática', turma: 'm3', prof: 'p1', meta: '38 min', data: '16/10', views: 41 },
    { id: 'm2', tipo: 'pdf', titulo: 'Apostila de Química Orgânica · módulo 4', disc: 'Química', turma: 'm3', prof: 'p4', meta: '46 páginas', data: '14/10', views: 28 },
    { id: 'm3', tipo: 'lista', titulo: 'Lista 7 · Cinemática vetorial', disc: 'Física', turma: 'espcex', prof: 'p3', meta: '30 questões', data: '13/10', views: 35 },
    { id: 'm4', tipo: 'video', titulo: 'Redação: estrutura dissertativa', disc: 'Redação', turma: 'enem1', prof: 'p2', meta: '24 min', data: '12/10', views: 52 },
    { id: 'm5', tipo: 'pdf', titulo: 'Edital EsPCEx 2027 comentado', disc: 'Orientação', turma: 'espcex', prof: 'p1', meta: '12 páginas', data: '09/10', views: 67 },
    { id: 'm6', tipo: 'lista', titulo: 'Simulado comentado · setembro', disc: 'Geral', turma: 'm3', prof: 'p1', meta: '90 questões', data: '02/10', views: 73 },
  ];

  const avaliacoes = [
    { id: 'e1', titulo: 'Simulado EsPCEx · outubro', turma: 'espcex', disc: 'Geral', data: '18/10', peso: 3, status: 'agendada', prof: 'p1' },
    { id: 'e2', titulo: 'Prova · Funções', turma: 'm3', disc: 'Matemática', data: '21/10', peso: 2, status: 'agendada', prof: 'p1' },
    { id: 'e3', titulo: 'Redação · tema social', turma: 'enem1', disc: 'Redação', data: '14/10', peso: 1, status: 'corrigida', prof: 'p2' },
    { id: 'e4', titulo: 'Lista avaliativa · Cinemática', turma: 'espcex', disc: 'Física', data: '10/10', peso: 1, status: 'corrigida', prof: 'p3' },
    { id: 'e5', titulo: 'Prova · Orgânica', turma: 'm3', disc: 'Química', data: '08/10', peso: 2, status: 'corrigida', prof: 'p4' },
  ];

  const agenda = {
    dias: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
    horarios: ['7h30', '9h30', '14h', '16h'],
    grade: [
      ['Matemática', 'Física', 'Matemática', 'Química', 'Física'],
      ['Química', 'Matemática', 'Física', 'Matemática', 'Química'],
      ['Monitoria Mat.', '', 'Monitoria Fís.', '', 'Simulado'],
      ['', 'Redação', '', 'Monitoria Quím.', ''],
    ],
  };

  /* Financeiro: lançamentos do ano (receitas e despesas por categoria) para fluxo de caixa e DRE */
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'];
  const financeiro = {
    meses,
    receitas: {
      'Mensalidades': [142, 148, 151, 153, 155, 155, 157, 160, 163, 164].map(v => v * 1000),
      'Matrículas': [38, 12, 4, 2, 1, 0, 9, 6, 2, 1].map(v => v * 1000),
      'Cursos extras': [6, 8, 8, 9, 9, 7, 8, 10, 11, 12].map(v => v * 1000),
      'Simulados e inscrições': [3, 4, 5, 5, 6, 6, 5, 7, 8, 9].map(v => v * 1000),
    },
    despesas: {
      'Folha de professores': [78, 78, 80, 80, 80, 80, 82, 82, 82, 84].map(v => v * 1000),
      'Folha administrativa': [18, 18, 18, 18, 18, 18, 19, 19, 19, 19].map(v => v * 1000),
      'Encargos e impostos': [21, 21, 22, 22, 22, 22, 23, 23, 23, 24].map(v => v * 1000),
      'Aluguel e manutenção': [14, 14, 14, 14, 15, 15, 15, 15, 15, 15].map(v => v * 1000),
      'Material didático': [9, 4, 3, 3, 3, 3, 8, 4, 3, 3].map(v => v * 1000),
      'Energia, água, internet': [5, 5, 5, 5, 5, 6, 6, 6, 6, 6].map(v => v * 1000),
      'Marketing': [2, 2, 2, 2, 2, 2, 3, 3, 3, 3].map(v => v * 1000),
      'Outros': [3, 3, 3, 3, 3, 3, 3, 3, 3, 3].map(v => v * 1000),
    },
    contasPagar: [
      { id: 'c1', desc: 'Aluguel da sede', venc: '05/11', valor: 11500, status: 'aberto', cat: 'Aluguel e manutenção' },
      { id: 'c2', desc: 'Energia elétrica', venc: '12/11', valor: 2840, status: 'aberto', cat: 'Energia, água, internet' },
      { id: 'c3', desc: 'Gráfica · listas de novembro', venc: '08/11', valor: 1960, status: 'aberto', cat: 'Material didático' },
      { id: 'c4', desc: 'Folha de outubro', venc: '05/11', valor: 103000, status: 'programado', cat: 'Folha de professores' },
      { id: 'c5', desc: 'INSS / FGTS', venc: '20/11', valor: 23800, status: 'aberto', cat: 'Encargos e impostos' },
      { id: 'c6', desc: 'Internet e telefonia', venc: '15/10', valor: 640, status: 'pago', cat: 'Energia, água, internet' },
    ],
  };

  const logs = [
    { quando: 'Hoje 09:12', quem: 'Coordenação', acao: 'Enviou aviso "Simulado EsPCEx" para Turma EsPCEx' },
    { quando: 'Hoje 08:40', quem: 'Hiroshi Yasuda', acao: 'Lançou notas de Prova · Orgânica (3º ano)' },
    { quando: 'Ontem 17:55', quem: 'Família Tanaka', acao: 'Acessou boletim de Rafael Tanaka' },
    { quando: 'Ontem 16:20', quem: 'Admin', acao: 'Alterou permissão de Paula Sakamoto (materiais: publicar)' },
    { quando: '15/10 11:02', quem: 'Admin', acao: 'Exportou relatório financeiro de setembro (PDF)' },
  ];

  return { cursos, turmasFlat, disciplinas, alunos, professores, avisos, materiais, avaliacoes, agenda, financeiro, logs,
    turma: id => turmasFlat.find(t => t.id === id), curso: id => cursos.find(c => c.id === id), aluno: id => alunos.find(a => a.id === id), prof: id => professores.find(p => p.id === id) };
})();
