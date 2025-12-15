# ⏱️ Ponto Digital Servidor

> Sistema moderno de registro de ponto eletrônico para servidores públicos

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Sobre o Projeto

**Ponto Digital Servidor** é uma aplicação web progressiva (PWA-ready) desenvolvida para substituir sistemas de ponto eletrônico falhos e controles manuais em papel/planilha. Projetada para atender **mais de 3.000 servidores públicos**, a solução oferece uma interface moderna, intuitiva e mobile-first para registro rápido de frequência.

### 🎯 Problema Resolvido

- ❌ Sistema eletrônico de ponto em falha constante
- ❌ Controle manual sujeito a erros de frequência
- ❌ Dificuldade na coleta de dados para folha de pagamento
- ❌ Interface desatualizada e pouco intuitiva

### ✅ Solução Oferecida

- ✅ Registro de ponto com **um único clique**
- ✅ Interface moderna e responsiva (mobile-first)
- ✅ Consulta individual de espelho de ponto
- ✅ Painel administrativo com relatórios e exportações
- ✅ Armazenamento local para prototipagem rápida

## ✨ Funcionalidades

### 👤 Para Servidores

- **Login Seguro**: Autenticação por matrícula e senha
- **Registro Rápido**: Botão toggle (Entrada ↔ Saída) com feedback imediato
- **Espelho de Ponto**: Visualização completa dos registros pessoais
- **Filtros**: Consulta por período personalizado
- **Interface Intuitiva**: Design premium com animações suaves

### 👨‍💼 Para Administradores

- **Dashboard Estatístico**: Métricas em tempo real
  - Total de registros
  - Número de servidores
  - Registros do dia e do mês
- **Relatórios Completos**: Visualização de todos os servidores
- **Filtros Avançados**: Por servidor, data inicial e final
- **Exportação de Dados**: 
  - 📊 CSV (Excel/Google Sheets)
  - 📄 JSON (integração com sistemas)

## 🚀 Demonstração

### Tela de Login
Interface moderna com glassmorfismo e gradientes vibrantes.

### Dashboard Principal
Botão hero de fácil toque para registro rápido de entrada/saída.

### Painel Administrativo
Estatísticas, filtros e exportação de dados para folha de pagamento.

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - HTML5 (Semântico e acessível)
  - CSS3 (Design System com custom properties)
  - JavaScript ES6+ (Vanilla, sem frameworks)
  
- **Design**:
  - Google Fonts (Inter, Outfit)
  - Glassmorphism Effects
  - Gradientes vibrantes
  - Animações CSS
  - Mobile-first Responsive

- **Armazenamento**:
  - LocalStorage (prototipagem)
  - SessionStorage (sessão de usuário)

## 📦 Instalação e Uso

### Opção 1: Execução Direta

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/ponto-digital-servidor.git

# Entre no diretório
cd ponto-digital-servidor

# Abra o arquivo no navegador
xdg-open index.html
# ou simplesmente dê duplo clique no arquivo index.html
```

### Opção 2: Servidor Local

```bash
# Com Python 3
python3 -m http.server 8000

# Com Node.js (npx)
npx serve

# Acesse http://localhost:8000
```

## 🔑 Credenciais de Teste

### Servidor (Funcionário)
- **Matrícula**: `1001`
- **Senha**: `1234`

### Administrador
- **Matrícula**: `9999`
- **Senha**: `1234`

> 💡 **Dados de Exemplo**: O sistema gera automaticamente 5 servidores e registros dos últimos 7 dias para teste.

## 📱 Compatibilidade

- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari (iOS/macOS)
- ✅ Opera
- ✅ Navegadores móveis

**Resolução mínima**: 320px (smartphones pequenos)

## 🎨 Design Highlights

- **Dark Mode**: Tema escuro moderno por padrão
- **Glassmorphism**: Efeitos de vidro para profundidade
- **Gradientes Personalizados**: Paleta vibrante e profissional
- **Animações Suaves**: Micro-interações para melhor UX
- **Touch-Friendly**: Alvos de toque ≥ 48px (padrão mobile)
- **Tipografia Premium**: Fontes web otimizadas

## 📊 Estrutura de Dados

### Usuários (LocalStorage)
```json
{
  "matricula": "1001",
  "nome": "João Silva",
  "role": "employee",
  "senha": "1234"
}
```

### Registros de Ponto (LocalStorage)
```json
{
  "id": "uuid-v4",
  "matricula": "1001",
  "timestamp": "2025-12-15T14:30:00.000Z",
  "tipo": "entrada",
  "date": "2025-12-15",
  "time": "14:30:00"
}
```

## ⚠️ Importante: Produção

> **Este é um protótipo usando LocalStorage**. Para ambiente de produção com 3.000+ usuários, é necessário:

### 🔒 Segurança
- [ ] Backend com API REST (Node.js/Python/PHP)
- [ ] Banco de dados (PostgreSQL/MySQL)
- [ ] HTTPS obrigatório
- [ ] Hash de senhas (bcrypt)
- [ ] Autenticação JWT
- [ ] Proteção CSRF/XSS
- [ ] Rate limiting

### 🚀 Infraestrutura
- [ ] Hospedagem em nuvem (AWS/Azure/Google Cloud)
- [ ] CDN para assets estáticos
- [ ] Load balancer
- [ ] Backup automático
- [ ] Monitoramento e logs

### ➕ Funcionalidades Adicionais
- [ ] Recuperação de senha por e-mail
- [ ] Verificação de localização (GPS)
- [ ] Captura de foto no registro
- [ ] Notificações push
- [ ] Modo offline (PWA)
- [ ] Relatórios avançados
- [ ] Integração com folha de pagamento

## 🗂️ Estrutura do Projeto

```
ponto-digital-servidor/
├── index.html          # Estrutura HTML principal
├── styles.css          # Design system e estilos
├── app.js              # Lógica da aplicação
└── README.md           # Este arquivo
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido para modernizar o controle de ponto de servidores públicos, eliminando falhas de sistema e processos manuais.

---

## 🔮 Roadmap

- [ ] **v2.0**: Implementação de backend REST API
- [ ] **v2.1**: Autenticação biométrica
- [ ] **v2.2**: Aplicativo mobile nativo (React Native)
- [ ] **v2.3**: Integração com sistemas de RH existentes
- [ ] **v3.0**: Análise preditiva de frequência com IA
- [ ] **v3.1**: Dashboard analítico para gestores

## 📞 Suporte

Para reportar bugs ou solicitar funcionalidades, abra uma [issue](https://github.com/seu-usuario/ponto-digital-servidor/issues).

---

<div align="center">

**Feito com ❤️ para facilitar o dia a dia dos servidores públicos**

⭐ Se este projeto foi útil, considere dar uma estrela!

</div>
