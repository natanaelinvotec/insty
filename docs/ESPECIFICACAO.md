# Plataforma INSTY — Especificação v1

Escola INSTY · Instituto Yassuda · Campo Grande – MS. Documento de referência para desenvolvimento, revisado por quatro frentes: Produto, UX, Engenharia/Segurança e Financeiro.

## 1. Visão

Uma plataforma, quatro painéis, uma regra: **nenhuma imagem de aluno em lugar nenhum**. O sistema conecta direção, professores, alunos e famílias com o mínimo de atrito e o máximo de transparência. Tudo que a escola faz à mão hoje (avisos por WhatsApp, boletim em papel, cobrança manual, chamada em caderno) passa a ter um lugar.

Perfis:

| Perfil | Quem | Acessa |
|---|---|---|
| **Admin Master** | Direção e coordenação | Tudo: alunos, professores, turmas, avisos, materiais, avaliações, financeiro completo, DRE, relatórios, aprovações, permissões, auditoria, integrações |
| **Professor** | Corpo docente | Suas turmas, chamada, avaliações e notas, materiais, avisos para suas turmas, agenda |
| **Aluno** | Estudantes | Materiais, avaliações, boletim, presenças, agenda, avisos |
| **Responsável** | Pais ou tutores | Acompanhamento completo do filho, boletim, frequência, financeiro, avisos, agenda, mensagens, dados e LGPD |

## 2. Módulos por perfil

### 2.1 Admin Master (管)

**Visão geral**
- KPIs: alunos ativos, engajamento semanal (aulas assistidas), média geral do bimestre, resultado financeiro do mês.
- Gráfico receitas × despesas × resultado (12 meses) e distribuição de alunos por curso.
- Alunos que pedem atenção (frequência < 85% ou média < 6), com ficha em um clique.
- Registro de auditoria: últimas ações de todos os usuários.

**Alunos**
- Árvore completa: Curso → Turma → Aluno, com contagem, média e frequência por turma.
- Ficha do aluno: dados, responsável, notas por bimestre, frequência, acessos, objetivo (concurso).
- Matrícula: nome, curso, turma, responsável, WhatsApp, documentos (RG, comprovante, termo LGPD), geração automática de acesso para aluno e responsável.
- Transferência de turma, trancamento, desligamento (com histórico preservado).
- Exportação CSV/Excel.

**Professores**
- Cadastro, disciplinas, turmas atribuídas, permissões individuais (publicar material, lançar nota, enviar aviso).
- Indicadores: materiais publicados, avaliações criadas, correções pendentes.

**Cursos e turmas**
- Criação de cursos, turmas, ano letivo, grade horária, vínculo professor-disciplina-turma.
- Resumo por turma: alunos, média, frequência, professores.

**Avisos**
- Envio para: todas as famílias, todos os alunos, professores, turma específica, aluno específico.
- Canais: plataforma, WhatsApp, e-mail. Agendamento de envio. Confirmação de leitura.
- Modelos prontos: reunião de pais, simulado, feriado, cobrança, edital.

**Materiais**
- Biblioteca central por curso, turma e disciplina. Tipos: videoaula, PDF/apostila, lista, link.
- Indicadores de acesso por material e por aluno. Controle de armazenamento.

**Avaliações**
- Calendário geral de provas e simulados. Pesos, bimestres, fórmula de média.
- Importação de gabarito e correção automática de simulados objetivos.
- Resultados comparados: aluno × turma × nota de corte do concurso-alvo.

