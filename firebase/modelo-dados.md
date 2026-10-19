# Modelo de dados (Firestore)

| Coleção | Campos principais |
|---|---|
| cursos | nome, kanji, ativo |
| turmas | cursoId, nome, ano, professores[] |
| alunos | nome, turmaId, cursoId, responsavelIds[], objetivo, status, documentos{}, criadoEm — **sem campo de foto** |
| responsaveis | nome, telefone, email, alunoIds[] |
| professores | nome, disciplinas[], turmas[], permissoes{} |
| avisos | titulo, texto, para{tipo, id}, canal, agendadoPara, autor, lidoPor[] |
| materiais | titulo, tipo, disc, turmaId, prof, url (Storage/Bunny), prazo, acessos |
| avaliacoes | titulo, turmaId, disc, data, peso, bimestre, status, prof, gabarito[] |
| notas | alunoId, turmaId, avaliacaoId, valor, comentario, publicada |
| presencas | alunoId, turmaId, data, aula, status (P/F/J), obs |
| mensalidades | alunoId, competencia, valor, desconto, venc, status, asaasId, pagoEm |
| lancamentos | tipo (receita/despesa), categoria, valor, competencia, caixaEm, origem |
| contasPagar | desc, categoria, venc, valor, status, nfUrl |
| aprovacoes | alunoId, concurso, colocacao, autorizado, arteUrl |
| mensagens | alunoId, de, texto, criadoEm, lidoEm |
| consentimentos | alunoId, tipo, assinadoEm, por |
| logs | uid, role, acao, alvo, alunoId?, quando — imutável |

Claims do token: `{ role, turmas: [], alunoIds: [] }` definidas por Cloud Function ao criar/alterar usuário.
