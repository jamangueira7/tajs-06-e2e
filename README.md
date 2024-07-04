<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-rodar">Como rodar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>&nbsp;&nbsp;&nbsp;
</p>
<br>

# TAJS - Stubs e Spy

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [NodeJs](https://nodejs.org/en) v22.2.0
- [NPM](https://www.npmjs.com/) 10.7.0
- [NestJS](https://nestjs.com/) - 10.3.2

## 💻 Projeto

- [x] - Trabalha com ES Modules
- [x] - Possui live reload
- [x] - Possui debug com VSCode
- [x] - Possui suporte para debug com navegadores

### Testes

![img.png](.github%2Fimgage.png)


## 🚀 Como Rodar


### Abra  pasta do treinamento

Na pasta onde você guarda todos os projetos do treinamento, vamos supor que vá chama-lo de `tajs-erickwendel`

```shell
cd tajs-erickwendel
```

e então Restaure os pacotes:

```shell
cd aula03-stubs
npm ci --silent
```

### Executando testes em modo de execução

Para executar os testes em modo live reload
```shell
npm run test:dev
```
ou apenas executá-los
```shell
npm run test
```

### Depuração e Live reload no VSCode

A pasta [.vscode](./../.vscode) está localizada na raiz dos projetos assim não terá a necessidade de replicar a configuração ao longo do treinamento.

### Abra  pasta do treinamento no VSCode

Supondo que você está em `tajs-erickwendel/aula01-setup-jest` e já restaurou os pacotes seguindo os passos anteriores execute:
```shell
code ../
# para abrir a pasta que contem todos os projetos
```

### Ligando a suite de testes

Por padrão, seguindo a configuração do arquivo [tasks.json](./../.vscode/tasks.json), o VSCode vai tentar rodar a suite de testes localizada no **arquivo em que você abrir**.

Abra o [test/template.test.js](./test/template.test.js) em seguida pressione `Command` (ou `Control` se Windows) `Shift B` para ligar a tarefa de rodar os testes na pasta do arquivo em foco.

Seu terminal deverá aparecer algo como:

```shell
 *  Executing task: bash -c 'PROJECT_DIR=$(dirname /Users/seu-nome/cursos/aula01-setup-jest/test/template.test.js); cd "$PROJECT_DIR"; npm run test:debug'


> aula01-setup-jest@0.0.1 test:debug
> node --experimental-vm-modules --inspect-brk node_modules/jest/bin/jest.js --watchAll

Debugger listening on ws://127.0.0.1:9229/0b60b289-f3cb-43f6-b521-66047adc9594
For help, see: https://nodejs.org/en/docs/inspector

```

### Plugando o modo debug aos testes

Agora que o projeto está aguardando conexões, aperte `F5`, o VSCode vai pausar na linha contendo a palavra chave `debug` ou em algum breakpoint que você definir.

Depois é só apertar `F5` novamente para deixar os testes terminarem sua execução.

Seu sua aba `terminal` do VSCode vai estar similar ao output abaixo:
```shell
Debugger attached.
Debugger attached.
Debugger attached.
Debugger attached.
(node:26586) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 PASS  test/template.test.js (8.127 s)
  Template Suite
    ✓ should sum 2 numbers (7922 ms)

Waiting for the debugger to disconnect...
Waiting for the debugger to disconnect...
Waiting for the debugger to disconnect...
Waiting for the debugger to disconnect...
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        8.399 s
Ran all test suites.

Watch Usage
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.

```

### Parando

- Para parar os testes basta rodar `Ctrl C` na aba `terminal` do VSCode
- Para desconectar o debugger rodar `Shift F5` no VSCode

https://jestjs.io/docs/ecmascript-modules


## 🤔 Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.