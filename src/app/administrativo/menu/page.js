'use client';
import Link from 'next/link';

export default function Menu() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-3 gap-6">
        <Card rota="/administrativo/atividades" titulo="Atividades" />
        <Card rota="/administrativo/responsavel_atividade" titulo="Responsáveis por atividade" />
        <Card rota="/administrativo/inscricoes" titulo="Inscrições" />
        <Card rota="/administrativo/perfis" titulo="Perfis" />
        <Card rota="/administrativo/dashboards" titulo="Dashboards" />
        <Card rota="/administrativo/gestao_avaliacoes" titulo="Gestão de avaliações" />
      </div>
    </div>
  );
}

function Card({ rota, titulo }) {
  return (
    <Link href={rota}>
      <div className="p-8 w-60 h-40 bg-white shadow-md rounded-xl hover:shadow-xl hover:scale-105 transition duration-300 flex items-center justify-center text-xl font-semibold text-center">
        {titulo}
      </div>
    </Link>
  );
}
