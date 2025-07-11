# Back end gerenciador de atividades
Projeto desenvolvido como teste prático para vaga de analista de sistemas.
O sistema gerencia atividades, atribuindo relações com responsaveis e mantendo inscrições de clientes

# Projeto REACT com NEXTJS

# Instalação
para instalar o projeto clone o repositorio https://github.com/DiegoAlejandro132/atividades-sesc-front.git
crie um arquivo .env com a variavel para chamar o back end NEXT_PUBLIC_URL_API
se ja tiver o back end deste projeto para rodar localmente basta atrbuir http://localhost:3001
instale as dependencias com npm install
e rode o comando npm run dev

# Docker
para rodar no docker, primeiro instale ele em sua máquina, crie e configure o env
builde o projeto com: 
docker build -t meu-projeto-front .
docker run -p 3000:3000 meu-projeto-front