**Financeiro completo (金)**
- Mensalidades: geração automática por curso, descontos (irmãos, pontualidade, bolsa), vencimento, Pix e boleto via Asaas, conciliação automática, recibos.
- Inadimplência: lista por família, dias de atraso, lembretes automáticos (3, 7, 15 dias), negociação com registro, bloqueio opcional de acesso.
- Contas a pagar: fornecedores, categorias, recorrência, programação de folha, anexos de notas fiscais.
- Fluxo de caixa: entradas, saídas, resultado e saldo mês a mês; projeção dos próximos 3 meses.
- **DRE** (regime de competência): receita bruta por fonte → impostos e encargos → receita líquida → custos do serviço (professores, material) → lucro bruto → despesas administrativas → resultado operacional e margem. Exportação Excel e envio ao contador.
- Cobranças extras: inscrições em concursos, vestibulares, pesquisas (a escola cobra só isso à parte).
- Relatório de bolsas e descontos.

**Relatórios**
- Engajamento por turma, média por disciplina, evolução da média geral, frequência por curso, aprovações por ano, conversão de visitas em matrículas.
- Exportação PDF com o logotipo da escola.

**Aprovações**
- Registro de aprovados, concurso, colocação e autorização da família para divulgar o nome. Geração automática da arte 合格 (sem foto) para Instagram e site.

**Site institucional (CMS dentro do Admin)**
- Edição de todos os textos do site (por chave), troca de imagens (herói, colagem, cartões, posts), ligar/desligar e reordenar módulos, contato (telefone, WhatsApp, Instagram, endereço), pré-visualização e publicação.
- Produção: o Admin grava em `conteudo/site` no Firestore; o site lê esse documento ao abrir (`js/cms.js`) e aplica por cima do conteúdo padrão. Exportação em JSON para versionar no repositório.

**Aniversariantes**
- Admin: alunos e professores do mês, com agendamento de parabéns por WhatsApp. Professor: só os alunos das suas turmas.

**Certificados online**
- Tipos: participação, conclusão, aprovação, mérito, monitoria, frequência. Código único (INSTY-ANO-NNNNN), QR de verificação pública, assinatura da direção, impressão/PDF. Aluno e responsável veem e baixam os seus. Certificado emitido é imutável.

**Carteirinha estudantil**
- Frente com foto, nome, matrícula, curso, turma, nascimento, validade e QR de verificação; rodapé com responsável e telefone de emergência. Emissão individual ou em lote (PDF), pendências de foto, versão digital para a carteira do celular (Fase 7). Válida para meia-entrada (Lei 12.933).

**Foto do aluno (uso interno)**
- Enviada na matrícula pelo Admin, ou pelo próprio aluno/responsável em "Meu perfil". Usada só na carteirinha e no FaceID da chamada. Nunca aparece no site, no Instagram, em avisos ou em qualquer lugar público. Regras de Storage limitam leitura ao aluno, família, professores da turma e Admin.

**Presença por FaceID**
- Na chamada, o professor liga a câmera; o módulo de reconhecimento (projeto já existente do cliente) chama `INSTY.FaceID.reconhecido(alunoId)` a cada rosto identificado. A lista marca presença com horário, o professor revisa e aplica na chamada. O modelo facial fica no dispositivo/servidor da escola, não no Firebase; a LGPD trata dado biométrico como sensível: consentimento específico do responsável e política de retenção.

**Arquivamento (nunca exclusão)**
- Aluno não é apagado: Admin arquiva, com histórico preservado (matrícula, notas, presenças, financeiro, certificados). Reativação possível. Regras do Firestore bloqueiam `delete` em `alunos`.

**Configurações**
- Matriz de permissões por perfil e por pessoa.
- LGPD: termos de consentimento, retenção, pedido de cópia e exclusão de dados, registro de acessos (quem viu o quê).
- Segurança: autenticação em duas etapas obrigatória para Admin e Professores, sessões com expiração, bloqueio por tentativas.
- Integrações: Asaas (Pix/boleto), WhatsApp Business, Bunny Stream (vídeo), exportação contábil.

### 2.2 Professor (師)

