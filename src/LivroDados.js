import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ControleLivros } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LivroDados = () => {
    const opcoes = controleEditora.getEditoras().map(editora => ({
        value: editora.codEditora,
        text: editora.nome
    }));

    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(opcoes[0].value);

    const navigate = useNavigate();

    const tratarCombo = (evento) => {
        setCodEditora(Number(evento.target.value));
    };

    const incluir = (evento) => {
        evento.preventDefault();
        const livro = {
            codigo: 0,
            titulo: titulo,
            resumo: resumo,
            autores: autores.split('\n'),
            codEditora: codEditora
        };
        controleLivro.incluir(livro);
        navigate('/');
    };

    return (
        <main className="container mt-4">
            <h1 className="mb-4">Dados do Livro</h1>
            <form onSubmit={incluir} className="shadow p-4 rounded bg-light">
                <div className="mb-3">
                    <label htmlFor="titulo" className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        id="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="resumo" className="form-label">Resumo</label>
                    <textarea
                        className="form-control"
                        id="resumo"
                        value={resumo}
                        onChange={(e) => setResumo(e.target.value)}
                        rows={3}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="editora" className="form-label">Editora</label>
                    <select
                        className="form-select form-control"
                        id="editora"
                        value={codEditora}
                        onChange={tratarCombo}
                    >
                        {opcoes.map((editora, index) => (
                            <option key={index} value={editora.value}>
                                {editora.text}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="autores" className="form-label">Autores (1 por linha)</label>
                    <textarea
                        className="form-control"
                        id="autores"
                        value={autores}
                        onChange={(e) => setAutores(e.target.value)}
                        rows={3}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Salvar Dados</button>
            </form>
        </main>
    );
}

export default LivroDados;