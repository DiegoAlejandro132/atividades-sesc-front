'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import api from '@/services/axios';

export default function Cadastro({ 
    cadastrar,
    aberto,
    fechar
}) {
    const [form, setForm] = useState({
        nomeCliente: '',
        dataNascimento: '',
        cep: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: ''
    });

    const onChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submit = (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;
        fechar();
        cadastrar(form);
    };

    const consultaCep = async(cep) => {
        try{
            const response = await api.get(`cep/${cep}`)
            if(response.data){
                const objCep = response.data
                setForm(prev => ({
                    ...prev,
                    logradouro: objCep.logradouro,
                    bairro: objCep.bairro,
                    cidade: objCep.localidade,
                    estado: objCep.estado
                }));
            }
        }catch(erro){
            alert("Houve um erro na consulta de seu cep. Certifique-se de ter inserido um valor correto")
            console.log(erro)
        }
    }

    const validarFormulario = () => {
        const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/.test(form.nomeCliente);
        const nascimento = new Date(form.dataNascimento);
        const hoje = new Date();
        const idade = hoje.getFullYear() - nascimento.getFullYear();
        const nascimentoValido = nascimento <= hoje && idade >= 0 && idade <= 150;
        const cepValido = /^[0-9]{8}$/.test(form.cep);

        if (!nomeValido) return alert("Nome inválido (somente letras)");
        if (!nascimentoValido) return alert("Data de nascimento inválida");
        if (!cepValido) return alert("CEP inválido (deve conter 8 números)");

        return true;
    };

    useEffect(() => {
        if (aberto) {
            setForm({
                nomeCliente: '',
                dataNascimento: '',
                cep: '',
                logradouro: '',
                numero: '',
                bairro: '',
                cidade: '',
                estado: ''
            });
        }
    }, [aberto]);

    return (
        <>
            {aberto && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-100 p-6 relative  max-h-140">
                        <button
                            onClick={fechar}
                            className="absolute top-4 right-4"
                            aria-label="Fechar"
                        >
                            <Image
                                priority={true}
                                className='cursor-pointer'
                                src="/close.svg"
                                alt="Fechar modal"
                                width={30}
                                height={30}
                            />
                        </button>

                        <h3 className="text-xl font-bold text-center mb-6">
                            Cadastro de cliente
                        </h3>

                        <div className="overflow-auto max-h-100 pr-2">
                            <form onSubmit={submit} className="space-y-4 flex flex-col items-center">
                                <div className="flex flex-col w-64">
                                    <label htmlFor="nomeCliente" className="mb-1 font-medium">Nome</label>
                                    <input
                                        type="text"
                                        name="nomeCliente"
                                        id="nomeCliente"
                                        value={form.nomeCliente}
                                        onChange={onChange}
                                        className="border rounded p-2"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col w-64">
                                    <label htmlFor="dataNascimento" className="mb-1 font-medium">Data de nascimento</label>
                                    <input
                                        type="date"
                                        name="dataNascimento"
                                        id="dataNascimento"
                                        value={form.dataNascimento}
                                        onChange={onChange}
                                        className="border rounded p-2"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col w-64">
                                    <div className="flex justify-between items-center mb-1">
                                        <label htmlFor="cep" className="font-medium">CEP</label>
                                        <button
                                            type="button"
                                            onClick={() => consultaCep(form.cep)}
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            Consultar
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        name="cep"
                                        id="cep"
                                        value={form.cep}
                                        onChange={onChange}
                                        className="border rounded p-2"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col w-64">
                                    <label htmlFor="logradouro" className="mb-1 font-medium">Logradouro</label>
                                    <input
                                        type="text"
                                        name="logradouro"
                                        id="logradouro"
                                        value={form.logradouro}
                                        onChange={onChange}
                                        className="border rounded p-2"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col w-64">
                                    <label htmlFor="numero" className="mb-1 font-medium">Número</label>
                                    <input
                                        type="text"
                                        name="numero"
                                        id="numero"
                                        value={form.numero}
                                        onChange={onChange}
                                        className="border rounded p-2"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col w-64">
                                    <label htmlFor="bairro" className="mb-1 font-medium">Bairro</label>
                                    <input
                                        type="text"
                                        name="bairro"
                                        id="bairro"
                                        value={form.bairro}
                                        onChange={onChange}
                                        className="border rounded p-2"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col w-64">
                                    <label htmlFor="cidade" className="mb-1 font-medium">Cidade</label>
                                    <input
                                        type="text"
                                        name="cidade"
                                        id="cidade"
                                        value={form.cidade}
                                        onChange={onChange}
                                        className="border rounded p-2"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col w-64">
                                    <label htmlFor="estado" className="mb-1 font-medium">Estado</label>
                                    <input
                                        type="text"
                                        name="estado"
                                        id="estado"
                                        value={form.estado}
                                        onChange={onChange}
                                        className="border rounded p-2"
                                        required
                                    />
                                </div>

                                <div className="flex justify-center pt-4">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-40 cursor-pointer"
                                    >
                                        Cadastrar
                                    </button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            )}
        </>
    );  
}
