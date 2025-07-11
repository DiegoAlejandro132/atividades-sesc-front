'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import api from '@/services/axios'
import Cadastro from './cadastro'

export default function ModalInscricao({
  aberto,
  fechar,
  idAtividade
}) {
    const [nomeBusca, setNomeBusca] = useState('')
    const [resultado, setResultado]   = useState(null)
    const [carregando, setCarregando] = useState(false)
    const [buscou, setBuscou] = useState(false);

    const [mostrarCadastro, setMostrarCadastro] = useState(false)

    const buscarCliente = async () => {
        if (!nomeBusca.trim()) return;
        setBuscou(true);
        setCarregando(true);
    try {
        const { data } = await api.post(`/cliente/busca-por-nome`, { nome: nomeBusca });
        setResultado(data || null);
    } catch (e) {
        console.error(e);
        setResultado(null);
    } finally {
        setCarregando(false);
    }
};

    const inscreverExistente = async (idCliente) => {
        try {
            const resp = await api.post('/inscricao', { idAtividade, idCliente })
            if (resp.data.existe){
                alert("você já está inscrito")
                return
            }
            if(resp.data.id){
                alert("Inscrição realizada com sucesso")
            }
            fechar()
        } catch (e) {
            alert('Erro ao inscrever: ' + e.message)
        }
    }

    const cadastrarEInscrever = async (novoCliente) => {
        try {
            const response = await api.post('/cliente', novoCliente)
            const idCliente = response.data.id
            alert("Cadastro realizado com sucesso")
            inscreverExistente(idCliente)
            setMostrarCadastro(false)
            fechar()
        } catch (e) {
            alert('Erro ao inscrever novo cliente: ' + e.message)
        }
    }

    useEffect(() => {
        if (!aberto) {
            setNomeBusca('');
            setResultado(null);
            setCarregando(false);
            setMostrarCadastro(false);
        }
    }, [aberto]);

    return (
        <>
            {aberto && !mostrarCadastro && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
                    <button onClick={fechar} className="absolute top-4 right-4 cursor-pointer">
                        <Image src="/close.svg" alt="Fechar" width={24} height={24}/>
                    </button>

                    <h3 className="text-xl font-bold text-center mb-6">Inscrição na atividade</h3>

                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Nome do candidato"
                            className="flex-1 border rounded p-2"
                            value={nomeBusca}
                            onChange={(e) => setNomeBusca(e.target.value)}
                        />
                        <button
                            onClick={buscarCliente}
                            disabled={carregando}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {carregando ? '...' : 'Buscar'}
                        </button>
                    </div>

                    {resultado ? (
                        <div className="space-y-3">
                            <p>Encontrado: <b>{resultado.nomeCliente}</b></p>
                            {resultado.jaInscrito ? (
                                <p className="text-red-600">Este cliente já está inscrito.</p>
                            ) : (
                                <button
                                    onClick={() => inscreverExistente(resultado.id)}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Inscrever
                                </button>
                            )}
                        </div>
                    ) : buscou && !carregando && (
                        <div className="space-y-3">
                            <p className="text-gray-600">Cliente não encontrado.</p>
                            <button
                                onClick={() => setMostrarCadastro(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Cadastrar e inscrever
                            </button>
                        </div>
                    )}
                    </div>
                </div>
            )}

            {mostrarCadastro && (
                <Cadastro
                    aberto={mostrarCadastro}
                    fechar={() => setMostrarCadastro(false)}
                    cadastrar={cadastrarEInscrever}
                />
            )}
        </>
  )
}