- Início: alunos nas suas turmas, avaliações agendadas, correções pendentes, aulas do dia, alunos que pedem atenção.
- Minhas turmas: árvore limitada às turmas em que leciona, com ficha do aluno (sem dados financeiros).
- Chamada: por aula, presente/falta/justificada, observação; a família do ausente é avisada automaticamente.
- Avaliações e notas: criar avaliação, definir peso, lançar notas com comentário individual, publicar (notifica aluno e família), rascunho.
- Materiais: publicar nas suas turmas e disciplinas; indicadores de acesso.
- Avisos: apenas para as suas turmas.
- Agenda: grade de aulas e monitorias.

Não acessa: financeiro, cadastros, permissões, auditoria, outras turmas.

### 2.3 Aluno (学)

- Início: progresso do plano anual, último simulado, sequência de dias estudando, frequência, gráfico de simulados × média da turma × nota de corte, mapa de força por disciplina, próximas avaliações, avisos.
- Materiais: filtrados por disciplina; continuar de onde parou.
- Avaliações: agenda, status, nota individual.
- Boletim: notas por bimestre, média, situação; PDF.
- Presenças: calendário mensal e frequência do semestre.
- Agenda: aulas, monitorias e simulados.
- Avisos: comunicados da coordenação.

Não acessa: dados de outros alunos, financeiro, notas antes da publicação.

### 2.4 Responsável (家)

- Acompanhamento: média, frequência, tempo de estudo, mensalidade, evolução nos simulados, mapa de força, avisos, resumo semanal escrito pela coordenação.
- Boletim e frequência do filho (mesma visão do aluno).
- Financeiro: mensalidades, vencimento, status, 2ª via, Pix, recibos, cobranças extras.
- Avisos e agenda.
- Mensagens: canal direto com a coordenação, com histórico.
- Dados e LGPD: consentimentos, preferência de divulgação do nome em aprovação, registro de quem acessou os dados do filho, pedido de cópia ou exclusão.

## 3. Matriz de permissões

| Recurso | Admin | Professor | Aluno | Responsável |
|---|---|---|---|---|
| Avisos | Total | Suas turmas | Ler | Ler |
| Materiais | Total | Suas disciplinas | Ler | — |
| Avaliações e notas | Total | Suas turmas | Ver as próprias | Ver as do filho |
| Chamada | Total | Suas turmas | Ver a própria | Ver a do filho |
| Árvore de alunos | Total | Suas turmas | — | — |
| Financeiro da escola | Total | — | — | — |
| Financeiro do filho | Total | — | — | Total |
| Cadastros e permissões | Total | — | — | — |
| Auditoria | Total | — | — | Acessos ao próprio filho |

Regra geral: cada perfil vê apenas o que lhe pertence. Professores nunca veem dados financeiros. Nenhum perfil pode enviar ou exibir imagens de alunos.

## 4. Arquitetura (Engenharia e Segurança)

- **Front-end:** HTML, CSS e JavaScript puros (este protótipo), evoluindo para PWA instalável. Chart.js para gráficos.
- **Back-end:** Firebase (projeto `insty-colegio`): Authentication (e-mail/senha + 2FA por app autenticador para Admin e Professores), Firestore (dados), Storage (materiais, sem imagens de alunos), Cloud Functions (cobranças, notificações, correção de simulados, geração de PDFs), Hosting.
- **Perfis:** custom claims no token (`role: admin|prof|aluno|pais`, `turmas: [...]`, `alunoIds: [...]`). As regras do Firestore (arquivo `firebase/firestore.rules`) aplicam a matriz da seção 3 no servidor, não só na tela.
- **Integrações:** Asaas (webhook de pagamento → marca mensalidade como paga), WhatsApp Business API (avisos, lembretes, 2ª via), Bunny Stream (vídeo com URL assinada), exportação contábil (Excel/OFX).
- **Auditoria:** toda leitura de dados sensíveis e toda escrita gravam `logs/{id}` com usuário, ação, alvo e horário. Retenção de 12 meses.
- **LGPD:** consentimento por responsável na matrícula; dados de menores com acesso restrito; pedidos de cópia/exclusão atendidos em até 15 dias; nenhum dado em ferramenta de terceiro sem contrato; backup diário criptografado; ambiente de homologação separado.
- **Bloqueio de imagens:** o Storage rejeita uploads de imagem fora da pasta de materiais; o front não oferece campo de foto em nenhum cadastro de aluno.

