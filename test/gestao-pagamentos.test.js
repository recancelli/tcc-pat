import assert from 'assert';
import ServicoDePagamento from '../scr/servicoDePagamento.js';

describe('Gestão de Pagamentos', function () {
    it('Realizar pagamento caro', function () {
        // Arrange
        const pagamento = { codigoDeBarras: '2026-2131-1321', empresa: 'Empresa A', valor: 150 };
        const valorEsperado = { codigoDeBarras: '2026-2131-1321', empresa: 'Empresa A', valor: 150, categoria: 'caro' };
        const servicoDePagamento = new ServicoDePagamento();
        // Act
        const pagar = servicoDePagamento.pagar(pagamento.codigoDeBarras, pagamento.empresa, pagamento.valor);
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
        // Assert
        assert.deepEqual(ultimoPagamento, valorEsperado);
    });

    it('Realizar pagamento padrao de 100 reais', function () {
        // Arrange
        const pagamento = { codigoDeBarras: '2026-2131-1321', empresa: 'Empresa A', valor: 100 };
        const valorEsperado = { codigoDeBarras: '2026-2131-1321', empresa: 'Empresa A', valor: 100, categoria: 'padrao' };
        const servicoDePagamento = new ServicoDePagamento();
        // Act
        const pagar = servicoDePagamento.pagar(pagamento.codigoDeBarras, pagamento.empresa, pagamento.valor);
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
        // Assert
        assert.deepEqual(ultimoPagamento, valorEsperado);
    });

    it('Realizar pagamento padrao', function () {
        // Arrange
        const pagamento = { codigoDeBarras: '2026-2131-3121', empresa: 'Empresa A', valor: 13.8 };
        const valorEsperado = { codigoDeBarras: '2026-2131-3121', empresa: 'Empresa A', valor: 13.8, categoria: 'padrao' };
        const servicoDePagamento = new ServicoDePagamento();
        // Act
        const pagar = servicoDePagamento.pagar(pagamento.codigoDeBarras, pagamento.empresa, pagamento.valor);
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
        // Assert
        assert.deepEqual(ultimoPagamento, valorEsperado);
    });

    it('Realizar pagamento vazio', function () {
        // Arrange
        const pagamento = { codigoDeBarras: '', empresa: '', valor: 0 };
        const servicoDePagamento = new ServicoDePagamento();
        // Act & Assert
        assert.throws(() => {
            servicoDePagamento.pagar(pagamento.codigoDeBarras, pagamento.empresa, pagamento.valor), Error, "Código de barras, empresa e valor são obrigatórios para realizar um pagamento."
        });
    });

    it('Realizar pagamento zerado', function () {
        // Arrange
        const pagamento = { codigoDeBarras: '2026-2131-3121', empresa: 'Empresa A', valor: 0 };
        const servicoDePagamento = new ServicoDePagamento();
        // Act & Assert
        assert.throws(() => {
            servicoDePagamento.pagar(pagamento.codigoDeBarras, pagamento.empresa, pagamento.valor), Error, "O pagamento deve conter um valor maior que zero."
        });
    });
});