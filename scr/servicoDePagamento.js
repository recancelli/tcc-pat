export default class ServicoDePagamento {
    #pagamentos

    constructor() {
        this.#pagamentos = [];
    }

    pagar(codigoDeBarras, empresa, valor) {
        if (!codigoDeBarras || !empresa || !valor) {
            throw new Error('Código de barras, empresa e valor são obrigatórios para realizar um pagamento.');
        }

        if (valor > 0) {
            const categoria = valor > 100 ? 'caro' : 'padrao';
            this.#pagamentos.push({
                codigoDeBarras,
                empresa,
                valor,
                categoria
            });
        } else {
            throw new Error('O pagamento deve conter um valor maior que zero.');
        }

    }

    consultar() {
        return this.#pagamentos;
    }

    consultarUltimoPagamento() {
        return this.#pagamentos[this.#pagamentos.length - 1];
    }
}