Modelo de dados (coleções principais): `cursos`, `turmas`, `alunos`, `responsaveis`, `professores`, `avisos`, `materiais`, `avaliacoes`, `notas`, `presencas`, `mensalidades`, `lancamentos` (receitas e despesas), `contasPagar`, `aprovacoes`, `mensagens`, `consentimentos`, `logs`. Detalhes em `firebase/modelo-dados.md`.

## 5. UX (fluxos críticos)

1. **Matrícula → acesso:** Admin cadastra; sistema cria usuários do aluno e do responsável; senha inicial por WhatsApp, expira em 24h; primeiro login exige nova senha e aceite do termo.
2. **Chamada → família:** professor salva a chamada; ausentes geram aviso automático ao responsável em até 5 minutos.
3. **Nota → boletim:** professor publica notas; aluno e responsável recebem notificação; boletim atualiza na hora.
4. **Mensalidade → pagamento:** cobrança gerada no dia 1, lembrete no dia 7, vencimento dia 10; pagamento via Pix conciliado por webhook; recibo automático.
5. **Aprovação → divulgação:** Admin registra; se a família autorizou, a arte 合格 é gerada e fica pronta para o Instagram.

Padrões de interface: navegação lateral com kanji por módulo, cartões de indicadores, tabelas com ação em linha, modais para fichas, avisos em "papel pregado", tema claro e escuro. No celular, a navegação vai para a base da tela.

## 6. Financeiro (regras de cálculo)

- Mensalidade por curso: Fundamental R$ 790, Médio R$ 890, Preparatórios R$ 980 (valores do protótipo; ajustar).
- Descontos: 2º irmão 10%, pontualidade 5% até o vencimento, bolsa conforme cadastro.
- Inadimplência: a partir de 1 dia após o vencimento; multa 2% + juros 1% ao mês (configurável).
- DRE: regime de competência; receitas por fonte; encargos e impostos separados; custos do serviço = folha de professores + material; despesas administrativas = folha administrativa, aluguel, utilidades, marketing, outros.
- Fluxo de caixa: regime de caixa, saldo inicial configurável, projeção com base na média dos últimos 3 meses.

## 7. Roteiro de entrega

| Fase | Entrega | Prazo sugerido |
|---|---|---|
| 0 | Este protótipo navegável (apresentação ao Sidney) | pronto |
| 1 | Firebase: auth com perfis, Firestore com regras, cadastros (alunos, professores, turmas), avisos | 3 semanas |
| 2 | Painel dos pais: boletim, frequência, avisos, mensagens, LGPD | 2 semanas |
| 3 | Professor: chamada, avaliações, notas, materiais (Storage + Bunny) | 3 semanas |
| 4 | Financeiro: mensalidades + Asaas + inadimplência + contas a pagar | 3 semanas |
| 5 | DRE, fluxo de caixa, relatórios, exportações, aprovações | 2 semanas |
| 6 | Aluno: dashboard, plano de estudos, simulados com correção automática | 2 semanas |
| 7 | PWA, 2FA, auditoria, homologação, treinamento da equipe | 2 semanas |

## 8. Checklist de QA

- [ ] Professor não consegue abrir financeiro nem turma alheia (testar via URL direta e via API).
- [ ] Responsável só vê o próprio filho, mesmo com dois filhos na escola (um por vez).
- [ ] Nenhum campo de upload aceita imagem de pessoa fora de materiais.
- [ ] Chamada salva dispara aviso aos ausentes.
- [ ] Pagamento via webhook atualiza status em até 1 minuto.
- [ ] DRE fecha com o fluxo de caixa (diferença explicada por competência × caixa).
- [ ] Logs registram leitura de boletim e de dados financeiros.
- [ ] Tema escuro e celular em todas as telas.
